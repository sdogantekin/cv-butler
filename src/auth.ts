import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { env } from "@/lib/env";
import { authConfig } from "./auth.config";

// Full config: imports the Drizzle adapter/db client (Node-only, via
// better-sqlite3), used by Server Components, Route Handlers, and Server
// Actions. proxy.ts intentionally imports only the lighter auth.config.ts —
// see the comment there for why.
// v1 ships Google login only; Facebook/Apple are deferred to v4+, but the
// providers array stays a plain list so adding one later is additive.
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter(db),
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
  ],
});
