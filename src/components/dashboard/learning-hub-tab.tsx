import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TOPICS = [
  { title: "Beating the ATS", description: "Formatting rules that keep parsers happy." },
  { title: "Keyword strategy", description: "Matching your language to the listing's." },
  { title: "How screeners work", description: "What automated systems check for, and why." },
];

export function LearningHubTab() {
  return (
    <div>
      <h1 className="mb-1.5 text-2xl font-extrabold">ATS Learning Hub</h1>
      <p className="mb-7 max-w-lg text-sm text-muted-foreground">
        Free guides on resume formatting, keyword strategy, and how automated screeners actually
        work.
      </p>
      <div className="mb-6 flex flex-wrap items-center gap-3 rounded-lg border bg-muted p-4">
        <Badge variant="secondary">Coming in v3</Badge>
        <p className="text-sm text-muted-foreground">
          Full guides aren&apos;t available yet — here&apos;s a preview of what&apos;s planned.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        {TOPICS.map((topic) => (
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
