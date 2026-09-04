import { pgTable, text, jsonb, timestamp } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { resumes } from "./resumes";

export const analyses = pgTable("analysis", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  resumeId: text("resumeId")
    .notNull()
    .references(() => resumes.id, { onDelete: "cascade" }),
  type: text("type", { enum: ["ats_score", "jd_match"] }).notNull(),
  // Only set when type = jd_match.
  jobDescriptionText: text("jobDescriptionText"),
  // AtsScoreResult or JdMatchResult (see src/lib/schemas/analysis.ts), Zod-validated before insert.
  result: jsonb("result").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" })
    .notNull()
    .$defaultFn(() => new Date()),
});
