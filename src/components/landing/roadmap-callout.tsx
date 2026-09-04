import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ROADMAP_ITEMS = [
  {
    badge: "v2",
    title: "Cover letter generation",
    description:
      "Generate a tailored draft — general or targeted to a specific job — grounded entirely in your real resume data, never invented.",
  },
  {
    badge: "v3",
    title: "Local-model support via Ollama",
    description:
      "Run CV Butler's scoring and matching against a model on your own machine instead of a hosted one. Not available yet — today CV Butler runs entirely on hosted AI models.",
  },
  {
    badge: "Future",
    title: "Job application tracking",
    description:
      "Track every application — company, role, resume and cover letter version, status — in one place, with a one-click save straight from a match or cover letter you just generated.",
  },
];

export function RoadmapCallout() {
  return (
    <section id="roadmap" className="mx-auto max-w-6xl px-6 py-16">
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
