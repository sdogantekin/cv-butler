import { describe, expect, it, vi } from "vitest";
import type { JdMatchResult } from "@/lib/schemas/analysis";
import { computeMatchScoreDeltas, matchDiffNode } from "./match-diff";

const BEFORE: JdMatchResult = {
  overallScore: 58,
  dimensions: [
    { name: "Skills", score: 52, gaps: ["Missing Kubernetes experience"] },
    { name: "Experience", score: 70, gaps: [] },
    { name: "Education", score: 90, gaps: [] },
    { name: "Domain Fit", score: 60, gaps: [] },
    { name: "Seniority Fit", score: 80, gaps: [] },
    { name: "Culture Fit", score: 50, gaps: [] },
  ],
  hardConstraints: [],
};

const AFTER: JdMatchResult = {
  overallScore: 81,
  dimensions: [
    { name: "Skills", score: 88, gaps: [] },
    { name: "Experience", score: 75, gaps: [] },
    { name: "Education", score: 90, gaps: [] },
    { name: "Domain Fit", score: 60, gaps: [] },
    { name: "Seniority Fit", score: 80, gaps: [] },
    { name: "Culture Fit", score: 50, gaps: ["Resume is now 3 pages"] },
  ],
  hardConstraints: [],
};

describe("computeMatchScoreDeltas", () => {
  it("computes overall and per-dimension deltas from two JdMatchResults", () => {
    const deltas = computeMatchScoreDeltas(BEFORE, AFTER);

    expect(deltas.beforeScore).toBe(58);
    expect(deltas.afterScore).toBe(81);
    expect(deltas.overallDelta).toBe(23);
    expect(deltas.dimensions).toEqual([
      { name: "Skills", before: 52, after: 88, delta: 36 },
      { name: "Experience", before: 70, after: 75, delta: 5 },
      { name: "Education", before: 90, after: 90, delta: 0 },
      { name: "Domain Fit", before: 60, after: 60, delta: 0 },
      { name: "Seniority Fit", before: 80, after: 80, delta: 0 },
      { name: "Culture Fit", before: 50, after: 50, delta: 0 },
    ]);
  });
});

const FAKE_CLASSIFICATION = {
  resolved: [
    { title: "Missing Keywords", description: "Kubernetes now appears in the Experience section." },
  ],
  stillOpen: [],
  newIssues: [
    {
      title: "Resume Length",
      description: "Resume is now 3 pages — consider trimming for better ATS parsing.",
    },
  ],
};

vi.mock("@/lib/llm/provider", () => ({
  getChatModel: vi.fn(() => ({
    withStructuredOutput: () => ({
      invoke: async () => FAKE_CLASSIFICATION,
    }),
  })),
}));

describe("matchDiffNode", () => {
  it("merges the LLM classification with the computed score deltas into a valid MatchDiffResult", async () => {
    const result = await matchDiffNode({ before: BEFORE, after: AFTER });

    expect(result).toEqual({
      matchDiff: {
        ...computeMatchScoreDeltas(BEFORE, AFTER),
        ...FAKE_CLASSIFICATION,
      },
    });
  });

  it("returns errors instead of throwing when the LLM call fails", async () => {
    const { getChatModel } = await import("@/lib/llm/provider");
    vi.mocked(getChatModel).mockReturnValueOnce({
      withStructuredOutput: () => ({
        invoke: async () => {
          throw new Error("boom");
        },
      }),
    } as unknown as ReturnType<typeof getChatModel>);

    const result = await matchDiffNode({ before: BEFORE, after: AFTER });

    expect("errors" in result).toBe(true);
    if ("errors" in result) {
      expect(result.errors[0]).toContain("boom");
    }
  });
});
