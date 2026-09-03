import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-6 pb-20 text-center">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to fix your resume?</h2>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/dashboard">Get Started Free</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href="https://github.com/sdogantekin/cv-butler" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </Button>
      </div>
    </section>
  );
}
