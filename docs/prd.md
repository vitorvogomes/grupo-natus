# PRD — Website Grupo Natus

> Artefato BMAD (Fase 2 — Product Requirements). Complementa `docs/product-brief.md`. O detalhamento por epic/story está em `docs/epics.md`.

## 1. Objetivos e métricas

**Objetivos de produto**
1. Apresentar os 12 empreendimentos de forma rica, visual e navegável.
2. Maximizar conversão para contato (WhatsApp/formulário) com CTA clara em cada etapa.
3. Transmitir a marca Grupo Natus (profissional, sólida, sofisticada) sem cara de template.
4. Permitir acompanhamento da evolução das obras.
5. Base técnica simples, performática e responsiva, pronta para crescer (Supabase/admin) sem over-engineering.

**Sinais de sucesso** (qualitativos nesta fase): aprovação do `theme-showcase`, aprovação visual página a página pelo checklist de qualidade (§ README 31), Lighthouse mobile saudável (perf/a11y/SEO), zero conteúdo inventado.

## 2. Requisitos funcionais (FR)

- **FR1** — Home exibe apresentação institucional + catálogo dos 12 empreendimentos com card (nome, localização, status, imagem, características-chave, CTA, link).
- **FR2** — Catálogo permite filtrar por **status** (Lançamento / Em construção / Pronto para morar) e por **localização** (cidade/UF).
- **FR3** — Cada empreendimento tem página própria em `/empreendimentos/[slug]`, gerada de um template único a partir de dados estruturados.
- **FR4** — Página de empreendimento apresenta: galeria de imagens, características/features, localização (mapa), status, descrição, progresso da obra (quando houver) e CTA de contato contextualizado.
- **FR5** — Progresso da obra exibe percentual geral + etapas (nome, %, ordem) e data da última atualização; começa como dado estático, modelado para migrar a Supabase.
- **FR6** — Botão flutuante de WhatsApp em todo o site, com mensagem contextual (ex.: nome do empreendimento na página correspondente), via **uma única abstração**.
- **FR7** — Localização via Google Maps por empreendimento (address, lat, lng, googleMapsUrl); iniciar por embed/link, sem acoplar toda a app à API.
- **FR8** — Formulário de **Fale Conosco** (nome, email, telefone, assunto, mensagem).
- **FR9** — Formulário de **interesse em empreendimento** (nome, telefone, email, empreendimento, mensagem).
- **FR10** — Formulário **Negocie seu Terreno** (campos definidos neste PRD — ver Epic 7).
- **FR11** — Envio de formulários por email via Route Handler do Next (após fluxo definido); feedback claro de sucesso/erro; estratégia anti-spam.
- **FR12** — Página **Serviços de Engenharia** (atuação, metodologia, tipos de projeto, capacidade técnica, obras, diferenciais, CTA).
- **FR13** — Página **Quem Somos** (história, empresas, atuação, valores, números).
- **FR14** — SEO por página e por empreendimento: metadata, title, description, canonical, Open Graph, sitemap, robots, structured data quando fizer sentido, URLs amigáveis, alt text.
- **FR15** — (Condicional) Painel `/admin` com Supabase Auth para gerenciar progresso/conteúdo/imagens/leads — **somente se necessidade concreta**.

## 3. Requisitos não-funcionais (NFR)

- **NFR1 — Performance:** `next/image`, lazy loading, imagens responsivas, vídeos otimizados; animação não pode degradar Core Web Vitals.
- **NFR2 — Responsividade:** Mobile / Tablet / Desktop / Large; mobile com composição própria (não apenas desktop reduzido).
- **NFR3 — Acessibilidade:** HTML semântico, headings corretos, alt text, foco/teclado em forms e navegação, contraste.
- **NFR4 — Motion:** reforça hierarquia/storytelling/navegação; sem parallax indiscriminado nem efeitos gratuitos; degrada bem em mobile e respeita `prefers-reduced-motion`.
- **NFR5 — Segurança/infra:** preservar RLS, env vars e secrets existentes; nunca expor/logar secrets; alterar env apenas o necessário.
- **NFR6 — Manutenibilidade:** empreendimento como dado; sem duplicação de páginas; componentização por comportamento; sem abstrações prematuras.
- **NFR7 — Conteúdo:** nada inventado; ausências marcadas `TODO: CONTENT REQUIRED` ou mock rotulado.
- **NFR8 — SEO base:** presente desde o início, sem keyword stuffing.

