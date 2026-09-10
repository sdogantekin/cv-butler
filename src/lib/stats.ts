import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { analyses } from "@/db/schema";

export type UserStats = {
  atsReviews: number;
  jobMatches: number;
  coverLetters: number;
};

export async function getUserStats(userId: string): Promise<UserStats> {
  const rows = await db
    .select({ type: analyses.type, count: sql<number>`count(*)` })
    .from(analyses)
    .where(eq(analyses.userId, userId))
    .groupBy(analyses.type);

  // Postgres drivers return count(*) as a numeric string; SQLite returns a
  // real number. Number(...) normalizes both (no-op on the SQLite path).
  const counts = Object.fromEntries(rows.map((row) => [row.type, Number(row.count)]));

  return {
    atsReviews: counts.ats_score ?? 0,
    jobMatches: counts.jd_match ?? 0,
    coverLetters: counts.cover_letter ?? 0,
  };
}
