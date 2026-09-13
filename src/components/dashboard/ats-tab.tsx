"use client";

import { Button } from "@/components/ui/button";
import { UploadForm, type ScoreResult } from "@/components/analyze/upload-form";
import { ScoreDisplay } from "@/components/analyze/score-display";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { formatMessage } from "@/lib/i18n/format-message";

export function AtsTab({
  scoreResult,
  onScored,
  onReset,
  dict,
  common,
  processingDict,
  dropzoneDict,
}: {
  scoreResult: ScoreResult | null;
  onScored: (result: ScoreResult) => void;
  onReset: () => void;
  dict: Dictionary["dashboard"]["atsReview"];
  common: Dictionary["common"];
  processingDict: Dictionary["processingIndicator"];
  dropzoneDict: Dictionary["resumeDropzone"];
}) {
  return (
    <div className="max-w-2xl">
      {!scoreResult && (
        <>
          <h1 className="mb-1.5 text-2xl font-extrabold">{dict.formTitle}</h1>
          <p className="mb-7 max-w-lg text-sm text-muted-foreground">{dict.formSubtitle}</p>
        </>
      )}

      {scoreResult ? (
        <div className="flex flex-col gap-5">
          <ScoreDisplay
            atsScore={scoreResult.atsScore}
            recommendations={scoreResult.recommendations}
            dict={dict}
          />
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              {formatMessage(common.actionsRemainingToday, { count: scoreResult.remaining })}
            </p>
            <Button variant="outline" onClick={onReset}>
              {dict.runAnotherReview}
            </Button>
          </div>
        </div>
      ) : (
        <UploadForm onScored={onScored} dict={dict} processingDict={processingDict} dropzoneDict={dropzoneDict} />
      )}
    </div>
  );
}
