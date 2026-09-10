"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { CoverLetterResult } from "@/lib/schemas/analysis";

export function CoverLetterDisplay({ coverLetter }: { coverLetter: CoverLetterResult }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(coverLetter.letterText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy — select and copy the text manually instead.");
    }
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <Badge variant="outline">{coverLetter.variant === "targeted" ? "Targeted" : "General"}</Badge>
        <Button variant="outline" size="sm" onClick={handleCopy}>
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
      <div className="rounded-xl border p-6 text-sm leading-relaxed whitespace-pre-wrap">
        {coverLetter.letterText}
      </div>
    </div>
  );
}
