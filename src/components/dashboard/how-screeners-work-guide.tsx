import Link from "next/link";
import { ArrowLeftIcon, XIcon } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function HowScreenersWorkGuide({ dict }: { dict: Dictionary["dashboard"]["learningHub"] }) {
  const guide = dict.howScreenersWork;

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
          <h2 className="mb-4 text-lg font-bold">{guide.scoreRangesTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {guide.scoreRanges.map((range) => (
              <div key={range.range}>
                <p className="text-lg font-bold">{range.range}</p>
                <p className="text-sm font-medium">{range.label}</p>
                <p className="text-sm text-muted-foreground">{range.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold">{guide.funnelTitle}</h2>
          <ol className="space-y-3">
            {guide.funnelSteps.map((step, index) => (
              <li key={step.stage} className="flex gap-3 text-sm leading-relaxed">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <span>
                  <span className="font-medium">{step.stage}.</span> {step.detail}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-lg border bg-destructive/5 p-5">
          <h2 className="mb-3 text-lg font-bold">{guide.rejectionTitle}</h2>
          <ul className="space-y-2">
            {guide.rejectionReasons.map((reason) => (
              <li key={reason} className="flex gap-2 text-sm leading-relaxed">
                <XIcon size={16} className="mt-0.5 shrink-0 text-destructive" />
                {reason}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
