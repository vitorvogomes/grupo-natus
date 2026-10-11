# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state

**Epics 1–7 concluídas (32/35 stories) + revisões de cliente v2 e v3.** Gates A ✅ e B ✅; Epic 8 (Supabase/Admin, Gate C) é condicional e fora do plano. Histórico e números correntes (testes, cobertura, build) no fim de `docs/PROGRESS.md`; decisões no `.memlog.md` da spine.

Stack: Next.js 16.3.5 (App Router) + React 19 + TS 6 estrito + Tailwind v4.3 + Vitest 5 (gate 85%, `docs/adr/0001-coverage-85.md`). Tipografia Outfit (títulos) + Inter (`next/font`); ícones lucide (zero emoji); primitivos Radix (Dialog, Accordion, Tabs, Progress, Select); motion via `motion`; forms com react-hook-form + zod (`LeadForm` → `/api/leads`, honeypot + rate-limit, email atrás de secret).

Pastas: `app/`, `components/` (+`ui/`, `motion/`, `showcase/`), `features/` (`developments`, `home`, `institutional`, `mcmv`, `contact`, `seo`), `content/developments/`, `lib/`, `types/`, `styles/`, `scripts/`, `public/`.

**Portfólio (`content/developments/data.ts`, 11 empreendimentos — fonte estática, AD-2).**
- **Status** `lancamento · em_construcao · pronto · breve_lancamento`. A ordem de `DEVELOPMENT_STATUSES` é a prioridade de exibição: `getAllDevelopments()` ordena por ela (Home, catálogo e "explore" abrem pelos lançamentos). **100% vendido** = `soldOut`, só sobre `pronto` (teste de conteúdo), exibido como faixa (`SoldOutBand`) **só no card**. Selos (`DevelopmentBadges`: status + MCMV) são neutros, sem cor por status.
- **`mcmv`** só nos 6 confirmados pelo cliente. Marca federal fora do programa sugere credenciamento inexistente.
- **`propertyType`** só com evidência no material (3 pendentes). **`location.neighborhood`** compõe o título do resumo ("UF," / "Bairro - Cidade" ou só a cidade — `formatLocality`).
- **Imagens**: categorias `imagens · planta · obra` (ordem das abas = `DEVELOPMENT_IMAGE_KINDS`); a 1ª é a capa e nunca é planta/obra. Largura/altura vêm do manifesto `content/developments/image-dimensions.json`, e o `sizes` de fotos com `object-cover` é calculado da proporção (`coverSizes`). `amenitiesImage` escolhe a foto do "O que oferece".
- **Pipeline** `npm run optimize:images [slug|singles|institucional|brand|manifest]` (`scripts/optimize-images.mjs`, sharp → WEBP): originais em `img/<pasta>/`, saída em `public/`; `quality`/`sharpen` por job ou imagem para fontes pequenas; o manifesto é regerado em toda execução (um teste acusa imagem fora dele).

**Página do empreendimento (`app/empreendimentos/[slug]/page.tsx`) — uma página, composição por status.** Ordem: resumo → galeria → o que oferece → localização → estágio de obra → CTA → MCMV → explore. Lançamento = completa; em construção/pronto = reduzida (só o que tem dado); `breve_lancamento` = seção mínima (`DevelopmentComingSoon`, sem localização/CTA/sub-nav). Obra só em lançamento e em construção, quando `hasProgressToShow` (total ou etapa > 0); etapas oficiais Fundação · Estrutura · Alvenaria · Acabamento interno · Acabamento externo, e `canonicalStages` omite as em 0%.
- **Sub-nav** recebe as seções renderizadas: Imagens · Empreendimento (→ "O que oferece", ou o resumo sem diferenciais) · Localização · Estágio de Obra · Consultor.
- **Galeria** (`Gallery.tsx`, reaproveitada em `/engenharia`) + lightbox; imagens grandes entregues em q90 (`next.config` permite 75 e 90). **Accordion** de "O que oferece" com `type="single"`.
- **Mapa** (`DevelopmentMap`): sem chave, embed público (não aceita marcador próprio); com `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` + `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID`, JS API com o pin da Natus. Passo a passo em `docs/google-maps.md`.

**Home**: hero só imagem (logo branca sobreposta até o header entrar) → busca (Status · Cidade · Tipo → `/empreendimentos?…`, rota dinâmica) → carrossel (3 por vez no desktop) → MCMV → Grupo Natus. **Header** oculto no topo da Home até rolagem ou hover; o alvo do hover é o invólucro do próprio header — nunca empilhar camada de captura por cima. Sem submenu de empreendimentos.

