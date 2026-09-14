import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

// /dashboard and /auth are auth-gated with no content for a crawler to
// index; /api is never page content. Everything else (landing, learning
// hub) is public marketing/education content, meant to be indexed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/auth", "/api"],
    },
    sitemap: `${env.SITE_URL}/sitemap.xml`,
  };
}
