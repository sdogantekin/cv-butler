import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ROADMAP_ITEMS = [
  {
    badge: "v2",
    title: "Cover letter generation",
    description:
      "A tailored draft — general or targeted to a job — grounded entirely in your real resume data.",
  },
  {
    badge: "v3",
    title: "Local-model support via Ollama",
    description: "Run scoring and matching against your own local model instead of a hosted one.",
  },
  {
    badge: "Future",
    title: "Job application tracking",
    description: "Track every application — company, resume, cover letter, and status — all in one place.",
  },
];

export function RoadmapCallout() {
  return (
    <section id="roadmap" className="mx-auto w-full max-w-6xl px-6 py-16">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">What&apos;s next</h2>
      <p className="mt-2 max-w-xl text-muted-foreground">
        CV Butler is under active development. Here&apos;s what&apos;s coming.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {ROADMAP_ITEMS.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <Badge variant="secondary" className="mb-1 w-fit">
                {item.badge}
              </Badge>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Button asChild variant="outline">
          <a href="https://github.com/sdogantekin/cv-butler/issues" target="_blank" rel="noopener noreferrer">
            Follow progress
          </a>
        </Button>
      </div>
    </section>
  );
}
