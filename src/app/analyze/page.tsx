"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadForm, type ScoreResult } from "@/components/analyze/upload-form";
import { JdForm, type MatchResult } from "@/components/analyze/jd-textarea";
import { ScoreDisplay } from "@/components/analyze/score-display";
import { MatchDisplay } from "@/components/analyze/match-display";

export default function AnalyzePage() {
  const [scoreResult, setScoreResult] = useState<ScoreResult | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-16">
      <h1 className="text-2xl font-semibold">Analyze your resume</h1>

      <Tabs defaultValue="score">
        <TabsList>
          <TabsTrigger value="score">ATS Score</TabsTrigger>
          <TabsTrigger value="match" disabled={!scoreResult}>
            Job Match
          </TabsTrigger>
        </TabsList>

        <TabsContent value="score" className="flex flex-col gap-6">
          <UploadForm onScored={setScoreResult} />
          {scoreResult && (
            <ScoreDisplay
              atsScore={scoreResult.atsScore}
              recommendations={scoreResult.recommendations}
            />
          )}
        </TabsContent>

        <TabsContent value="match" className="flex flex-col gap-6">
          {scoreResult ? (
            <JdForm resumeId={scoreResult.resumeId} onMatched={setMatchResult} />
          ) : (
            <p className="text-sm text-muted-foreground">
              Get an ATS score first, then match your resume against a job description.
            </p>
          )}
          {matchResult && (
            <MatchDisplay
              jdMatch={matchResult.jdMatch}
              recommendations={matchResult.recommendations}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
