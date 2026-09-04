import Database from "better-sqlite3";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import { drizzle as drizzlePg } from "drizzle-orm/neon-http";
import { env } from "@/lib/env";
import { usingPostgres } from "./dialect";
import schema from "./schema";
import type * as sqliteSchemaTree from "./schema/sqlite";

// Dialect chosen by the same flag src/db/schema/index.ts uses, so `schema`
// (already resolved to the matching tree) and this client always agree.
export const db = (
  usingPostgres
    ? drizzlePg(env.DATABASE_URL!, { schema })
    : (() => {
        const sqlite = new Database(env.SQLITE_DB_PATH);
        sqlite.pragma("journal_mode = WAL");
        return drizzleSqlite(sqlite, { schema });
      })()
) as unknown as ReturnType<typeof drizzleSqlite<typeof sqliteSchemaTree>>;
