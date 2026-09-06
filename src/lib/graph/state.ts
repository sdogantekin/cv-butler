import { Annotation } from "@langchain/langgraph";
import type { ParsedResume } from "@/lib/schemas/resume";
import type { AtsScoreResult, JdMatchResult, Recommendation } from "@/lib/schemas/analysis";

// Shared state for the v1 pipeline: Extract -> Score -> Match -> Recommend.
// Routing between nodes (see graph.ts) is driven by which of these fields are
// already populated when the graph is invoked.
// Nullable fields use an explicit `null` default (rather than the bare
// `Annotation<T>` shorthand) so every key is always present in state/output,
// instead of relying on LangGraph's empty-channel omission behavior.
function overwritable<T>() {
  return Annotation<T>({
    reducer: (_current: T, update: T) => update,
    default: () => null as T,
  });
}

export const GraphState = Annotation.Root({
  resumeText: overwritable<string | null>(),
  jobDescriptionText: overwritable<string | null>(),
  companyName: overwritable<string | null>(),
  parsedResume: overwritable<ParsedResume | null>(),
  atsScore: overwritable<AtsScoreResult | null>(),
  jdMatch: overwritable<JdMatchResult | null>(),
  recommendations: Annotation<Recommendation[]>({
    reducer: (existing, update) => existing.concat(update),
    default: () => [],
  }),
  errors: Annotation<string[]>({
    reducer: (existing, update) => existing.concat(update),
    default: () => [],
  }),
});

export type GraphStateType = typeof GraphState.State;
