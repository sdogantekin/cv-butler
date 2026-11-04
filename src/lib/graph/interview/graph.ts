import { StateGraph, START, END } from "@langchain/langgraph";
import { InterviewState } from "./state";
import { analystNode } from "./analyst";
import { researchNode } from "./research";
import { interviewerProfilerNode } from "./interviewer-profiler";
import { prepPlannerNode } from "./prep-planner";
import { questionCoachNode } from "./question-coach";
import { askBackAdvisorNode } from "./ask-back-advisor";
import { compileNode } from "./compile";

// Interview Prep workflow (v4): a second compiled graph, separate from the
// score/match graph in ../graph.ts because it is a different workflow with
// its own state. One analyst reads the resume + JD, optional web research
// runs, then four specialists run in parallel and a code-only compile step
// merges them:
//
//   START -> analyst -> research -> { interviewerProfiler, prepPlanner,
//            questionCoach, askBackAdvisor } -> compile -> END
//
// If the analyst fails there is no brief for anyone to work from, so the run
// ends early with its error in state.
const builder = new StateGraph(InterviewState)
  .addNode("analyst", analystNode)
  .addNode("research", researchNode)
  .addNode("interviewerProfiler", interviewerProfilerNode)
  .addNode("prepPlanner", prepPlannerNode)
  .addNode("questionCoach", questionCoachNode)
  .addNode("askBackAdvisor", askBackAdvisorNode)
  .addNode("compile", compileNode)
  .addEdge(START, "analyst")
  .addConditionalEdges("analyst", (state) => (state.brief ? "research" : END), ["research", END])
  .addEdge("research", "interviewerProfiler")
  .addEdge("research", "prepPlanner")
  .addEdge("research", "questionCoach")
  .addEdge("research", "askBackAdvisor")
  .addEdge(["interviewerProfiler", "prepPlanner", "questionCoach", "askBackAdvisor"], "compile")
  .addEdge("compile", END);

export const interviewPrepGraph = builder.compile();
