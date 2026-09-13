import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function FinalCta({
  dict,
  common,
}: {
  dict: Dictionary["landing"]["finalCta"];
  common: Dictionary["common"];
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-6 pb-20 text-center">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{dict.heading}</h2>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/dashboard">{common.getStartedFree}</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href="https://github.com/sdogantekin/cv-butler" target="_blank" rel="noopener noreferrer">
            {common.openOnGithub}
          </a>
        </Button>
      </div>
    </section>
  );
}
