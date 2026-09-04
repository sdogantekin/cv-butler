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

const JUMP_CARDS: { tab: DashboardTab; title: string; description: string }[] = [
  { tab: "ats", title: "ATS Review", description: "Score your resume against real ATS systems." },
  { tab: "job", title: "Job Matching", description: "Compare your resume to a job description." },
  { tab: "cover", title: "Cover Letter", description: "Generate a tailored draft from your resume." },
  { tab: "hub", title: "Learning Hub", description: "Guides on formatting, keywords, and ATS." },
];

export function HomeTab({
  userName,
  userEmail,
  onTabChange,
}: {
  userName: string;
  userEmail: string;
  onTabChange: (tab: DashboardTab) => void;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy the link — copy it from your browser's address bar instead.");
    }
  }

  return (
    <div>
      <h1 className="mb-1 text-2xl font-extrabold">Welcome back, {userName}</h1>
      <p className="mb-7 text-sm text-muted-foreground">{userEmail}</p>

      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-4 py-1">
          <div>
            <div className="mb-1 text-sm font-bold">Know someone job hunting?</div>
            <p className="text-xs text-muted-foreground">
              Share this free, open-source tool with a friend.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyLink}>
              {copied ? "Copied!" : "Copy link"}
            </Button>
            <Button asChild size="sm">
              <a href="https://github.com/sdogantekin/cv-butler" target="_blank" rel="noopener noreferrer">
                Star on GitHub
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="mt-8 mb-4 text-base font-bold">Jump back in</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {JUMP_CARDS.map((card) => (
          <Card key={card.tab}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button size="sm" onClick={() => onTabChange(card.tab)}>
                Open
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
