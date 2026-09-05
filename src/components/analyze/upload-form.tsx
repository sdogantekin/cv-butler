"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ProcessingIndicator } from "@/components/dashboard/processing-indicator";
import { ResumeDropzone } from "@/components/dashboard/resume-dropzone";
import { trackEvent } from "@/lib/analytics/provider";
import type { ParsedResume } from "@/lib/schemas/resume";
import type { AtsScoreResult, Recommendation } from "@/lib/schemas/analysis";

export type ScoreResult = {
  resumeId: string;
  parsedResume: ParsedResume;
  atsScore: AtsScoreResult;
  recommendations: Recommendation[];
  remaining: number;
};

export function UploadForm({ onScored }: { onScored: (result: ScoreResult) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!file) return;

    trackEvent("ats_review_started");
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      const response = await fetch("/api/analyze/score", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error ?? "Failed to analyze resume");
        return;
      }
      onScored(data as ScoreResult);
      trackEvent("ats_review_completed", { score: (data as ScoreResult).atsScore.overallScore });
      toast.success(`ATS score ready. ${data.remaining} action(s) left today.`);
    } catch {
      toast.error("Something went wrong while analyzing your resume.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitting) {
    return <ProcessingIndicator title="Analyzing your resume against ATS systems…" />;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-9">
      <ResumeDropzone file={file} onFileChange={setFile} />
      <Button type="submit" size="lg" disabled={!file}>
        Start ATS Review
      </Button>
    </form>
  );
}
