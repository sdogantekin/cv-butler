import { researchCompanyForInterview, researchInterviewer } from "@/lib/search/interview-research";
import type { InterviewStateType } from "./state";

// Not an LLM agent: runs the optional web lookups in parallel. Each resolves
// to null when search isn't configured or fails, so research never blocks or
// fails the run. The interviewer lookup uses only the identity the analyst
// extracted, and only when the user supplied interviewer details at all.
export async function researchNode(state: InterviewStateType): Promise<Partial<InterviewStateType>> {
  const [companyResearch, interviewerResearch] = await Promise.all([
    researchCompanyForInterview(state.brief?.companyName ?? null),
    state.interviewerText ? researchInterviewer(state.brief?.interviewer ?? null) : Promise.resolve(null),
  ]);
  return { companyResearch, interviewerResearch };
}
