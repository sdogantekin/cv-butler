import { z } from "zod";
import { getChatModel } from "@/lib/llm/provider";
import { buildOutputLanguageInstruction } from "../nodes/output-language";
import { buildSharedContext } from "./brief";
import type { InterviewStateType } from "./state";

const PrepPlanLlmOutputSchema = z.object({
  reviewBeforeInterview: z.array(z.string()),
  tips: z.array(z.string()),
});

// Interview Prep agent 2b: what to review beforehand, plus general tips.
export async function prepPlannerNode(state: InterviewStateType): Promise<Partial<InterviewStateType>> {
  try {
    const model = getChatModel().withStructuredOutput(PrepPlanLlmOutputSchema);
    const { reviewBeforeInterview, tips } = await model.invoke(`You are an interview coach. Write a preparation plan for this candidate and role.

Write:
- reviewBeforeInterview: 4-6 specific things the candidate should review before the interview, one line each. Cover the company (use the web search results where available, and never present anything not in them as a fact about the company), the strongest resume experiences that match the top requirements, the requirements the resume shows gaps in (a refresher on the basics), and the resume itself (be ready to explain every line and date).
- tips: 4-6 additional practical tips tailored to this role and candidate (for example how to handle a specific gap, logistics, or how to structure answers). Avoid generic filler that would fit any interview.

Never state specific facts about the company that are not in the job description or the web search results.

${buildSharedContext(state)}

${buildOutputLanguageInstruction(state.locale)}`);
    return { reviewBeforeInterview, tips };
  } catch (err) {
    return { errors: [`prepPlanner: ${err instanceof Error ? err.message : String(err)}`] };
  }
}
