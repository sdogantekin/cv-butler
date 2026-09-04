import { and, eq, gte, sql } from "drizzle-orm";
import { db } from "@/db";
import { actionUsage } from "@/db/schema";
import { env } from "@/lib/env";

export type ActionType = (typeof actionUsage.$inferInsert)["actionType"];

export type RateLimitResult = { allowed: true; remaining: number } | { allowed: false };

function startOfTodayUTC(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

// Shared pool of DAILY_ACTION_LIMIT actions per user per UTC day, across all
// action types (ats_score + jd_match together, not each). Check-then-insert
// against an append-only log table — the resulting race under concurrent
// requests is an accepted v1-scale tradeoff (see requirements.md 8.2).
export async function checkAndConsumeAction(
  userId: string,
  actionType: ActionType,
): Promise<RateLimitResult> {
  const [{ count: rawCount }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(actionUsage)
    .where(and(eq(actionUsage.userId, userId), gte(actionUsage.createdAt, startOfTodayUTC())));
  // Postgres drivers return count(*) as a numeric string; SQLite returns a
  // real number. Number(...) normalizes both (no-op on the SQLite path).
  const count = Number(rawCount);

  if (count >= env.DAILY_ACTION_LIMIT) {
    return { allowed: false };
  }

  await db.insert(actionUsage).values({ userId, actionType });

  return { allowed: true, remaining: env.DAILY_ACTION_LIMIT - count - 1 };
}
