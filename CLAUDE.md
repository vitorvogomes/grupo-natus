# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state

**Epics 1–7 concluídas (32/35 stories) + revisões de cliente v2–v6.** Gates A ✅ e B ✅; Epic 8 (Supabase/Admin, Gate C) é condicional e fora do plano. Histórico e números correntes (testes, cobertura, build) no fim de `docs/PROGRESS.md`; decisões no `.memlog.md` da spine.

Stack: Next.js 16.3.5 (App Router) + React 19 + TS 6 estrito + Tailwind v4.3 + Vitest 5 (gate 85%, `docs/adr/0001-coverage-85.md`). Tipografia Outfit (títulos) + Inter (`next/font`); ícones lucide (zero emoji); primitivos Radix (Dialog, Accordion, Tabs, Progress, Select); motion via `motion`; forms com react-hook-form + zod (`LeadForm` → `/api/leads`, honeypot + rate-limit; ver "Leads" abaixo).

Pastas: `app/`, `components/` (+`ui/`, `motion/`, `showcase/`), `features/` (`developments`, `home`, `institutional`, `mcmv`, `contact`, `seo`), `content/developments/`, `lib/`, `types/`, `styles/`, `scripts/`, `public/`, `tests/` (helpers de teste).

**Portfólio (`content/developments/data.ts`, 11 empreendimentos — fonte estática, AD-2).**
- **Status** `lancamento · em_construcao · pronto · breve_lancamento`. A ordem de `DEVELOPMENT_STATUSES` é a prioridade de exibição: `getAllDevelopments()` ordena por ela (Home, catálogo e "explore" abrem pelos lançamentos). **Fase de vendas** = `salesBand` (`pre_lancamento` · `ultimas_unidades` · `vendido`; hoje Solar em pré-lançamento, Follow nas últimas unidades, os prontos 100% vendidos), exibida como faixa colorida (`SalesBand`, tokens `--color-band-*`) **só no card**. O teste de conteúdo amarra: vendido ⇔ pronto; pré-lançamento só em lançamento; últimas unidades em lançamento ou obra. Selos (`DevelopmentBadges`: status + MCMV) são neutros, sem cor por status.
- **`mcmv`** só nos 6 confirmados pelo cliente. Marca federal fora do programa sugere credenciamento inexistente.
- **`propertyType`** só com evidência no material ou confirmação do cliente (os 11 têm). **`location.neighborhood`** compõe o título do resumo ("UF," / "Bairro - Cidade" ou só a cidade — `formatLocality`); `location.postalCode` vai para a Localização e o JSON-LD.
- **Imagens**: categorias `imagens · planta · obra` (ordem das abas = `DEVELOPMENT_IMAGE_KINDS`); a 1ª é a capa e nunca é planta/obra. Largura/altura vêm do manifesto `content/developments/image-dimensions.json`, e o `sizes` de fotos com `object-cover` é calculado da proporção (`coverSizes`). `amenitiesImage` escolhe a foto do "O que oferece".
- **Pipeline** `npm run optimize:images [slug|singles|institucional|brand|manifest]` (`brand` também gera `public/brand/og-grupo-natus.jpg` e `app/apple-icon.png`) (`scripts/optimize-images.mjs`, sharp → WEBP): originais em `img/<pasta>/`, saída em `public/`. A faixa sai do tamanho da fonte: **alta** (≥ alvo → reduz, q92; o hero é limitado pela **largura**, para render em retrato não perder nitidez) ou **compacta** (abaixo do alvo → tamanho nativo; q95 só se o original for sem perda, PNG/TIFF; JPEG/WEBP pequenos ficam em q86), listada no relatório; `quality`/`sharpen` por imagem só como override. O manifesto é regerado em toda execução (um teste acusa imagem fora dele). O script apaga ao final o cache do otimizador (`.next/cache/images` e `.next/dev/cache/images`): ele é por URL, e trocar a foto com o mesmo nome continuaria servindo a antiga (no navegador, recarregar com Ctrl+Shift+R; ele guarda as variantes por 4 h). Fonte quase sem perda foi medida e descartada: +2–3 dB sem diferença visível e 4–5× o peso. Re-rodar tudo regrava bytes de jobs inalterados: restaure-os com `git checkout` para não inchar o repo.

