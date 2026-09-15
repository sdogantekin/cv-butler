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
import { getLocale } from "@/lib/i18n/locale-cookie";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { errorResponse } from "@/lib/api-errors";

// Thin route: auth -> validate -> rate-limit -> graph invoke -> persist -> respond.
// Invokes the graph with an already-parsed resume, so it skips extract/score
// entirely (no wasted LLM call, no re-billing that action).
export async function POST(request: Request) {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  const session = await auth();
  if (!session?.user?.id) {
    return errorResponse(dict, "unauthorized", 401);
  }

  const body = await request.json().catch(() => null);
  const parsed = JdMatchRequestSchema.safeParse(body);
  if (!parsed.success) {
    return errorResponse(dict, parsed.error.issues[0]?.message, 400);
  }
  const { resumeId, jobDescriptionText, companyName } = parsed.data;

  const resume = await db.query.resumes.findFirst({
    where: and(eq(resumes.id, resumeId), eq(resumes.userId, session.user.id)),
  });
  if (!resume) {
    return errorResponse(dict, "resume_not_found", 404);
  }

  const rateLimit = await checkAndConsumeAction(session.user.id, "jd_match");
  if (!rateLimit.allowed) {
    return errorResponse(dict, "daily_limit_reached", 429);
  }

  const parsedResume = ParsedResumeSchema.parse(resume.parsedResume);

  const result = await graph.invoke({
    parsedResume,
    jobDescriptionText,
    companyName: companyName ?? null,
    locale,
  });
  if (!result.jdMatch) {
    return errorResponse(dict, "analysis_failed", 502, { details: result.errors });
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
