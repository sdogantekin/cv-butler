import { z } from "zod";

export const RecommendationSchema = z.object({
  category: z.string(),
  message: z.string(),
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

// Matcher Node output. `overallScore` is a weighted average of `dimensions`
// computed in code, capped low if any `hardConstraints` entry is unmet —
// see src/lib/scoring/match-weighting.ts.
export const JdMatchResultSchema = z.object({
  overallScore: z.number().min(0).max(100),
  dimensions: z.array(
    z.object({
      name: z.enum([
        "Skills",
        "Experience",
        "Education",
        "Domain Fit",
        "Seniority Fit",
        "Culture Fit",
      ]),
      score: z.number().min(0).max(100),
      gaps: z.array(z.string()),
    }),
  ),
  // Language/location requirements explicitly stated in the job description.
  // Categorically different from a dimension gap: often an absolute
  // dealbreaker, so it's surfaced separately rather than blended into a
  // dimension score. Empty array when the JD states no such constraints.
  hardConstraints: z.array(HardConstraintSchema),
});

export type JdMatchResult = z.infer<typeof JdMatchResultSchema>;
