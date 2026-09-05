import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    AUTH_SECRET: z.string().min(1),
    AUTH_GOOGLE_ID: z.string().min(1),
    AUTH_GOOGLE_SECRET: z.string().min(1),

    LLM_PROVIDER: z.enum(["anthropic", "qwen", "openai", "deepseek", "gemini"]).default("anthropic"),
    ANTHROPIC_API_KEY: z.string().min(1),
    ANTHROPIC_MODEL: z.string().default("claude-sonnet-4-5"),
    QWEN_API_KEY: z.string().optional(),
    QWEN_BASE_URL: z.string().optional(),
    QWEN_MODEL: z.string().optional(),
    OPENAI_API_KEY: z.string().optional(),
    OPENAI_MODEL: z.string().optional(),
    // DeepSeek has one official OpenAI-compatible API endpoint (unlike Qwen,
    // which is hosted by several different cloud providers with different
    // base URLs), so this one gets a real default.
    DEEPSEEK_API_KEY: z.string().optional(),
    DEEPSEEK_BASE_URL: z.string().default("https://api.deepseek.com"),
    DEEPSEEK_MODEL: z.string().optional(),
    GEMINI_API_KEY: z.string().optional(),
    GEMINI_MODEL: z.string().optional(),

    SQLITE_DB_PATH: z.string().default("./local.db"),
    // Unset (local default) -> SQLite via SQLITE_DB_PATH. Set (e.g. injected
    // by Vercel's Neon integration in production) -> Postgres. See
    // src/db/dialect.ts. Deliberately `.min(1)` not `.url()` so it doesn't
    // reject valid Postgres connection strings with query params like
    // `?sslmode=require`.
    DATABASE_URL: z.string().min(1).optional(),

    // Shared daily action pool (ATS score + JD match together). Overridable
    // for local/manual testing so the limit doesn't have to be worked around
    // by clearing DB rows.
    DAILY_ACTION_LIMIT: z.coerce.number().int().positive().default(3),

    // Opt-in, provider-agnostic analytics — unset (the default) means zero
    // third-party script loads and zero tracking calls, for local dev and any
    // self-hosted fork. Mirrors LLM_PROVIDER's enum-switch shape. Server-only:
    // the client-side trackEvent()/trackPageview() switch reads
    // NEXT_PUBLIC_GA_MEASUREMENT_ID below instead — see the two-switch note
    // in src/lib/analytics/provider.ts.
    ANALYTICS_PROVIDER: z.enum(["google"]).optional(),
  },
  client: {
    // GA4 measurement ID (e.g. "G-XXXXXXXXXX"). Must live here (not in
    // `server`) and keep its NEXT_PUBLIC_ prefix so it's readable from the
    // browser, since gtag.js runs client-side.
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  },
  experimental__runtimeEnv: {
    ...process.env,
    // NEXT_PUBLIC_ vars must appear here as an explicit, literal
    // `process.env.NEXT_PUBLIC_X` member-access expression. Next.js's
    // compiler only statically inlines that exact textual pattern into the
    // client bundle at build time — a wholesale `...process.env` spread is
    // invisible to it, so the value would silently come back `undefined` in
    // the browser without this line.
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  },
});
