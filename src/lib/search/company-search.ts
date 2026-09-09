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
// web-search API — never a scraper against a specific site's Terms of
// Service (see the "Company search enrichment" section of README.md). To add
// a different source, publish a separate package implementing this
// interface and point COMPANY_RESEARCH_PROVIDER_MODULE at it — it runs
// *alongside* the Tavily provider (when configured), not instead of it; each
// is independently opt-in via its own env var.
export interface CompanyResearchProvider {
  search(companyName: string): Promise<CompanySearchResult | null>;
}

async function resolveCustomProvider(): Promise<CompanyResearchProvider | null> {
  if (!env.COMPANY_RESEARCH_PROVIDER_MODULE) return null;
  try {
    const imported: unknown = await import(env.COMPANY_RESEARCH_PROVIDER_MODULE);
    const mod = imported as { default?: unknown; companyResearchProvider?: unknown };
    const provider = (mod.default ?? mod.companyResearchProvider) as CompanyResearchProvider | undefined;
    if (!provider || typeof provider.search !== "function") {
      console.error(
        `COMPANY_RESEARCH_PROVIDER_MODULE "${env.COMPANY_RESEARCH_PROVIDER_MODULE}" does not export a CompanyResearchProvider (a default export, or a named "companyResearchProvider" export, with a "search" method) — ignoring it.`,
      );
      return null;
    }
    return provider;
  } catch (err) {
    console.error(`Failed to load COMPANY_RESEARCH_PROVIDER_MODULE "${env.COMPANY_RESEARCH_PROVIDER_MODULE}":`, err);
    return null;
  }
}

async function resolveProviders(): Promise<CompanyResearchProvider[]> {
  const providers: CompanyResearchProvider[] = [];
  if (env.TAVILY_API_KEY) providers.push(tavilyProvider);
  const custom = await resolveCustomProvider();
  if (custom) providers.push(custom);
  return providers;
}

// Merges every configured provider's result into one. `answer` takes the
// first non-null one found; every provider's answer (other than the one
// chosen) and every snippet from every provider are kept, so information
// from an additional source is never silently dropped in favor of another.
function mergeResults(results: (CompanySearchResult | null)[]): CompanySearchResult | null {
  const present = results.filter((r): r is CompanySearchResult => r !== null);
  if (present.length === 0) return null;

  const answer = present.map((r) => r.answer).find((a): a is string => Boolean(a)) ?? null;
  const snippets: string[] = [];
  for (const r of present) {
    if (r.answer && r.answer !== answer) snippets.push(r.answer);
    snippets.push(...r.snippets);
  }
  return { answer, snippets };
}

// Opt-in company research enrichment. Mirrors getAnalyticsConfig()'s opt-in
// shape: no provider configured (the default) means this is never even
// attempted. Unlike getChatModel() (throws on missing config for a REQUIRED
// integration), this NEVER throws — any failure (a misconfigured or failing
// provider, network error, timeout, malformed response) degrades to "no
// search results available" from that provider rather than blocking the
// match or the other configured provider's contribution.
export async function searchCompanyInfo(companyName: string): Promise<CompanySearchResult | null> {
  const providers = await resolveProviders();
  if (providers.length === 0) return null;

  const results = await Promise.all(providers.map((provider) => provider.search(companyName).catch(() => null)));

  return mergeResults(results);
}
