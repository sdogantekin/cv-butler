import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MatchDiffItem, MatchDiffResult } from "@/lib/schemas/analysis";

function DeltaBadge({ delta }: { delta: number }) {
  const sign = delta > 0 ? "+" : "";
  return (
    <Badge variant={delta > 0 ? "secondary" : delta < 0 ? "destructive" : "outline"}>
      {sign}
      {delta}
    </Badge>
  );
}

function DiffItemCard({ item, borderClassName }: { item: MatchDiffItem; borderClassName: string }) {
  return (
    <div className={`rounded-lg border border-l-4 p-3 text-sm ${borderClassName}`}>
      <div className="font-semibold">{item.title}</div>
      <p className="text-muted-foreground">{item.description}</p>
    </div>
  );
}

export function MatchDiffDisplay({ diff }: { diff: MatchDiffResult }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Before &amp; After</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="rounded-xl border p-4 text-center">
            <div className="text-xs font-medium text-muted-foreground">Before</div>
            <div className="text-2xl font-bold">{diff.beforeScore}</div>
          </div>
          <span className="text-muted-foreground">→</span>
          <div className="rounded-xl border p-4 text-center">
            <div className="text-xs font-medium text-muted-foreground">After</div>
            <div className="text-2xl font-bold">{diff.afterScore}</div>
          </div>
          <DeltaBadge delta={diff.overallDelta} />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium">Category breakdown</h3>
          <div className="flex flex-col gap-2">
            {diff.dimensions.map((dimension) => (
              <div
                key={dimension.name}
                className="flex items-center justify-between rounded-lg border p-4 text-sm"
              >
                <span className="font-semibold">{dimension.name}</span>
                <span className="flex items-center gap-2 text-muted-foreground">
                  {dimension.before} → {dimension.after}
                  <DeltaBadge delta={dimension.delta} />
                </span>
              </div>
            ))}
          </div>
        </div>

        {diff.resolved.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Resolved</h3>
            <div className="flex flex-col gap-2">
              {diff.resolved.map((item, i) => (
                <DiffItemCard key={i} item={item} borderClassName="border-l-green-600" />
              ))}
            </div>
          </div>
        )}

        {diff.stillOpen.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Still open</h3>
            <div className="flex flex-col gap-2">
              {diff.stillOpen.map((item, i) => (
                <div key={i} className="rounded-lg border bg-muted p-3 text-sm">
                  <div className="font-semibold">{item.title}</div>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {diff.newIssues.length > 0 && (
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">New issues introduced</h3>
            <div className="flex flex-col gap-2">
              {diff.newIssues.map((item, i) => (
                <DiffItemCard key={i} item={item} borderClassName="border-l-destructive" />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
