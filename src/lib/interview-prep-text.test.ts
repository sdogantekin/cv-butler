import { describe, expect, it } from "vitest";
import type { InterviewPrepResult } from "@/lib/schemas/analysis";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { formatInterviewPrepAsText } from "./interview-prep-text";

const dict = getDictionary("en").dashboard.interviewPrep;

const FULL_PLAN: InterviewPrepResult = {
  interviewer: { summary: "Jane manages the team.", approachTips: ["Ask about the team"] },
  reviewBeforeInterview: ["Review Acme news", "Re-read your resume"],
  likelyQuestions: [
    { question: "Tell me about yourself.", category: "introduction", answerGuidance: "Use a 60-second arc." },
  ],
  questionsToAsk: [{ question: "How is success measured?", why: "Shows focus." }],
  tips: ["Sleep well"],
  researchUsed: { company: true, interviewer: false },
};

describe("formatInterviewPrepAsText", () => {
  it("renders every section with localized headings, in on-screen order", () => {
    const text = formatInterviewPrepAsText(FULL_PLAN, dict);

    const headings = [
      dict.resultTitle,
      dict.aboutInterviewer,
      dict.reviewBefore,
      dict.likelyQuestions,
      dict.questionsToAsk,
      dict.tips,
    ];
    const positions = headings.map((h) => text.indexOf(h));
    expect(positions.every((p) => p >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    expect(text).toContain("1. [Introduction] Tell me about yourself.\n   Use a 60-second arc.");
    expect(text).toContain("2. Re-read your resume");
    expect(text).toContain("- Ask about the team");
  });

  it("omits empty sections like the on-screen display does", () => {
    const text = formatInterviewPrepAsText(
      { ...FULL_PLAN, interviewer: null, reviewBeforeInterview: [], questionsToAsk: [], tips: [] },
      dict,
    );

    expect(text).toContain(dict.likelyQuestions);
    expect(text).not.toContain(dict.aboutInterviewer);
    expect(text).not.toContain(dict.reviewBefore);
    expect(text).not.toContain(dict.questionsToAsk);
    expect(text).not.toContain(dict.tips);
  });

  it("uses the dictionary's language for headings and category labels", () => {
    const de = getDictionary("de").dashboard.interviewPrep;
    const text = formatInterviewPrepAsText(FULL_PLAN, de);

    expect(text).toContain(de.likelyQuestions);
    expect(text).toContain(`[${de.categories.introduction}]`);
  });
});
