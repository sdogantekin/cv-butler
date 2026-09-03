import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function RoadmapCallout() {
  return (
    <section className="mx-6 my-8 rounded-lg border bg-muted/40 p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">Open source</Badge>
        <Badge variant="outline">Roadmap</Badge>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        CV Butler is fully open-source. Today it runs on cloud LLM providers (Claude by default).
        Local, self-hosted execution via Ollama — so your resume data never has to leave your
        machine — is planned for v2, once it&apos;s been validated on realistic consumer hardware.
        Want to know how ATS systems actually work?{" "}
        <Link href="/learning-hub" className="underline underline-offset-2">
          Visit the Learning Hub
        </Link>
        .
      </p>
    </section>
  );
}
