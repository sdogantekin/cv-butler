# Project Context: CV BUTLER
CV BUTLER is an open-source, AI-powered career assistant providing ATS scoring, resume matching, and cover letter generation. 

## Architecture & Tech Stack
- **Framework:** Next.js (App Router, TypeScript, Tailwind CSS, Shadcn UI)
- **Agent Orchestration:** LangGraph.js (`@langchain/langgraph`, `@langchain/core`)
- **Database & ORM:** Drizzle ORM (SQLite for local dev, PostgreSQL for production)
- **Authentication:** Auth.js (NextAuth) for social logins

## System Rules & Constraints
1. **Unified TypeScript Repository:** 
   - All code (frontend components, API routes, and LangGraph agent graphs) must reside within the Next.js project structure (e.g., API routes in `app/api/`). Do not introduce Python or external microservices.
2. **LangGraph.js Implementation:** 
   - Define multi-agent workflows using `StateGraph` with explicit typing for the shared state schema.
   - Keep Server Actions and API routes thin; they should invoke the compiled LangGraph workflow.
   - **Orchestration decision (locked):** LangGraph.js was deliberately chosen over CrewAI or any other Python-based agent framework, specifically to preserve a single TypeScript codebase and avoid a second backend service. The workflow (Extract → Score → Match → Recommend → Copywrite) is a deterministic pipeline, which fits LangGraph's explicit graph model. Do not introduce CrewAI, a Python microservice, or any other agent framework to run this workflow, even for a single node or an isolated feature.
3. **Provider-Agnostic LLM Interface (v1: cloud default, v2: local):** 
   - All LLM initializations must use LangChain provider wrappers configured via environment variables, so switching providers is a `.env` change, not a code change.
   - **v1 default is Claude (Anthropic)**, with Qwen via a cloud API as an optional second provider to validate provider-swapping. This is deliberate: local Ollama inference on typical consumer hardware (e.g., 16GB Apple Silicon) is too slow for a fast dev/iteration loop, and smaller local models need their own output-quality validation pass, not because local support has been dropped.
   - **Local Ollama endpoints (`http://localhost:11434`) become the default in v2**, once validated against realistic consumer hardware and a right-sized model (see requirements.md Section 2).
4. **Environment Management:** 
   - Manage dependencies exclusively via `npm` / `pnpm`.
5. **Routing & Access Control:** 
   - The root path (`/`) must serve the public landing page.
   - Authentication (Auth.js) must protect dashboard routes (e.g., `/dashboard`, `/analyze`) and API endpoints executing agent workflows, enforcing the 3-action daily limit.

## Engineering Standards & QA
1. **Testing:** Write unit tests using `Vitest` for core utilities, database actions, and parser logic. Mock LLM node responses when testing agent graphs.
2. **Security & Validation:** Use `Zod` for runtime validation of user inputs, file uploads, and API request payloads. Never log raw resume PII to the console or logs in production.
3. **Secret Security & Git Safety:** 
   - Never hardcode API keys, credentials, or personal tokens. Always use `process.env.VARIABLE_NAME`.
   - Ensure `.env`, `.env.local`, `design-refs/` (private UX benchmark screenshots and notes), and build artifacts are strictly listed in `.gitignore`.
   - When scaffolding configuration files or documentation, use placeholder values (e.g., `sk-ant-xxx` or `your_api_key_here`), never real credentials. Set up local pre-commit hooks to block accidental credential commits.
4. **Copywriter Node Prompt Quality (v2):**
   - Base the Copywriter node's system prompt on the pattern list from [blader/humanizer](https://github.com/blader/humanizer) (MIT licensed): overused AI words, forced groups of three, "not just X, it's Y" constructions, overly agreeable tone, generic uplifting endings, filler phrases. Adapt the patterns into the prompt itself, do not add the skill as a runtime dependency, it's built for interactive agent use, not a callable library.
   - Hard constraint: the node must never invent facts. Any name, number, date, or achievement in a generated cover letter must trace back to the parsed resume JSON, never fabricated for effect.

## Agent Behavioral Guidelines (Karpathy Principles)
1. **Think Before Coding:** 
   - State your interpretation of the request and surface any assumptions before modifying code. 
   - If a request is ambiguous or has multiple viable paths, ask a concise clarifying question rather than guessing silently.
2. **Simplicity First:** 
   - Implement the smallest, most direct solution that satisfies the current prompt. 
   - Do not add unrequested abstractions, premature configurability, or speculative features for tomorrow's system. Solve today's problem simply.
3. **Surgical Changes:** 
   - Keep diffs tightly bound to the request. 
   - Do not perform "drive-by" refactoring, reformatting, or clean up adjacent code unless it directly impacts your task. Leave surrounding code recognizable.
4. **Goal-Driven Execution & Verification:** 
   - Transform vague tasks into explicit, checkable outcomes. 
   - Verify changes using the narrowest meaningful check available (`vitest`, type checking) before declaring work complete.

## Development Workflow with Claude
- Always implement robust error handling across API routes and graph execution steps (handling LLM timeouts, parse failures, or empty inputs gracefully).
- Before making sweeping changes to the LangGraph workflows or database schemas, outline the plan using `/plan` mode and wait for my approval.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
