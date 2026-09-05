import { env } from "@/lib/env";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Everything an analytics-configured root layout needs to know at render
// time. A second provider adds a member to this union, not a rewrite.
export type AnalyticsConfig = { provider: "google"; measurementId: string };

// Server-only. Call this ONLY from Server Components (src/app/layout.tsx) —
// ANALYTICS_PROVIDER is a server-only env var; reading it from a "use client"
// component throws (see src/lib/env.ts's Proxy guard). This is why analytics
// needs two separate switches instead of one shared one like getChatModel():
// LLM calls are 100% server-side, but analytics dispatch (trackEvent /
// trackPageview below) is 100% client-side, so it keys off the client-safe
// NEXT_PUBLIC_GA_MEASUREMENT_ID instead.
export function getAnalyticsConfig(): AnalyticsConfig | null {
  switch (env.ANALYTICS_PROVIDER) {
    case "google":
      if (!env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
        throw new Error(
          "ANALYTICS_PROVIDER=google requires NEXT_PUBLIC_GA_MEASUREMENT_ID to be set.",
        );
      }
      return { provider: "google", measurementId: env.NEXT_PUBLIC_GA_MEASUREMENT_ID };
    case undefined:
      return null;
    default:
      throw new Error(`Unsupported ANALYTICS_PROVIDER: ${env.ANALYTICS_PROVIDER}`);
  }
}

// Client-safe. No-ops entirely when analytics isn't configured, and no-ops
// (rather than throwing) if gtag.js hasn't finished loading yet.
export function trackEvent(name: string, params?: Record<string, string | number | boolean>): void {
  if (!env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

export function trackPageview(path: string): void {
  if (!env.NEXT_PUBLIC_GA_MEASUREMENT_ID) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", { page_path: path });
}
