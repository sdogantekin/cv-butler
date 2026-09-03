# CV Butler

Open-source, AI-powered career assistant: ATS scoring, job-description matching, and (from v2) cover letter generation. See `requirements.md` for the full product spec and `CLAUDE.md` for architecture/engineering conventions.

## Stack

Next.js (App Router, TypeScript, Tailwind, shadcn/ui) · LangGraph.js · Drizzle ORM (SQLite locally, Postgres in production) · Auth.js (Google login).

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
- The 3-actions/day limit is a shared pool across ATS scoring and JD matching (each consumes 1 of the 3), reset at midnight UTC.
- Switching LLM provider (`anthropic` / `qwen`) is a `.env` change (`LLM_PROVIDER`), not a code change.
