import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FEATURES = [
  {
    title: "ATS Scoring",
    description:
      "Upload your resume and get an overall ATS-parsability score with categorized, actionable feedback.",
  },
  {
    title: "Job Description Matching",
    description:
      "Paste a job description and see a dimension-based match score across Skills, Experience, and Education, with gap analysis.",
  },
  {
    title: "Cover Letter Generation",
    description:
      "Generate a general or job-targeted cover letter from your resume data — no invented facts, ever. (Coming in v2.)",
  },
];

export function Features() {
  return (
    <section className="grid gap-4 px-6 py-12 sm:grid-cols-3">
      {FEATURES.map((feature) => (
        <Card key={feature.title}>
          <CardHeader>
            <CardTitle>{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
