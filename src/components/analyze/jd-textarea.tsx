"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { JdMatchResult, Recommendation } from "@/lib/schemas/analysis";

export type MatchResult = {
  jdMatch: JdMatchResult;
  recommendations: Recommendation[];
  remaining: number;
};

export function JdForm({
  resumeId,
  onMatched,
}: {
  resumeId: string;
  onMatched: (result: MatchResult) => void;
}) {
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!jobDescriptionText.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/analyze/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId, jobDescriptionText }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error ?? "Failed to match job description");
        return;
      }
      onMatched(data as MatchResult);
      toast.success(`Match ready. ${data.remaining} action(s) left today.`);
    } catch {
      toast.error("Something went wrong while matching the job description.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Label htmlFor="jd">Job description</Label>
      <Textarea
        id="jd"
        rows={8}
        placeholder="Paste the job description text here..."
        value={jobDescriptionText}
        onChange={(e) => setJobDescriptionText(e.target.value)}
      />
      <Button type="submit" disabled={!jobDescriptionText.trim() || isSubmitting} className="w-fit">
        {isSubmitting ? "Matching..." : "Match Job Description"}
      </Button>
    </form>
  );
}
