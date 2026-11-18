# Contributing to CV Butler

Thanks for your interest. CV Butler is a small open-source project, and issues, ideas, and pull requests are welcome.

## Before you start

- Read the [README](README.md) for how the app and its LangGraph workflows are structured, and [REQUIREMENTS.md](REQUIREMENTS.md) for scope and phasing. A change that fits a planned phase (see the status table) is much easier to accept than one that doesn't.
- For anything larger than a small fix, open an issue first so we can agree on the approach.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in AUTH_SECRET, Google OAuth, and a model key (see README)
npm run dev
```

`npm run dev` creates a local SQLite database automatically. You can use any supported model provider, or a local Ollama model (see the README).

## Checks to run before opening a PR

```bash
npm run typecheck
npm run lint
npm test            # LLM calls are mocked; no API key needed
npm run secrets:scan
```

CI runs the same checks plus a production build. A Husky pre-commit hook runs `secretlint` and `eslint --fix` on staged files.

## Conventions

These are also written down in [CLAUDE.md](CLAUDE.md), which the AI assistants used on this project follow.

- **TypeScript only, one repository.** No Python or separate backend services.
- **Keep API routes thin.** They validate input, apply the rate limit, invoke the compiled LangGraph workflow, persist, and respond.
- **Validate input with Zod**, including uploads and request payloads.
- **Test with mocked LLM responses.** Never make live API calls in tests.
- **Localize everything the user sees** in all three dictionaries (`en`, `de`, `tr`), including API error messages and prompt output-language instructions.
- **Both database schemas.** A schema change goes in `src/db/schema/sqlite/` and `src/db/schema/pg/`; the parity test enforces they match.
- **Never log raw resume contents**, and never commit secrets. Use placeholders like `sk-ant-xxx` in docs and examples.
- **Never invent facts.** Anything generated about a candidate (cover letters, interview answers) must trace back to their resume.

## Pull requests

Keep PRs focused, describe what changed and why, and note anything you could not test. If AI assistance wrote part of a change, that's fine; you are still responsible for reviewing it.

By contributing you agree that your contribution is licensed under the [MIT License](LICENSE).
