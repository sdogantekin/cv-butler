"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProcessingIndicator } from "@/components/dashboard/processing-indicator";
import { ResumeDropzone } from "@/components/dashboard/resume-dropzone";
import { MatchDisplay } from "@/components/analyze/match-display";
import { MatchDiffDisplay } from "@/components/analyze/match-diff-display";
import { trackEvent } from "@/lib/analytics/provider";
import type { JdMatchResult, MatchDiffResult, Recommendation } from "@/lib/schemas/analysis";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { formatMessage } from "@/lib/i18n/format-message";

export type JobMatchResult = {
  jdMatch: JdMatchResult;
  recommendations: Recommendation[];
  remaining: number;
};

type ResultView = "summary" | "compareForm" | "comparing" | "diff";

export function JobMatchTab({
  matchResult,
  onMatched,
  onReset,
  dict,
  common,
  severity,
  processingDict,
  dropzoneDict,
}: {
  matchResult: JobMatchResult | null;
  onMatched: (result: JobMatchResult) => void;
  onReset: () => void;
  dict: Dictionary["dashboard"]["jobMatching"];
  common: Dictionary["common"];
  severity: Dictionary["severity"];
  processingDict: Dictionary["processingIndicator"];
  dropzoneDict: Dictionary["resumeDropzone"];
}) {
  const [file, setFile] = useState<File | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [resultView, setResultView] = useState<ResultView>("summary");
  const [compareFile, setCompareFile] = useState<File | null>(null);
  const [diffResult, setDiffResult] = useState<MatchDiffResult | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);

  function handleReset() {
    setResultView("summary");
    setCompareFile(null);
    setDiffResult(null);
    setRemaining(null);
    onReset();
  }

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
        toast.error(data.error ?? dict.matchFailed);
        return;
      }
      onMatched(data as JobMatchResult);
      trackEvent("job_match_completed", { score: (data as JobMatchResult).jdMatch.overallScore });
      toast.success(formatMessage(dict.matchReady, { count: data.remaining }));
    } catch {
      toast.error(dict.genericError);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCompareSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!compareFile || !matchResult) return;

    trackEvent("job_match_compare_started");
    setResultView("comparing");
    try {
      const formData = new FormData();
      formData.append("resume", compareFile);
      formData.append("companyName", companyName);
      formData.append("jobDescriptionText", jobDescriptionText);
      formData.append("previousJdMatch", JSON.stringify(matchResult.jdMatch));
      const response = await fetch("/api/analyze/match-upload", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error ?? dict.compareForm.compareFailed);
        setResultView("compareForm");
        return;
      }
      setDiffResult(data.matchDiff as MatchDiffResult);
      setRemaining(data.remaining as number);
      setResultView("diff");
      trackEvent("job_match_compare_completed", { scoreDelta: data.matchDiff.overallDelta });
    } catch {
      toast.error(dict.compareForm.compareGenericError);
      setResultView("compareForm");
    }
  }

  const isResultView = matchResult && resultView === "summary";

  return (
    <div className="max-w-2xl">
      <h1 className="mb-1.5 text-2xl font-extrabold">{isResultView ? dict.resultTitle : dict.formTitle}</h1>
      <p className="mb-7 max-w-lg text-sm text-muted-foreground">
        {isResultView ? dict.resultSubtitle : dict.formSubtitle}
      </p>

      {matchResult && resultView === "summary" && (
        <div className="flex flex-col gap-5">
          <MatchDisplay
            jdMatch={matchResult.jdMatch}
            recommendations={matchResult.recommendations}
            onCompareClick={() => setResultView("compareForm")}
            dict={dict}
            severity={severity}
          />
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              {formatMessage(common.actionsRemainingToday, { count: matchResult.remaining })}
            </p>
            <Button variant="outline" onClick={handleReset}>
              {dict.startNewMatch}
            </Button>
          </div>
        </div>
      )}

      {matchResult && resultView === "compareForm" && (
        <form onSubmit={handleCompareSubmit} className="flex flex-col gap-9">
          <div>
            <h2 className="mb-1.5 text-lg font-bold">{dict.compareForm.title}</h2>
            <p className="mb-5 text-sm text-muted-foreground">{dict.compareForm.description}</p>
            <ResumeDropzone file={compareFile} onFileChange={setCompareFile} dict={dropzoneDict} />
          </div>
          <div className="flex items-center gap-3">
            <Button type="submit" size="lg" disabled={!compareFile}>
              {dict.compareForm.compareButton}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => setResultView("summary")}
            >
              {dict.compareForm.cancel}
            </Button>
          </div>
        </form>
      )}

      {matchResult && resultView === "comparing" && (
        <ProcessingIndicator title={dict.compareForm.comparing} subtitle={processingDict.subtitle} />
      )}

      {matchResult && resultView === "diff" && diffResult && (
        <div className="flex flex-col gap-5">
          <MatchDiffDisplay diff={diffResult} dict={dict.diff} dimensionNames={dict.dimensionNames} />
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              {formatMessage(common.actionsRemainingToday, { count: remaining ?? 0 })}
            </p>
            <Button variant="outline" onClick={handleReset}>
              {dict.startNewMatch}
            </Button>
          </div>
        </div>
      )}

      {!matchResult &&
        (isSubmitting ? (
          <ProcessingIndicator title={dict.matching} subtitle={processingDict.subtitle} />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-9">
            <ResumeDropzone file={file} onFileChange={setFile} dict={dropzoneDict} />
            <div className="rounded-xl border border-dashed p-8">
              <div className="mb-6">
                <div className="mb-2 text-sm font-semibold">
                  {dict.companyNameLabel}{" "}
                  <span className="text-xs font-medium text-muted-foreground">{dict.companyNameOptional}</span>
                </div>
                <Input
                  placeholder={dict.companyNamePlaceholder}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div>
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
            </div>
            <Button type="submit" size="lg" disabled={!file || !jobDescriptionText.trim()}>
              {dict.startMatching}
            </Button>
          </form>
        ))}
    </div>
  );
}
