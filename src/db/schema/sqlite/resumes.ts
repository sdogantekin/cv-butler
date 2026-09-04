import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./auth";

export const resumes = sqliteTable("resume", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  originalFilename: text("originalFilename").notNull(),
  mimeType: text("mimeType").notNull(),
  // Structured extraction output (ParsedResume, see src/lib/schemas/resume.ts), Zod-validated before insert.
  // The original uploaded file is never persisted — parsed in memory and discarded.
  parsedResume: text("parsedResume", { mode: "json" }).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});
