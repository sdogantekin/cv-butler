import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function LearningHubCta({ dict }: { dict: Dictionary["landing"]["learningHubCta"] }) {
  return (
    <section id="learning-hub" className="scroll-mt-20 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-14">
        <div className="max-w-xl">
          <h3 className="text-2xl font-extrabold">{dict.title}</h3>
          <p className="mt-2 text-sm leading-relaxed opacity-90">{dict.description}</p>
        </div>
        <Button asChild variant="secondary" size="lg">
          <Link href="/learning-hub">{dict.cta}</Link>
        </Button>
      </div>
    </section>
  );
}
