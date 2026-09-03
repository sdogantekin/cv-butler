import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FEATURES = [
  {
    title: "ATS Score & Analysis",
    subtitle: "Know exactly how screening software reads your resume before you hit submit.",
    description:
      "Get a 0–100 score with a plain-language breakdown of formatting issues, missing keywords, and quick fixes.",
  },
  {
    title: "Job Description Matching",
    subtitle: "Paste any listing and see how well your resume actually lines up.",
    description:
      "Surfaces the skills and keywords the role asks for that your resume is missing, so you can tailor it per application.",
  },
  {
    title: "Cover Letter Generation",
    subtitle: "A tailored draft in the time it takes to read the job post. (Coming in v2.)",
    description:
      "Generates a first draft grounded in your actual experience and the job description — you edit and send.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-muted">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Everything you need to land the interview
        </h2>
        <p className="mt-2 max-w-xl text-muted-foreground">Three core tools, built to work together.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
