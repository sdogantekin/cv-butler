import { describe, expect, it } from "vitest";
import { JD_DIMENSION_WEIGHTS, applyHardConstraintCap, computeOverallMatchScore } from "./match-weighting";

describe("computeOverallMatchScore", () => {
  it("weights sum to 100", () => {
    const total = Object.values(JD_DIMENSION_WEIGHTS).reduce((a, b) => a + b, 0);
    expect(total).toBe(100);
  });

  it("computes a known weighted average", () => {
    const score = computeOverallMatchScore([
      { name: "Skills", score: 80 },
      { name: "Experience", score: 60 },
      { name: "Education", score: 100 },
    ]);
    // (80*40 + 60*40 + 100*20) / 100 = 76
    expect(score).toBe(76);
  });

  it("reweights over partial dimension input rather than crashing", () => {
    const score = computeOverallMatchScore([{ name: "Skills", score: 50 }]);
    expect(score).toBe(50);
  });
});

describe("applyHardConstraintCap", () => {
  it("caps a high score when a hard constraint is unmet", () => {
    expect(applyHardConstraintCap(95, [{ met: false }])).toBe(40);
  });

  it("leaves the score untouched when all constraints are met", () => {
    expect(applyHardConstraintCap(95, [{ met: true }, { met: true }])).toBe(95);
  });

  it("leaves the score untouched when there are no constraints", () => {
    expect(applyHardConstraintCap(95, [])).toBe(95);
  });

  it("does not raise a score that is already below the cap", () => {
    expect(applyHardConstraintCap(20, [{ met: false }])).toBe(20);
  });
});
