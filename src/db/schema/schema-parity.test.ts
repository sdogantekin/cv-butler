import { describe, expect, it } from "vitest";
import { getTableColumns, getTableName } from "drizzle-orm";
import * as sqliteSchema from "./sqlite";
import * as pgSchema from "./pg";

// The sqlite and pg schema trees are hand-maintained in parallel (Drizzle's
// sqliteTable/pgTable builders can't share one schema module) and nothing at
// compile time catches them drifting apart — see src/db/schema/index.ts and
// src/db/dialect.ts. This test is the one safety net: it can't catch a
// column *type* changing, but it does catch a table or column being renamed,
// added, or removed in only one tree.
const TABLE_KEYS = [
  "users",
  "accounts",
  "sessions",
  "verificationTokens",
  "resumes",
  "analyses",
  "actionUsage",
] as const;

describe.each(TABLE_KEYS)("schema parity: %s", (key) => {
  it("has the same table name in both dialects", () => {
    expect(getTableName(pgSchema[key])).toBe(getTableName(sqliteSchema[key]));
  });

  it("has the same column names in both dialects", () => {
    const sqliteColumns = Object.keys(getTableColumns(sqliteSchema[key])).sort();
    const pgColumns = Object.keys(getTableColumns(pgSchema[key])).sort();
    expect(pgColumns).toEqual(sqliteColumns);
  });
});
