"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Sidebar, type DashboardTab } from "@/components/dashboard/sidebar";
import { HomeTab } from "@/components/dashboard/home-tab";
import { AtsTab } from "@/components/dashboard/ats-tab";
import { JobMatchTab, type JobMatchResult } from "@/components/dashboard/job-match-tab";
import { CoverLetterTab } from "@/components/dashboard/cover-letter-tab";
import { LearningHubTab } from "@/components/dashboard/learning-hub-tab";
import type { ScoreResult } from "@/components/analyze/upload-form";

export function DashboardShell({
  userName,
  userEmail,
  logoutAction,
}: {
  userName: string;
  userEmail: string;
  logoutAction: () => Promise<void>;
}) {
  const [tab, setTab] = useState<DashboardTab>("home");
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [matchResult, setMatchResult] = useState<JobMatchResult | null>(null);

  return (
    <div className="flex min-h-screen flex-1 flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <Sidebar
          activeTab={tab}
          onTabChange={setTab}
          userName={userName}
          logoutAction={logoutAction}
        />
        <main className="min-w-0 flex-1 px-12 py-10">
          {tab === "home" && (
            <HomeTab userName={userName} userEmail={userEmail} onTabChange={setTab} />
          )}
          {tab === "ats" && (
            <AtsTab
              scoreResult={scoreResult}
              onScored={setScoreResult}
              onReset={() => setScoreResult(null)}
            />
          )}
          {tab === "job" && (
            <JobMatchTab
              matchResult={matchResult}
              onMatched={setMatchResult}
              onReset={() => setMatchResult(null)}
            />
          )}
          {tab === "cover" && <CoverLetterTab />}
          {tab === "hub" && <LearningHubTab />}
        </main>
      </div>
    </div>
  );
}
