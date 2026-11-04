import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ParsedResume } from "@/lib/schemas/resume";

const PARSED_RESUME: ParsedResume = {
  fullName: "Ada Lovelace",
  email: null,
  phone: null,
  summary: null,
  experience: [],
  education: [],
  skills: ["TypeScript"],
  languages: [],
  location: null,
};

// Responses keyed by which agent's prompt is being invoked. Each agent's
// prompt opens with a distinctive role sentence, so matching on it lets this
// mock the LLM boundary only, with the real graph wiring running unchanged.
const BRIEF = {
  companyName: "Acme",
  roleTitle: "Engineer",
  topRequirements: ["TypeScript"],
  candidateStrengths: ["TypeScript"],
  gaps: ["Kubernetes"],
  interviewFocus: ["System design"],
  interviewer: { name: "Jane Doe", role: "Engineering Manager", company: "Acme" },
};
const RESPONSES: Record<string, unknown> = {
  "interview-preparation analyst": BRIEF,
  "understand the person who will interview": { summary: "Jane manages the team.", approachTips: ["Ask about the team"] },
  "Write a preparation plan": { reviewBeforeInterview: ["Review Acme news"], tips: ["Sleep well"] },
  "Write the questions this candidate": {
    likelyQuestions: [{ question: "Tell me about yourself.", category: "introduction", answerGuidance: "Use a 60-second arc." }],
  },
  "questions this candidate should ask": { questionsToAsk: [{ question: "How is success measured?", why: "Shows focus." }] },
};

const failing = new Set<string>();
const invoked: string[] = [];

vi.mock("@/lib/llm/provider", () => ({
  getChatModel: () => ({
    withStructuredOutput: () => ({
      invoke: async (prompt: string) => {
        const key = Object.keys(RESPONSES).find((k) => prompt.includes(k));
        if (!key) throw new Error("unexpected prompt");
        invoked.push(key);
        if (failing.has(key)) throw new Error(`${key} failed`);
        return RESPONSES[key];
      },
    }),
  }),
}));

const researchCompanyMock = vi.fn();
const researchInterviewerMock = vi.fn();
vi.mock("@/lib/search/interview-research", () => ({
  researchCompanyForInterview: (...args: unknown[]) => researchCompanyMock(...args),
  researchInterviewer: (...args: unknown[]) => researchInterviewerMock(...args),
}));

const { interviewPrepGraph } = await import("./graph");

const baseInput = {
  parsedResume: PARSED_RESUME,
  jobDescriptionText: "We need a TypeScript engineer at Acme.",
  locale: "en" as const,
};

beforeEach(() => {
  failing.clear();
  invoked.length = 0;
  researchCompanyMock.mockReset().mockResolvedValue({ answer: "Acme makes widgets.", snippets: [] });
  researchInterviewerMock.mockReset().mockResolvedValue({ answer: "Jane leads a team.", snippets: [] });
});

describe("interviewPrepGraph", () => {
  it("runs all agents and compiles a complete result when interviewer details are given", async () => {
    const out = await interviewPrepGraph.invoke({ ...baseInput, interviewerText: "Jane Doe, Engineering Manager" });

    expect(out.errors).toEqual([]);
    expect(out.result).toEqual({
      interviewer: { summary: "Jane manages the team.", approachTips: ["Ask about the team"] },
      reviewBeforeInterview: ["Review Acme news"],
      likelyQuestions: [
        { question: "Tell me about yourself.", category: "introduction", answerGuidance: "Use a 60-second arc." },
      ],
      questionsToAsk: [{ question: "How is success measured?", why: "Shows focus." }],
      tips: ["Sleep well"],
      researchUsed: { company: true, interviewer: true },
    });
    expect(researchCompanyMock).toHaveBeenCalledWith("Acme");
    expect(researchInterviewerMock).toHaveBeenCalledWith(BRIEF.interviewer);
  });

  it("skips the interviewer agent and lookup when no interviewer details were given", async () => {
    const out = await interviewPrepGraph.invoke({ ...baseInput, interviewerText: null });

    expect(out.result?.interviewer).toBeNull();
    expect(out.result?.researchUsed).toEqual({ company: true, interviewer: false });
    expect(researchInterviewerMock).not.toHaveBeenCalled();
    expect(invoked).not.toContain("understand the person who will interview");
  });

  it("still returns a result, with that section empty, when a non-required agent fails", async () => {
    failing.add("questions this candidate should ask");
    const out = await interviewPrepGraph.invoke({ ...baseInput, interviewerText: null });

    expect(out.result?.questionsToAsk).toEqual([]);
    expect(out.result?.likelyQuestions).toHaveLength(1);
    expect(out.errors.join(" ")).toContain("askBackAdvisor");
  });

  it("returns no result when the required question agent fails", async () => {
    failing.add("Write the questions this candidate");
    const out = await interviewPrepGraph.invoke({ ...baseInput, interviewerText: null });

    expect(out.result).toBeNull();
    expect(out.errors.join(" ")).toContain("questionCoach");
  });

  it("ends early without running any other agent when the analyst fails", async () => {
    failing.add("interview-preparation analyst");
    const out = await interviewPrepGraph.invoke({ ...baseInput, interviewerText: null });

    expect(out.result).toBeNull();
    expect(invoked).toEqual(["interview-preparation analyst"]);
    expect(researchCompanyMock).not.toHaveBeenCalled();
  });

  it("degrades to no research flags when lookups return nothing", async () => {
    researchCompanyMock.mockResolvedValue(null);
    researchInterviewerMock.mockResolvedValue(null);
    const out = await interviewPrepGraph.invoke({ ...baseInput, interviewerText: "Jane Doe" });

    expect(out.result?.researchUsed).toEqual({ company: false, interviewer: false });
  });
});
