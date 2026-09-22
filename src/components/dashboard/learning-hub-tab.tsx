import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function LearningHubTab({ dict }: { dict: Dictionary["dashboard"]["learningHub"] }) {
  const hasMoreComing = dict.topics.some((topic) => !topic.slug);

  return (
    <div>
      <h1 className="mb-1.5 text-2xl font-extrabold">{dict.title}</h1>
      <p className="mb-7 max-w-lg text-sm text-muted-foreground">{dict.subtitle}</p>
      {hasMoreComing && (
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-lg border bg-muted p-4">
          <Badge variant="secondary">{dict.comingBadge}</Badge>
          <p className="text-sm text-muted-foreground">{dict.comingText}</p>
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-3">
        {dict.topics.map((topic) =>
          topic.slug ? (
            <Link key={topic.title} href={`/learning-hub/${topic.slug}`} className="group">
              <Card className="h-full transition-colors group-hover:bg-muted/50">
                <CardHeader>
                  <Badge className="mb-1 w-fit">{dict.availableBadge}</Badge>
                  <CardTitle>{topic.title}</CardTitle>
                  <CardDescription>{topic.description}</CardDescription>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {dict.readGuideCta}
                    <ArrowRightIcon size={14} />
                  </span>
                </CardHeader>
              </Card>
            </Link>
          ) : (
            <Card key={topic.title}>
              <CardHeader>
                <Badge variant="outline" className="mb-1 w-fit text-muted-foreground">
                  {dict.comingBadge}
                </Badge>
                <CardTitle>{topic.title}</CardTitle>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
