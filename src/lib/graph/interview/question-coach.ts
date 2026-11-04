import { z } from "zod";
import { getChatModel } from "@/lib/llm/provider";
import { INTERVIEW_QUESTION_CATEGORIES, InterviewQuestionSchema } from "@/lib/schemas/analysis";
import { buildOutputLanguageInstruction } from "../nodes/output-language";
import { buildSharedContext } from "./brief";
import type { InterviewStateType } from "./state";

const QuestionCoachLlmOutputSchema = z.object({
  likelyQuestions: z.array(InterviewQuestionSchema),
});

// Interview Prep agent 2c: likely questions with suggested answers. The only
// agent whose output is required — without questions there is no plan.
export async function questionCoachNode(state: InterviewStateType): Promise<Partial<InterviewStateType>> {
  try {
    const model = getChatModel().withStructuredOutput(QuestionCoachLlmOutputSchema);
    const { likelyQuestions } = await model.invoke(`You are an interview coach. Write the questions this candidate is most likely to be asked for this role, each with guidance for answering it.

Write 7-9 questions. Start with the classic opener ("Tell me about yourself", category "introduction"), then mix behavioral, role-specific (probing the top requirements and the interview focus, including at least one on the biggest gap), motivation ("why this company/role"), and situational questions. The category field must be exactly one of: ${INTERVIEW_QUESTION_CATEGORIES.join(", ")}.

answerGuidance is 1-3 sentences telling the candidate HOW to answer using THEIR OWN background: which resume experience to draw on and the structure to use (for example STAR).

CRITICAL constraint: every company, title, number, date, or achievement you mention in answerGuidance must come directly from the candidate's resume data below. Never invent or estimate a fact. Where the resume does not support a strong answer (a gap), do not make up evidence: tell the candidate to prepare a real example, and suggest how to be honest about the gap while showing willingness and related experience.

${buildSharedContext(state)}

${buildOutputLanguageInstruction(state.locale)}`);
    return { likelyQuestions };
  } catch (err) {
    return { errors: [`questionCoach: ${err instanceof Error ? err.message : String(err)}`] };
  }
}
