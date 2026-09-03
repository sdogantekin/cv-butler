"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      toast.success(`ATS score ready. ${data.remaining} action(s) left today.`);
    } catch {
      toast.error("Something went wrong while analyzing your resume.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Label htmlFor="resume">Resume (PDF or .docx)</Label>
      <Input
        id="resume"
        type="file"
        accept=".pdf,.docx"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <Button type="submit" disabled={!file || isSubmitting} className="w-fit">
        {isSubmitting ? "Analyzing..." : "Get ATS Score"}
      </Button>
    </form>
  );
}
