import { Badge } from "@/components/ui/badge";
import type { Gap } from "@/lib/schemas/analysis";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

export function SeverityBadge({
  severity,
  dict,
}: {
  severity: Gap["severity"];
  dict: Dictionary["severity"];
}) {
  if (severity === "critical") return <Badge variant="destructive">{dict.critical}</Badge>;
  if (severity === "moderate") return <Badge variant="outline">{dict.moderate}</Badge>;
  return <Badge variant="outline">{dict.minor}</Badge>;
}
