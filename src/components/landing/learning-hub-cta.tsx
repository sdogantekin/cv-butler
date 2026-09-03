import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LearningHubCta() {
  return (
    <section id="learning-hub" className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-14">
        <div className="max-w-xl">
          <h3 className="text-2xl font-extrabold">New to ATS systems?</h3>
          <p className="mt-2 text-sm leading-relaxed opacity-90">
            Visit the ATS Learning Hub for free guides on resume formatting, keyword strategy, and
            how automated screeners actually work.
          </p>
        </div>
        <Button asChild variant="secondary" size="lg">
          <Link href="/learning-hub">Visit the Learning Hub →</Link>
        </Button>
      </div>
    </section>
  );
}
