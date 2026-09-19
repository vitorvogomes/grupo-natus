# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state

**Epics 1–7 concluídas (32/35 stories).** App Next.js 16.3.5 (App Router) + TS 6 estrito + Tailwind v4.3 + Vitest 5 (gate 85%, ver docs/adr/0001-coverage-85.md). Entregue: design system + theme-showcase (**Gate A ✅**); Home/catálogo + filtros; template de empreendimento `[slug]` (hero, sub-nav âncora, galeria, detalhes, mapa, progresso, CTA/interesse) validado (**Gate B ✅**) gerando as 11 páginas por dados; evolução das obras; formulários (Fale Conosco, Interesse, Negocie seu Terreno) + `/api/leads` (honeypot + rate-limit + email atrás de secret); institucionais; SEO site-wide (sitemap/robots/JSON-LD), a11y (skip-link) e motion (`prefers-reduced-motion`). Build: 23 páginas (estático/SSG; `/api/leads` dinâmico), 205 testes.

Pastas: `app/`, `components/` (+`ui/`, `showcase/`), `features/` (`developments`, `contact`, `home`, `land-submission` via páginas, `seo`), `content/developments/`, `lib/`, `types/`, `styles/`, `public/`.

**Pendências 🔔 (`docs/CONTENT-GAPS.md`):** conteúdo real dos 11 empreendimentos + institucionais; %-reais de obra; campos do Negocie seu Terreno; provedor de email (Resend `[ASSUMPTION]`) + secret; domínio de produção; compressão dos fontes de imagem. **Epic 8** (Supabase/Admin, Gate C) é condicional e fora do plano atual.

Materiais de origem (ainda a base de verdade):

- `ESCOPO` — the master brief / master prompt (Portuguese). This is the authoritative spec: read it in full before doing anything. It defines the product, design principles, page scope, data model sketches, development rules, and the 13-phase workflow (Discovery → Brief → UX → Design System → theme-showcase → Architecture → Foundation → Home → Development template → remaining developments → institutional pages → dynamic features → validation).
- `NOTAS` — condensed notes from the client (Portuguese): references, page list, functional requests.
- `img/` — local visual assets (see below). These are real project materials, not placeholders.
- `supabase/` — only Supabase CLI scratch dirs (`.branches/`, `.temp/`) exist; **no `config.toml`, no migrations, no schema.** Supabase is *not* initialized in this working tree yet, though the brief states a Supabase project already exists remotely.

Ainda não há repositório git. Os comandos abaixo já valem (scaffold criado no E1.1).

**Planning artifacts (BMAD, in `docs/`) — read before implementing:**
- `docs/product-brief.md` — vision, audience, scope, the 11 real developments (grounded from the live site), constraints.
- `docs/prd.md` — FRs/NFRs, conceptual data model (`Development`, `ConstructionProgress`), epic overview, gates, open risks.
- **`_bmad-output/planning-artifacts/epics.md`** — **canonical backlog** (BMAD): Requirements Inventory (FR/NFR/UX-DR), FR Coverage Map, **8 epics · 35 stories** in Given/When/Then. `docs/epics.md` is now just a pointer to it. Gates: A (theme-showcase approval, end of Epic 1); B (validate one development page before generating all 11, Epic 3); C (persistence/admin only on concrete need, Epic 8).
- **`_bmad-output/planning-artifacts/architecture/architecture-natus-2026-09-16/ARCHITECTURE-SPINE.md`** — **architecture spine** (BMAD): the binding invariants (AD-1…AD-8), design paradigm, conventions, verified stack (Next.js 16.3.5 / React 19 / Tailwind 4.3 / Vitest 5.0.1), source tree, and Capability→Architecture map. `[ASSUMPTION]` tags mark unconfirmed picks (supabase-js/@supabase/ssr, Resend, create-next-app starter). The `.memlog.md` beside it is the decision log.

## Workflow, skills & the sacred TDD gate (`.claude/`)

