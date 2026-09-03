# CV Butler

Open-source, AI-powered career assistant: ATS scoring, job-description matching, and (from v2) cover letter generation. See `requirements.md` for the full product spec and `CLAUDE.md` for architecture/engineering conventions.

## Stack

Next.js (App Router, TypeScript, Tailwind, shadcn/ui) · LangGraph.js · Drizzle ORM (SQLite locally, Postgres in production) · Auth.js (Google login).

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

Then:

```bash
npm run dev
```

`npm run dev` automatically pushes the Drizzle schema to a local SQLite file (`./local.db`, gitignored) first — no separate database setup needed.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server (pushes DB schema first) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generate Next.js route types, then `tsc --noEmit` |
| `npm test` | Vitest (mocked LLM calls, no live API/DB dependency) |
| `npm run db:generate` | Generate a new Drizzle migration from schema changes |
| `npm run db:push` | Push the current schema to the local SQLite file |
| `npm run secrets:scan` | Run secretlint across the repo |

A Husky pre-commit hook runs `secretlint` and `eslint --fix` on staged files.

## Notes

- Resume files (PDF/`.docx` only — no legacy `.doc`, no scanned/OCR PDFs) are parsed in memory and never persisted; only the extracted structured data is stored.
- The 3-actions/day limit is a shared pool across ATS scoring and job matching (each independent match — including one that uploads its own resume via `/api/analyze/match-upload` — still consumes only 1 of the 3), reset at midnight UTC.
- Switching LLM provider (`anthropic` / `qwen` / `openai` / `deepseek` / `gemini`) is a `.env` change (`LLM_PROVIDER`), not a code change — see [Architecture](#architecture-the-langgraph-pipeline).
