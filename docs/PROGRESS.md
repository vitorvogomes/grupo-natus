# PROGRESSO — Website Grupo Natus

> Painel único de acompanhamento do desenvolvimento. **Atualize a cada story concluída** (o comando `/story` faz isso no fim da DoD; `/progress` audita).
> Legenda: ⬜ a fazer · 🔵 em andamento · ✅ concluída · ⛔ bloqueada.
> Backlog canônico: [`_bmad-output/planning-artifacts/epics.md`](../_bmad-output/planning-artifacts/epics.md) · Arquitetura: [ARCHITECTURE-SPINE](../_bmad-output/planning-artifacts/architecture/architecture-natus-2026-09-16/ARCHITECTURE-SPINE.md)

**Última atualização:** 2026-09-16 · **Concluídas:** 32/35 (Epics 1–7 ✅) · **Epic atual:** — (Epic 8 condicional, fora do plano atual) · **Gate A: ✅** · **Gate B: ✅**

---

## Epic 1 — Fundação & Identidade Navegável  ✅ 6/6 — Gate A aprovada
- ✅ 1.1 Scaffold Next.js + TS + infraestrutura de testes (Vitest 90%)
- ✅ 1.2 Design tokens da identidade Natus (cores do logo: nude #CCA890 / navy #243C54 / stone #9C9090)
- ✅ 1.3 Layout shell (Header + nav desktop, MobileNav drawer acessível, Footer com contatos)
- ✅ 1.4 Componentes-base (Button, Badge+status, Card, Image, TextLink, Accordion, Modal)
- ✅ 1.5 Abstração WhatsApp (botão flutuante) — FR6 (lib/whatsapp + WhatsAppButton, no layout)
- ✅ 1.6 Theme-showcase (`/theme-showcase`) — **[Gate A] APROVADA em 2026-09-16**

## Epic 2 — Descoberta (Home / Catálogo)  ✅ 5/5
- ✅ 2.1 Modelo `Development` + camada de conteúdo (loader + unicidade de slug)
- ✅ 2.2 Seed dos 11 empreendimentos (confirmado: nome/slug/cidade/status; resto TODO) — 🔔 ver `docs/CONTENT-GAPS.md`
- ✅ 2.3 Hero + apresentação institucional (copy factual; números como TODO)
- ✅ 2.4 Grid de catálogo (DevelopmentCard + DevelopmentGrid) na Home e em `/empreendimentos` — FR1
- ✅ 2.5 Filtros por status e localização (DevelopmentCatalog client) — FR2

## Epic 3 — Página do Empreendimento & Catálogo Completo  ✅ 7/7 — Gate B aprovada
- ✅ 3.1 Rota dinâmica `/empreendimentos/[slug]` (generateStaticParams + 404) — FR3
- ✅ 3.2 Galeria de imagens (categorias, teclado, next/image) — FR4
- ✅ 3.3 Características, descrição e status — FR4
- ✅ 3.4 Localização via Google Maps (embed/link, sem API key) — FR7
- ✅ 3.5 CTA contextualizado (WhatsApp com nome do empreendimento) — FR6
- ✅ 3.6 Metadata de SEO por empreendimento — FR14
- ✅ 3.7 Template validado **[Gate B aprovada]** — hero full-bleed, sub-nav âncora, visão geral, galeria com abas, accordion de diferenciais; 11 páginas via SSG

## Epic 4 — Evolução das Obras  ✅ 3/3
- ✅ 4.1 Modelo `ConstructionProgress` + helpers (sortedStages/clamp/formatDate)
- ✅ 4.2 ProgressBar (acessível) + ProgressTimeline — FR5
- ✅ 4.3 Integração na seção "Estágio de Obra" (mock rotulado `isPreview`; % reais 🔔 TODO)

## Epic 5 — Conversão por Leads  ✅ 5/5
- ✅ 5.1 Componentes de formulário acessíveis (Input/Textarea/Select) + validadores
- ✅ 5.2 Fale Conosco (`/contato`) — FR8
- ✅ 5.3 Interesse em empreendimento (pré-preenchido pelo slug) — FR9
- ✅ 5.4 Negocie seu Terreno (`/negocie-seu-terreno`) — FR10 — 🔔 campos a confirmar
- ✅ 5.5 Envio por email + anti-spam (Route Handler + honeypot + rate-limit) — FR11 — 🔔 provedor/secret (Resend, a confirmar)

## Epic 6 — Páginas Institucionais  ✅ 2/2
- ✅ 6.1 Quem Somos (`/quem-somos`; valores confirmados, resto 🔔 TODO) — FR13
- ✅ 6.2 Serviços de Engenharia (`/engenharia`; 🔔 conteúdo TODO) — FR12

## Epic 7 — Descoberta Orgânica & Qualidade  ✅ 4/4
- ✅ 7.1 SEO site-wide (`sitemap.ts`, `robots.ts`, OG/metadataBase, JSON-LD Organization+Residence) — FR14
- ✅ 7.2 Performance: RSC padrão, `next/image` em todo lugar, tudo estático/SSG — NFR1 (validar Lighthouse local; comprimir fontes de img)
- ✅ 7.3 Responsividade & Acessibilidade: skip-link, landmarks, labels, alt obrigatório, foco/teclado — NFR2/3
- ✅ 7.4 Motion global: `prefers-reduced-motion` neutraliza transições/scroll — NFR4

## Epic 8 — Supabase & Admin (condicional)  ⬜ 0/3 — **[Gate C]**
- ⬜ 8.1 Inicializar Supabase local — NFR5
- ⬜ 8.2 Migrar entidades necessárias com RLS
- ⬜ 8.3 Painel `/admin` com Supabase Auth — FR15

---

## Coerência das documentações (checar a cada story/epic)

Ao concluir uma story, verifique se a mudança exige atualizar — e atualize:
- [ ] **PROGRESS.md** — marcar a story e recalcular contagens/epic atual.
- [ ] **epics.md** (canônico) — se o escopo/AC de alguma story mudou na prática.
- [ ] **ARCHITECTURE-SPINE.md** — se uma decisão de arquitetura foi tomada/alterada; registrar no `.memlog.md` e resolver `[ASSUMPTION]` confirmados.
- [ ] **PRD / product-brief** — se requisito, dado real ou status de empreendimento mudou.
- [ ] **CLAUDE.md** — se comandos, scripts, stack ou convenções mudaram.

## Decisões & pendências em aberto
- Provedor de email (FR11) — `[ASSUMPTION]` Resend, a confirmar.
- Pins Supabase (`@supabase/ssr`) — a confirmar no Gate C.
- Google Maps embed vs. API — decidir no Epic 3.
- Conteúdo real dos 11 empreendimentos e confirmação de status/nomes com a empresa.
