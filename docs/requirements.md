# Product Requirements Document (PRD): CV BUTLER

*Last updated: 2026-11-18 · Current release: [v3.0.0](https://github.com/sdogantekin/cv-butler/releases/tag/v3.0.0)*

This spec was written collaboratively with an AI assistant (Claude) and is kept in the repository as the source of truth for scope, phasing, and acceptance criteria. Scope and acceptance decisions are the author's; engineering conventions for AI-assisted work live in [`CLAUDE.md`](../CLAUDE.md).

| Phase | Focus | Status |
| --- | --- | --- |
| v1 | Core loop: ATS scoring, job description matching, Google login, 3 actions/day | Shipped |
| v2 | Cover letters, Postgres on Vercel | Shipped (rate-limit hardening deferred, see 8.2) |
| — | German/Turkish i18n, ATS Learning Hub | Shipped ahead of plan |
| v3 | Local model support via Ollama | Setup documented in the README, experimental; validation pending |
| v4 | Interview preparation | First version shipped, in testing phase |
| v5 | Job search agent | Planned, scope undefined |
| v6 | Job application tracking | Planned, first-draft scope |

## 1. Project Overview
**CV BUTLER** is an open-source, AI-powered career assistant web application. It provides job seekers with resume reviews, ATS (Applicant Tracking System) scoring, job description matching, and customized cover letter generation. 

**Core Objective:** Deliver a high-quality, multi-lingual career prep tool using an agentic state-machine architecture. The system must be fully modular, deployable via a single unified codebase, and able to route to different LLM providers via configuration. v1 runs on cloud providers (Claude by default, with Qwen, OpenAI, DeepSeek, and Gemini available as configurable alternatives); local execution via open-source models (Ollama) is documented as experimental (v3) and still has to be validated against realistic consumer hardware (see Section 2).

## 2. Iteration Plan (v1 → v6)
This section is the current source of truth for what's in scope now versus deferred. Section 6 (Core Features & Acceptance Criteria) describes the full target feature set across all phases; each subsection there is tagged with its phase.

### v1 — Core Loop
**In scope:**
- Public marketing landing page (Section 6.1): static content, no auth wall, no dependency on pipeline output
- Resume upload and parsing (PDF/DOC with a text layer; scanned/image-only PDFs are out of scope)
- ATS Scoring
- Job Description Matching, pasted text only (no URL fetching)
- English only, UI and agent outputs
- Claude (Anthropic) as the default LLM for development and v1 launch; Qwen, OpenAI, DeepSeek, and Gemini available as alternative cloud providers, configurable via `.env`
- Google-only social login, basic 3-actions/day rate limit

**Explicitly out of scope for v1** (several of these have since shipped, see below): cover letter generation, interview prep, Learning Hub, German/Turkish i18n, job-description URL fetching, Apple/Facebook login, premium tiers/payments, scanned-resume OCR, local model execution via Ollama (deferred to v3, see note below).

**Note on local execution:** Ollama support was originally planned for v1 but is deferred to v3 (originally slated for v2, pushed out one phase further — see Section 2's v2/v3 entries). On typical consumer hardware (e.g., 16GB Apple Silicon), local inference at the model sizes that fit comfortably (~8-9B parameters) is meaningfully slower than a cloud API, which would slow down v1 development iteration, and smaller local models need their own validation pass on structured-output quality before they're part of an acceptance bar.

**Done when:** a user can sign in with Google, upload a text-based PDF/DOC resume, get an ATS score with categorized feedback, paste a job description, and get a dimension-based match score with gap-analysis recommendations, all running end-to-end against Claude or any of the other configured cloud providers.

### v2 — Cover Letters & Production Readiness
**In scope:**
- Cover Letter Generation (adds the Copywriter node to the graph): General and Targeted variants
- Production deployment: Postgres via Drizzle (Neon on Vercel), Vercel deployment for the Next.js app — **done**, ahead of the rest of v2. Dialect is selected automatically at runtime: unset `DATABASE_URL` keeps the app on the original SQLite path (zero config, unchanged for local/self-hosted use); a set `DATABASE_URL` (as Vercel's Neon integration injects automatically) switches it to Postgres. Two parallel Drizzle schema trees (`src/db/schema/sqlite/`, `src/db/schema/pg/`) are kept structurally identical by construction, checked by `src/db/schema/schema-parity.test.ts`.
- Harden the daily rate-limit counter against the concurrent-request edge case (see Section 8.2) — **deferred**: not done in v2.0.0, still open

**Done when:** a signed-in user can generate a general or job-targeted cover letter from the resume data already parsed in v1, and the app runs against Postgres in production with no local-only assumptions left in the code (**done**).

### Shipped ahead of plan
Internationalization (English, German, Turkish — UI, agent outputs, and API errors) and the ATS Learning Hub (static guides) were originally scoped for v3 and have already shipped during v2 development. Sections 6.6 and 6.7 are kept for their acceptance criteria.

### v3 — Local Model Support (Ollama)
**Status:** setup is documented in the README and works through the existing OpenAI-compatible provider path, but it is experimental: quality and response times on consumer hardware have not been validated, so the "done when" bar below is not met yet.

**In scope:**
- Run the full pipeline against a local Ollama model (Qwen, ~8B class) through the existing OpenAI-compatible provider path (`LLM_PROVIDER=qwen` pointed at `http://localhost:11434/v1`), with no hosted API key required
- Validate structured-output reliability, scoring consistency, German/Turkish output quality, and the cover letter's never-invent-facts rule against the local model; adjust prompting/schema strategy as needed for smaller-model quality
- Document expected hardware requirements and response times for self-hosting users (README section already describes setup; numbers pending validation)

**Done when:** the full v1/v2 pipeline (ATS score, job match, cover letter) runs successfully end-to-end against a local Ollama model, with documented expected response times and known limitations.

### v4 — Interview Preparation (first version shipped)
Shipped: a dashboard tab that takes a resume, a job description, and optional interviewer details, and returns an interviewer profile, things to review beforehand, likely questions with suggested answers, questions to ask, and tips (Section 6.5; Interview Prep agents in Section 5). One run costs one daily action.

**Still open for v4:** quality validation against real models (no-fabrication in suggested answers), section-by-section progressive results, copy/print export, a list of past plans, and a "prepare for this interview" handoff from a Job Matching result. A practice mode (answer a question, get feedback) is a possible later addition.

### v5 — Job Search Agent
An agent that searches for job opportunities based on the user's saved preferences and surfaces the best matches. First-draft scope in Section 6.9. Depends on a job-data source that does not exist in the project yet.

### v6 — Job Application Tracking
Track every application — company, resume, cover letter, and status — in one place. Scope is the first-draft in Section 6.8.

### Future / unscheduled
- Premium tiers and payment orchestration (Stripe/Adyen). A Paddle checkout page exists as an optional, experimental stub only (disabled unless its env vars are set); it is not wired to any plan or entitlement
- Apple and Facebook social login
- Job-description URL fetching, if paste-text proves insufficient for real users
- Scanned/image-based resume OCR support

## 3. Technical Architecture & Constraints
The application uses a unified TypeScript stack to ensure seamless local setup and effortless cloud deployment (e.g., Vercel).

*   **Platform:** Responsive web application (desktop, tablet, mobile).
*   **Core Framework:** Next.js (App Router, TypeScript, Tailwind CSS, Shadcn UI) handling both frontend rendering and backend API routes.
*   **Agent Orchestration:** LangGraph.js managing multi-agent state flows and execution graphs.
*   **LLM Interface:** Provider-agnostic LangChain integration configured via environment variables to route prompts to a remote cloud API (Claude by default, with Qwen/OpenAI/DeepSeek/Gemini as configurable alternatives) or a local `localhost:11434` (Ollama) endpoint. Cloud is the default; local Ollama support is documented as experimental under v3 (see Section 2).
*   **Database & Storage:** Drizzle ORM against SQLite (local/self-hosted default, zero configuration required) or Postgres (production, e.g. Neon on Vercel) — chosen automatically at runtime by whether `DATABASE_URL` is set. Both paths coexist in the same codebase rather than being an either/or build-time choice; see Section 2's v2 entry.
*   **Authentication:** Auth.js (NextAuth) with Google login only; Facebook and Apple are deferred (see Section 7).

## 4. UX Benchmarking & Reference Sites
UX/UI benchmarks for this project (reference site names, URLs, screenshots, and design notes, including authenticated screens not reachable by a plain URL) are kept privately and are not part of this public repository. They cover layout clarity, feedback visualization, and conversion flow, and are consulted when designing interfaces and user journeys rather than referenced by name here.

## 5. Agentic Workflow Definitions (LangGraph.js State Machine)
The backend orchestrates the following specialized nodes using LangGraph.js. LangGraph.js was chosen deliberately over CrewAI or other Python-based agent frameworks to keep a single TypeScript codebase (see CLAUDE.md); both workflows are fixed, explicitly typed graphs rather than open-ended multi-agent delegation: the score/match pipeline is sequential, and the interview-prep workflow fans out to parallel specialists with a fixed join.

1.  **Data Extraction Node (v1):** Ingests PDF/DOC text and structures it into a standardized JSON schema (Experience, Education, Skills).
2.  **ATS Scoring Node (v1):** Evaluates the extracted JSON against standard ATS parsability metrics, keyword density, and formatting rules.
3.  **Matcher Node (v1):** Compares the structured resume data against a provided Job Description (pasted text; URL input is deferred, see Section 2) to calculate a dimension-based matching score.
4.  **Recommendation Node (v1):** Analyzes output from the scoring and matching nodes to generate actionable, human-readable improvement suggestions.
5.  **Copywriter Node (v2):** Specializes in tone and narrative to write authentic, humanized cover letters (general or targeted).
6.  **Interview Prep agents (v4, shipped):** A second compiled graph (`src/lib/graph/interview/`), separate from the score/match graph. An analyst agent reads the resume and job description into a shared brief; an optional research step runs web lookups on the company and the interviewer (Tavily, opt-in); four specialist agents then run in parallel (interviewer profiler, prep planner, question coach, ask-back advisor); a code-only compile step validates the merged result. Only the question coach is required.

## 6. Core Features & Acceptance Criteria

### 6.1. Marketing & Public Landing Page (v1)
*   **Action:** Unauthenticated users visiting the root URL (`/`) land on a conversion-optimized marketing page.
*   **Output:** Hero section with primary CTAs ("Get Started Free" / Login and "View on GitHub"), core feature highlights (ATS scoring, job matching, cover letters), an open-source roadmap section covering the next planned items (currently Interview Preparation in its testing phase (v4), Job Search Agent (v5), and Job Application Tracking (v6) — see Sections 2, 6.8 and 6.9), and a link to the ATS Learning Hub.
*   **Acceptance:** Must clearly communicate that the project is open-source and free to use, positioned against paid commercial career tools — without naming specific competitors by name. Local execution via Ollama may be described as possible but experimental; do not claim validated privacy guarantees, quality, or performance for it until the v3 validation is done.

### 6.2. Resume Analysis & ATS Scoring (v1)
*   **Action:** User uploads a PDF/DOC.
*   **Output:** An overall ATS score and categorized recommendations for improvement.
*   **Method:** Hybrid scoring. Five of the six categories (contact info, section structure, date formatting, content depth, quantified achievements) are deterministic, unit-tested checks against the parsed resume; only "Keyword & Content Relevance" is an LLM judgment. The overall score is a weighted average computed in code, never a number the LLM invents, so repeated runs stay consistent.
*   **Acceptance:** Must correctly parse standard resume formats and handle multi-lingual text (English, German, Turkish); v1 targeted English-language resumes.

### 6.3. Job Description Matching (v1: pasted text; URL input is future)
*   **Action:** User provides a job description (text) alongside their resume. URL-based fetching is deferred (see Section 2) due to scraping fragility on most job boards.
*   **Output:** A matching score broken down by six dimensions (Skills, Experience, Education, Domain Fit, Seniority Fit, Culture Fit) with specific gap-analysis recommendations. The overall score is a weighted average computed in code, grounded by a deterministic keyword-overlap computation.
*   **Hard constraints:** Language and location requirements stated in the job description are extracted separately (met / not met) rather than blended into a dimension score; an unmet constraint caps the overall score.
*   **Culture Fit enrichment (opt-in):** Culture Fit can be grounded with a web search about the target company when `TAVILY_API_KEY` is set; a failed or absent lookup never blocks the match.

### 6.4. Cover Letter Generation (v2)
*   **Action:** User selects "Generate Cover Letter".
*   **Output:** A dynamically generated letter (General: based on resume only. Targeted: based on resume + job description).
*   **Acceptance:** Tone must be professional yet humanized, avoiding standard AI clichés (overused words, forced groups of three, "not just X, it's Y" constructions, overly agreeable tone, generic uplifting endings, filler phrases). The Copywriter Node's prompt should draw on the pattern list from [blader/humanizer](https://github.com/blader/humanizer) (MIT licensed; adapt the patterns into the prompt itself rather than taking a runtime dependency on the skill, which is built for interactive agent use, not a callable backend component). The node must not invent facts: any name, number, date, or achievement in the generated letter must come from the parsed resume data, never fabricated to sound more impressive.

### 6.5. Interview Preparation Module (v4, first version shipped)
*   **Action:** User provides a resume and a job description, plus optional interviewer details (name, role, LinkedIn profile, or notes).
*   **Output:** An interview plan: an interviewer profile (when details were given), what to review before the interview, likely questions with suggested answers, questions for the candidate to ask, and additional tips, in the user's chosen UI language.
*   **Acceptance:** Suggested answers may only draw on facts in the parsed resume — where the resume does not support an answer, the guidance says to prepare a real example rather than inventing evidence. Counts as one daily action regardless of how many agents run. If an agent other than the question coach fails, its section is omitted and the plan still returns.
*   **Privacy:** Web research is opt-in (`TAVILY_API_KEY`). The interviewer lookup only runs when the user typed interviewer details and the analyst extracted a name, and its query contains only the extracted name, role, and company, never the raw text. Results are shown as unverified and only professional information is used. The form tells the user a search may run.

### 6.6. ATS Learning Hub (shipped)
*   **Action:** User navigates to the Learning Hub.
*   **Output:** Static/Markdown-driven informational pages explaining what ATS is, how filtering works, and best practices.

### 6.7. Internationalization (i18n) (shipped)
*   **Scope:** UI and Agent outputs must support at least English, German, and Turkish. 
*   **Acceptance:** Users can toggle application language, dynamically adjusting prompt instructions for the target language.

### 6.8. Job Application Tracking (v6, first-draft scope — open for refinement)
*   **Action:** User saves a job application as a tracked record — either manually, or (the more valuable entry point) with one click straight from a completed JD match or cover letter generation, pre-filling the company, position, resume version, cover letter, and job description from that session.
*   **Output:** A list (and/or a simple board view grouped by status) of tracked applications, each showing company, position, status, and applied date; opening one shows the full record — status/notes, the resume and cover letter versions used, the job description text, and an optional posting URL.
*   **Suggested fields per application (draft, not locked):** company, position/title, status (a pipeline such as Saved → Applied → Phone Screen → Interview → Offer → Rejected → Withdrawn — exact stages TBD, possibly user-customizable), applied date, job description text (reused from an existing JD match when the application originates there, rather than re-entered), resume used (references an existing `resumes` row), cover letter used (once cover letters are persisted entities, not just returned inline), job posting URL (optional — a bookmark, not scraped), free-text notes, optional follow-up-reminder date, optional location/remote status and salary range.
*   **Acceptance (draft):** Creating, editing, and viewing tracked applications must **not** count against the daily 3-action rate limit (Section 7) — this is plain CRUD, not an agent/LLM invocation.
*   **Open questions for whoever scopes this phase:** the exact status pipeline and whether users can customize it; whether to add follow-up reminders (would need a notification/email delivery mechanism — new infrastructure, not yet decided); whether a lightweight analytics view (applications this month, interview conversion rate) belongs in the first cut or later; list view vs. kanban-by-status vs. both.

### 6.9. Job Search Agent (v5, placeholder scope)
*   **Action:** User saves job search preferences (target roles, locations/remote, seniority, salary range, keywords to include or avoid); an agent periodically searches for matching openings and surfaces the best ones, scored against the user's resume with the existing Matcher node.
*   **Output:** A ranked list of opportunities with a match score and a short rationale each, which, once Job Application Tracking (6.8, v6) ships, the user can send there with one click.
*   **Open questions for whoever scopes this phase:** the job-data source (public job APIs vs. licensed aggregators; scraping job boards is fragile and often against their terms); how often the agent runs and where (on-demand vs. scheduled, which needs new infrastructure on Vercel); whether this counts against the daily action limit; how it behaves with a local Ollama model. Deliberately left undefined until v4 is built and validated.

## 7. User Management & Monetization

### Phase 1: Free Tier (v1)
*   **Authentication:** Mandatory social login to track usage. v1 ships with Google only; Facebook and Apple are deferred (Apple requires a paid developer account, Facebook requires app review, both add friction against the local-first/zero-cost story).
*   **Rate Limiting:** Every authenticated user is strictly limited to **3 actions per day**.
*   **Implementation:** Lightweight database counter managed via Drizzle ORM resetting at midnight UTC.

### Phase 2: Premium Tiers (future, unscheduled)
*   **Payment Orchestration:** Feature flags and usage limits must be decoupled from the core LangGraph engine, anticipating future integration with PSPs like Stripe or Adyen.

## 8. Non-Functional Requirements: Security, Testing & CI/CD

### 8.1. Security & Privacy
*   **PII Handling:** Resumes uploaded by users contain sensitive personal data. Files must be processed in memory or stored securely with strict user-access isolation. Local execution via Ollama (experimental, see v3) lets a self-hoster keep resume data on their own machine; by default resume data is sent to the configured cloud provider (Claude, Qwen, OpenAI, DeepSeek, or Gemini).
*   **Environment Security:** All API keys (for cloud LLMs like Qwen/OpenAI/DeepSeek/Gemini or auth providers) must be strictly managed via `.env` files and never exposed to the client-side bundle.
*   **Secret Protection & Leak Prevention:** The repository must enforce strict pre-commit hooks (using Husky and git-secrets/scanning checks) to block any accidental staging of API keys, `.env` files, or private credentials. 
*   **Rate Limiting & Abuse Prevention:** API routes executing agent workflows must enforce the daily action limits per authenticated user to prevent API cost overruns or abuse.
*   **Analytics (opt-in, provider-agnostic):** Product analytics (e.g. Google Analytics) must follow the same provider-agnostic, `.env`-driven pattern as the LLM interface (see Section 3) — unset by default, so a self-hosted instance sends no data to any third party unless its own operator explicitly configures a provider. This is what makes analytics compatible with the project's open-source/self-hosting story: the choice to enable tracking belongs to whoever runs a given deployment, not something baked into the app for everyone.
    *   **Consent/compliance (deliberately deferred):** Enabling Google Analytics for a real deployment with EU visitors requires visitor consent obtained *before* the tracker fires (per GDPR/ePrivacy) — a disclosure-only cookie policy page is not sufficient on its own. This project's own production deployment will ship the opt-in analytics capability *without* a consent-gating mechanism initially; the consent flow itself is intentionally deferred to a dedicated pass shortly before General Availability, informed by user feedback and competitive/market benchmarking of how comparable products handle it, rather than built speculatively now. Anyone self-hosting and enabling analytics themselves is responsible for their own compliance in the meantime.

### 8.2. Testing
*   **Unit & Integration Tests:** Critical business logic (such as ATS scoring calculations, resume parsers, and rate-limiting counters) must include automated test coverage using Vitest.
*   **Agent Mocking:** Tests for LangGraph workflows must include mock LLM responses to ensure reliable, fast CI runs without requiring active API calls or live Ollama instances.
*   **Known edge case:** the daily rate-limit counter can be raced by concurrent requests before the counter updates. Acceptable at current scale. It was planned for v2 but deferred and is still open; the fix is a transactional counter.

### 8.3. CI/CD Pipeline
*   **GitHub Actions:** Automated CI pipeline must run on every pull request and push to main, executing:
    1. TypeScript type checking (`tsc --noEmit`)
    2. Linting (`eslint`)
    3. Secret scanning
    4. Automated test suites (`vitest run`)
*   **Deployment:** Seamless automatic deployments to Vercel for the production branch.
