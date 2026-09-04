const FAQS = [
  {
    question: "Is CV Butler really free?",
    answer:
      "Yes. CV Butler is open source under the MIT license — free to use, free to self-host, free to modify.",
  },
  {
    question: "What happens to my resume data?",
    answer:
      "Being open source, the code handling your data is public and auditable, and you can self-host your own instance. Local-model support that keeps everything on your own machine is planned for v3, via Ollama.",
  },
  {
    question: "Do I need to install anything to try it?",
    answer: "No — get started free in the browser. Self-hosting is optional, for anyone who wants to run their own instance.",
  },
  {
    question: "What's next on the roadmap?",
    answer:
      "Cover letter generation is next, coming in v2. After that, v3 adds local-model support through Ollama, so scoring and matching can run against a model you host yourself instead of a hosted API — see the roadmap above for what's coming.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="mb-8 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Frequently asked questions
      </h2>
      <div className="flex flex-col gap-3">
        {FAQS.map((faq) => (
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