**Página do empreendimento (`app/empreendimentos/[slug]/page.tsx`) — uma página, composição pelo dado.** Ordem: resumo → galeria → o que oferece → localização → estágio de obra → CTA → MCMV → explore. A composição sai do dado (galeria, diferenciais e obra aparecem quando há material; o Follow, em construção, tem a página completa); `breve_lancamento` = seção mínima (`DevelopmentComingSoon`, sem localização/sub-nav) + o formulário. **Todo empreendimento tem o "Quer saber mais?"** (`DevelopmentCta`); no breve lançamento o "Quero ser avisado" do painel leva até ele. Obra só em lançamento e em construção, quando `hasProgressToShow` (total ou etapa > 0); etapas oficiais Fundação · Estrutura · Alvenaria · Acabamento interno · Acabamento externo, e `canonicalStages` omite as em 0%. Sem fotos de obra, não há painel de canteiro: total e etapas dividem a largura.
- **Sub-nav** recebe as seções renderizadas: Imagens · Empreendimento (→ "O que oferece", ou o resumo sem diferenciais) · Localização · Estágio de Obra · Consultor.
- **Galeria** (`Gallery.tsx`, reaproveitada em `/engenharia`) + lightbox: compacta (`max-w-5xl`) no site todo; `stageFit` põe em `contain` (sobre a própria foto desfocada) o que foge muito do 16:10, como panorâmicas e retratos. Entrega em **AVIF** (WEBP de reserva); o Next escala a qualidade do AVIF ×50/80. Palco e lightbox em q100 (AVIF 63), hero/resumo/MCMV em q90 (`next.config`: `qualities` 75/90/100, `deviceSizes` com 2560). Todo `object-cover` calcula o `sizes` com `coverSizes(image, faixas)` (cada faixa: `upTo`, `vw`, proporção do bloco, `maxFactor`) ou `coverFactor`: card, resumo, "O que oferece", palco e hero. O hero (LCP com preload) tem faixas celular/tablet/desktop e teto de 2×. A galeria recebe `desktopWidth` quando não ocupa o palco inteiro (canteiro = 600). **Accordion** de "O que oferece" com `type="single"`.
- **Mapa** (`DevelopmentMap`): sem chave, embed público (não aceita marcador próprio); com `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` + `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID`, JS API com o pin da Natus. Passo a passo em `docs/google-maps.md`. Só carrega com consentimento (ver abaixo).

**Home**: hero só imagem (logo branca sobreposta até o header entrar) → busca (Status · Cidade · Tipo → `/empreendimentos?…`, rota dinâmica) → carrossel (3 por vez no desktop) → MCMV → Grupo Natus. **Header** oculto no topo da Home até rolagem ou hover; o alvo do hover é o invólucro do próprio header — nunca empilhar camada de captura por cima. Sem submenu de empreendimentos.

**Invariantes de UI que já custaram bug:**
- Carrosséis rolam só o trilho (`features/developments/carouselTrack.ts`): `scrollTo`, nunca `scrollIntoView`; trilho `relative` (contém `sr-only`/absolutes dos cards). Senão a página ganha rolagem horizontal.
- `ProgressBar` observa o trilho, não o preenchimento em `scaleX(0)` (o IntersectionObserver falha em caixa de largura zero).
- Reveal ao rolar **nunca nasce escondido no HTML** (`components/motion/armReveal.ts`): o servidor entrega o estado final, e só o que ainda está abaixo da tela quando o JS chega volta ao início e anima ao entrar. Com `initial` em `opacity: 0` no SSR, a Home no celular ficava em branco até a hidratação (medido: ~3 s em 4G lento). Vale para `Reveal` e `ProgressBar`; nada de `whileInView`/`initial` escondido do `motion` em conteúdo.

**Institucional**: resumo da engenharia, valores, certificações (ISO 9001 + PBQP-H) e números da operação vivem em `features/institutional/` (fonte única de Quem Somos, Engenharia e Home). Desde a v4 o site fala em nome do Grupo Natus: Quem Somos e Engenharia não apresentam Aliatto/Oasi separadamente, e o CTA de Quem Somos usa só a logo.

