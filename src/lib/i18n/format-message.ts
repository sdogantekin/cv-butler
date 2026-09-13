// Resolves "{key}"-style placeholders in a dictionary string, e.g.
// formatMessage(dict.common.actionsRemainingToday, { count: 3 }).
export function formatMessage(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
