import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function Hero({
  dict,
  common,
}: {
  dict: Dictionary["landing"]["hero"];
  common: Dictionary["common"];
}) {
  return (
    <section className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 py-16 sm:py-24 lg:grid-cols-2">
      <div>
        <Badge variant="secondary">{dict.badge}</Badge>
        <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          {dict.title}
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">{dict.subtitle}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/dashboard">{common.getStartedFree}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="https://github.com/sdogantekin/cv-butler" target="_blank" rel="noopener noreferrer">
              {common.openOnGithub}
            </a>
          </Button>
        </div>
        <p className="mt-5 text-xs text-muted-foreground">{dict.freeNote}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{dict.cardTitle}</CardTitle>
          <CardDescription>{dict.cardSubtitle}</CardDescription>
          <CardAction>
            <Badge>87 / 100</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Progress value={87} />
          <div className="mt-5 flex flex-col gap-2.5 text-sm">
            <div className="flex items-center justify-between">
              <span>{dict.keywordsMatched}</span>
              <span className="text-muted-foreground">{dict.keywordsMatchedValue}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span>{dict.formatting}</span>
              <span className="text-muted-foreground">{dict.formattingValue}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span>{dict.quickFixesFound}</span>
              <span className="text-muted-foreground">{dict.quickFixesFoundValue}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">{dict.illustrativeNote}</p>
        </CardFooter>
      </Card>
    </section>
  );
}
