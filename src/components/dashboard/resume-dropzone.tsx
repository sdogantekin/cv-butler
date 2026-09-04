"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";

export function ResumeDropzone({
  file,
  onFileChange,
}: {
  file: File | null;
  onFileChange: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="rounded-xl border border-dashed p-14 text-center">
      <div className="mb-2 text-sm font-semibold">Drop your resume here</div>
      <p className="mb-4 text-xs text-muted-foreground">PDF or DOCX</p>
      <Button type="button" variant="outline" onClick={() => inputRef.current?.click()}>
        Upload resume
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
