import { z } from "zod";

export const SUPPORTED_RESUME_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
] as const;

const MAX_RESUME_FILE_BYTES = 10 * 1024 * 1024; // 10MB

// Legacy binary .doc (application/msword) is intentionally rejected: there is
// no good npm-native parser for it, unlike modern .docx (via mammoth).
export const ResumeUploadSchema = z.object({
  mimeType: z.enum(SUPPORTED_RESUME_MIME_TYPES, {
    error: "Only PDF and .docx resumes are supported (no scanned PDFs or legacy .doc).",
  }),
  filename: z.string().min(1),
  size: z
    .number()
    .positive()
    .max(MAX_RESUME_FILE_BYTES, "Resume file must be 10MB or smaller."),
});

export const JdMatchRequestSchema = z.object({
  resumeId: z.string().uuid(),
  jobDescriptionText: z.string().min(1).max(20_000),
  // Optional. Blank/whitespace-only input normalizes to undefined so the
  // match node treats it as "no company name" (skips Tavily enrichment)
  // rather than searching for an empty string.
  companyName: z
    .string()
    .trim()
    .max(200)
    .optional()
    .transform((v) => (v ? v : undefined)),
});
