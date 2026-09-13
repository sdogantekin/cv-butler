"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Sidebar, type DashboardTab } from "@/components/dashboard/sidebar";
import { HomeTab } from "@/components/dashboard/home-tab";
import { AtsTab } from "@/components/dashboard/ats-tab";
import { JobMatchTab, type JobMatchResult } from "@/components/dashboard/job-match-tab";
import {
  CoverLetterTab,
  type CoverLetterGenerationResult,
} from "@/components/dashboard/cover-letter-tab";
import { LearningHubTab } from "@/components/dashboard/learning-hub-tab";
import type { ScoreResult } from "@/components/analyze/upload-form";
import type { UserStats } from "@/lib/stats";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function DashboardShell({
  userName,
  userEmail,
  stats,
  locale,
  dict,
  logoutAction,
}: {
  userName: string;
  userEmail: string;
  stats: UserStats;
  locale: Locale;
  dict: Dictionary;
  logoutAction: () => Promise<void>;
}) {
  const [tab, setTab] = useState<DashboardTab>("home");
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [matchResult, setMatchResult] = useState<JobMatchResult | null>(null);
  const [coverLetterResult, setCoverLetterResult] = useState<CoverLetterGenerationResult | null>(
    null,
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <DashboardHeader
        locale={locale}
        dict={dict.languageSwitcher}
        onMenuClick={() => setMobileNavOpen(true)}
      />
      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar
          activeTab={tab}
          onTabChange={setTab}
          userName={userName}
          logoutAction={logoutAction}
          mobileOpen={mobileNavOpen}
          onCloseMobile={() => setMobileNavOpen(false)}
          dict={dict.dashboard.sidebar}
          logOutLabel={dict.common.logOut}
        />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 lg:px-12 lg:py-10">
          {tab === "home" && (
            <HomeTab
              userName={userName}
              userEmail={userEmail}
              stats={stats}
              onTabChange={setTab}
              dict={dict.dashboard.home}
              common={dict.common}
            />
          )}
          {tab === "ats" && (
            <AtsTab
              scoreResult={scoreResult}
              onScored={setScoreResult}
              onReset={() => setScoreResult(null)}
              dict={dict.dashboard.atsReview}
              common={dict.common}
              processingDict={dict.processingIndicator}
              dropzoneDict={dict.resumeDropzone}
            />
          )}
          {tab === "job" && (
            <JobMatchTab
              matchResult={matchResult}
              onMatched={setMatchResult}
              onReset={() => setMatchResult(null)}
              dict={dict.dashboard.jobMatching}
              common={dict.common}
              severity={dict.severity}
              processingDict={dict.processingIndicator}
              dropzoneDict={dict.resumeDropzone}
            />
          )}
          {tab === "cover" && (
            <CoverLetterTab
              result={coverLetterResult}
              onGenerated={setCoverLetterResult}
              onReset={() => setCoverLetterResult(null)}
              dict={dict.dashboard.coverLetter}
              common={dict.common}
              processingDict={dict.processingIndicator}
              dropzoneDict={dict.resumeDropzone}
            />
          )}
          {tab === "hub" && <LearningHubTab dict={dict.dashboard.learningHub} />}
        </main>
      </div>
    </div>
  );
}
