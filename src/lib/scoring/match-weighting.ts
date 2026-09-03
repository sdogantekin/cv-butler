type MatchDimensionName = "Skills" | "Experience" | "Education";

// Skills and Experience dominate equally as the primary fit predictors for
// most roles; Education acts more as a qualifying gate, weighted lower but
// still meaningful.
export const JD_DIMENSION_WEIGHTS: Readonly<Record<MatchDimensionName, number>> = {
  Skills: 40,
  Experience: 40,
  Education: 20,
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