**Leads (v5)** — `app/api/leads/route.ts` valida cada formulário contra `lib/leads/schema.ts` (o que sobra é descartado) e despacha:
- **Todo lead é gravado no Supabase; o e-mail é aviso** (Resend gratuito: 100/dia). E-mail via `lib/email.ts` (`fetch`); destino `LEADS_EMAIL_TO` e remetente `LEADS_EMAIL_FROM` só no `.env` (dev = caixa pessoal; produção = marketing@natusgrupo.com.br). O remetente padrão é `onboarding@resend.dev`, o único aceito antes de o domínio ser verificado. `email_enviado` marca na linha se o aviso saiu.
- **Contato / Terreno** → `lib/leads/general.ts`: grava em `public.site_contacts` (campos do formulário em `dados`) e responde; o e-mail sai em `after()`.
- **Interesse** (página de qualquer empreendimento, inclusive breve lançamento; alvo dos anúncios) → `lib/leads/interest.ts`: grava em `public.site_leads` (Supabase) e responde; em `after()`, **CV CRM** + e-mail. O resultado fica em `crm_status`. Sem banco, e-mail e CRM saem antes da resposta, e basta um deles registrar o lead. O slug é resolvido no servidor (nome e `crmId` nunca vêm do navegador); UTM e página são lidas da URL no envio (`features/contact/pageContext.ts`, sem cookie) e, se malformadas, são saneadas, nunca derrubam o lead.
- **CV CRM** (`lib/crm/cvcrm.ts`): busca por e-mail e depois por telefone; **existe = não faz nada**; não existe = cria com `idempreendimento` = `Development.crmId` (Golden Ville 2, Follow 3, Solar 4; os demais não estão no CRM), origem `SI`, nunca `permitir_alteracao`. Comportamento medido da API: "não achou" é 400 com "Lead não encontrado" (outro 400 é erro), e um filtro que ela não reconhece é **ignorado** e devolve a lista geral. Por isso só conta como existente um lead que seja a mesma pessoa (mesmo e-mail ou mesmo telefone).
- **Rota endurecida:** só `application/json`; só a mesma origem (`Origin` = domínio do site, 1º `x-forwarded-host` ou `Host`); corpo ≤ 16 KB (em bytes); rate-limit por IP (`x-real-ip`, senão o **último** `x-forwarded-for`; mapa em memória com teto que nunca solta quem está bloqueado; a hospedagem precisa sobrescrever `x-real-ip`); honeypot; campos de uma linha sem caractere de controle. Os limites de tamanho são um só (`FIELD_MAX`), no servidor e no `LeadForm`. **Falha nunca explica o motivo**: a API devolve só o status e o formulário mostra uma mensagem única (`LEAD_ERROR_MESSAGE`). Cabeçalhos de segurança e `poweredByHeader: false` no `next.config.ts` (sem CSP por ora).
- **Invariantes:** segredos só via `lib/env.ts` (`server-only`; nomes `RESEND_API_KEY`, `LEADS_EMAIL_TO`, `LEADS_EMAIL_FROM`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `CVCRM_SUBDOMAIN`, `CVCRM_EMAIL`, `CVCRM_TOKEN`); nada de `NEXT_PUBLIC_` com segredo; `site_leads` e `site_contacts` têm **RLS ligado e nenhuma policy** (migrações em `supabase/migrations/`, aplicadas à mão no SQL Editor); logs sem dados do lead.

**SEO (v5)** — toda página usa `pageMetadata()`/`developmentMetadata()` (`features/seo/metadata.ts`: canônica + OG + Twitter; o `openGraph` da página substitui o do layout, por isso o bloco inteiro sai do helper). `app/metadata.test.ts` barra título/descrição duplicados ou com "TODO". JSON-LD em `features/seo/jsonLd.tsx` (Organization, WebSite, ApartmentComplex/Residence, BreadcrumbList; `<` escapado). Redirects do WordPress são dado (`content/redirects.ts` → `next.config.ts`, 308; teste: destino existe, sem cadeia); `npm run check:redirects` confere contra `npm start`. Rota estática nova entra em `STATIC_ROUTES` (`lib/site.ts`). `/theme-showcase` é 404 em produção.

**Cookies e privacidade (LGPD)**: `lib/consent.ts` (cookie primário `natus_consent`, 6 meses) + `features/consent/` (`ConsentProvider`/`useConsent`, `CookieBanner`, `CookiePreferencesButton` no rodapé, `MapConsentGate`). **Invariante: nada de terceiros (mapas hoje; GA4/Pixel depois) carrega sem passar por `useConsent`**, e cada categoria nova entra junto com a ferramenta, nunca vazia. Revogar os mapas com a JS API já carregada recarrega a página (o script não descarrega). Formulários e WhatsApp não usam cookie; o `LeadForm` mostra um aviso ("Os dados enviados são tratados conforme…", nunca "você concorda": a base é o art. 7º, V) com link para `/politica-de-privacidade` (rascunho para revisão jurídica). O `Modal` devolve o foco a quem o abriu. Rodapé: CNPJ (`LEGAL`) e perfis (`SOCIAL`, também no `sameAs`); o JSON-LD só publica o CNPJ quando a razão social for confirmada.

**Pendências 🔔 (`docs/CONTENT-GAPS.md`):** antes de publicar, razão social do CNPJ, revisão jurídica da política, domínio `natusgrupo.com.br` verificado no Resend, cidade do Golden Ville (CRM: São Gonçalo; site: Niterói) e hospedagem/domínio de produção (com `x-real-ip` sobrescrito pelo proxy). Conteúdo: fotos de obra (Follow, Golden Ville), material dos breve lançamentos, chaves do Google Maps, imagens melhores do Denver, textos e fotos das obras da Engenharia, vídeo do hero. **SEO e migração de URLs** (redirects do WordPress, Search Console, perfil no Google): plano em `docs/seo.md`.

Materiais de origem (ainda a base de verdade):

- `README` — the master brief / master prompt (Portuguese). This is the authoritative spec: read it in full before doing anything. It defines the product, design principles, page scope, data model sketches, development rules, and the 13-phase workflow.
- `NOTAS` — condensed notes from the client (Portuguese): references, page list, functional requests.
- `img/` — local visual assets (see below). These are real project materials, not placeholders.
- `supabase/migrations/` — SQL versionado das tabelas do site (`site_leads` e `site_contacts`, v5), aplicado à mão no SQL Editor do projeto remoto; sem `config.toml` (o CLI não está ligado ao projeto). Nunca tocar em tabela, policy ou env existentes do projeto remoto.

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
