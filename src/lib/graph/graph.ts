import { StateGraph, START, END } from "@langchain/langgraph";
import { GraphState } from "./state";
import { extractNode } from "./nodes/extract";
import { scoreNode } from "./nodes/score";
import { matchNode } from "./nodes/match";
import { recommendNode } from "./nodes/recommend";

// Routing is driven entirely by which fields are pre-populated at invoke()
// time, so one compiled graph serves both independently-billed v1 actions:
//  - ATS score:  invoke({ resumeText })                        -> extract -> score -> recommend
//  - JD match:   invoke({ parsedResume, jobDescriptionText })   -> match -> recommend
// "route" is a no-op passthrough node used only so the conditional entry edge
// has a proper node key to hang off of (StateGraph's typings don't allow
// addConditionalEdges directly from START).
const builder = new StateGraph(GraphState)
  .addNode("route", async () => ({}))
  .addNode("extract", extractNode)
  .addNode("score", scoreNode)
  .addNode("match", matchNode)
  .addNode("recommend", recommendNode)
  .addEdge(START, "route")
  .addConditionalEdges("route", (state) => (state.parsedResume ? "match" : "extract"), [
    "extract",
    "match",
  ])
  .addEdge("extract", "score")
  .addConditionalEdges("score", (state) => (state.jobDescriptionText ? "match" : "recommend"), [
    "match",
    "recommend",
  ])
  .addEdge("match", "recommend")
  .addEdge("recommend", END);

export const graph = builder.compile();
