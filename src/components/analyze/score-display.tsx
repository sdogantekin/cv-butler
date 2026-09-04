import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { AtsScoreResult, Recommendation } from "@/lib/schemas/analysis";

export function ScoreDisplay({
  atsScore,
  recommendations,
}: {
  atsScore: AtsScoreResult;
  recommendations: Recommendation[];
}) {
  return (
    <div>
      <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
        <h2 className="text-2xl font-extrabold">Your ATS Score</h2>
        <Badge>{atsScore.overallScore} / 100</Badge>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">
        Here&apos;s how your resume scored, category by category.
      </p>
      <Progress value={atsScore.overallScore} className="h-2" />

      <h3 className="mt-8 mb-4 text-base font-bold">Category breakdown</h3>
      <div className="flex flex-col gap-4">
        {atsScore.categories.map((category) => (
          <Card key={category.name}>
            <CardContent>
              <div className="mb-2.5 flex items-center justify-between gap-3">
                <span className="text-sm font-semibold">{category.name}</span>
                <span className="text-xs font-semibold text-muted-foreground">
                  {category.score}/100
                </span>
              </div>
              <Progress value={category.score} className="h-1.5" />
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {category.feedback}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {recommendations.length > 0 && (
        <>
          <h3 className="mt-8 mb-4 text-base font-bold">Recommendations</h3>
          <div className="flex flex-col gap-3">
            {recommendations.map((rec, i) => (
              <div key={i} className="rounded-lg border bg-muted p-4">
                <div className="mb-1 text-xs font-bold">{rec.category}</div>
                <p className="text-sm leading-relaxed text-muted-foreground">{rec.message}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
