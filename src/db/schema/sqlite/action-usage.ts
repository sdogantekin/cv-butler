import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { users } from "./auth";

// Append-only log: one row per consumed action. The daily quota is a COUNT(*)
// query over this table (see src/lib/rate-limit.ts), not an upsert counter.
// Check-then-insert has an accepted race under concurrent requests at v1 scale
// (see requirements.md 8.2) — revisit with a transactional counter in v2.
export const actionUsage = sqliteTable(
  "action_usage",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    actionType: text("actionType", { enum: ["ats_score", "jd_match"] }).notNull(),
    createdAt: integer("createdAt", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [index("action_usage_user_created_idx").on(table.userId, table.createdAt)],
);
