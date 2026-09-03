import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-6 px-6 py-24 text-center">
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        Your AI-powered career butler
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground">
        Free, open-source ATS scoring, job-description matching, and cover letter generation —
        everything paid career tools charge for, without the price tag.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/dashboard">Get Started Free</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          {/* TODO: point to the actual repo URL once it exists */}
          <a href="#" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </Button>
      </div>
    </section>
  );
}
