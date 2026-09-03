import { getChatModel } from "@/lib/llm/provider";
import { ParsedResumeSchema } from "@/lib/schemas/resume";
import type { GraphStateType } from "../state";

// Data Extraction Node (v1). Structures raw resume text into ParsedResume.
// Parameter type is narrowed to just the field this node reads (rather than
// the full GraphStateType) so it can also be called standalone, outside the
// compiled graph, wherever only extraction (no scoring) is needed — see
// /api/analyze/match-upload.
export async function extractNode(
  state: Pick<GraphStateType, "resumeText">,
): Promise<Partial<GraphStateType>> {
  if (!state.resumeText) {
    return { errors: ["extract: resumeText is required"] };
  }
  try {
    const model = getChatModel().withStructuredOutput(ParsedResumeSchema);
    const parsedResume = await model.invoke(
      `Extract structured resume data (name, contact info, experience, education, skills, languages, location) from the following resume text.

Date normalization: normalize every startDate and endDate to the granularity actually present in the source text — use YYYY-MM-DD if the source gives a full date, YYYY-MM if it gives a month and year, or YYYY if it gives only a year. Never invent a month or day that is not stated in the source text. If a position or program is current/ongoing (e.g. the resume says "Present" or "Current"), set endDate to null rather than using that word literally. Use null for a date field only when it is genuinely absent from the resume text — never as a placeholder for a date you're unsure how to format.

Languages: list any languages and proficiency levels explicitly stated on the resume (e.g. a "Languages" section or line) into the languages field. Leave it as an empty array if none are stated — do not guess a candidate's languages from their name, nationality, or any other proxy.

Location: extract a current city/country into the location field only if explicitly stated (e.g. in the header or contact info). Use null otherwise — do not infer it from a phone number's country code, a company's location, or any other proxy.

Do not fabricate any information (company names, titles, dates, degrees, skills, languages, location, or descriptions) that is not present in the resume text. If a field cannot be determined from the text, use null (or an empty array for list fields) rather than guessing.

Resume text:

${state.resumeText}`,
    );
    return { parsedResume };
  } catch (err) {
    return { errors: [`extract: ${err instanceof Error ? err.message : String(err)}`] };
  }
}
