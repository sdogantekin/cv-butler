import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function LearningHubTab({ dict }: { dict: Dictionary["dashboard"]["learningHub"] }) {
  return (
    <div>
      <h1 className="mb-1.5 text-2xl font-extrabold">{dict.title}</h1>
      <p className="mb-7 max-w-lg text-sm text-muted-foreground">{dict.subtitle}</p>
      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-lg border bg-muted p-4">
        <Badge variant="secondary">{dict.comingBadge}</Badge>
        <p className="text-sm text-muted-foreground">{dict.comingText}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        {dict.topics.map((topic) => (
          <Card key={topic.title}>
            <CardHeader>
              <CardTitle>{topic.title}</CardTitle>
              <CardDescription>{topic.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
