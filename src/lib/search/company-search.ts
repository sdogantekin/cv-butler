import { z } from "zod";
import { env } from "@/lib/env";

export interface CompanySearchResult {
  answer: string | null;
  snippets: string[];
}

const TavilyResponseSchema = z.object({
  answer: z.string().optional(),
  results: z.array(z.object({ content: z.string().optional() })).optional(),
});

const TAVILY_TIMEOUT_MS = 8_000;

// Opt-in company web-search enrichment for the Culture Fit match dimension.
// Mirrors getAnalyticsConfig()'s opt-in shape: unset TAVILY_API_KEY (the
// default) means this is never even attempted. Unlike getChatModel() (throws
// on missing config for a REQUIRED integration), this NEVER throws — any
// failure (network error, timeout, rate limit, malformed response) degrades
// to "no search results available" rather than blocking a match.
export async function searchCompanyInfo(companyName: string): Promise<CompanySearchResult | null> {
  if (!env.TAVILY_API_KEY) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TAVILY_TIMEOUT_MS);
  try {
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.TAVILY_API_KEY}` },
      body: JSON.stringify({
        query: `${companyName} company culture, work environment, remote/hybrid/onsite policy, company size`,
        search_depth: "basic",
        max_results: 3,
        include_answer: true,
      }),
      signal: controller.signal,
    });
    if (!response.ok) return null;

    const parsed = TavilyResponseSchema.safeParse(await response.json());
    if (!parsed.success) return null;

    const answer = parsed.data.answer ?? null;
    const snippets = (parsed.data.results ?? [])
      .map((r) => r.content)
      .filter((c): c is string => Boolean(c))
      .slice(0, 3);

    if (!answer && snippets.length === 0) return null;
    return { answer, snippets };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
