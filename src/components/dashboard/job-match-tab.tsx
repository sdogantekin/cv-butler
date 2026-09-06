"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProcessingIndicator } from "@/components/dashboard/processing-indicator";
import { ResumeDropzone } from "@/components/dashboard/resume-dropzone";
import { MatchDisplay } from "@/components/analyze/match-display";
import { trackEvent } from "@/lib/analytics/provider";
import type { JdMatchResult, Recommendation } from "@/lib/schemas/analysis";

export type JobMatchResult = {
  jdMatch: JdMatchResult;
  recommendations: Recommendation[];
  remaining: number;
};

export function JobMatchTab({
  matchResult,
  onMatched,
  onReset,
}: {
  matchResult: JobMatchResult | null;
  onMatched: (result: JobMatchResult) => void;
  onReset: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!file || !jobDescriptionText.trim()) return;

    trackEvent("job_match_started");
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("companyName", companyName);
      formData.append("jobDescriptionText", jobDescriptionText);
      const response = await fetch("/api/analyze/match-upload", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error ?? "Failed to match job description");
        return;
      }
      onMatched(data as JobMatchResult);
      trackEvent("job_match_completed", { score: (data as JobMatchResult).jdMatch.overallScore });
      toast.success(`Match ready. ${data.remaining} action(s) left today.`);
    } catch {
      toast.error("Something went wrong while matching the job description.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-1.5 text-2xl font-extrabold">Job Matching</h1>
      <p className="mb-7 max-w-lg text-sm text-muted-foreground">
        Upload your resume and paste a job description to see how well it matches and what to
        adjust.
      </p>

      {matchResult ? (
        <div className="flex flex-col gap-5">
          <MatchDisplay jdMatch={matchResult.jdMatch} recommendations={matchResult.recommendations} />
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              {matchResult.remaining} action(s) remaining today
            </p>
            <Button variant="outline" onClick={onReset}>
              Start new match
            </Button>
          </div>
        </div>
      ) : isSubmitting ? (
        <ProcessingIndicator title="Comparing your resume to the job description…" />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-9">
          <ResumeDropzone file={file} onFileChange={setFile} />
          <div className="rounded-xl border border-dashed p-8">
            <div className="mb-6">
              <div className="mb-2 text-sm font-semibold">
                Company name{" "}
                <span className="text-xs font-medium text-muted-foreground">(optional)</span>
              </div>
              <Input
                placeholder="e.g. Acme Corp"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 text-sm font-semibold">
                Job description{" "}
                <span className="text-xs font-medium text-muted-foreground">(required)</span>
              </div>
              <Textarea
                rows={5}
                placeholder="Paste the job description here"
                value={jobDescriptionText}
                onChange={(e) => setJobDescriptionText(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" size="lg" disabled={!file || !jobDescriptionText.trim()}>
            Start matching
          </Button>
        </form>
      )}
    </div>
  );
}
