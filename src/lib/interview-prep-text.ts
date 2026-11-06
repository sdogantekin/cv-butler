import type { InterviewPrepResult } from "@/lib/schemas/analysis";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

// Plain-text (Markdown-flavoured) version of an interview plan, for the Copy
// button. Mirrors the on-screen section order and hides empty sections the
// same way InterviewPrepDisplay does, with headings from the user's locale.
export function formatInterviewPrepAsText(
  plan: InterviewPrepResult,
  dict: Dictionary["dashboard"]["interviewPrep"],
): string {
  const blocks: string[] = [`# ${dict.resultTitle}`];

  if (plan.interviewer) {
    const lines = [`## ${dict.aboutInterviewer}`, plan.interviewer.summary];
    if (plan.interviewer.approachTips.length > 0) {
      lines.push("", `${dict.approachInterviewer}:`, ...plan.interviewer.approachTips.map((t) => `- ${t}`));
    }
    blocks.push(lines.join("\n"));
  }

  if (plan.reviewBeforeInterview.length > 0) {
    blocks.push(
      [`## ${dict.reviewBefore}`, ...plan.reviewBeforeInterview.map((item, i) => `${i + 1}. ${item}`)].join("\n"),
    );
  }

  blocks.push(
    [
      `## ${dict.likelyQuestions}`,
      ...plan.likelyQuestions.map(
        (q, i) => `${i + 1}. [${dict.categories[q.category]}] ${q.question}\n   ${q.answerGuidance}`,
      ),
    ].join("\n"),
  );

  if (plan.questionsToAsk.length > 0) {
    blocks.push(
      [`## ${dict.questionsToAsk}`, ...plan.questionsToAsk.map((q, i) => `${i + 1}. ${q.question}\n   ${q.why}`)].join(
        "\n",
      ),
    );
  }

  if (plan.tips.length > 0) {
    blocks.push([`## ${dict.tips}`, ...plan.tips.map((t) => `- ${t}`)].join("\n"));
  }

  return blocks.join("\n\n") + "\n";
}
