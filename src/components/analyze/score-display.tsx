import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card>
      <CardHeader>
        <CardTitle>ATS Score: {atsScore.overallScore}/100</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Progress value={atsScore.overallScore} />
        <div className="flex flex-col gap-2">
          {atsScore.categories.map((category) => (
            <div key={category.name}>
              <div className="flex justify-between text-sm font-medium">
                <span>{category.name}</span>
                <span>{category.score}/100</span>
              </div>
              <p className="text-sm text-muted-foreground">{category.feedback}</p>
            </div>
          ))}
        </div>
        {recommendations.length > 0 && (
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium">Recommendations</h3>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              {recommendations.map((rec, i) => (
                <li key={i}>
                  <span className="font-medium">{rec.category}:</span> {rec.message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