## 4. Modelo de dados (conceitual)

```ts
type DevelopmentStatus = 'lancamento' | 'em_construcao' | 'pronto'

type Development = {
  slug: string
  name: string
  status: DevelopmentStatus
  location: { city: string; state: string; address?: string; lat?: number; lng?: number; googleMapsUrl?: string }
  summary: string
  description: string
  images: { src: string; alt: string; kind?: 'hero' | 'gallery' | 'plant' | 'render' }[]
  features: { label: string; value?: string }[]
  progress?: ConstructionProgress
  contact?: { whatsappMessage?: string }
  seo?: { title?: string; description?: string; ogImage?: string }
}

type ConstructionProgress = {
  overallPercentage: number
  updatedAt: string // ISO
  stages: { name: string; percentage: number; order: number }[]
}
```

Camada de conteúdo estática (`content/`) até haver necessidade de administração dinâmica → então migrar entidades específicas para Supabase (Developments, DevelopmentProgress, DevelopmentImages, Leads, ContactMessages). **Não criar tabelas antecipadamente.**

## 5. Arquitetura-alvo

`Next.js (App Router + TS)` → conteúdo estático + Route Handlers → (quando necessário) Supabase (Postgres + RLS + Auth). Estrutura de pastas proposta: `src/app`, `src/components`, `src/features/{developments,contact,engineering,land-submission}`, `src/content`, `src/lib`, `src/styles`, `src/types`.

> **Arquitetura detalhada (fonte de verdade):** [`_bmad-output/planning-artifacts/architecture/architecture-natus-2026-09-16/ARCHITECTURE-SPINE.md`](../_bmad-output/planning-artifacts/architecture/architecture-natus-2026-09-16/ARCHITECTURE-SPINE.md) — invariantes AD-1…AD-8, stack verificado (Next 16.3.5 / React 19 / Tailwind 4.3 / Vitest 5.0.1) e Capability→Architecture map.

## 6. Epics (visão geral)

Backlog canônico (8 epics · 35 stories) em **`_bmad-output/planning-artifacts/epics.md`** (formato BMAD). Visão:

| Epic | Título | Entrega de valor | FRs |
|------|--------|------------------|-----|
| 1 | Fundação & Identidade Navegável | Scaffold Next.js+TS+Vitest(90%), tokens da marca, shell, WhatsApp, theme-showcase (Gate A) | FR6 |
| 2 | Descoberta (Home / Catálogo) | Modelo `Development`, seed dos 12, Home, grid, filtros | FR1, FR2 |
| 3 | Página do Empreendimento & Catálogo | Template `[slug]` (galeria, mapa, status, CTA, SEO); Gate B | FR3,4,7,6,14 |
| 4 | Evolução das Obras | Progresso (percentual+etapas), estático → Supabase | FR5 |
| 5 | Conversão por Leads | Contato, Interesse, Negocie seu Terreno + email + anti-spam | FR8–11 |
| 6 | Páginas Institucionais | Quem Somos + Serviços de Engenharia | FR12, FR13 |
| 7 | Descoberta Orgânica & Qualidade | SEO site-wide, performance, a11y, motion | FR14, NFR1–4,8,9 |
| 8 | Supabase & Admin (condicional) | Persistência + `/admin` (Gate C) | FR15, NFR5 |

## 7. Sequenciamento e gates

- **Gate A (após Epic 1):** aprovação do `theme-showcase` antes de construir todas as páginas.
- **Gate B (Epic 3, story de template):** validar uma página de empreendimento completa (desktop+mobile) antes de replicar as demais.
- **Gate C (Epic 8):** só iniciar persistência/admin com necessidade concreta e explícita.
- Epic 7 é transversal: SEO base/motion iniciam na fundação e fecham ao final.

## 8. Riscos e questões abertas

- Conteúdo real dos empreendimentos (descrições, features, coordenadas, progresso, imagens por empreendimento) — hoje só há assets de render/planta genéricos em `img/`. **Bloqueante para conteúdo**, não para estrutura.
- Confirmar status/nomes dos 12 empreendimentos com a empresa.
- Google Maps: avaliar embed vs. API key (custo) antes de acoplar.
- Estratégia de envio de email (provedor) e anti-spam a definir.
- Necessidade real de admin/persistência — decidir no Gate C.
