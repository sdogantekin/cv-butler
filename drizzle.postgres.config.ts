import { defineConfig } from "drizzle-kit";

// Production (Postgres/Neon on Vercel) config — see drizzle.config.ts for the
// local SQLite default. Migrations are generated/applied against this config
// only via `db:generate:pg`/`db:migrate:pg` (never `push`, unlike the local
// SQLite flow) — see package.json's `vercel-build` script.
export default defineConfig({
  out: "./src/db/migrations-postgres",
  schema: "./src/db/schema/pg/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});
