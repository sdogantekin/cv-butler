const STEPS = [
  {
    title: "Upload your resume for an ATS review",
    description:
      "Get a score and concrete suggestions on formatting, keywords, and fixes — no job description needed.",
  },
  {
    title: "Compare it to a job description",
    description: "Paste any listing to see how well your resume matches it, and what to adjust.",
  },
  {
    title: "Generate a cover letter",
    description:
      "Using your resume, with a job description as an optional add-on for tighter targeting. (Coming in v2.)",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-14">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">How it works</h2>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Pick the tool you need — each one works with just your resume.
      </p>
      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        {STEPS.map((step, index) => (
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
