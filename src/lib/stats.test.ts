import { beforeAll, describe, expect, it, vi } from "vitest";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

// Isolate from real env validation, same as rate-limit.test.ts.
vi.mock("@/lib/env", () => ({
  env: { SQLITE_DB_PATH: ":memory:", DAILY_ACTION_LIMIT: 3 },
}));

const { db } = await import("@/db");
const { users, resumes, analyses } = await import("@/db/schema");
const { getUserStats } = await import("./stats");

const USER_WITH_HISTORY = "test-user-with-history";
const USER_WITH_NO_HISTORY = "test-user-with-no-history";

beforeAll(async () => {
  migrate(db, { migrationsFolder: "./src/db/migrations" });
  await db.insert(users).values([
    { id: USER_WITH_HISTORY, email: "history@example.com" },
    { id: USER_WITH_NO_HISTORY, email: "empty@example.com" },
  ]);
  const [resume] = await db
    .insert(resumes)
    .values({
      userId: USER_WITH_HISTORY,
      originalFilename: "resume.pdf",
      mimeType: "application/pdf",
      parsedResume: {},
    })
    .returning();
  await db.insert(analyses).values([
    { userId: USER_WITH_HISTORY, resumeId: resume.id, type: "ats_score", result: {} },
    { userId: USER_WITH_HISTORY, resumeId: resume.id, type: "ats_score", result: {} },
    { userId: USER_WITH_HISTORY, resumeId: resume.id, type: "jd_match", result: {} },
  ]);
});

describe("getUserStats", () => {
  it("counts analyses by type for a user with history, and 0 for cover letters (no backend yet)", async () => {
    const stats = await getUserStats(USER_WITH_HISTORY);

    expect(stats).toEqual({ atsReviews: 2, jobMatches: 1, coverLetters: 0 });
  });

  it("returns all zeros for a user with no analyses", async () => {
    const stats = await getUserStats(USER_WITH_NO_HISTORY);

    expect(stats).toEqual({ atsReviews: 0, jobMatches: 0, coverLetters: 0 });
  });
});
