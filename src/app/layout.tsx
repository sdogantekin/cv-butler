import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { getAnalyticsConfig } from "@/lib/analytics/provider";
import { GoogleAnalyticsScripts } from "@/components/analytics/google-analytics-scripts";
import { AnalyticsPageviewTracker } from "@/components/analytics/analytics-pageview-tracker";
import { getLocale } from "@/lib/i18n/locale-cookie";
import { env } from "@/lib/env";
import "./globals.css";

// latin-ext covers Turkish-specific characters (ğ, ş, ı, İ) that fall
// outside the base latin subset — without it those glyphs silently fall
// back to a different system font.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

const TITLE = "CV Butler";
const DESCRIPTION =
  "Open-source, AI-powered career assistant: ATS scoring, resume matching, and cover letter generation.";

export const metadata: Metadata = {
  metadataBase: new URL(env.SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: TITLE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const analytics = getAnalyticsConfig();
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
        {analytics && (
          <>
            {analytics.provider === "google" && (
              <GoogleAnalyticsScripts measurementId={analytics.measurementId} />
            )}
            <Suspense fallback={null}>
              <AnalyticsPageviewTracker />
            </Suspense>
          </>
        )}
      </body>
    </html>
  );
}
