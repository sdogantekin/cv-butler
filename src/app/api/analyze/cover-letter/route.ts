import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db";
import { resumes, analyses } from "@/db/schema";
import { ResumeUploadSchema, CoverLetterRequestSchema } from "@/lib/schemas/upload";
import { ParsedResumeSchema } from "@/lib/schemas/resume";
import { checkAndConsumeAction } from "@/lib/rate-limit";
import { extractResumeText } from "@/lib/parsers/resume-file";
import { extractNode } from "@/lib/graph/nodes/extract";
import { copywriterNode } from "@/lib/graph/nodes/copywriter";

// Thin route: auth -> validate -> rate-limit -> extract -> write -> persist
// -> respond. Mirrors /api/analyze/match-upload: calls the extract node
// standalone (no LLM score/match call) so a cover letter still bills only 1
// daily action. Job description text is optional here — its presence is
// exactly what selects the General vs. Targeted variant.
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
  const jd = CoverLetterRequestSchema.shape.jobDescriptionText.safeParse(
    typeof jobDescriptionTextField === "string" ? jobDescriptionTextField : undefined,
  );
  if (!jd.success) {
    return NextResponse.json({ error: jd.error.issues[0]?.message }, { status: 400 });
  }

  const rateLimit = await checkAndConsumeAction(session.user.id, "cover_letter");
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

  const jobDescriptionText = jd.data ?? null;
  const written = await copywriterNode({ parsedResume, jobDescriptionText });
  if (!("coverLetter" in written)) {
    return NextResponse.json({ error: "Generation failed", details: written.errors }, { status: 502 });
  }
  const { coverLetter } = written;

  await db.insert(analyses).values({
    userId: session.user.id,
    resumeId: resume.id,
    type: "cover_letter",
    jobDescriptionText,
    result: coverLetter,
  });

  return NextResponse.json({
    resumeId: resume.id,
    parsedResume,
    coverLetter,
    remaining: rateLimit.remaining,
  });
}
