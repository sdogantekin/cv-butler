import { z } from "zod";
import { getChatModel } from "@/lib/llm/provider";
import { CoverLetterResultSchema, type CoverLetterResult } from "@/lib/schemas/analysis";
import type { ParsedResume } from "@/lib/schemas/resume";

const CopywriterLlmOutputSchema = z.object({
  letterText: z.string(),
});

// Condensed from github.com/blader/humanizer (MIT licensed) — adapted into
// the prompt itself per CLAUDE.md/requirements.md 6.4, not taken as a
// runtime dependency (the skill is built for interactive rewrite sessions,
// not a callable generation step). Trimmed to the patterns that matter when
// generating a short letter from scratch; rewrite-specific ones (curly
// quotes, decorative headings, "writing about the previous version") are
// dropped since there's no prior draft to inherit them from.
const HUMANIZER_GUIDANCE = `Write in a natural, human voice. Avoid these common AI-writing tells:

- Never use "not just X, it's Y" or "not only X, but Y" constructions, or split the same contrast across two sentences ("This isn't about X. It's about Y.").
- No one-line dramatic closers that just restate the point ("That's the difference.", "Let that sink in.").
- No staged run-up openers ("I'm excited to share...", "Let me tell you why...").
- No forced groups of three (three adjectives, three examples) unless the content genuinely has three distinct, necessary parts.
- No em dashes or en dashes as a universal connector — use a period, comma, or parentheses instead.
- Avoid these overused AI words entirely: actually, additionally, align with, bolstered, crucial, deep dive, delve, emphasizing, enduring, enhance, fostering, garner, highlight (as a verb), interplay, intricate, key (as an adjective), landscape (abstract), meticulous, pivotal, quietly, robust (unless technical), showcase, tapestry (abstract), testament, underscore (as a verb), valuable, vibrant.
- No inflated-significance phrasing ("stands as a testament to", "marks a pivotal moment", "a step in the right direction").
- No sales/marketing language ("boasts", "renowned", "breathtaking", "nestled", "diverse array").
- Prefer simple verbs: "is/are/has" instead of "serves as/boasts/features/represents".
- No bolded words or bulleted lists with labels — this is a letter, written in full prose paragraphs.
- Vary sentence length and structure; do not start consecutive sentences with the same subject.
- No chatbot-style openers or closers ("I hope this helps", "Great question"), and no generic uplifting send-off ("I look forward to bringing my passion and dedication to your team") — end on something specific instead.

Write like a specific person addressing a specific role, not a template.`;

function buildCopywriterPrompt(resume: ParsedResume, jobDescriptionText: string | null): string {
  const variantInstructions = jobDescriptionText
    ? `Write a TARGETED cover letter for the specific role described in the job description below. Reference the company name, the role title, and specific stated requirements from that job description where the candidate's actual background genuinely supports them.`
    : `Write a GENERAL cover letter — no specific job description was provided. Write it as a professional introduction of the candidate that could open a conversation about relevant roles, without inventing a specific company or job title to address.`;

  return `You are a professional cover-letter writer helping a job candidate. ${variantInstructions}

${HUMANIZER_GUIDANCE}

CRITICAL constraint: every name, company, title, number, date, or achievement you mention must come directly from the candidate's resume data below. Never invent, estimate, or embellish a fact to sound more impressive. If the job description asks for something the resume doesn't show, you may write around that gap in general terms, but never fabricate specific evidence for it.

Write 3-4 paragraphs, roughly 250-400 words total: an opening establishing interest and fit, one or two body paragraphs connecting specific resume experience to what the role needs, and a closing. Use a standard greeting and sign-off appropriate for a letter (e.g. "Dear Hiring Manager," and the candidate's own name from the resume as the signature) — these are letter conventions, not the AI tells described above.

## Candidate resume (parsed)

${JSON.stringify(resume, null, 2)}
${
  jobDescriptionText
    ? `
## Job description

${jobDescriptionText}`
    : ""
}`;
}

// Copywriter Node (v2). Not part of the compiled StateGraph — a cover letter
// isn't consumed by recommendNode, so this is invoked standalone from its
// own route, the same way matchDiffNode is for the compare-resume flow.
export async function copywriterNode(input: {
  parsedResume: ParsedResume;
  jobDescriptionText: string | null;
}): Promise<{ coverLetter: CoverLetterResult } | { errors: string[] }> {
  try {
    const model = getChatModel().withStructuredOutput(CopywriterLlmOutputSchema);
    const { letterText } = await model.invoke(
      buildCopywriterPrompt(input.parsedResume, input.jobDescriptionText),
    );
    const coverLetter = CoverLetterResultSchema.parse({
      variant: input.jobDescriptionText ? "targeted" : "general",
      letterText,
    });
    return { coverLetter };
  } catch (err) {
    return { errors: [`copywriter: ${err instanceof Error ? err.message : String(err)}`] };
  }
}
