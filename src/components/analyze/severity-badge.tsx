import { Badge } from "@/components/ui/badge";
import type { Gap } from "@/lib/schemas/analysis";

export function SeverityBadge({ severity }: { severity: Gap["severity"] }) {
  if (severity === "critical") return <Badge variant="destructive">Critical</Badge>;
  if (severity === "moderate") return <Badge variant="outline">Moderate</Badge>;
  return <Badge variant="outline">Minor</Badge>;
}
