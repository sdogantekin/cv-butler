import { NextResponse } from "next/server";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

// Every localized error an API route can return. Zod schemas (see
// src/lib/schemas/upload.ts) use these codes directly as their validation
// `message`/`error`, so a failed check already carries the right code —
// routes never construct or forward raw English text.
export const API_ERROR_CODES = [
  "unauthorized",
  "missing_resume_file",
  "invalid_resume_file",
  "unsupported_file_type",
  "file_too_large",
  "invalid_job_description",
  "invalid_company_name",
  "invalid_request",
  "resume_not_found",
  "daily_limit_reached",
  "invalid_previous_match",
  "resume_parsing_failed",
  "analysis_failed",
  "comparison_failed",
  "generation_failed",
] as const;

export type ApiErrorCode = (typeof API_ERROR_CODES)[number];

function isApiErrorCode(value: unknown): value is ApiErrorCode {
  return typeof value === "string" && (API_ERROR_CODES as readonly string[]).includes(value);
}

// Builds a localized NextResponse for a route error. `code` is typically a
// Zod issue's `.message` (an ApiErrorCode string, or occasionally undefined
// if a check somehow has no message) as well as our own literal codes —
// anything that isn't a recognized code falls back to "invalid_request"
// rather than ever leaking raw validation text to the client.
export function errorResponse(
  dict: Dictionary,
  code: ApiErrorCode | string | undefined,
  status: number,
  extra?: Record<string, unknown>,
) {
  const resolved = isApiErrorCode(code) ? code : "invalid_request";
  return NextResponse.json({ error: dict.errors[resolved], ...extra }, { status });
}
