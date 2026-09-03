import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    AUTH_SECRET: z.string().min(1),
    AUTH_GOOGLE_ID: z.string().min(1),
    AUTH_GOOGLE_SECRET: z.string().min(1),

    LLM_PROVIDER: z.enum(["anthropic", "qwen"]).default("anthropic"),
    ANTHROPIC_API_KEY: z.string().min(1),
    ANTHROPIC_MODEL: z.string().default("claude-sonnet-4-5"),
    QWEN_API_KEY: z.string().optional(),
    QWEN_BASE_URL: z.string().optional(),
    QWEN_MODEL: z.string().optional(),

    SQLITE_DB_PATH: z.string().default("./local.db"),

    // Shared daily action pool (ATS score + JD match together). Overridable
    // for local/manual testing so the limit doesn't have to be worked around
    // by clearing DB rows.
    DAILY_ACTION_LIMIT: z.coerce.number().int().positive().default(3),
  },
  experimental__runtimeEnv: process.env,
});
