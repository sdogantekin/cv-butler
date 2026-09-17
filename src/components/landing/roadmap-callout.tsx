import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function RoadmapCallout({ dict }: { dict: Dictionary["landing"]["roadmap"] }) {
  return (
    <section id="roadmap" className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-16">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{dict.heading}</h2>
      <p className="mt-2 max-w-xl text-muted-foreground">{dict.subheading}</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {dict.items.map((item) => (
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
            {dict.followProgress}
          </a>
        </Button>
      </div>
    </section>
  );
}
