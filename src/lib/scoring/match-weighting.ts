type MatchDimensionName =
  | "Skills"
  | "Experience"
  | "Education"
  | "Domain Fit"
  | "Seniority Fit"
  | "Culture Fit";

// Skills and Experience remain the dominant, equally-weighted primary fit
// predictors (dropped from 40 to 30 each to make room for three new
// dimensions). Domain Fit and Seniority Fit form a secondary tier — real
// predictors, but less decisive alone than raw skills/experience match.
// Education stays a qualifying gate, not a differentiator. Culture Fit is
// weighted lowest: it's the softest, least-grounded signal — many JD/resume
// pairs state nothing explicit to compare — so it's informational context
// rather than a strong driver of overall fit.
export const JD_DIMENSION_WEIGHTS: Readonly<Record<MatchDimensionName, number>> = {
  Skills: 30,
  Experience: 30,
  "Domain Fit": 15,
  "Seniority Fit": 15,
  Education: 5,
  "Culture Fit": 5,
};

export function computeOverallMatchScore(
  dimensions: { name: MatchDimensionName; score: number }[],
): number {
  let weightedSum = 0;
  let weightTotal = 0;
  for (const dimension of dimensions) {
    const weight = JD_DIMENSION_WEIGHTS[dimension.name];
    weightedSum += dimension.score * weight;
    weightTotal += weight;
  }
  if (weightTotal === 0) return 0;
  return Math.round(weightedSum / weightTotal);
}

export const HARD_CONSTRAINT_SCORE_CAP = 40;

// Language/location requirements are categorically different from a
// dimension gap: often an absolute dealbreaker regardless of how strong the
// skills/experience match is. If any is unmet, cap the score so a strong
// skills match can't visually bury a real blocker.
export function applyHardConstraintCap(
  weightedScore: number,
  hardConstraints: { met: boolean }[],
): number {
  const hasUnmet = hardConstraints.some((c) => !c.met);
  return hasUnmet ? Math.min(weightedScore, HARD_CONSTRAINT_SCORE_CAP) : weightedScore;
}
