import { z } from "zod";

// Ordered most to least severe — shared by gaps and recommendations, used
// for sorting either by severity.
export const SEVERITY_LEVELS = ["critical", "moderate", "minor"] as const;

export const RecommendationSchema = z.object({
  category: z.string(),
  message: z.string(),
  severity: z.enum(SEVERITY_LEVELS),
});

export type Recommendation = z.infer<typeof RecommendationSchema>;

// ATS Scoring Node output. `overallScore` is a weighted average of
// `categories` computed in code — see src/lib/scoring/ats-checks.ts.
export const AtsScoreResultSchema = z.object({
  overallScore: z.number().min(0).max(100),
  categories: z.array(
    z.object({
      name: z.string(),
      score: z.number().min(0).max(100),
      feedback: z.string(),
    }),
  ),
});

export type AtsScoreResult = z.infer<typeof AtsScoreResultSchema>;

export const HardConstraintSchema = z.object({
  type: z.enum(["language", "location"]),
  requirement: z.string(),
  met: z.boolean(),
  note: z.string(),
});

export type HardConstraint = z.infer<typeof HardConstraintSchema>;

export const MATCH_DIMENSION_NAMES = [
  "Skills",
  "Experience",
  "Education",
  "Domain Fit",
  "Seniority Fit",
  "Culture Fit",
] as const;

export const GapSchema = z.object({
  severity: z.enum(SEVERITY_LEVELS),
  description: z.string(),
});

export type Gap = z.infer<typeof GapSchema>;

// Matcher Node output. `overallScore` is a weighted average of `dimensions`
// computed in code, capped low if any `hardConstraints` entry is unmet —
// see src/lib/scoring/match-weighting.ts.
export const JdMatchResultSchema = z.object({
  overallScore: z.number().min(0).max(100),
  dimensions: z.array(
    z.object({
      name: z.enum(MATCH_DIMENSION_NAMES),
      score: z.number().min(0).max(100),
      gaps: z.array(GapSchema),
    }),
  ),
  // Language/location requirements explicitly stated in the job description.
  // Categorically different from a dimension gap: often an absolute
  // dealbreaker, so it's surfaced separately rather than blended into a
  // dimension score. Empty array when the JD states no such constraints.
  hardConstraints: z.array(HardConstraintSchema),
});

export type JdMatchResult = z.infer<typeof JdMatchResultSchema>;

export const MatchDiffItemSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type MatchDiffItem = z.infer<typeof MatchDiffItemSchema>;

// Match Diff Node output. Score deltas are plain arithmetic (before/after
// pulled straight from two JdMatchResults); resolved/stillOpen/newIssues are
// an LLM classification of the two results' free-text gaps and
// hardConstraints, since gaps have no stable ID to diff against directly —
// see src/lib/graph/nodes/match-diff.ts. Never persisted; computed on demand
// and returned in the API response only.
export const MatchDiffResultSchema = z.object({
  beforeScore: z.number().min(0).max(100),
  afterScore: z.number().min(0).max(100),
  overallDelta: z.number(),
  dimensions: z.array(
    z.object({
      name: z.enum(MATCH_DIMENSION_NAMES),
      before: z.number().min(0).max(100),
      after: z.number().min(0).max(100),
      delta: z.number(),
    }),
  ),
  resolved: z.array(MatchDiffItemSchema),
  stillOpen: z.array(MatchDiffItemSchema),
  newIssues: z.array(MatchDiffItemSchema),
});

export type MatchDiffResult = z.infer<typeof MatchDiffResultSchema>;
