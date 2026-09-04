import * as sqliteSchema from "./sqlite";
import * as pgSchema from "./pg";
import { usingPostgres } from "../dialect";

// Both trees are kept structurally identical (same table/column names) by
// construction — see ./schema-parity.test.ts. Typing the runtime-selected
// export against the sqlite tree keeps every call site (db.select/insert/
// query...) type-checking against one consistent shape regardless of which
// dialect is active; the underlying objects are always the correct dialect's
// since this branches on the exact same flag as src/db/index.ts.
const schema = (usingPostgres ? pgSchema : sqliteSchema) as unknown as typeof sqliteSchema;

export const { users, accounts, sessions, verificationTokens, resumes, analyses, actionUsage } = schema;

export default schema;
