import { env } from "@/lib/env";
import { tavilyProvider } from "./providers/tavily";

export interface CompanySearchResult {
  answer: string | null;
  snippets: string[];
}

// A pluggable source of company research (culture, work environment, etc.)
// grounding the Job Matching "Culture Fit" dimension, and reusable by any
// future feature needing the same signal (e.g. cover letter tailoring). This
// repo only ships the built-in provider below, backed by a general
// web-search API. To use a different source instead, publish a separate
// package implementing this interface and point
// COMPANY_RESEARCH_PROVIDER_MODULE at it — when set, it takes over entirely
// (Tavily is not also called).
export interface CompanyResearchProvider {
  search(companyName: string): Promise<CompanySearchResult | null>;
}

async function resolveProvider(): Promise<CompanyResearchProvider | null> {
  if (env.COMPANY_RESEARCH_PROVIDER_MODULE) {
    const imported: unknown = await import(env.COMPANY_RESEARCH_PROVIDER_MODULE);
    const mod = imported as { default?: unknown; companyResearchProvider?: unknown };
    const provider = (mod.default ?? mod.companyResearchProvider) as CompanyResearchProvider | undefined;
    if (!provider || typeof provider.search !== "function") {
      throw new Error(
        `COMPANY_RESEARCH_PROVIDER_MODULE "${env.COMPANY_RESEARCH_PROVIDER_MODULE}" does not export a CompanyResearchProvider (a default export, or a named "companyResearchProvider" export, with a "search" method).`,
      );
    }
    return provider;
  }
  if (env.TAVILY_API_KEY) return tavilyProvider;
  return null;
}

// Opt-in company research enrichment. Mirrors getAnalyticsConfig()'s opt-in
// shape: no provider configured (the default) means this is never even
// attempted. Unlike getChatModel() (throws on missing config for a REQUIRED
// integration), this NEVER throws — any failure (a misconfigured provider,
// network error, timeout, malformed response) degrades to "no search results
// available" rather than blocking a match.
export async function searchCompanyInfo(companyName: string): Promise<CompanySearchResult | null> {
  try {
    const provider = await resolveProvider();
    if (!provider) return null;
    return await provider.search(companyName);
  } catch {
    return null;
  }
}
