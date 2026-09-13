"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ProcessingIndicator } from "@/components/dashboard/processing-indicator";
import { ResumeDropzone } from "@/components/dashboard/resume-dropzone";
import { trackEvent } from "@/lib/analytics/provider";
import type { ParsedResume } from "@/lib/schemas/resume";
import type { AtsScoreResult, Recommendation } from "@/lib/schemas/analysis";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { formatMessage } from "@/lib/i18n/format-message";

export type ScoreResult = {
  resumeId: string;
  parsedResume: ParsedResume;
  atsScore: AtsScoreResult;
  recommendations: Recommendation[];
  remaining: number;
};

export function UploadForm({
  onScored,
  dict,
  processingDict,
  dropzoneDict,
}: {
  onScored: (result: ScoreResult) => void;
  dict: Dictionary["dashboard"]["atsReview"];
  processingDict: Dictionary["processingIndicator"];
  dropzoneDict: Dictionary["resumeDropzone"];
}) {
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
        toast.error(data.error ?? dict.analyzeFailed);
        return;
      }
      onScored(data as ScoreResult);
      trackEvent("ats_review_completed", { score: (data as ScoreResult).atsScore.overallScore });
      toast.success(formatMessage(dict.scoreReady, { count: data.remaining }));
    } catch {
      toast.error(dict.genericError);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitting) {
    return <ProcessingIndicator title={dict.analyzing} subtitle={processingDict.subtitle} />;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-9">
      <ResumeDropzone file={file} onFileChange={setFile} dict={dropzoneDict} />
      <Button type="submit" size="lg" disabled={!file}>
        {dict.startReview}
      </Button>
    </form>
  );
}
