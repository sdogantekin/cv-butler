"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function ResumeDropzone({
  file,
  onFileChange,
  dict,
}: {
  file: File | null;
  onFileChange: (file: File | null) => void;
  dict: Dictionary["resumeDropzone"];
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="rounded-xl border border-dashed p-14 text-center">
      <div className="mb-2 text-sm font-semibold">{dict.title}</div>
      <p className="mb-4 text-xs text-muted-foreground">{dict.subtitle}</p>
      <Button type="button" variant="outline" onClick={() => inputRef.current?.click()}>
        {dict.uploadButton}
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx"
        className="hidden"
        onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
      />
      {file && <p className="mt-3 text-xs text-muted-foreground">{file.name}</p>}
    </div>
  );
}
