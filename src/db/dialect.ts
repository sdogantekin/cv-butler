import { env } from "@/lib/env";

// Single source of truth for which dialect is active. src/db/schema/index.ts
// and src/db/index.ts both key off this exact flag so the active schema tree
// and the active db client can never mismatch.
export const usingPostgres = Boolean(env.DATABASE_URL);
