import { z } from "zod";
import { env } from "@/lib/env";
import type { CompanyResearchProvider } from "../company-search";

const TavilyResponseSchema = z.object({
  answer: z.string().optional(),
  results: z.array(z.object({ content: z.string().optional() })).optional(),
});

const TAVILY_TIMEOUT_MS = 8_000;

// Default CompanyResearchProvider. A general web-search API, not a scraper
// against any specific site's Terms of Service — see the "Company search
// enrichment" section of README.md for the rationale. Selected by
// company-search.ts's resolver whenever TAVILY_API_KEY is set and no custom
// COMPANY_RESEARCH_PROVIDER_MODULE overrides it.
export const tavilyProvider: CompanyResearchProvider = {
  async search(companyName) {
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
  },
};
