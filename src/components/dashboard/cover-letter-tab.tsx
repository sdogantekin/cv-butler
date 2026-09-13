"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ProcessingIndicator } from "@/components/dashboard/processing-indicator";
import { ResumeDropzone } from "@/components/dashboard/resume-dropzone";
import { CoverLetterDisplay } from "@/components/analyze/cover-letter-display";
import { trackEvent } from "@/lib/analytics/provider";
import type { CoverLetterResult } from "@/lib/schemas/analysis";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { formatMessage } from "@/lib/i18n/format-message";

export type CoverLetterGenerationResult = {
  coverLetter: CoverLetterResult;
  remaining: number;
};

export function CoverLetterTab({
  result,
  onGenerated,
  onReset,
  dict,
  common,
  processingDict,
  dropzoneDict,
}: {
  result: CoverLetterGenerationResult | null;
  onGenerated: (result: CoverLetterGenerationResult) => void;
  onReset: () => void;
  dict: Dictionary["dashboard"]["coverLetter"];
  common: Dictionary["common"];
  processingDict: Dictionary["processingIndicator"];
  dropzoneDict: Dictionary["resumeDropzone"];
}) {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!file) return;

    trackEvent("cover_letter_started");
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescriptionText", jobDescriptionText);
      const response = await fetch("/api/analyze/cover-letter", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error ?? dict.generateFailed);
        return;
      }
      onGenerated(data as CoverLetterGenerationResult);
      trackEvent("cover_letter_completed", {
        variant: (data as CoverLetterGenerationResult).coverLetter.variant,
      });
      toast.success(formatMessage(dict.letterReady, { count: data.remaining }));
    } catch {
      toast.error(dict.genericError);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl">
      {result ? (
        <>
          <h1 className="mb-1.5 text-2xl font-extrabold">{dict.resultTitle}</h1>
          <p className="mb-7 max-w-lg text-sm text-muted-foreground">{dict.resultSubtitle}</p>
        </>
      ) : (
        <>
          <h1 className="mb-1.5 text-2xl font-extrabold">{dict.formTitle}</h1>
          <p className="mb-7 max-w-lg text-sm text-muted-foreground">{dict.formSubtitle}</p>
        </>
      )}

      {result ? (
        <div className="flex flex-col gap-5">
          <CoverLetterDisplay coverLetter={result.coverLetter} dict={dict} common={common} />
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              {formatMessage(common.actionsRemainingToday, { count: result.remaining })}
            </p>
            <Button variant="outline" onClick={onReset}>
              {dict.generateAnother}
            </Button>
          </div>
        </div>
      ) : isSubmitting ? (
        <ProcessingIndicator title={dict.writing} subtitle={processingDict.subtitle} />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-9">
          <ResumeDropzone file={file} onFileChange={setFile} dict={dropzoneDict} />
          <div className="rounded-xl border border-dashed p-8">
            <div className="mb-2 text-sm font-semibold">
              {dict.jobDescriptionLabel}{" "}
              <span className="text-xs font-medium text-muted-foreground">{dict.jobDescriptionOptional}</span>
            </div>
            <p className="mb-3 text-xs text-muted-foreground">{dict.jobDescriptionHint}</p>
            <Textarea
              rows={5}
              placeholder={dict.jobDescriptionPlaceholder}
              value={jobDescriptionText}
              onChange={(e) => setJobDescriptionText(e.target.value)}
            />
          </div>
          <Button type="submit" size="lg" disabled={!file}>
            {dict.generateButton}
          </Button>
        </form>
      )}
    </div>
  );
}
