import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function HowItWorks({ dict }: { dict: Dictionary["landing"]["howItWorks"] }) {
  return (
    <section id="how-it-works" className="mx-auto w-full max-w-6xl px-6 py-14">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{dict.heading}</h2>
      <p className="mt-2 max-w-xl text-muted-foreground">{dict.subheading}</p>
      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        {dict.steps.map((step, index) => (
          <div key={step.title}>
            <div className="mb-4 flex size-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {index + 1}
            </div>
            <h3 className="text-lg font-bold">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
