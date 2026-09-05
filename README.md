# CV Butler

Open-source, AI-powered career assistant: ATS scoring, job-description matching, and (from v2) cover letter generation. See `requirements.md` for the full product spec and `CLAUDE.md` for architecture/engineering conventions.

## Stack

Next.js (App Router, TypeScript, Tailwind, shadcn/ui) · LangGraph.js · Drizzle ORM (SQLite by default locally; Postgres in production when `DATABASE_URL` is set) · Auth.js (Google login).

## Architecture: the LangGraph pipeline

The core product logic — turning a resume into an ATS score, a job-description match, or (v2) a cover letter — runs as a single [LangGraph.js](https://langchain-ai.github.io/langgraphjs/) `StateGraph`, compiled once in `src/lib/graph/graph.ts`. Everything lives in this one Next.js/TypeScript project; there's no separate Python agent service.

**Nodes** (`src/lib/graph/nodes/`):

| Node | Does | LLM call? |
| --- | --- | --- |
| `extract` | Parses raw resume text into structured JSON (contact info, experience, education, skills, languages, location) | Yes — structured output |
| `score` | Computes the ATS score | Partly — see below |
| `match` | Compares the parsed resume against a job description | Yes |
| `recommend` | Turns scoring/matching output into actionable recommendations | Yes |

**Routing is data-driven, not hardcoded per use case.** A no-op `route` node sits after `START` (LangGraph's typings don't allow a conditional edge directly off `START`), and every conditional edge downstream branches on which fields are already populated in state at invoke time:

```
START → route ─┬─(no parsedResume)→ extract → score ─┬─(has jobDescriptionText)→ match → recommend → END
                └─(has parsedResume)──────────────────┘                    └─(no jobDescriptionText)→ recommend → END
```

This lets one compiled graph serve every real invocation pattern in the app:
- **ATS score** (`POST /api/analyze/score`): `graph.invoke({ resumeText })` → extract → score → recommend.
- **Job match on an already-scored resume** (`POST /api/analyze/match`): `graph.invoke({ parsedResume, jobDescriptionText })` → skips straight to match → recommend (no re-billing the extract/score step).
- **Independent job match, resume uploaded fresh** (`POST /api/analyze/match-upload`): calls the `extract` node directly, *outside* the compiled graph (so no scoring LLM call is wasted), then feeds the result into `graph.invoke({ parsedResume, jobDescriptionText })` the same way as above.

**Scoring is hybrid, not purely LLM-judged.** Five of the six ATS categories (contact info, section structure, date formatting, content depth, quantified achievements — see `src/lib/scoring/ats-checks.ts`) are deterministic, unit-tested regex/structural checks against the parsed resume. Only the sixth category, "Keyword & Content Relevance," is an LLM judgment call. The `overallScore` is always a weighted average computed in code (`computeOverallAtsScore`), never a number the LLM invents directly — this keeps repeated runs on the same resume consistent.

**Matching is LLM-driven with a deterministic assist.** Semantic fit (a candidate can satisfy a requirement under different wording) is inherently a judgment call, so the `match` node's LLM call scores three dimensions (Skills/Experience/Education). A deterministic keyword-overlap computation (`src/lib/scoring/keyword-overlap.ts`) is fed into the prompt as grounding evidence, and `overallScore` is again a weighted average computed in code. Language/location requirements stated in the job description are extracted as separate `hardConstraints` (met/not-met) rather than blended into a dimension score — an unmet constraint caps the overall score, since it's typically a dealbreaker regardless of skills fit.

**LLM provider is a `.env` switch, not a code change.** `src/lib/llm/provider.ts` exposes one `getChatModel()` factory that every node calls; it switches on `LLM_PROVIDER` across five LangChain provider wrappers — `anthropic` (default), `qwen`, `openai`, `deepseek`, `gemini` (the latter three via `ChatOpenAI`'s OpenAI-compatible client, except `gemini` which uses `ChatGoogleGenerativeAI`). Nodes use `.withStructuredOutput(zodSchema)` so the LLM's response is parsed straight into a validated Zod type — no manual JSON parsing.

**Tests mock the LLM, not the graph.** `src/lib/graph/graph.test.ts` runs the real compiled graph and real routing logic, with each node's LLM call mocked, so CI exercises the actual wiring (extract → score → match → recommend, conditional branches, schema validation) without live API calls.

## Getting started

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

- `AUTH_SECRET` — generate with `npx auth secret`
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` — create an OAuth 2.0 Client ID in the [Google Cloud Console](https://console.cloud.google.com/apis/credentials), authorized redirect URI `http://localhost:3000/api/auth/callback/google`
- `ANTHROPIC_API_KEY` — your Claude API key (default LLM provider)

That's everything required to run the app. Analytics (below) is a separate, optional feature — leave its two env vars unset and you get a fully working app with zero third-party tracking.

Then:

```bash
npm run dev
```

`npm run dev` automatically pushes the Drizzle schema to a local SQLite file (`./local.db`, gitignored) first — no separate database setup needed.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server (pushes SQLite schema first) |
| `npm run build` | Production build (plain `next build`, for self-hosting/other platforms) |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generate Next.js route types, then `tsc --noEmit` |
| `npm test` | Vitest (mocked LLM calls, no live API dependency; DB-touching tests run against real SQLite) |
| `npm run db:generate` | Generate a new SQLite Drizzle migration from schema changes |
| `npm run db:push` | Push the current SQLite schema to the local file |
| `npm run db:generate:pg` | Generate a new Postgres migration from `src/db/schema/pg` |
| `npm run db:migrate:pg` | Apply committed Postgres migrations against `DATABASE_URL` |
| `npm run vercel-build` | Applies Postgres migrations, then `next build` — Vercel runs this automatically in place of `build` when the script is present |
| `npm run secrets:scan` | Run secretlint across the repo |

A Husky pre-commit hook runs `secretlint` and `eslint --fix` on staged files.

## Database: SQLite locally, Postgres in production

The dialect is chosen automatically by whether `DATABASE_URL` is set — not a build-time choice, so the same codebase supports both:

- **Unset (local/self-hosted default):** SQLite via `better-sqlite3`, zero config, exactly the flow above.
- **Set (production):** Postgres via `@neondatabase/serverless` + `drizzle-orm/neon-http`. On Vercel, connect the **Neon** integration from the project's Storage tab — it injects `DATABASE_URL` for you, and the `vercel-build` script applies committed migrations automatically on every deploy.

Two parallel Drizzle schema trees make this possible — `src/db/schema/sqlite/` and `src/db/schema/pg/` — since `sqliteTable`/`pgTable` are incompatible builders and can't share one schema module. Both are kept structurally identical (same table/column names) by construction, checked by `src/db/schema/schema-parity.test.ts`. `src/db/dialect.ts` exposes the single `usingPostgres` flag both `src/db/schema/index.ts` and `src/db/index.ts` key off of, so the active schema tree and the active client can never mismatch.

Deploying Postgres migrations manually (non-Vercel hosts): run `npm run db:migrate:pg` against your `DATABASE_URL` before `npm run build`.

## Analytics (optional, off by default)

Product analytics is opt-in, mirroring the `LLM_PROVIDER` pattern: unset `ANALYTICS_PROVIDER` (the default for local dev and every fresh clone) means the app never loads any third-party script and never fires a single tracking call — nothing to disable, nothing to strip out, self-hosting stays fully private with no configuration.

To enable it, set both in `.env.local` (or your host's env var settings):

```bash
ANALYTICS_PROVIDER=google
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # from GA4 Admin > Data Streams
```

This is a client-visible variable (`NEXT_PUBLIC_` prefix) because gtag.js runs in the browser — it's not a secret, and it's fine for it to appear in the built JavaScript bundle. Once both are set, `src/app/layout.tsx` injects Google Analytics (`src/components/analytics/google-analytics-scripts.tsx`) and tracks pageviews on every route change plus two product events (`ats_review_completed`, `job_match_completed`) via `trackEvent()` in `src/lib/analytics/provider.ts`.

**No consent/cookie-banner gate is implemented yet.** Enabling this for a real deployment with EU visitors currently means the tracker fires with no consent mechanism in front of it — acceptable for this project's own pre-GA deployment by deliberate choice, but if you enable it for your own production use with real visitors, you're responsible for your own compliance (GDPR/ePrivacy or otherwise) until a consent flow ships.

## Notes

- Resume files (PDF/`.docx` only — no legacy `.doc`, no scanned/OCR PDFs) are parsed in memory and never persisted; only the extracted structured data is stored.
- The 3-actions/day limit is a shared pool across ATS scoring and job matching (each independent match — including one that uploads its own resume via `/api/analyze/match-upload` — still consumes only 1 of the 3), reset at midnight UTC.
- Switching LLM provider (`anthropic` / `qwen` / `openai` / `deepseek` / `gemini`) is a `.env` change (`LLM_PROVIDER`), not a code change — see [Architecture](#architecture-the-langgraph-pipeline).
- Analytics is unset/off by default — see [Analytics](#analytics-optional-off-by-default).
