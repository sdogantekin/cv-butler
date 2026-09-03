# Design sync notes — CV Butler

## Repo shape

- CV Butler is a Next.js app, not a published component-library package. There is no `dist/`, no `main`/`module`/`exports` in `package.json`. The converter runs in **synth-entry mode**, discovering components directly from `srcDir: "src/components/ui"`.
- `cfg.entry: "./dist/index.js"` is a deliberate placeholder — that path never exists. It's needed purely so the converter's `PKG_DIR` resolution walks up from it and finds the real repo `package.json` (see `package-build.mjs` lines ~158–176). Without `--entry`/`cfg.entry` set to *something*, `PKG_DIR` falls back to `node_modules/cv-butler`, which doesn't exist (this repo isn't installed as its own dependency), and the build crashes with an uncaught `ENOENT` inside `lib/dts.mjs`'s `projectFor`. Keep this key even though the path is fictional.

## CSS entry

- `globals.css` uses Tailwind v4's build-time `@import "tailwindcss"` / `@import "tw-animate-css"` / `@import "shadcn/tailwind.css"` directives. These are NOT real files to copy — they're instructions to the Tailwind build tool. Pointing `cssEntry` at the raw source file produced `[CSS_IMPORT_MISSING]` errors and completely unstyled components (Button/Input/Textarea rendered blank).
- **Fix**: `cssEntry` points at `.design-sync/.cache/next-static/chunks/compiled-globals.css` — a copy of the REAL compiled CSS chunk Next.js/Turbopack emits during `npm run build` (found at `.next/static/chunks/<hash>.css` — note Turbopack does NOT use the classic webpack `static/css/` path, it's under `static/chunks/`).
- The compiled CSS references font files via relative `../media/<hash>.woff2` URLs. The directory structure had to be preserved (`.design-sync/.cache/next-static/chunks/compiled-globals.css` + sibling `.design-sync/.cache/next-static/media/*.woff2`) or font extraction silently fails (`[FONT_DANGLING]`).
- **Re-sync risk**: before every re-sync, must re-run `npm run build` and re-copy the fresh `.next/static/chunks/*.css` (filename hash changes every build) to `.design-sync/.cache/next-static/chunks/compiled-globals.css`, and re-copy `.next/static/media/*.woff2` to `.design-sync/.cache/next-static/media/`. This isn't automated — `cfg.buildCmd` documents `npm run build` but the copy step itself is manual. If a future sync forgets this and reuses a stale cached CSS/font copy, styling could silently drift from the real app.

## Scope

- Synced only `src/components/ui/` (10 files, 19 exported components/sub-components: Badge, Button, Input, Card + 6 sub-parts, Progress, Label, Toaster, Separator, Textarea, Tabs + 3 sub-parts) — the real reusable design-system layer.
- Deliberately EXCLUDED `src/components/landing/*` (Hero, Features, Footer, RoadmapCallout — zero props, hardcoded page content, not reusable building blocks) and `src/components/analyze/*` (UploadForm, JdForm, ScoreDisplay, MatchDisplay — make real `fetch()` calls to this app's own backend API routes, which don't exist in Claude Design's sandbox; would render broken, not useful).

## Known render warns

- `Toaster`: renders blank in the automated screenshot check (`[RENDER_BLANK]`/`[RENDER_THIN]`), even with a `toast.success(...)` fired on mount and `cfg.overrides.Toaster: {"cardMode":"single","viewport":"360x120"}` set. Root cause: sonner's `Toaster` renders its toast into a fixed-position portal that the capture harness's element/viewport crop doesn't include — this is a capture-harness limitation, not a broken component. The component ships fully functional in the bundle; it just doesn't have a rich visual preview card. Accepted as-is per the skill's own "states that can't render statically are skipped with a NOTES.md line" guidance. Don't re-chase this on re-sync unless the capture harness changes.

## Re-sync risks

- The CSS/font copy step (above) is the single biggest thing to remember before any re-sync — it's manual, not scripted, and produces silently-blank components if skipped or stale.
- If new shadcn components are added to `src/components/ui/` later, they'll be picked up automatically by the next sync's `srcDir` scan (no config change needed) but will need their own authored preview in `.design-sync/previews/<Name>.tsx` or they'll ship as floor cards.
- `cfg.entry`'s fictional path (`./dist/index.js`) must never accidentally start existing (e.g. if someone later adds a real build script) without reviewing whether synth-entry mode is still correct — the fictional-path trick relies on that file NOT existing.
