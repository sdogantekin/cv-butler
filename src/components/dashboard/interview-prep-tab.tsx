"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ProcessingIndicator } from "@/components/dashboard/processing-indicator";
import { ResumeDropzone } from "@/components/dashboard/resume-dropzone";
import { InterviewPrepDisplay } from "@/components/analyze/interview-prep-display";
import { trackEvent } from "@/lib/analytics/provider";
import { formatInterviewPrepAsText } from "@/lib/interview-prep-text";
import type { InterviewPrepResult } from "@/lib/schemas/analysis";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { formatMessage } from "@/lib/i18n/format-message";

export type InterviewPrepGenerationResult = {
  interviewPrep: InterviewPrepResult;
  remaining: number;
  // Whether the user gave interviewer details, so the result subtitle can
  // mention the interviewer only when it applies.
  hadInterviewerDetails: boolean;
};

export function InterviewPrepTab({
  result,
  onGenerated,
  onReset,
  dict,
  common,
  processingDict,
  dropzoneDict,
}: {
  result: InterviewPrepGenerationResult | null;
  onGenerated: (result: InterviewPrepGenerationResult) => void;
  onReset: () => void;
  dict: Dictionary["dashboard"]["interviewPrep"];
  common: Dictionary["common"];
  processingDict: Dictionary["processingIndicator"];
  dropzoneDict: Dictionary["resumeDropzone"];
}) {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [interviewerDetails, setInterviewerDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!file || !jobDescriptionText.trim()) return;

    trackEvent("interview_prep_started");
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescriptionText", jobDescriptionText);
      formData.append("interviewerDetails", interviewerDetails);
      const response = await fetch("/api/analyze/interview-prep", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error ?? dict.prepareFailed);
        return;
      }
      onGenerated({
        interviewPrep: data.interviewPrep,
        remaining: data.remaining,
        hadInterviewerDetails: interviewerDetails.trim().length > 0,
      });
      trackEvent("interview_prep_completed");
      toast.success(formatMessage(dict.planReady, { count: data.remaining }));
    } catch {
      toast.error(dict.genericError);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCopy(plan: InterviewPrepResult) {
    try {
      await navigator.clipboard.writeText(formatInterviewPrepAsText(plan, dict));
      trackEvent("interview_prep_exported", { method: "copy" });
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error(dict.copyFailed);
    }
  }

  // Print uses the browser's own dialog, which also offers "Save as PDF" —
  // no PDF library needed. The dashboard chrome and these buttons are hidden
  // via print: styles. The tab title becomes the default PDF file name, so it
  // is swapped for the print and restored afterwards.
  function handlePrint() {
    trackEvent("interview_prep_exported", { method: "print" });
    const previousTitle = document.title;
    document.title = dict.resultTitle;
    window.addEventListener("afterprint", () => (document.title = previousTitle), { once: true });
    window.print();
  }

  return (
    <div className="max-w-3xl">
      {result ? (
        <>
          <h1 className="mb-1.5 text-2xl font-extrabold">{dict.resultTitle}</h1>
          <p className="mb-4 max-w-lg text-sm text-muted-foreground">
            {result.hadInterviewerDetails ? dict.resultSubtitleWithInterviewer : dict.resultSubtitle}
          </p>
          <div className="mb-8 flex flex-wrap gap-2 print:hidden">
            <Button variant="outline" size="sm" onClick={() => handleCopy(result.interviewPrep)}>
              {copied ? common.copied : dict.copyPlan}
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              {dict.printPlan}
            </Button>
          </div>
        </>
      ) : (
        <>
          <h1 className="mb-1.5 text-2xl font-extrabold">{dict.formTitle}</h1>
          <p className="mb-7 max-w-lg text-sm text-muted-foreground">{dict.formSubtitle}</p>
        </>
      )}

      {result ? (
        <div className="flex flex-col gap-8">
          <InterviewPrepDisplay plan={result.interviewPrep} dict={dict} />
          <div className="flex items-center justify-between gap-4 print:hidden">
            <p className="text-xs text-muted-foreground">
              {formatMessage(common.actionsRemainingToday, { count: result.remaining })}
            </p>
            <Button variant="outline" onClick={onReset}>
              {dict.prepareAnother}
            </Button>
          </div>
        </div>
      ) : isSubmitting ? (
        <ProcessingIndicator title={dict.preparing} subtitle={processingDict.subtitle} />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-9">
          <ResumeDropzone file={file} onFileChange={setFile} dict={dropzoneDict} />
          <div className="rounded-xl border border-dashed p-8">
            <div className="mb-2 text-sm font-semibold">
              {dict.jobDescriptionLabel}{" "}
              <span className="text-xs font-medium text-muted-foreground">{dict.jobDescriptionRequired}</span>
            </div>
            <Textarea
              rows={5}
              placeholder={dict.jobDescriptionPlaceholder}
              value={jobDescriptionText}
              onChange={(e) => setJobDescriptionText(e.target.value)}
            />
          </div>
          <div className="rounded-xl border border-dashed p-8">
            <div className="mb-2 text-sm font-semibold">
              {dict.interviewerLabel}{" "}
              <span className="text-xs font-medium text-muted-foreground">{dict.interviewerOptional}</span>
            </div>
            <p className="mb-3 text-xs text-muted-foreground">{dict.interviewerNotice}</p>
            <Textarea
              rows={3}
              placeholder={dict.interviewerPlaceholder}
              value={interviewerDetails}
              onChange={(e) => setInterviewerDetails(e.target.value)}
            />
          </div>
          <Button type="submit" size="lg" disabled={!file || !jobDescriptionText.trim()}>
            {dict.prepareButton}
          </Button>
        </form>
      )}
    </div>
  );
}
