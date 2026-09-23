import Link from "next/link";
import { ArrowLeftIcon, CheckIcon, XIcon } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function KeywordStrategyGuide({ dict }: { dict: Dictionary["dashboard"]["learningHub"] }) {
  const guide = dict.keywordStrategy;

  return (
    <div>
      <Link
        href="/learning-hub"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon size={14} />
        {guide.backLink}
      </Link>

      <h1 className="mb-1.5 text-2xl font-extrabold">{guide.title}</h1>
      <p className="mb-8 max-w-xl text-sm text-muted-foreground">{guide.subtitle}</p>

      <div className="space-y-8">
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-3 text-lg font-bold">{section.heading}</h2>
            <ul className="space-y-2">
              {section.rules.map((rule) => (
                <li key={rule} className="flex gap-2 text-sm leading-relaxed">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {rule}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="rounded-lg border bg-muted p-5">
          <h2 className="mb-2 text-lg font-bold">{guide.bulletFormulaTitle}</h2>
          <p className="mb-3 font-mono text-sm font-medium">{guide.bulletFormulaFormula}</p>
          <ul className="space-y-1.5">
            {guide.bulletFormulaExamples.map((example) => (
              <li key={example} className="text-sm text-muted-foreground">
                • {example}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border bg-destructive/5 p-5">
          <h2 className="mb-3 text-lg font-bold">{guide.mistakesTitle}</h2>
          <ul className="space-y-2">
            {guide.mistakes.map((mistake) => (
              <li key={mistake} className="flex gap-2 text-sm leading-relaxed">
                <XIcon size={16} className="mt-0.5 shrink-0 text-destructive" />
                {mistake}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border bg-muted p-5">
          <h2 className="mb-4 text-lg font-bold">{guide.checklistTitle}</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {guide.checklist.map((group) => (
              <div key={group.category}>
                <h3 className="mb-2 text-sm font-bold">{group.category}</h3>
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-1.5 text-sm text-muted-foreground">
                      <CheckIcon size={16} className="mt-0.5 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
