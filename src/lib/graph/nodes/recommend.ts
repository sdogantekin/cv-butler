import { z } from "zod";
import { getChatModel } from "@/lib/llm/provider";
import { RecommendationSchema } from "@/lib/schemas/analysis";
import type { GraphStateType } from "../state";

const RecommendationsOutputSchema = z.object({
  recommendations: z.array(RecommendationSchema),
});

// Recommendation Node (v1). Analyzes ATS-score and/or JD-match output to
// produce actionable, human-readable improvement suggestions.
export async function recommendNode(state: GraphStateType): Promise<Partial<GraphStateType>> {
  if (!state.atsScore && !state.jdMatch) {
    return { errors: ["recommend: at least one of atsScore or jdMatch is required"] };
  }
  try {
    const model = getChatModel().withStructuredOutput(RecommendationsOutputSchema);
    const { recommendations } = await model.invoke(
      `Based on the following ATS score and/or job-match analysis, generate specific, actionable improvement recommendations.

Each recommendation must reference concrete details from the analysis below (specific category names, specific gaps, specific findings) rather than generic career advice that could apply to any resume. Avoid vague filler phrasing (e.g. "make your resume stand out", "highlight your strengths") — state exactly what to change and why, tied to the actual scores/gaps given.

If the job match analysis includes any hardConstraints entry with met: false, that must be your FIRST recommendation — an unmet language or location requirement can be a hard blocker regardless of how good the skills/experience fit is, so it should not be buried among generic suggestions.

ATS score:
${JSON.stringify(state.atsScore)}

Job match:
${JSON.stringify(state.jdMatch)}`,
    );
    return { recommendations };
  } catch (err) {
    return { errors: [`recommend: ${err instanceof Error ? err.message : String(err)}`] };
  }
}
