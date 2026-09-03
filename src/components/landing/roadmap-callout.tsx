import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function RoadmapCallout() {
  return (
    <section id="roadmap" className="mx-auto max-w-6xl px-6 py-16">
      <Card>
        <CardContent className="flex flex-wrap items-start justify-between gap-5 py-2">
          <div className="max-w-xl">
            <Badge variant="secondary">On the roadmap · v2</Badge>
            <h3 className="mt-3 text-xl font-bold">Local-model support via Ollama</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Planned for v2: run CV Butler&apos;s scoring and matching against a local model through
              Ollama instead of a hosted one. This isn&apos;t available yet — today CV Butler runs
              entirely on hosted AI models.
            </p>
          </div>
          <Button asChild variant="outline">
            <a href="https://github.com/sdogantekin/cv-butler/issues" target="_blank" rel="noopener noreferrer">
              Follow progress
            </a>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
