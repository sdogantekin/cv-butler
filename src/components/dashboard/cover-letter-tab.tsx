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

export type CoverLetterGenerationResult = {
  coverLetter: CoverLetterResult;
  remaining: number;
};

export function CoverLetterTab({
  result,
  onGenerated,
  onReset,
}: {
  result: CoverLetterGenerationResult | null;
  onGenerated: (result: CoverLetterGenerationResult) => void;
  onReset: () => void;
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
        toast.error(data.error ?? "Failed to generate cover letter");
        return;
      }
      onGenerated(data as CoverLetterGenerationResult);
      trackEvent("cover_letter_completed", {
        variant: (data as CoverLetterGenerationResult).coverLetter.variant,
      });
      toast.success(`Cover letter ready. ${data.remaining} action(s) left today.`);
    } catch {
      toast.error("Something went wrong while generating the cover letter.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl">
      {result ? (
        <>
          <h1 className="mb-1.5 text-2xl font-extrabold">Your Cover Letter</h1>
          <p className="mb-7 max-w-lg text-sm text-muted-foreground">
            Here&apos;s the draft generated from your resume.
          </p>
        </>
      ) : (
        <>
          <h1 className="mb-1.5 text-2xl font-extrabold">Cover Letter Generation</h1>
          <p className="mb-7 max-w-lg text-sm text-muted-foreground">
            Generate a tailored draft using your resume, with a job description as an optional
            add-on for tighter targeting.
          </p>
        </>
      )}

      {result ? (
        <div className="flex flex-col gap-5">
          <CoverLetterDisplay coverLetter={result.coverLetter} />
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              {result.remaining} action(s) remaining today
            </p>
            <Button variant="outline" onClick={onReset}>
              Generate another
            </Button>
          </div>
        </div>
      ) : isSubmitting ? (
        <ProcessingIndicator title="Writing your cover letter…" />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-9">
          <ResumeDropzone file={file} onFileChange={setFile} />
          <div className="rounded-xl border border-dashed p-8">
            <div className="mb-2 text-sm font-semibold">
              Job description{" "}
              <span className="text-xs font-medium text-muted-foreground">(optional)</span>
            </div>
            <p className="mb-3 text-xs text-muted-foreground">
              Leave blank for a general cover letter, or paste a job description for one tailored
              to it.
            </p>
            <Textarea
              rows={5}
              placeholder="Paste the job description here"
              value={jobDescriptionText}
              onChange={(e) => setJobDescriptionText(e.target.value)}
            />
          </div>
          <Button type="submit" size="lg" disabled={!file}>
            Generate cover letter
          </Button>
        </form>
      )}
    </div>
  );
}
