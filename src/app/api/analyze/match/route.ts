import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { resumes, analyses } from "@/db/schema";
import { JdMatchRequestSchema } from "@/lib/schemas/upload";
import { ParsedResumeSchema } from "@/lib/schemas/resume";
import { JdMatchResultSchema } from "@/lib/schemas/analysis";
import { checkAndConsumeAction } from "@/lib/rate-limit";
import { graph } from "@/lib/graph";

// Thin route: auth -> validate -> rate-limit -> graph invoke -> persist -> respond.
// Invokes the graph with an already-parsed resume, so it skips extract/score
// entirely (no wasted LLM call, no re-billing that action).
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = JdMatchRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }
  const { resumeId, jobDescriptionText, companyName } = parsed.data;

  const resume = await db.query.resumes.findFirst({
    where: and(eq(resumes.id, resumeId), eq(resumes.userId, session.user.id)),
  });
  if (!resume) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  const rateLimit = await checkAndConsumeAction(session.user.id, "jd_match");
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Daily limit reached" }, { status: 429 });
  }

  const parsedResume = ParsedResumeSchema.parse(resume.parsedResume);

  const result = await graph.invoke({
    parsedResume,
    jobDescriptionText,
    companyName: companyName ?? null,
  });
  if (!result.jdMatch) {
    return NextResponse.json({ error: "Analysis failed", details: result.errors }, { status: 502 });
  }

  const jdMatch = JdMatchResultSchema.parse(result.jdMatch);

  await db.insert(analyses).values({
    userId: session.user.id,
    resumeId: resume.id,
    type: "jd_match",
    jobDescriptionText,
    result: jdMatch,
  });

  return NextResponse.json({
    jdMatch,
    recommendations: result.recommendations,
    remaining: rateLimit.remaining,
  });
}
