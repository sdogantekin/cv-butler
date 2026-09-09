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
      <h2 className="mb-1.5 text-2xl font-extrabold">Your ATS Score</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Here&apos;s how your resume scored, category by category.
      </p>

      <div className="rounded-xl border p-6">
        <div className="text-lg font-bold">ATS Score: {atsScore.overallScore}/100</div>
        <Progress value={atsScore.overallScore} className="mt-4" />
      </div>

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
              <div key={i} className="rounded-lg border p-4">
                <p className="text-sm leading-relaxed">
                  <span className="font-semibold">{rec.category}</span>{" "}
                  <span className="text-muted-foreground">— {rec.message}</span>
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
