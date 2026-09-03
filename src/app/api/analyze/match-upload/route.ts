import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db";
import { resumes, analyses } from "@/db/schema";
import { ResumeUploadSchema, JdMatchRequestSchema } from "@/lib/schemas/upload";
import { ParsedResumeSchema } from "@/lib/schemas/resume";
import { JdMatchResultSchema } from "@/lib/schemas/analysis";
import { checkAndConsumeAction } from "@/lib/rate-limit";
import { extractResumeText } from "@/lib/parsers/resume-file";
import { extractNode } from "@/lib/graph/nodes/extract";
import { graph } from "@/lib/graph";

// Thin route: auth -> validate -> rate-limit -> extract -> match -> persist -> respond.
// Lets Job Matching start from a resume file directly, with no prior ATS
// score run needed, while still billing only 1 daily action: it calls the
// extract node standalone (no LLM score call) instead of routing through the
// full score pipeline the way /api/analyze/score does.
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("resume");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing resume file" }, { status: 400 });
  }
  const jobDescriptionTextField = formData.get("jobDescriptionText");

  const upload = ResumeUploadSchema.safeParse({
    mimeType: file.type,
    filename: file.name,
    size: file.size,
  });
  if (!upload.success) {
    return NextResponse.json({ error: upload.error.issues[0]?.message }, { status: 400 });
  }
  const jd = JdMatchRequestSchema.shape.jobDescriptionText.safeParse(
    typeof jobDescriptionTextField === "string" ? jobDescriptionTextField : undefined,
  );
  if (!jd.success) {
    return NextResponse.json({ error: jd.error.issues[0]?.message }, { status: 400 });
  }

  const rateLimit = await checkAndConsumeAction(session.user.id, "jd_match");
  if (!rateLimit.allowed) {
    return NextResponse.json({ error: "Daily limit reached" }, { status: 429 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const resumeText = await extractResumeText(buffer, upload.data.mimeType);

  const extracted = await extractNode({ resumeText });
  if (!extracted.parsedResume) {
    return NextResponse.json(
      { error: "Resume parsing failed", details: extracted.errors },
      { status: 502 },
    );
  }
  const parsedResume = ParsedResumeSchema.parse(extracted.parsedResume);

  const [resume] = await db
    .insert(resumes)
    .values({
      userId: session.user.id,
      originalFilename: upload.data.filename,
      mimeType: upload.data.mimeType,
      parsedResume,
    })
    .returning();

  const result = await graph.invoke({ parsedResume, jobDescriptionText: jd.data });
  if (!result.jdMatch) {
    return NextResponse.json({ error: "Analysis failed", details: result.errors }, { status: 502 });
  }
  const jdMatch = JdMatchResultSchema.parse(result.jdMatch);

  await db.insert(analyses).values({
    userId: session.user.id,
    resumeId: resume.id,
    type: "jd_match",
    jobDescriptionText: jd.data,
    result: jdMatch,
  });

  return NextResponse.json({
    resumeId: resume.id,
    parsedResume,
    jdMatch,
    recommendations: result.recommendations,
    remaining: rateLimit.remaining,
  });
}
