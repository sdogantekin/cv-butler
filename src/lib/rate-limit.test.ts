import { beforeAll, describe, expect, it, vi } from "vitest";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

// Isolate from real env validation (AUTH_SECRET, ANTHROPIC_API_KEY, etc. are
// not needed for this test) by pointing @/db at an in-memory SQLite database.
const DAILY_ACTION_LIMIT = 3;
vi.mock("@/lib/env", () => ({
  env: { SQLITE_DB_PATH: ":memory:", DAILY_ACTION_LIMIT },
}));

const { db } = await import("@/db");
const { users, actionUsage } = await import("@/db/schema");
const { checkAndConsumeAction } = await import("./rate-limit");

const USER_A = "test-user-a";
const USER_B = "test-user-b";

beforeAll(async () => {
  migrate(db, { migrationsFolder: "./src/db/migrations" });
  await db.insert(users).values([
    { id: USER_A, email: "a@example.com" },
    { id: USER_B, email: "b@example.com" },
  ]);
});

describe("checkAndConsumeAction", () => {
  it("allows up to DAILY_ACTION_LIMIT actions per day (shared across action types), then blocks", async () => {
    for (let i = 0; i < DAILY_ACTION_LIMIT; i++) {
      const result = await checkAndConsumeAction(USER_A, "ats_score");
      expect(result.allowed).toBe(true);
      if (result.allowed) expect(result.remaining).toBe(DAILY_ACTION_LIMIT - i - 1);
    }

    const blocked = await checkAndConsumeAction(USER_A, "jd_match");
    expect(blocked.allowed).toBe(false);
  });

  it("does not count actions from a previous UTC day toward today's total", async () => {
    const yesterday = new Date();
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    await db.insert(actionUsage).values({
      userId: USER_B,
      actionType: "ats_score",
      createdAt: yesterday,
    });

    const result = await checkAndConsumeAction(USER_B, "ats_score");
    expect(result.allowed).toBe(true);
    if (result.allowed) expect(result.remaining).toBe(DAILY_ACTION_LIMIT - 1);
  });
});
