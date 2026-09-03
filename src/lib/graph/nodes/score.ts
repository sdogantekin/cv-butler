import { z } from "zod";
import { getChatModel } from "@/lib/llm/provider";
import { AtsScoreResultSchema } from "@/lib/schemas/analysis";
import type { ParsedResume } from "@/lib/schemas/resume";
import {
  type AtsCategoryResult,
  computeOverallAtsScore,
  runDeterministicAtsChecks,
} from "@/lib/scoring/ats-checks";
import type { GraphStateType } from "../state";

const DETERMINISTIC_CATEGORY_NAMES = [
  "Contact Information",
  "Section Structure",
  "Date Formatting",
  "Resume Length & Content Depth",
  "Quantified Achievements",
] as const;

const AtsLlmOutputSchema = z.object({
  categoryFeedback: z
    .array(
      z.object({
        name: z.enum(DETERMINISTIC_CATEGORY_NAMES),
        feedback: z.string(),
      }),
    )
    .length(DETERMINISTIC_CATEGORY_NAMES.length),
  keywordRelevance: z.object({
    score: z.number().min(0).max(100),
    feedback: z.string(),
  }),
});

function buildAtsPrompt(resume: ParsedResume, deterministic: AtsCategoryResult[]): string {
  const categorySections = deterministic
    .map((c) => `### ${c.name} (deterministic score: ${c.score}/100)\n${c.findings.map((f) => `- ${f}`).join("\n")}`)
    .join("\n\n");

  return `You are an ATS (Applicant Tracking System) resume auditor. A deterministic rule engine has already scored this resume on 5 objectively-checkable categories and extracted the concrete findings listed below. Your job is NOT to re-score these 5 categories — the numeric scores are final. Your job is:

1. Write a short (1-3 sentence), specific, natural-language feedback message for EACH of the 5 categories below, grounded strictly in the findings listed for that category. Do not invent, assume, or add any fact, number, or claim that is not explicitly present in the findings for that category. Do not contradict the findings. If a finding says something is missing, say so; if the findings show no issues, say so plainly rather than inventing a caveat.

2. Independently score a 6th category, "Keyword & Content Relevance" (0-100), based on your own genuine judgment of the resume content below: does the resume's summary, skills list, and experience descriptions use concrete, industry-relevant, role-appropriate terminology and content (as opposed to vague, generic, or filler language)? This is a judgment call the rule engine cannot make — score and justify it based only on the actual resume content provided, not on the other categories' findings.

## Deterministic findings (already scored — do not re-score these categories)

${categorySections}

## Full parsed resume (for your judgment of Keyword & Content Relevance, and for context)

${JSON.stringify(resume, null, 2)}

## Output requirements
- Provide feedback for exactly these 5 category names, matching them exactly: ${DETERMINISTIC_CATEGORY_NAMES.map((n) => `"${n}"`).join(", ")}.
- Provide a score and feedback for "Keyword & Content Relevance".
- Keep every feedback message concise, specific, and actionable — reference the concrete findings (counts, entry names) rather than generic advice.`;
}

// ATS Scoring Node (v1). Deterministic checks (src/lib/scoring/ats-checks.ts)
// compute 5 objectively-checkable category scores; the LLM only writes
// feedback for those (grounded in the given findings) and independently
// judges the 6th, genuinely-judgment-based category. overallScore is a
// weighted average computed in code, never invented by the LLM.
export async function scoreNode(state: GraphStateType): Promise<Partial<GraphStateType>> {
  if (!state.parsedResume) {
    return { errors: ["score: parsedResume is required"] };
  }
  try {
    const deterministic = runDeterministicAtsChecks(state.parsedResume);
    const model = getChatModel().withStructuredOutput(AtsLlmOutputSchema);
    const llmOutput = await model.invoke(buildAtsPrompt(state.parsedResume, deterministic));

    const categories = deterministic.map((category) => {
      const matched = llmOutput.categoryFeedback.find((f) => f.name === category.name);
      if (!matched) {
        throw new Error(`score: LLM omitted feedback for category "${category.name}"`);
      }
      return { name: category.name, score: category.score, feedback: matched.feedback };
    });
    categories.push({
      name: "Keyword & Content Relevance",
      score: llmOutput.keywordRelevance.score,
      feedback: llmOutput.keywordRelevance.feedback,
    });

    const overallScore = computeOverallAtsScore(categories);
    const atsScore = AtsScoreResultSchema.parse({ overallScore, categories });
    return { atsScore };
  } catch (err) {
    return { errors: [`score: ${err instanceof Error ? err.message : String(err)}`] };
  }
}
