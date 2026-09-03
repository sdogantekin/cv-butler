## CV Butler design system — conventions

**No wrapper required.** These components have no required context provider. `Toaster` reads theme via `next-themes`'s `useTheme()`, which defaults safely to `"system"` with no `ThemeProvider` present — you don't need to wrap anything to use these components.

**Styling idiom: Tailwind utility classes over CSS custom-property tokens.** Every component is styled with Tailwind v4 utility classes (`className="..."`), never inline styles or CSS-in-JS. The utility classes resolve against a fixed set of semantic design tokens defined as CSS custom properties (oklch color space) in `styles.css`'s import closure — build new compositions using these same token-backed utility classes, not raw hex colors:

| Token | Utility examples |
|---|---|
| `--background` / `--foreground` | `bg-background`, `text-foreground` |
| `--card` / `--card-foreground` | `bg-card`, `text-card-foreground` |
| `--primary` / `--primary-foreground` | `bg-primary`, `text-primary-foreground` |
| `--secondary` / `--secondary-foreground` | `bg-secondary`, `text-secondary-foreground` |
| `--muted` / `--muted-foreground` | `bg-muted`, `text-muted-foreground` |
| `--destructive` | `bg-destructive`, `text-destructive` |
| `--border` / `--input` | `border-border`, `border-input` |
| `--ring` | `focus-visible:ring-ring/50` (focus rings only — not used as a bare fill/border color in this component set) |
| `--radius` (base) | derived scale, e.g. `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-4xl` |

Both light and dark values are defined for every token (`:root` and `.dark`) — components never need a manual dark-mode branch, the tokens already carry the right value for the active theme class on `<html>`.

**Compound components compose as siblings, not as configuration.** `Card` follows the shadcn pattern: `Card` is a plain container; `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter` are children you compose directly, not props you pass to `Card`. Same for `Tabs`: `Tabs` (the root, holds `value`/`defaultValue`) wraps `TabsList` (containing one `TabsTrigger` per `value`) and one or more `TabsContent value="...">` blocks.

**Where the truth lives:** `styles.css` at the project root (its `@import` closure, including `_ds_bundle.css`) is the real compiled stylesheet — read it before inventing a new utility class or token name. Each component's `.prompt.md` documents its exact prop shape.

**Idiomatic composition example** (grounded in this app's real usage — a scored-result card):

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter, Badge, Button } from "cv-butler";

<Card>
  <CardHeader>
    <CardTitle>Match Score: 78/100</CardTitle>
    <CardDescription>Skills, Experience, and Education breakdown</CardDescription>
    <CardAction>
      <Badge variant="secondary">2 gaps</Badge>
    </CardAction>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">Strong skills match. Missing Kubernetes experience.</p>
  </CardContent>
  <CardFooter>
    <Button size="sm">View full report</Button>
  </CardFooter>
</Card>
```

**Known gap:** `Toaster`'s preview card renders visually blank (a capture-harness limitation with its fixed-position portal, not a component defect — the component works correctly at runtime). Trigger toasts imperatively with `toast(...)`/`toast.success(...)` from the `sonner` package; `Toaster` itself just needs to be mounted once.
