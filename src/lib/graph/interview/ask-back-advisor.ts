import { z } from "zod";
import { getChatModel } from "@/lib/llm/provider";
import { QuestionToAskSchema } from "@/lib/schemas/analysis";
import { buildOutputLanguageInstruction } from "../nodes/output-language";
import { buildSharedContext } from "./brief";
import type { InterviewStateType } from "./state";

const AskBackLlmOutputSchema = z.object({
  questionsToAsk: z.array(QuestionToAskSchema),
});

// Interview Prep agent 2d: thoughtful questions for the candidate to ask.
export async function askBackAdvisorNode(state: InterviewStateType): Promise<Partial<InterviewStateType>> {
  try {
    const model = getChatModel().withStructuredOutput(AskBackLlmOutputSchema);
    const interviewerRole = state.brief?.interviewer?.role;
    const { questionsToAsk } = await model.invoke(`You are an interview coach. Suggest the questions this candidate should ask the interviewer at the end of the interview.

Write 5-6 questions, each with a one-sentence "why" explaining what asking it signals or what the candidate learns from the answer. Make them specific to this role and company (team, expectations in the first months, how success is measured, the biggest challenges, growth), not generic questions that fit any job.${
      interviewerRole
        ? ` The interviewer's role is "${interviewerRole}": include at least one question that suits someone in that role.`
        : ""
    }

Never state facts about the company that are not in the job description or the web search results; phrase anything uncertain as a question.

${buildSharedContext(state)}

${buildOutputLanguageInstruction(state.locale)}`);
    return { questionsToAsk };
  } catch (err) {
    return { errors: [`askBackAdvisor: ${err instanceof Error ? err.message : String(err)}`] };
  }
}
