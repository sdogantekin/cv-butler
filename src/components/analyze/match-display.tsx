import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { JdMatchResult, Recommendation } from "@/lib/schemas/analysis";

export function MatchDisplay({
  jdMatch,
  recommendations,
}: {
  jdMatch: JdMatchResult;
  recommendations: Recommendation[];
}) {
  const hasUnmetConstraint = jdMatch.hardConstraints.some((c) => !c.met);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Match Score: {jdMatch.overallScore}/100</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Progress value={jdMatch.overallScore} />
        {hasUnmetConstraint && (
          <p className="text-sm text-destructive">
            Score reflects an unmet requirement below — skills/experience fit alone would score higher.
          </p>
        )}
        {jdMatch.hardConstraints.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Requirements</h3>
            <ul className="flex flex-col gap-1">
              {jdMatch.hardConstraints.map((constraint, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Badge variant={constraint.met ? "secondary" : "destructive"}>
                    {constraint.met ? "Met" : "Not met"}
                  </Badge>
                  <span>
                    <span className="font-medium">{constraint.requirement}</span> — {constraint.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-col gap-3">
          {jdMatch.dimensions.map((dimension) => (
            <div key={dimension.name}>
              <div className="flex justify-between text-sm font-medium">
                <span>{dimension.name}</span>
                <span>{dimension.score}/100</span>
              </div>
              {dimension.gaps.length > 0 && (
                <ul className="list-disc pl-5 text-sm text-muted-foreground">
                  {dimension.gaps.map((gap, i) => (
                    <li key={i}>{gap}</li>
                  ))}
                </ul>
              )}
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