**TDD is mandatory.** Every story is built red→green→refactor with a **coverage floor of 85%** (baixado de 90% em 2026-09-18 pela adoção do shadcn/Radix — ver docs/adr/0001-coverage-85.md; 85% é piso, não teto), enforced two ways:
- The test runner (Vitest, wired in Epic 1) must set `coverage.thresholds` to 85% (lines/functions/branches/statements) and expose a `test:coverage` npm script.
- A **Stop hook** (`.claude/hooks/coverage-gate.sh`) runs `npm run test:coverage` before a turn can end and **blocks (exit 2)** if tests fail or coverage < 85%. It is a no-op until `package.json` has `test:coverage`, and skips when no `.ts/.tsx` under `src|app|components|lib|features|tests` changed since the last green run.
- A non-blocking **PostToolUse hook** (`.claude/hooks/tdd-reminder.sh`) nudges when a source file is written without a sibling `*.test.tsx`. Keep the "test first" discipline so it stays quiet.

**Slash commands** (`.claude/commands/`): `/story <ID|desc>` — implement an epic story via strict TDD + the DoD (coverage ≥85%, lint, typecheck); `/tdd <unit>` — a single red-green-refactor loop; `/coverage` — run the gate manually and report gaps. Do **not** lower the 85% threshold further to "pass" — cover for real (o abaixamento 90→85 é decisão documentada, não atalho).

**Installed skills** (`.claude/skills/`): use them when relevant —
- `nextjs-app-router-patterns` (App Router/RSC), `tailwind-design-system` (Epic 1 design system), `framer-motion-animator` (Epic 8 motion), `nextjs-seo` (Epic 9), `vitest-testing` (TDD), `supabase` + `supabase-postgres-best-practices` (**load before any Postgres/RLS/migration work** — critical given the do-not-touch-RLS rule).
- `find-skills` — discover/install more skills via `npx skills find <query>` / `npx skills add <owner/repo@skill> -a claude-code -y`.
- **BMAD** (`bmad-*`, module in `_bmad/`, config in Portuguese): `bmad-prd`, `bmad-create-epics-and-stories`, `bmad-architecture`, `bmad-sprint-planning`, `bmad-qa-generate-e2e-tests`, `bmad-review`, `bmad-help`. Use to refine planning artifacts; BMAD output folder is `_bmad-output/`.

`.claude/settings.json` allowlists common dev commands (npm/npx/node/pnpm/git-read) to reduce prompts. Personal overrides go in `.claude/settings.local.json` (gitignored).

### Progress tracking & doc coherence

**`docs/PROGRESS.md`** is the single status board (8 epics · 35 stories, ⬜/🔵/✅/⛔ + gates). Keep it and the other docs in sync **as development happens**:
- On finishing a story, run **`/progress <ID>`** — it marks the story done, recomputes counts, and runs the **doc-coherence checklist**: reconcile `epics.md` (canonical), `ARCHITECTURE-SPINE.md` + its `.memlog.md`, PRD/brief, and this file with what was actually built. `/story` includes this in its Definition of Done.
- **`/progress audit`** (or no arg) prints the summary and flags divergences between the real repo and the docs. Never fabricate status — reflect the real repo state.

### Secrets & env vars — never expose in the `.claude` context

Env vars and credentials are used/manipulated **by name only; never print their values** into the transcript/context.
- **Enforced** by a `PreToolUse` Bash hook (`.claude/hooks/secrets-guard.sh`) that blocks `cat/less/head/tail/source .env*`, `grep/sed/awk … .env*`, `printenv`, bare `env` dumps, and `echo/printf $…KEY/SECRET/TOKEN/PASSWORD/CREDENTIAL/SERVICE_ROLE`. `permissions.deny` also blocks `Read(**/.env*)`.
- **Edit `.env` blindly** (Edit/Write) — set/change a key without displaying its value. Reference variables by name; validate via `lib/env` server-side (AD-4). Never log secrets, never commit them (`.env*` is gitignored). This upholds ESCOPO §17 (preserve RLS/env/secrets) and spine AD-4/AD-5.

## What is being built

The institutional website for **Grupo Natus** (Brazilian real-estate + engineering company). Goal: a professional, modern, conversion-oriented site — not a generic template and not something that looks AI-generated. Core entity is the **empreendimento** (development): 11 active developments, each with its own detail page driven by a shared data model, plus institutional pages (Engenharia, Negocie seu Terreno, Quem Somos, Fale Conosco) and a Home that doubles as the catalog.

Reference site for *structure/UX/interaction* (never for visual copying): novolar.com.br. Current Natus site: natusgrupo.com.br.

