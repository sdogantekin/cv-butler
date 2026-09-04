import { pgTable, text, jsonb, timestamp } from "drizzle-orm/pg-core";
import { users } from "./auth";

export const resumes = pgTable("resume", {
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
  parsedResume: jsonb("parsedResume").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
});
