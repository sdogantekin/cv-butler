import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

// Only public, indexable pages — /dashboard and /auth are auth-gated and
// deliberately excluded (see robots.ts).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: env.SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${env.SITE_URL}/learning-hub`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