## Intended architecture (from the brief)

- **Next.js App Router + TypeScript**, Server Components by default, Client Components only where needed. Keep it simple — this is an institutional site, not a SaaS. No microservices, no separate backend, no premature abstractions.
- **Developments are data, not duplicated pages.** One `/empreendimentos/[slug]` template fed by a shared `Development` model (see the `type Development` and `type ConstructionProgress` sketches in `ESCOPO`). Validate one full development page before replicating the rest.
- **Content vs. persistence:** keep data as static content unless dynamic administration is genuinely required. Only create Supabase tables when there is a real need. If persistence is needed, use Supabase; auth (if ever needed) via Supabase Auth; APIs via Next.js Route Handlers. An `/admin` panel only if concretely justified.
- **Cross-cutting abstractions to build once, not inline everywhere:** a single WhatsApp floating-button/link abstraction (context-aware messages), Google Maps location (start with embed/link, avoid coupling the whole app to the Maps API), forms with validation + spam strategy (email sending wired only after the flow is defined), and motion that serves hierarchy/storytelling (no gratuitous animation, protect Core Web Vitals).

## Critical constraints — do not violate

- **Do not modify, remove, or disable Supabase RLS policies** or existing env vars/secrets. If an env var must change, change only what's necessary, never print or expose secret values.
- **Do not invent development content.** When information is missing, mark it `TODO: CONTENT REQUIRED` or use an explicitly-labeled mock. Never present fabricated data as real.
- **Preserve Grupo Natus branding** — official logo, institutional colors, existing visual identity. Do not swap brand colors for an arbitrarily "prettier" palette. Use novolar as a structural reference only; do not copy it visually.
- **No over-engineering.** Prefer the simplest solution. Componentize by behavior/reuse/domain, not to turn every `<div>` into a file.
- **Discovery before code.** The brief's Phase 0 expects analysis and a validated plan (sitemap, architecture/design direction) *before* large implementation — pause and present findings rather than auto-advancing into a big build.

## Local assets (`img/`)

72 files. Notable:
- `img/LOGO-.../LOGO/{JPG,PDF}/` — official Grupo Natus logos: `GRUPO_NATUS_PRINCIPAL`, `_NEGATIVA` (negative), `_PRETA` (black), and `_ASSINATURA` (with signature/tagline) variants. Use these; derive brand colors from them.
- `img/Final/`, `img/Imagens 3D (Prévia)/`, `img/01.3.10. Perspectivas 3D/` (with `APTOS`, `EXTERNA`, `PLANTAS HUMANIZADAS`, `Maquete`) — 3D renders, humanized floor plans, and maquete images for development(s). Analyze these before making visual decisions; use `next/image`.

## Tooling notes

- **Skills** referenced in the brief and expected to be used: `find-skills`, `theme-factory`, `ui-ux-pro-max`. Check what's installed before starting design work.
- **BMAD method** (github.com/bmad-code-org/bmad-method) is *not* installed (no `_bmad`). The brief asks to verify (`ls -la _bmad`, `npx bmad-method --version`) and propose installation before structuring the plan — used lightly for clarity, not bureaucracy.
- A **`theme-showcase.pdf`** is an expected deliverable that must be reviewed and approved before building all pages — don't consider the design system closed before that gate.

## Commands

Definidos em `package.json` (criados no E1.1):
- `npm run dev` — servidor de desenvolvimento (Next + Turbopack).
- `npm run build` — build de produção (roda typecheck do Next).
- `npm run lint` — ESLint (flat config: `eslint-config-next/core-web-vitals` + `/typescript`).
- `npm run typecheck` — `tsc --noEmit` (TS 6 strict).
- `npm test` / `npm run test:watch` — Vitest (run / watch).
- `npm run test:coverage` — Vitest com cobertura; **threshold 85%** em lines/functions/branches/statements. Mede só o código de app (`app/`, `components/`, `lib/`, `features/`, `content/`, `types/`); `app/layout.tsx` fica fora (E2E, não unit). É o comando que o Stop hook executa.

Rodar um único teste: `npx vitest run caminho/arquivo.test.tsx` ou `npx vitest run -t "trecho do nome"`.

Validação é **100% local first** — deploy/CI/hosting fora de escopo por ora.
