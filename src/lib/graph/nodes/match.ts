import { z } from "zod";
import { getChatModel } from "@/lib/llm/provider";
import { JdMatchResultSchema } from "@/lib/schemas/analysis";
import type { ParsedResume } from "@/lib/schemas/resume";
import { type KeywordOverlapResult, computeKeywordOverlap } from "@/lib/scoring/keyword-overlap";
import { applyHardConstraintCap, computeOverallMatchScore } from "@/lib/scoring/match-weighting";
import type { GraphStateType } from "../state";

const JdMatchLlmOutputSchema = z.object({
  dimensions: z
    .array(
      z.object({
        name: z.enum(["Skills", "Experience", "Education"]),
        score: z.number().min(0).max(100),
        gaps: z.array(z.string()),
      }),
    )
    .length(3),
  hardConstraints: z.array(
    z.object({
      type: z.enum(["language", "location"]),
      requirement: z.string(),
      met: z.boolean(),
      note: z.string(),
    }),
  ),
});

function buildMatchPrompt(
  resume: ParsedResume,
  jobDescriptionText: string,
  overlap: KeywordOverlapResult,
): string {
  return `You are a job-fit analyst comparing a candidate's resume against a specific job description. Score the candidate's fit across exactly 3 dimensions — Skills, Experience, and Education — each 0-100, with a list of concrete gaps for each.

Use genuine semantic judgment, not literal keyword matching: a candidate can satisfy a requirement through relevant experience or synonymous terminology even if the exact keyword from the job description doesn't appear in their skills list, and conversely listing a skill doesn't guarantee real proficiency if nothing in their experience supports it. That said, stay factually grounded — every gap you list must be traceable to something actually missing or weak in the resume relative to the job description; do not invent requirements that are not stated or implied in the job description, and do not invent resume content that isn't there.

Separately, scan the job description for any EXPLICIT language-proficiency or location/residency requirements (e.g. "German C1", "must be based in EMEA", "on-site in Berlin"). For each one you find, compare it against the candidate's languages/location fields below and report whether it is met. Return an empty hardConstraints array if the job description states none — never invent a constraint that isn't actually there. Do NOT attempt to evaluate work authorization, citizenship, or visa status — that is out of scope; do not infer it from any field.

## Grounding evidence: literal keyword overlap (computed deterministically, for reference only — not the final word on skill match, since it only catches exact-text matches)

Skills from the candidate's resume that literally appear in the job description text: ${overlap.matchedSkills.join(", ") || "(none)"}
Skills from the candidate's resume that do NOT literally appear in the job description text: ${overlap.unmatchedSkills.join(", ") || "(none)"}

## Candidate resume (parsed)

${JSON.stringify(resume, null, 2)}

## Job description

${jobDescriptionText}

## Output requirements
- Provide exactly 3 dimensions named "Skills", "Experience", and "Education". For each, give a 0-100 score and a list of specific, concrete gaps (empty array if none) — each gap should name the specific missing/weak skill, experience type, or qualification, not a generic statement.
- Provide hardConstraints only for language/location requirements explicitly stated in the job description, with a brief grounded note for each.`;
}

// Matcher Node (v1). The LLM does the real semantic matching for the 3
// dimensions (informed by a deterministic keyword-overlap signal); language/
// location requirements are extracted as a separate hardConstraints list.
// overallScore is computed in code: a weighted average of the dimensions,
// capped low if any hard constraint is unmet.
export async function matchNode(state: GraphStateType): Promise<Partial<GraphStateType>> {
  if (!state.parsedResume || !state.jobDescriptionText) {
    return { errors: ["match: parsedResume and jobDescriptionText are required"] };
  }
  try {
    const overlap = computeKeywordOverlap(state.parsedResume, state.jobDescriptionText);
    const model = getChatModel().withStructuredOutput(JdMatchLlmOutputSchema);
    const { dimensions, hardConstraints } = await model.invoke(
      buildMatchPrompt(state.parsedResume, state.jobDescriptionText, overlap),
    );

    const overallScore = applyHardConstraintCap(computeOverallMatchScore(dimensions), hardConstraints);
    const jdMatch = JdMatchResultSchema.parse({ overallScore, dimensions, hardConstraints });
    return { jdMatch };
  } catch (err) {
    return { errors: [`match: ${err instanceof Error ? err.message : String(err)}`] };
  }
}
