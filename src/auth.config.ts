import type { NextAuthConfig } from "next-auth";

// Edge-safe subset only: no adapter, no provider secrets, no db import.
// better-sqlite3 (used by the Drizzle adapter in auth.ts) is a Node-only
// native addon and cannot run in Edge middleware, so middleware.ts must
// import only this file, never the full config in auth.ts.
export const authConfig = {
  pages: {
    signIn: "/auth/signin",
  },
  // JWT (not database) sessions: the session cookie is self-verifiable, so
  // route protection in proxy.ts doesn't need a DB round-trip on every
  // request. (Next.js 16 runs Proxy on the Node.js runtime by default, so
  // reaching the Drizzle/better-sqlite3 adapter from there would actually
  // work too — this is a deliberate choice, not an Edge-runtime workaround.)
  // The adapter (in auth.ts) still handles user/account storage and OAuth
  // account linking — combining an adapter with JWT sessions is an
  // explicitly supported Auth.js configuration.
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = request.nextUrl.pathname.startsWith("/dashboard");
      if (isProtected) return isLoggedIn;
      return true;
    },
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      return session;
    },
  },
} satisfies NextAuthConfig;
