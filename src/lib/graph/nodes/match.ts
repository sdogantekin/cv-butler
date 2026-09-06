import { z } from "zod";
import { getChatModel } from "@/lib/llm/provider";
import { JdMatchResultSchema } from "@/lib/schemas/analysis";
import type { ParsedResume } from "@/lib/schemas/resume";
import { type CompanySearchResult, searchCompanyInfo } from "@/lib/search/company-search";
import { type KeywordOverlapResult, computeKeywordOverlap } from "@/lib/scoring/keyword-overlap";
import { applyHardConstraintCap, computeOverallMatchScore } from "@/lib/scoring/match-weighting";
import type { GraphStateType } from "../state";

const JdMatchLlmOutputSchema = z.object({
  dimensions: z
    .array(
      z.object({
        name: z.enum([
          "Skills",
          "Experience",
          "Education",
          "Domain Fit",
          "Seniority Fit",
          "Culture Fit",
        ]),
        score: z.number().min(0).max(100),
        gaps: z.array(z.string()),
      }),
    )
    .length(6),
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
  companyName: string | null,
  companySearch: CompanySearchResult | null,
): string {
  const companySearchSection = companySearch
    ? `
## Grounding evidence: web search about "${companyName}" (for reference only, not the final word — a generic company-level result may not reflect this specific role or team; weigh it accordingly and never treat it as more authoritative than explicit statements in the job description or resume)

${companySearch.answer ? `Summary: ${companySearch.answer}\n` : ""}${
        companySearch.snippets.length > 0
          ? `Excerpts:\n${companySearch.snippets.map((s) => `- ${s}`).join("\n")}`
          : ""
      }
`
    : "";

  return `You are a job-fit analyst comparing a candidate's resume against a specific job description. Score the candidate's fit across exactly 6 dimensions — Skills, Experience, Education, Domain Fit, Seniority Fit, and Culture Fit — each 0-100, with a list of concrete gaps for each.

Use genuine semantic judgment, not literal keyword matching: a candidate can satisfy a requirement through relevant experience or synonymous terminology even if the exact keyword from the job description doesn't appear in their skills list, and conversely listing a skill doesn't guarantee real proficiency if nothing in their experience supports it. That said, stay factually grounded — every gap you list must be traceable to something actually missing or weak in the resume relative to the job description; do not invent requirements that are not stated or implied in the job description, and do not invent resume content that isn't there.

For the two new judgment dimensions:
- **Domain Fit**: how well the candidate's actual industry/domain background (inferred from their employers, projects, and experience descriptions) matches the industry/domain implied by the job description (e.g. fintech, healthcare, e-commerce, gaming). Judge only from what the JD and resume actually say or clearly imply about domain — never assume a domain from a company name alone if the resume/JD text doesn't describe what that company does.
- **Seniority Fit**: whether the candidate's apparent career level (years of experience, scope of responsibility, title trajectory shown in the resume) matches the level the job description asks for (e.g. "senior", "staff", "5+ years", individual-contributor vs. "leads a team of X"). Flag both under-leveled and over-leveled mismatches as gaps.

For Culture Fit specifically, be conservative: compare EXPLICIT signals only. On the job-description side, that means things it actually states — remote/hybrid/onsite policy, team size, pace/environment descriptions ("fast-paced startup", "established enterprise", "async-first"). On the candidate side, that means explicit equivalents actually present in the resume — stated remote-work experience, past employer type or size, similar environment descriptions. If the job description states nothing relevant about work mode/culture, or the resume gives nothing explicit to compare it against, do not guess — score it neutrally (around 50) with an empty gaps array rather than inventing an opinion.${
    companySearch
      ? " A web search excerpt about the company is provided below as additional grounding evidence for this dimension only — use it strictly as supporting context alongside the JD/resume signals above, never as a substitute for them, and never state something as fact about this specific role or team based solely on generic company-level search results."
      : ""
  }

Separately, scan the job description for any EXPLICIT language-proficiency or location/residency requirements (e.g. "German C1", "must be based in EMEA", "on-site in Berlin"). For each one you find, compare it against the candidate's languages/location fields below and report whether it is met. Return an empty hardConstraints array if the job description states none — never invent a constraint that isn't actually there. Do NOT attempt to evaluate work authorization, citizenship, or visa status — that is out of scope; do not infer it from any field.

## Grounding evidence: literal keyword overlap (computed deterministically, for reference only — not the final word on skill match, since it only catches exact-text matches)

Skills from the candidate's resume that literally appear in the job description text: ${overlap.matchedSkills.join(", ") || "(none)"}
Skills from the candidate's resume that do NOT literally appear in the job description text: ${overlap.unmatchedSkills.join(", ") || "(none)"}
${companySearchSection}
## Candidate resume (parsed)

${JSON.stringify(resume, null, 2)}

## Job description

${jobDescriptionText}

## Output requirements
- Provide exactly 6 dimensions named "Skills", "Experience", "Education", "Domain Fit", "Seniority Fit", and "Culture Fit". For each, give a 0-100 score and a list of specific, concrete gaps (empty array if none) — each gap should name the specific missing/weak skill, experience type, qualification, domain mismatch, seniority mismatch, or culture/work-mode mismatch, not a generic statement.
- Provide hardConstraints only for language/location requirements explicitly stated in the job description, with a brief grounded note for each.`;
}

// Matcher Node (v1). The LLM does the real semantic matching for the 6
// dimensions (informed by a deterministic keyword-overlap signal, and
// optionally an opt-in web search about the target company for Culture
// Fit); language/location requirements are extracted as a separate
// hardConstraints list. overallScore is computed in code: a weighted
// average of the dimensions, capped low if any hard constraint is unmet.
export async function matchNode(state: GraphStateType): Promise<Partial<GraphStateType>> {
  if (!state.parsedResume || !state.jobDescriptionText) {
    return { errors: ["match: parsedResume and jobDescriptionText are required"] };
  }
  try {
    const overlap = computeKeywordOverlap(state.parsedResume, state.jobDescriptionText);
    const companySearch = state.companyName ? await searchCompanyInfo(state.companyName) : null;
    const model = getChatModel().withStructuredOutput(JdMatchLlmOutputSchema);
    const { dimensions, hardConstraints } = await model.invoke(
      buildMatchPrompt(
        state.parsedResume,
        state.jobDescriptionText,
        overlap,
        state.companyName,
        companySearch,
      ),
    );

    const overallScore = applyHardConstraintCap(computeOverallMatchScore(dimensions), hardConstraints);
    const jdMatch = JdMatchResultSchema.parse({ overallScore, dimensions, hardConstraints });
    return { jdMatch };
  } catch (err) {
    return { errors: [`match: ${err instanceof Error ? err.message : String(err)}`] };
  }
}
