import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { getAnalyticsConfig } from "@/lib/analytics/provider";
import { GoogleAnalyticsScripts } from "@/components/analytics/google-analytics-scripts";
import { AnalyticsPageviewTracker } from "@/components/analytics/analytics-pageview-tracker";
import { getLocale } from "@/lib/i18n/locale-cookie";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CV Butler",
  description: "Open-source, AI-powered career assistant: ATS scoring, resume matching, and cover letter generation.",
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
