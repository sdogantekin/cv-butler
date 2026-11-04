import { InterviewPrepResultSchema } from "@/lib/schemas/analysis";
import type { InterviewStateType } from "./state";

// Not an LLM agent: merges the specialists' sections and validates the whole
// result. Only likelyQuestions is required — if another agent failed, its
// section is simply empty and the UI hides it. Without questions there is no
// result, and the route reports a generation failure.
export async function compileNode(state: InterviewStateType): Promise<Partial<InterviewStateType>> {
  const parsed = InterviewPrepResultSchema.safeParse({
    interviewer: state.interviewer,
    reviewBeforeInterview: state.reviewBeforeInterview,
    likelyQuestions: state.likelyQuestions,
    questionsToAsk: state.questionsToAsk,
    tips: state.tips,
    researchUsed: {
      company: state.companyResearch !== null,
      interviewer: state.interviewerResearch !== null,
    },
  });
  if (!parsed.success) {
    return { errors: [`compile: ${parsed.error.issues[0]?.message ?? "invalid interview prep result"}`] };
  }
  return { result: parsed.data };
}
