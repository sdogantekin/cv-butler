import { Badge } from "@/components/ui/badge";

export function CoverLetterTab() {
  return (
    <div className="max-w-2xl">
      <h1 className="mb-1.5 text-2xl font-extrabold">Cover Letter Generation</h1>
      <p className="mb-7 max-w-lg text-sm text-muted-foreground">
        Generate a tailored draft using your resume, with a job description as an optional
        add-on for tighter targeting.
      </p>
      <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-muted p-4">
        <Badge variant="secondary">Coming in v2</Badge>
        <p className="text-sm text-muted-foreground">
          Cover letter generation isn&apos;t available yet — it&apos;s planned for v2.
        </p>
      </div>
    </div>
  );
}
