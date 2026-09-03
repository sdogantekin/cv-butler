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

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-16 sm:py-24 lg:grid-cols-2">
      <div>
        <Badge variant="secondary">Open source · Free to use today</Badge>
        <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          Get your resume past the bots.
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
          CV Butler scores your resume against real ATS systems, matches it to any job description,
          and writes tailored cover letters — free, open source, no catch.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/dashboard">Get Started Free</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="https://github.com/sdogantekin/cv-butler" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          100% free · No credit card · MIT licensed · Self-hostable
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your ATS Score</CardTitle>
          <CardDescription>Senior Product Designer · matched against your resume</CardDescription>
          <CardAction>
            <Badge>87 / 100</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Progress value={87} />
          <div className="mt-5 flex flex-col gap-2.5 text-sm">
            <div className="flex items-center justify-between">
              <span>Keywords matched</span>
              <span className="text-muted-foreground">18 / 22</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span>Formatting</span>
              <span className="text-muted-foreground">ATS-safe</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span>Quick fixes found</span>
              <span className="text-muted-foreground">3</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">Illustrative example — your results will vary</p>
        </CardFooter>
      </Card>
    </section>
  );
}
