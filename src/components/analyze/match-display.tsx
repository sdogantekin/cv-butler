import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SeverityBadge } from "@/components/analyze/severity-badge";
import { SEVERITY_LEVELS, type Gap, type JdMatchResult, type Recommendation } from "@/lib/schemas/analysis";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { formatMessage } from "@/lib/i18n/format-message";

function sortBySeverity(gaps: Gap[]): Gap[] {
  return [...gaps].sort(
    (a, b) => SEVERITY_LEVELS.indexOf(a.severity) - SEVERITY_LEVELS.indexOf(b.severity),
  );
}

export function MatchDisplay({
  jdMatch,
  recommendations,
  onCompareClick,
  dict,
  severity,
}: {
  jdMatch: JdMatchResult;
  recommendations: Recommendation[];
  onCompareClick?: () => void;
  dict: Dictionary["dashboard"]["jobMatching"];
  severity: Dictionary["severity"];
}) {
  const hasUnmetConstraint = jdMatch.hardConstraints.some((c) => !c.met);

  return (
    <div>
      <div className="rounded-xl border p-6">
        <div className="text-lg font-bold">{formatMessage(dict.scoreLabel, { score: jdMatch.overallScore })}</div>
        <Progress value={jdMatch.overallScore} className="mt-4" />
        {hasUnmetConstraint && (
          <p className="mt-3 text-sm text-destructive">{dict.unmetConstraintWarning}</p>
        )}
      </div>

      {jdMatch.hardConstraints.length > 0 && (
        <>
          <h3 className="mt-8 mb-4 text-base font-bold">{dict.requirements}</h3>
          <div className="rounded-xl border p-4">
            <ul className="flex flex-col gap-2">
              {jdMatch.hardConstraints.map((constraint, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <Badge variant={constraint.met ? "secondary" : "destructive"}>
                    {constraint.met ? dict.met : dict.notMet}
                  </Badge>
                  <span>
                    <span className="font-medium">{constraint.requirement}</span> — {constraint.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <h3 className="mt-8 mb-4 text-base font-bold">{dict.categoryBreakdown}</h3>
      <div className="flex flex-col gap-3">
        {jdMatch.dimensions.map((dimension) => (
          <div key={dimension.name} className="rounded-xl border p-4">
            <div className="flex justify-between text-sm font-semibold">
              <span>{dict.dimensionNames[dimension.name]}</span>
              <span>{dimension.score}/100</span>
            </div>
            {dimension.gaps.length > 0 && (
              <ul className="mt-2 flex flex-col gap-1.5">
                {sortBySeverity(dimension.gaps).map((gap, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <SeverityBadge severity={gap.severity} dict={severity} />
                    <span className="text-muted-foreground">{gap.description}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {recommendations.length > 0 && (
        <>
          <h3 className="mt-8 mb-4 text-base font-bold">{dict.recommendations}</h3>
          <div className="flex flex-col gap-3">
            {recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border p-4">
                <SeverityBadge severity={rec.severity} dict={severity} />
                <p className="text-sm">
                  <span className="font-semibold">{rec.category}</span>{" "}
                  <span className="text-muted-foreground">— {rec.message}</span>
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {onCompareClick && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-muted p-4">
          <div>
            <div className="text-sm font-semibold">{dict.uploadUpdatedTitle}</div>
            <p className="text-sm text-muted-foreground">{dict.uploadUpdatedDescription}</p>
          </div>
          <Button onClick={onCompareClick}>{dict.uploadUpdatedButton}</Button>
        </div>
      )}
    </div>
  );
}
