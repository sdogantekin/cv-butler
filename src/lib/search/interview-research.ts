import { env } from "@/lib/env";
import type { CompanySearchResult } from "./company-search";
import { tavilySearch } from "./providers/tavily";

// What the interview-prep analyst extracts from the user's free-text
// interviewer details. The lookup query is built ONLY from these fields,
// never from the raw pasted text, so notes like "seemed stern on the phone"
// or a pasted LinkedIn blurb are never sent to a third party.
export interface InterviewerIdentity {
  name: string | null;
  role: string | null;
  company: string | null;
}

// Both lookups are Tavily-only and opt-in: no TAVILY_API_KEY (the default)
// means no network call at all. Like searchCompanyInfo(), they never throw —
// any failure degrades to "no research available".

export async function researchCompanyForInterview(
  companyName: string | null,
): Promise<CompanySearchResult | null> {
  if (!companyName || !env.TAVILY_API_KEY) return null;
  try {
    return await tavilySearch(
      `${companyName} company overview, products, recent news and announcements, culture`,
    );
  } catch {
    return null;
  }
}

export function buildInterviewerQuery(identity: InterviewerIdentity): string | null {
  // A bare role or company with no name can't identify a person; searching
  // on it would only return generic results about the company.
  if (!identity.name) return null;
  const context = [identity.role, identity.company].filter(Boolean).join(" ");
  return `"${identity.name}" ${context} professional background, role, public talks or articles`.trim();
}

export async function researchInterviewer(
  identity: InterviewerIdentity | null,
): Promise<CompanySearchResult | null> {
  if (!identity || !env.TAVILY_API_KEY) return null;
  const query = buildInterviewerQuery(identity);
  if (!query) return null;
  try {
    return await tavilySearch(query);
  } catch {
    return null;
  }
}
