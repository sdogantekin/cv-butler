"use client";

import { Button } from "@/components/ui/button";
import { UploadForm, type ScoreResult } from "@/components/analyze/upload-form";
import { ScoreDisplay } from "@/components/analyze/score-display";

export function AtsTab({
  scoreResult,
  onScored,
  onReset,
}: {
  scoreResult: ScoreResult | null;
  onScored: (result: ScoreResult) => void;
  onReset: () => void;
}) {
  return (
    <div className="max-w-2xl">
      <h1 className="mb-1.5 text-2xl font-extrabold">ATS Review</h1>
      <p className="mb-7 max-w-lg text-sm text-muted-foreground">
        Upload your resume to get a 0–100 score with a plain-language breakdown of formatting
        issues, missing keywords, and quick fixes.
      </p>

      {scoreResult ? (
        <div className="flex flex-col gap-5">
          <ScoreDisplay atsScore={scoreResult.atsScore} recommendations={scoreResult.recommendations} />
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              {scoreResult.remaining} action(s) remaining today
            </p>
            <Button variant="outline" onClick={onReset}>
              Run another review
            </Button>
          </div>
        </div>
      ) : (
        <UploadForm onScored={onScored} />
      )}
    </div>
  );
}
