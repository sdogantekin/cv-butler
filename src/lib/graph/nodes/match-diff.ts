import { z } from "zod";
import { getChatModel } from "@/lib/llm/provider";
import { type JdMatchResult, type MatchDiffResult, MatchDiffResultSchema } from "@/lib/schemas/analysis";

const MatchDiffItemLlmSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const MatchDiffLlmOutputSchema = z.object({
  resolved: z.array(MatchDiffItemLlmSchema),
  stillOpen: z.array(MatchDiffItemLlmSchema),
  newIssues: z.array(MatchDiffItemLlmSchema),
});

function buildMatchDiffPrompt(before: JdMatchResult, after: JdMatchResult): string {
  return `You are comparing two job-fit analyses of the same candidate against the same job description: one from an earlier version of their resume ("before"), one from a revised version ("after"). Classify the issues (dimension gaps and hard constraints) from both analyses into exactly three lists:

- **resolved**: an issue present in "before" that no longer appears, or is clearly no longer true, in "after" — the candidate fixed it.
- **stillOpen**: an issue present in "before" that is still present in "after", even if reworded differently.
- **newIssues**: a new problem that only appears in "after" and was not present in "before" — a regression introduced by the revision.

Ground every item strictly in the gaps/hardConstraints text actually present in the two analyses below — treat differently-worded gaps that describe the same underlying issue as the same issue, but never invent an issue, a resolution, or a regression that isn't actually supported by the given text.

Each item needs a short "title" (2-4 words, e.g. "Missing Keywords", "Skills Gap", "Title Mismatch", "Resume Length") naming the category of issue, and a one-sentence "description" giving the specific, concrete detail — grounded in the same rule above, a candidate can act on (or take credit for). Return empty arrays for any category with nothing to report.

## Before (earlier resume version)

${JSON.stringify(before, null, 2)}

## After (revised resume version)

${JSON.stringify(after, null, 2)}`;
}

export function computeMatchScoreDeltas(before: JdMatchResult, after: JdMatchResult) {
  const dimensions = after.dimensions.map((afterDimension) => {
    const beforeDimension = before.dimensions.find((d) => d.name === afterDimension.name);
    const beforeScore = beforeDimension?.score ?? 0;
    return {
      name: afterDimension.name,
      before: beforeScore,
      after: afterDimension.score,
      delta: afterDimension.score - beforeScore,
    };
  });
  return {
    beforeScore: before.overallScore,
    afterScore: after.overallScore,
    overallDelta: after.overallScore - before.overallScore,
    dimensions,
  };
}

// Match Diff Node. Score deltas are plain arithmetic; resolved/stillOpen/
// newIssues come from one LLM call, since gaps are free text regenerated
// fresh on every match run with no stable ID to diff against directly.
export async function matchDiffNode(input: {
  before: JdMatchResult;
  after: JdMatchResult;
}): Promise<{ matchDiff: MatchDiffResult } | { errors: string[] }> {
  try {
    const model = getChatModel().withStructuredOutput(MatchDiffLlmOutputSchema);
    const { resolved, stillOpen, newIssues } = await model.invoke(
      buildMatchDiffPrompt(input.before, input.after),
    );
    const matchDiff = MatchDiffResultSchema.parse({
      ...computeMatchScoreDeltas(input.before, input.after),
      resolved,
      stillOpen,
      newIssues,
    });
    return { matchDiff };
  } catch (err) {
    return { errors: [`match-diff: ${err instanceof Error ? err.message : String(err)}`] };
  }
}
