import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Proxy (formerly "middleware") — route protection only, so it imports the
// lighter authConfig rather than the full auth.ts (which also wires up the
// Drizzle adapter). This works because sessions use the JWT strategy (see
// auth.config.ts): the cookie is self-verifiable, no DB call needed here.
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/dashboard/:path*", "/analyze/:path*", "/api/analyze/:path*"],
};
