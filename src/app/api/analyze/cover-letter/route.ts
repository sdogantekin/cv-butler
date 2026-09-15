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
import { getLocale } from "@/lib/i18n/locale-cookie";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { errorResponse } from "@/lib/api-errors";

// Thin route: auth -> validate -> rate-limit -> extract -> write -> persist
// -> respond. Mirrors /api/analyze/match-upload: calls the extract node
// standalone (no LLM score/match call) so a cover letter still bills only 1
// daily action. Job description text is optional here — its presence is
// exactly what selects the General vs. Targeted variant.
export async function POST(request: Request) {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  const session = await auth();
  if (!session?.user?.id) {
    return errorResponse(dict, "unauthorized", 401);
  }

  const formData = await request.formData();
  const file = formData.get("resume");
  if (!(file instanceof File)) {
    return errorResponse(dict, "missing_resume_file", 400);
  }
  const jobDescriptionTextField = formData.get("jobDescriptionText");

  const upload = ResumeUploadSchema.safeParse({
    mimeType: file.type,
    filename: file.name,
    size: file.size,
  });
  if (!upload.success) {
    return errorResponse(dict, upload.error.issues[0]?.message, 400);
  }
  const jd = CoverLetterRequestSchema.shape.jobDescriptionText.safeParse(
    typeof jobDescriptionTextField === "string" ? jobDescriptionTextField : undefined,
  );
  if (!jd.success) {
    return errorResponse(dict, jd.error.issues[0]?.message, 400);
  }

  const rateLimit = await checkAndConsumeAction(session.user.id, "cover_letter");
  if (!rateLimit.allowed) {
    return errorResponse(dict, "daily_limit_reached", 429);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const resumeText = await extractResumeText(buffer, upload.data.mimeType);

  const extracted = await extractNode({ resumeText });
  if (!extracted.parsedResume) {
    return errorResponse(dict, "resume_parsing_failed", 502, { details: extracted.errors });
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
  const written = await copywriterNode({ parsedResume, jobDescriptionText, locale });
  if (!("coverLetter" in written)) {
    return errorResponse(dict, "generation_failed", 502, { details: written.errors });
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
