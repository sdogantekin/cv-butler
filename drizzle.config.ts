import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema/index.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.SQLITE_DB_PATH ?? "./local.db",
  },
});
