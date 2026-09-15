import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db";
import { resumes, analyses } from "@/db/schema";
import { ResumeUploadSchema } from "@/lib/schemas/upload";
import { ParsedResumeSchema } from "@/lib/schemas/resume";
import { AtsScoreResultSchema } from "@/lib/schemas/analysis";
import { checkAndConsumeAction } from "@/lib/rate-limit";
import { extractResumeText } from "@/lib/parsers/resume-file";
import { graph } from "@/lib/graph";
import { getLocale } from "@/lib/i18n/locale-cookie";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { errorResponse } from "@/lib/api-errors";

// Thin route: auth -> validate -> rate-limit -> graph invoke -> persist -> respond.
// The uploaded file is processed in memory only and never persisted.
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

  const upload = ResumeUploadSchema.safeParse({
    mimeType: file.type,
    filename: file.name,
    size: file.size,
  });
  if (!upload.success) {
    return errorResponse(dict, upload.error.issues[0]?.message, 400);
  }

  const rateLimit = await checkAndConsumeAction(session.user.id, "ats_score");
  if (!rateLimit.allowed) {
    return errorResponse(dict, "daily_limit_reached", 429);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const resumeText = await extractResumeText(buffer, upload.data.mimeType);

  const result = await graph.invoke({ resumeText, locale });
  if (!result.parsedResume || !result.atsScore) {
    return errorResponse(dict, "analysis_failed", 502, { details: result.errors });
  }

  const parsedResume = ParsedResumeSchema.parse(result.parsedResume);
  const atsScore = AtsScoreResultSchema.parse(result.atsScore);

  const [resume] = await db
    .insert(resumes)
    .values({
      userId: session.user.id,
      originalFilename: upload.data.filename,
      mimeType: upload.data.mimeType,
      parsedResume,
    })
    .returning();

  await db.insert(analyses).values({
    userId: session.user.id,
    resumeId: resume.id,
    type: "ats_score",
    result: atsScore,
  });

  return NextResponse.json({
    resumeId: resume.id,
    parsedResume,
    atsScore,
    recommendations: result.recommendations,
    remaining: rateLimit.remaining,
  });
}
