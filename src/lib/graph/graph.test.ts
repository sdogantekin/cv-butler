import { describe, expect, it, vi } from "vitest";
import type { z } from "zod";
import type { ParsedResume } from "@/lib/schemas/resume";
import type { AtsScoreResult, JdMatchResult } from "@/lib/schemas/analysis";
import { computeOverallAtsScore, runDeterministicAtsChecks } from "@/lib/scoring/ats-checks";
import { computeOverallMatchScore } from "@/lib/scoring/match-weighting";
import { graph } from "./graph";

const FAKE_PARSED_RESUME: ParsedResume = {
  fullName: "Ada Lovelace",
  email: "ada@example.com",
  phone: null,
  summary: null,
  experience: [],
  education: [],
  skills: ["TypeScript"],
  languages: [],
  location: null,
};

// Built from the *real* deterministic checks + a fixed mocked LLM
// contribution, so this stays resilient to future threshold tweaks in
// ats-checks.ts while still exercising the real wiring end to end.
const DETERMINISTIC_CATEGORIES = runDeterministicAtsChecks(FAKE_PARSED_RESUME);
const FAKE_CATEGORY_FEEDBACK = DETERMINISTIC_CATEGORIES.map((c) => ({
  name: c.name,
  feedback: `Mock feedback for ${c.name}.`,
}));
const FAKE_KEYWORD_RELEVANCE = { score: 75, feedback: "Mock keyword relevance feedback." };
const FAKE_ATS_LLM_OUTPUT = {
  categoryFeedback: FAKE_CATEGORY_FEEDBACK,
  keywordRelevance: FAKE_KEYWORD_RELEVANCE,
};
const EXPECTED_ATS_CATEGORIES = [
  ...DETERMINISTIC_CATEGORIES.map((c, i) => ({
    name: c.name,
    score: c.score,
    feedback: FAKE_CATEGORY_FEEDBACK[i].feedback,
  })),
  {
    name: "Keyword & Content Relevance",
    score: FAKE_KEYWORD_RELEVANCE.score,
    feedback: FAKE_KEYWORD_RELEVANCE.feedback,
  },
];
const FAKE_ATS_SCORE: AtsScoreResult = {
  overallScore: computeOverallAtsScore(EXPECTED_ATS_CATEGORIES),
  categories: EXPECTED_ATS_CATEGORIES,
};

const FAKE_JD_DIMENSIONS = [
  { name: "Skills" as const, score: 70, gaps: ["Kubernetes"] },
  { name: "Experience" as const, score: 50, gaps: ["No cloud infrastructure experience"] },
  { name: "Education" as const, score: 90, gaps: [] },
  { name: "Domain Fit" as const, score: 60, gaps: ["No fintech background"] },
  { name: "Seniority Fit" as const, score: 80, gaps: [] },
  { name: "Culture Fit" as const, score: 50, gaps: [] },
];
const FAKE_JD_MATCH: JdMatchResult = {
  overallScore: computeOverallMatchScore(FAKE_JD_DIMENSIONS),
  dimensions: FAKE_JD_DIMENSIONS,
  hardConstraints: [],
};

const extractMock = vi.fn();
const matchMock = vi.fn();

// Mocked alongside the LLM boundary below: it's the other external-service
// call the match node can make, and it directly imports the real @/lib/env
// module (unlike everything else here), which would otherwise fail its
// required-var validation in a test process with no real env configured.
vi.mock("@/lib/search/company-search", () => ({
  searchCompanyInfo: vi.fn().mockResolvedValue(null),
}));

// Mock only the LLM boundary — every node runs for real, so this test
// exercises the graph's actual conditional routing, not just node output shapes.
vi.mock("@/lib/llm/provider", () => ({
  getChatModel: () => ({
    withStructuredOutput(schema: z.ZodObject<z.ZodRawShape>) {
      const keys = Object.keys(schema.shape);
      return {
        invoke: async () => {
          if (keys.includes("fullName")) {
            extractMock();
            return FAKE_PARSED_RESUME;
          }
          if (keys.includes("categoryFeedback")) return FAKE_ATS_LLM_OUTPUT;
          if (keys.includes("dimensions")) {
            matchMock();
            return { dimensions: FAKE_JD_DIMENSIONS, hardConstraints: [] };
          }
          if (keys.includes("recommendations")) {
            return { recommendations: [{ category: "Test", message: "Looks good." }] };
          }
          throw new Error(`Unexpected schema shape in test: ${keys.join(", ")}`);
        },
      };
    },
  }),
}));

describe("graph routing", () => {
  it("score-only entry (resumeText only) runs extract -> score -> recommend, never match", async () => {
    extractMock.mockClear();
    matchMock.mockClear();

    const result = await graph.invoke({ resumeText: "Ada Lovelace, TypeScript developer." });

    expect(result.parsedResume).toEqual(FAKE_PARSED_RESUME);
    expect(result.atsScore).toEqual(FAKE_ATS_SCORE);
    expect(result.jdMatch).toBeNull();
    expect(extractMock).toHaveBeenCalledOnce();
    expect(matchMock).not.toHaveBeenCalled();
    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  it("match-only entry (parsedResume + jobDescriptionText) runs match -> recommend, never extract/score", async () => {
    extractMock.mockClear();
    matchMock.mockClear();

    const result = await graph.invoke({
      parsedResume: FAKE_PARSED_RESUME,
      jobDescriptionText: "Looking for a Kubernetes expert.",
    });

    expect(result.jdMatch).toEqual(FAKE_JD_MATCH);
    expect(result.atsScore).toBeNull();
    expect(extractMock).not.toHaveBeenCalled();
    expect(matchMock).toHaveBeenCalledOnce();
    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  it("match with a companyName but no TAVILY_API_KEY configured still completes and scores all 6 dimensions", async () => {
    extractMock.mockClear();
    matchMock.mockClear();

    const result = await graph.invoke({
      parsedResume: FAKE_PARSED_RESUME,
      jobDescriptionText: "Looking for a Kubernetes expert.",
      companyName: "Acme Corp",
    });

    expect(result.jdMatch).toEqual(FAKE_JD_MATCH);
    expect(result.jdMatch?.dimensions).toHaveLength(6);
    expect(matchMock).toHaveBeenCalledOnce();
  });
});
