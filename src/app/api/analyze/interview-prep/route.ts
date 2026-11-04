import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db";
import { resumes, analyses } from "@/db/schema";
import {
  ResumeUploadSchema,
  JdMatchRequestSchema,
  InterviewPrepRequestSchema,
} from "@/lib/schemas/upload";
import { ParsedResumeSchema } from "@/lib/schemas/resume";
import { InterviewPrepResultSchema } from "@/lib/schemas/analysis";
import { checkAndConsumeAction } from "@/lib/rate-limit";
import { extractResumeText } from "@/lib/parsers/resume-file";
import { extractNode } from "@/lib/graph/nodes/extract";
import { interviewPrepGraph } from "@/lib/graph/interview";
import { getLocale } from "@/lib/i18n/locale-cookie";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { errorResponse } from "@/lib/api-errors";

// Thin route: auth -> validate -> rate-limit -> extract -> interview graph ->
// persist -> respond. Mirrors /api/analyze/cover-letter: the extract node
// runs standalone, and the multi-agent interview graph is invoked once, so
// the whole run bills a single daily action.
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
  const interviewerDetailsField = formData.get("interviewerDetails");

  const upload = ResumeUploadSchema.safeParse({
    mimeType: file.type,
    filename: file.name,
    size: file.size,
  });
  if (!upload.success) {
    return errorResponse(dict, upload.error.issues[0]?.message, 400);
  }
  const jd = JdMatchRequestSchema.shape.jobDescriptionText.safeParse(
    typeof jobDescriptionTextField === "string" ? jobDescriptionTextField : undefined,
  );
  if (!jd.success) {
    return errorResponse(dict, jd.error.issues[0]?.message, 400);
  }
  const interviewer = InterviewPrepRequestSchema.shape.interviewerDetails.safeParse(
    typeof interviewerDetailsField === "string" ? interviewerDetailsField : undefined,
  );
  if (!interviewer.success) {
    return errorResponse(dict, interviewer.error.issues[0]?.message, 400);
  }

  const rateLimit = await checkAndConsumeAction(session.user.id, "interview_prep");
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

  const jobDescriptionText = jd.data;
  const run = await interviewPrepGraph.invoke({
    parsedResume,
    jobDescriptionText,
    interviewerText: interviewer.data ?? null,
    locale,
  });
  if (!run.result) {
    return errorResponse(dict, "interview_prep_failed", 502, { details: run.errors });
  }
  const interviewPrep = InterviewPrepResultSchema.parse(run.result);

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
    type: "interview_prep",
    jobDescriptionText,
    result: interviewPrep,
  });

  return NextResponse.json({
    resumeId: resume.id,
    interviewPrep,
    remaining: rateLimit.remaining,
  });
}
