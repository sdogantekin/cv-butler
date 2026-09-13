import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function Faq({ dict }: { dict: Dictionary["landing"]["faq"] }) {
  return (
    <section id="faq" className="mx-auto w-full max-w-3xl px-6 py-16">
      <h2 className="mb-8 text-3xl font-extrabold tracking-tight sm:text-4xl">{dict.heading}</h2>
      <div className="flex flex-col gap-3">
        {dict.items.map((faq) => (
          <details
            key={faq.question}
            className="rounded-lg border px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="cursor-pointer text-base font-semibold">{faq.question}</summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
