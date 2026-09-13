"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { DashboardTab } from "@/components/dashboard/sidebar";
import type { UserStats } from "@/lib/stats";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { formatMessage } from "@/lib/i18n/format-message";

export function HomeTab({
  userName,
  userEmail,
  stats,
  onTabChange,
  dict,
  common,
}: {
  userName: string;
  userEmail: string;
  stats: UserStats;
  onTabChange: (tab: DashboardTab) => void;
  dict: Dictionary["dashboard"]["home"];
  common: Dictionary["common"];
}) {
  const [copied, setCopied] = useState(false);

  const STAT_ITEMS: { key: keyof UserStats; label: string }[] = [
    { key: "atsReviews", label: dict.statsAtsReviews },
    { key: "jobMatches", label: dict.statsJobMatches },
    { key: "coverLetters", label: dict.statsCoverLetters },
  ];

  const JUMP_CARDS: { tab: DashboardTab; title: string; description: string }[] = [
    { tab: "ats", title: dict.cards.atsReview.title, description: dict.cards.atsReview.description },
    { tab: "job", title: dict.cards.jobMatching.title, description: dict.cards.jobMatching.description },
    { tab: "cover", title: dict.cards.coverLetter.title, description: dict.cards.coverLetter.description },
    { tab: "hub", title: dict.cards.learningHub.title, description: dict.cards.learningHub.description },
  ];

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error(dict.copyLinkFailed);
    }
  }

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold">{formatMessage(dict.welcomeBack, { name: userName })}</h1>
      <p className="mb-7 text-sm text-muted-foreground">{userEmail}</p>

      <div className="mb-7 grid gap-4 sm:grid-cols-3">
        {STAT_ITEMS.map((item) => (
          <div key={item.key} className="rounded-xl border p-5">
            <div className="text-2xl font-extrabold">{stats[item.key]}</div>
            <div className="text-sm text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-4 py-1">
          <div>
            <div className="mb-1 text-sm font-bold">{dict.shareTitle}</div>
            <p className="text-xs text-muted-foreground">{dict.shareDescription}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyLink}>
              {copied ? common.copied : dict.copyLink}
            </Button>
            <Button asChild size="sm">
              <a href="https://github.com/sdogantekin/cv-butler" target="_blank" rel="noopener noreferrer">
                {dict.starOnGithub}
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="mt-8 mb-4 text-base font-bold">{dict.jumpBackIn}</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {JUMP_CARDS.map((card) => (
          <Card key={card.tab}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button size="sm" onClick={() => onTabChange(card.tab)}>
                {dict.open}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