**Invariantes de UI que já custaram bug:**
- Carrosséis rolam só o trilho (`features/developments/carouselTrack.ts`): `scrollTo`, nunca `scrollIntoView`; trilho `relative` (contém `sr-only`/absolutes dos cards). Senão a página ganha rolagem horizontal.
- `ProgressBar` observa o trilho, não o preenchimento em `scaleX(0)` (o IntersectionObserver falha em caixa de largura zero).

**Institucional**: textos de empresas, valores, certificações (ISO 9001 + PBQP-H) e números da operação vivem em `features/institutional/` (fonte única de Quem Somos, Engenharia e Home). A contagem "entregues × em desenvolvimento" de Quem Somos vem de `getPortfolioCounts()`.

**Pendências 🔔 (`docs/CONTENT-GAPS.md`):** material dos 4 breve lançamentos; data/periodicidade da atualização de obra; chaves do Google Maps; campos do Negocie seu Terreno; provedor de email (Resend `[ASSUMPTION]`) + secret; domínio de produção; redes sociais e CNPJ/CRECI do rodapé.

Materiais de origem (ainda a base de verdade):

- `README` — the master brief / master prompt (Portuguese). This is the authoritative spec: read it in full before doing anything. It defines the product, design principles, page scope, data model sketches, development rules, and the 13-phase workflow.
- `NOTAS` — condensed notes from the client (Portuguese): references, page list, functional requests.
- `img/` — local visual assets (see below). These are real project materials, not placeholders.
- `supabase/` — only Supabase CLI scratch dirs (`.branches/`, `.temp/`) exist; **no `config.toml`, no migrations, no schema.** Supabase is *not* initialized in this working tree yet, though the brief states a Supabase project already exists remotely.

**Planning artifacts (BMAD, in `docs/`) — read before implementing:**
- `docs/product-brief.md` — vision, audience, scope, the 11 developments (confirmed by the client in the v3 review), constraints.
- `docs/prd.md` — FRs/NFRs, conceptual data model (`Development`, `ConstructionProgress`), epic overview, gates, open risks.
- **`_bmad-output/planning-artifacts/epics.md`** — **canonical backlog** (BMAD): Requirements Inventory (FR/NFR/UX-DR), FR Coverage Map, **8 epics · 35 stories** in Given/When/Then. `docs/epics.md` is now just a pointer to it. Gates: A (theme-showcase approval, end of Epic 1); B (validate one development page before generating the rest, Epic 3); C (persistence/admin only on concrete need, Epic 8).
- **`_bmad-output/planning-artifacts/architecture/architecture-natus-2026-09-16/ARCHITECTURE-SPINE.md`** — **architecture spine** (BMAD): the binding invariants (AD-1…AD-8), design paradigm, conventions, verified stack (Next.js 16.3.5 / React 19 / Tailwind 4.3 / Vitest 5.0.1), source tree, and Capability→Architecture map. `[ASSUMPTION]` tags mark unconfirmed picks (supabase-js/@supabase/ssr, Resend, create-next-app starter). The `.memlog.md` beside it is the decision log.

## Workflow, skills & the sacred TDD gate (`.claude/`)

**TDD is mandatory.** Every story is built red→green→refactor with a **coverage floor of 85%** (baixado de 90% em 2026-09-18 pela adoção do shadcn/Radix — ver docs/adr/0001-coverage-85.md; 85% é piso, não teto), enforced two ways:
- The test runner (Vitest, wired in Epic 1) must set `coverage.thresholds` to 85% (lines/functions/branches/statements) and expose a `test:coverage` npm script.
- A **Stop hook** (`.claude/hooks/coverage-gate.sh`) runs `npm run test:coverage` before a turn can end and **blocks (exit 2)** if tests fail or coverage < 85%. It is a no-op until `package.json` has `test:coverage`, and skips when no `.ts/.tsx` under `src|app|components|lib|features|tests` changed since the last green run.
- A non-blocking **PostToolUse hook** (`.claude/hooks/tdd-reminder.sh`) nudges when a source file is written without a sibling `*.test.tsx`. Keep the "test first" discipline so it stays quiet.

**Slash commands** (`.claude/commands/`): `/story <ID|desc>` — implement an epic story via strict TDD + the DoD (coverage ≥85%, lint, typecheck); `/tdd <unit>` — a single red-green-refactor loop; `/coverage` — run the gate manually and report gaps. Do **not** lower the 85% threshold further to "pass" — cover for real (o abaixamento 90→85 é decisão documentada, não atalho).

