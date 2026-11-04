import { Annotation } from "@langchain/langgraph";
import type { ParsedResume } from "@/lib/schemas/resume";
import type { InterviewPrepResult } from "@/lib/schemas/analysis";
import type { CompanySearchResult } from "@/lib/search/company-search";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locales";
import type { InterviewBrief } from "./brief";

// Same explicit-null-default pattern as the main graph's state.ts, so every
// key is always present in state/output.
function overwritable<T>(initial: () => T) {
  return Annotation<T>({
    reducer: (_current: T, update: T) => update,
    default: initial,
  });
}

// Shared state for the interview-prep workflow (v4). Inputs are set at
// invoke() time; each agent writes only its own section, so the four
// parallel specialists never touch the same keys.
export const InterviewState = Annotation.Root({
  locale: overwritable<Locale>(() => DEFAULT_LOCALE),
  parsedResume: overwritable<ParsedResume | null>(() => null),
  jobDescriptionText: overwritable<string | null>(() => null),
  interviewerText: overwritable<string | null>(() => null),

  brief: overwritable<InterviewBrief | null>(() => null),
  companyResearch: overwritable<CompanySearchResult | null>(() => null),
  interviewerResearch: overwritable<CompanySearchResult | null>(() => null),

  interviewer: overwritable<InterviewPrepResult["interviewer"]>(() => null),
  reviewBeforeInterview: overwritable<string[]>(() => []),
  tips: overwritable<string[]>(() => []),
  likelyQuestions: overwritable<InterviewPrepResult["likelyQuestions"]>(() => []),
  questionsToAsk: overwritable<InterviewPrepResult["questionsToAsk"]>(() => []),

  result: overwritable<InterviewPrepResult | null>(() => null),
  errors: Annotation<string[]>({
    reducer: (existing, update) => existing.concat(update),
    default: () => [],
  }),
});

export type InterviewStateType = typeof InterviewState.State;