**Installed skills** (`.claude/skills/`): use them when relevant —
- `nextjs-app-router-patterns` (App Router/RSC), `tailwind-design-system` (tokens/design system), `framer-motion-animator` / `animate` (motion), `nextjs-seo` (SEO), `vitest-testing` (TDD), `better-*` / `emil-design-eng` (UI, a11y e revisão de interface), `supabase` + `supabase-postgres-best-practices` (**load before any Postgres/RLS/migration work** — critical given the do-not-touch-RLS rule).
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
- **Edit `.env` blindly** (Edit/Write) — set/change a key without displaying its value. Reference variables by name; validate via `lib/env` server-side (AD-4). Never log secrets, never commit them (`.env*` is gitignored). This upholds README §17 (preserve RLS/env/secrets) and spine AD-4/AD-5.

## What is being built

The institutional website for **Grupo Natus** (Brazilian real-estate + engineering company). Goal: a professional, modern, conversion-oriented site — not a generic template and not something that looks AI-generated. Core entity is the **empreendimento** (development): 11 active developments, each with its own detail page driven by a shared data model, plus institutional pages (Engenharia, Negocie seu Terreno, Quem Somos, Fale Conosco) and a Home that doubles as the catalog.

Reference site for *structure/UX/interaction* (never for visual copying): novolar.com.br. Current Natus site: natusgrupo.com.br.

## Intended architecture (from the brief)

- **Next.js App Router + TypeScript**, Server Components by default, Client Components only where needed. Keep it simple — this is an institutional site, not a SaaS. No microservices, no separate backend, no premature abstractions.
- **Developments are data, not duplicated pages.** One `/empreendimentos/[slug]` template fed by a shared `Development` model (see the `type Development` and `type ConstructionProgress` sketches in `README`). Validate one full development page before replicating the rest.
- **Content vs. persistence:** keep data as static content unless dynamic administration is genuinely required. Only create Supabase tables when there is a real need. If persistence is needed, use Supabase; auth (if ever needed) via Supabase Auth; APIs via Next.js Route Handlers. An `/admin` panel only if concretely justified.
- **Cross-cutting abstractions to build once, not inline everywhere:** a single WhatsApp floating-button/link abstraction (context-aware messages), Google Maps location (start with embed/link, avoid coupling the whole app to the Maps API), forms with validation + spam strategy (email sending wired only after the flow is defined), and motion that serves hierarchy/storytelling (no gratuitous animation, protect Core Web Vitals).

## Critical constraints — do not violate

- **Do not modify, remove, or disable Supabase RLS policies** or existing env vars/secrets. If an env var must change, change only what's necessary, never print or expose secret values.
- **Do not invent development content.** When information is missing, mark it `TODO: CONTENT REQUIRED` or use an explicitly-labeled mock. Never present fabricated data as real.
- **Preserve Grupo Natus branding** — official logo, institutional colors, existing visual identity. Do not swap brand colors for an arbitrarily "prettier" palette. Use novolar as a structural reference only; do not copy it visually.
- **No over-engineering.** Prefer the simplest solution. Componentize by behavior/reuse/domain, not to turn every `<div>` into a file.
- **Discovery before code.** The brief's Phase 0 expects analysis and a validated plan (sitemap, architecture/design direction) *before* large implementation — pause and present findings rather than auto-advancing into a big build.

## Local assets (`img/`)

Originais versionados; o site serve só o que o pipeline gera em `public/`.
- `img/LOGOS/LOGO/JPG/` — logos oficiais (`GRUPO_NATUS_PRINCIPAL`, `_NEGATIVA`, `_PRETA`, `_ASSINATURA`); `img/LOGOS/Favicon/` — símbolo (pin do mapa e `app/icon.png`). As cores da marca derivam deles (`styles/theme.css`).
- `img/<Empreendimento - Cidade UF>/` — renders, plantas e fotos por empreendimento; o mapeamento arquivo → saída é explícito no `JOBS` de `scripts/optimize-images.mjs`. `img/(sem foto) …` marca quem ainda não tem material.
- `img/Quem Somos/`, `img/Servico - */`, `img/home/`, `img/breve-lancamento.png` (foto padrão do breve lançamento).

## Tooling notes

- **BMAD** está instalado (`_bmad/`, saída em `_bmad-output/`); use-o com leveza, para clareza, não burocracia.
- O theme-showcase (`/theme-showcase`) foi aprovado no Gate A; mudanças de token passam por `styles/theme.css` (AD-7: cor só em CSS).

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

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
