# Grupo Natus — Website Institucional

Nova versão do website institucional do **Grupo Natus**, empresa do setor imobiliário e de engenharia.

O objetivo não é reproduzir o site atual, e sim construir uma experiência digital **profissional, moderna, sofisticada e orientada a conversão**, preservando a identidade visual existente da empresa.

> **Status:** acompanhe o andamento em [`docs/PROGRESS.md`](docs/PROGRESS.md) (painel único de epics/stories e gates).
> Pendências de conteúdo real estão em [`docs/CONTENT-GAPS.md`](docs/CONTENT-GAPS.md).

---

## Sumário

- [Como rodar](#como-rodar)
- [1. Contexto e referências](#1-contexto-e-referências)
- [2. Objetivo do website](#2-objetivo-do-website)
- [3. Princípios de design](#3-princípios-de-design)
- [4. Identidade visual](#4-identidade-visual)
- [5. Referências locais](#5-referências-locais)
- [6. Escopo de páginas](#6-escopo-de-páginas)
- [7. Catálogo de empreendimentos](#7-catálogo-de-empreendimentos)
- [8. Progresso das obras](#8-progresso-das-obras)
- [9. Experiência visual e motion](#9-experiência-visual-e-motion)
- [10. Mapas](#10-mapas)
- [11. WhatsApp](#11-whatsapp)
- [12. Formulários](#12-formulários)
- [13. Arquitetura técnica](#13-arquitetura-técnica)
- [14. Supabase, RLS e segurança](#14-supabase-rls-e-segurança)
- [15. Design system e theme showcase](#15-design-system-e-theme-showcase)
- [16. Responsividade](#16-responsividade)
- [17. SEO](#17-seo)
- [18. Performance](#18-performance)
- [19. Conteúdo](#19-conteúdo)
- [20. Estrutura do código](#20-estrutura-do-código)
- [21. Regras de desenvolvimento](#21-regras-de-desenvolvimento)
- [22. Workflow de desenvolvimento](#22-workflow-de-desenvolvimento)
- [23. Critério de qualidade visual](#23-critério-de-qualidade-visual)
- [24. O que não fazer](#24-o-que-não-fazer)
- [Documentação do projeto](#documentação-do-projeto)

---

## Como rodar

Pré-requisitos: Node.js 20.9+ (mínimo do Next.js 16).

```bash
npm install
cp .env.example .env.local   # preencha as variáveis necessárias (nunca commite .env*)
npm run dev                  # http://localhost:3000
```

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento (Next + Turbopack) |
| `npm run build` | Build de produção (inclui typecheck do Next) |
| `npm start` | Serve o build de produção |
| `npm run lint` | ESLint (`eslint-config-next` core-web-vitals + typescript) |
| `npm run typecheck` | `tsc --noEmit` (TypeScript estrito) |
| `npm test` / `npm run test:watch` | Vitest (run / watch) |
| `npm run test:coverage` | Vitest com cobertura — **threshold de 90%** em lines/functions/branches/statements |

Rodar um único teste: `npx vitest run caminho/arquivo.test.tsx` ou `npx vitest run -t "trecho do nome"`.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript estrito · Tailwind CSS v4 · Vitest 5.

O desenvolvimento segue **TDD** (red → green → refactor) com cobertura mínima de **90%**. Não reduza o threshold para "passar" — cubra de verdade.

---

## 1. Contexto e referências

O projeto parte de:

- identidade visual atual do Grupo Natus;
- logo oficial existente;
- cores institucionais atuais;
- conteúdo e informações reais dos empreendimentos;
- referência estrutural e de experiência do site NovoLar;
- referências visuais locais fornecidas no projeto;
- skills especializadas disponíveis no ambiente;
- uma arquitetura simples e adequada ao tamanho real do projeto.

| Referência | Link |
| --- | --- |
| Site atual do Grupo Natus | <https://www.natusgrupo.com.br/> |
| Referência de estrutura/experiência | <https://www.novolar.com.br/> |
| Skill — Find Skills | <https://www.skills.sh/vercel-labs/skills/find-skills> |
| Skill — Theme Factory | <https://www.skills.sh/anthropics/skills/theme-factory> |
| Skill — UI/UX Pro Max | <https://www.skills.sh/nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max> |
| Metodologia — BMAD Method | <https://github.com/bmad-code-org/bmad-method> |

### Primeiro princípio

**Entender antes de codar.** Antes de implementar páginas, construir: entendimento do produto, análise das referências, arquitetura de informação, estratégia visual, design system, estrutura das páginas e estratégias de componentes, conteúdo, animações, responsividade, SEO e a arquitetura técnica mínima necessária.

---

## 2. Objetivo do website

Posicionar o Grupo Natus como uma empresa imobiliária **profissional, confiável e contemporânea**, transmitindo:

confiança · qualidade · sofisticação · transparência · experiência · solidez · qualidade dos empreendimentos · capacidade de execução · proximidade com o cliente.

A experiência deve ser **predominantemente visual**. O usuário precisa conseguir:

1. descobrir empreendimentos;
2. entender a localização;
3. visualizar imagens;
4. compreender características;
5. acompanhar a evolução da obra;
6. demonstrar interesse;
7. entrar em contato;
8. iniciar conversa pelo WhatsApp.

---

## 3. Princípios de design

O resultado **não** deve parecer:

- template genérico;
- landing page de SaaS;
- dashboard;
- site produzido automaticamente por IA;
- conjunto de componentes shadcn sem identidade;
- cópia literal do NovoLar.

O **NovoLar é referência de estrutura, navegação, interação e experiência — não visual**. Dele extraímos princípios de hierarquia, organização de conteúdo, navegação, apresentação dos empreendimentos, cards, filtros, galerias, mapas, chamadas para ação, transições, comportamento responsivo e storytelling visual, e os adaptamos à identidade do Grupo Natus.

---

## 4. Identidade visual

**Preservar:** logo oficial, cores institucionais, elementos de identidade já existentes e a percepção de marca.

Não substituir arbitrariamente as cores da empresa por uma paleta "bonita". Inconsistências na identidade atual podem receber pequenas melhorias, sempre mantendo o reconhecimento da marca.

Itens a identificar e documentar:

| Fundamentos | Componentes | Comportamento |
| --- | --- | --- |
| Brand colors | Buttons | Navigation |
| Typography | Forms | Section patterns |
| Logo usage | Cards | Motion |
| Spacing | Iconography | Image treatment |
| Border radius | | |
| Shadows | | |

---

## 5. Referências locais

A pasta `img/` contém materiais reais do projeto (não são placeholders): logos oficiais (`PRINCIPAL`, `NEGATIVA`, `PRETA`, `ASSINATURA`), renders 3D, plantas humanizadas e maquetes.

Antes de tomar decisões visuais:

- localizar todos os assets relevantes;
- analisar as imagens e identificar padrões e referências de composição;
- verificar se existem logos, screenshots, paletas ou materiais institucionais;
- usar essas referências como input para o design system.

**Não ignorar os assets locais nem substituí-los automaticamente por placeholders.**

### Skills

- **Find Skills** — descobrir skills adicionais relevantes ao projeto.
- **UI/UX Pro Max** — design system, UX, responsive design, tipografia, padrões de componentes, interaction design, acessibilidade, animações e orientação de implementação em Next.js.
- **Theme Factory** — referência para estruturar e avaliar temas, tipografia e consistência visual. Não usar uma theme pronta cegamente: a identidade do Grupo Natus prevalece.

### BMAD Method

O projeto usa o BMAD (instalado em `_bmad/`, saídas em `_bmad-output/`) de forma **adaptada ao tamanho do produto** — para aumentar clareza e qualidade, não para gerar burocracia ou documentação inútil. Este não é um SaaS complexo.

```
Project Brief → Product Requirements → UX / Design Strategy → Architecture → Implementation Plan → Development → Validation
```

Não reinstalar ou modificar a instalação existente sem verificar antes (`ls -la _bmad`, `npx bmad-method --version`).

---

## 6. Escopo de páginas

> O briefing original citava "10 páginas", mas o detalhamento resulta em **16 rotas**.

| # | Página | Rota |
| --- | --- | --- |
| 1 | Home / Catálogo | `/` |
| 2–12 | Empreendimentos (11 páginas, um template) | `/empreendimentos/[slug]` |
| 13 | Serviços de Engenharia | `/engenharia` |
| 14 | Negocie seu Terreno | `/negocie-seu-terreno` |
| 15 | Quem Somos | `/quem-somos` |
| 16 | Fale Conosco | `/contato` |

### Home / Catálogo

Funciona como apresentação institucional, catálogo dos empreendimentos, entrada para descoberta e **principal página de conversão**. Apresenta os 11 empreendimentos ativos.

Possíveis elementos: hero, apresentação do Grupo Natus, empreendimentos em destaque, catálogo, filtros, localização, status da obra, CTA, serviços, institucional, contato e WhatsApp.

### Empreendimentos

Uma página estruturada para cada um dos 11 empreendimentos, **sem duplicar código**: um template alimentado por um modelo de dados comum.

```ts
type Development = {
  slug: string
  name: string
  status: DevelopmentStatus
  location: Location
  description: string
  images: Image[]
  features: Feature[]
  constructionProgress?: number
  progressUpdatedAt?: string
  map?: MapData
  contact?: ContactData
  metadata?: SEOData
}
```

> Modelo conceitual do briefing. O tipo implementado está em `types/`.

### Serviços de Engenharia

Atuação, metodologia, tipos de projetos, capacidade técnica, obras realizadas, diferenciais e CTA para contato.

### Negocie seu Terreno

Voltada para proprietários e corretores: explicar a proposta, apresentar como funciona, coletar informações do terreno e gerar lead por meio de um formulário com campos adequados.

### Quem Somos

Grupo Natus, história, empresas, atuação, filosofia, valores, metodologia, posicionamento e números relevantes. **Evitar texto institucional genérico.**

### Fale Conosco

Formulário, email, telefone, WhatsApp, endereço, mapa e horário de atendimento.

---

## 7. Catálogo de empreendimentos

O catálogo deve permitir uma experiência dinâmica. Cada empreendimento apresenta, no mínimo:

nome · localização · cidade/estado · status · imagem principal · características · CTA · link para a página detalhada.

Possíveis estados: **Lançamento**, **Em construção**, **Pronto para morar** — não assumir que são definitivos sem validar os dados atuais.

---

## 8. Progresso das obras

Funcionalidade importante: apresentar a evolução de cada empreendimento.

```
Fundação       ████████████████████ 100%
Estrutura      ███████████████░░░░░ 75%
Acabamento     ████████░░░░░░░░░░░░ 40%
```

Não implementar simplesmente barras arbitrárias. Antes, definir: quais etapas existem, quem atualiza, periodicidade, histórico, data da última atualização, percentual geral, evidências visuais e, eventualmente, fotos da evolução.

O modelo deve permitir crescimento futuro:

```ts
type ConstructionProgress = {
  overallPercentage: number
  updatedAt: string
  stages: {
    name: string
    percentage: number
    order: number
  }[]
}
```

No primeiro momento pode existir como dado estático/mock (explicitamente identificado); posteriormente pode migrar para o Supabase.

---

## 9. Experiência visual e motion

O site deve estar preparado para vídeos, GIFs, imagens, galerias, panoramas, animações, microinterações, transições, scroll animations, efeitos de entrada e elementos de storytelling.

**Evitar:** excesso de animações, efeitos chamativos sem função, parallax indiscriminado, animações que prejudiquem performance e experiência ruim em mobile.

Motion deve reforçar: **hierarchy · storytelling · spatial perception · navigation · premium perception**.

Não usar animação simplesmente porque a biblioteca permite. Respeitar `prefers-reduced-motion`.

---

## 10. Mapas

Cada empreendimento deve poder apresentar sua localização, priorizando integração com Google Maps. A arquitetura deve permitir:

```
address · latitude · longitude · googleMapsUrl
```

Evitar acoplar a aplicação inteira à API do Google Maps prematuramente. Avaliar embed, link, mapa interativo, custo e necessidade de API key — e escolher a solução mais simples que entregue uma boa experiência.

---

## 11. WhatsApp

Botão flutuante de WhatsApp **responsivo, discreto, acessível e claramente identificável**.

O link deve permitir associar contexto, por exemplo:

> Olá, gostaria de saber mais sobre o empreendimento X.

Não hardcodar esse comportamento em dezenas de componentes: existe **uma abstração única** (`lib/whatsapp.ts` + `components/WhatsAppButton.tsx`).

---

## 12. Formulários

| Formulário | Campos |
| --- | --- |
| Contato | nome, email, telefone, assunto, mensagem |
| Interesse em empreendimento | nome, telefone, email, empreendimento, mensagem |
| Negocie seu Terreno | definidos durante o PRD |

Prioridades: **UX · validação · acessibilidade · feedback claro · estratégia anti-spam**.

O envio por email só deve ser implementado depois de definido o fluxo.

---

## 13. Arquitetura técnica

```
                    ┌──────────────────┐
                    │     Next.js      │
                    │                  │
                    │ Pages / Routes   │
                    │ Components       │
                    │ Design System    │
                    │ Content          │
                    └────────┬─────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
         Static Content              Next API
                │                         │
                └────────────┬────────────┘
                             │
                         Supabase
                             │
                    ┌────────┴─────────┐
                    │                  │
                 Postgres           Auth
                    │
                   RLS
```

Essa arquitetura é suficiente até que exista evidência de que não é.

### Next.js

Prioridades: App Router · Server Components quando fizer sentido · Client Components apenas quando necessários · TypeScript · componentes reutilizáveis · SEO · imagens otimizadas · performance · responsividade.

Não criar uma arquitetura enterprise para um site institucional. **Evitar:** microservices, múltiplos backends, abstrações prematuras, repositories/services absurdamente genéricos, state management global sem necessidade e over-engineering.

### API

Se uma API for necessária, preferir **Next.js Route Handlers**. Não criar NestJS/FastAPI separadamente sem necessidade concreta.

```
Frontend → Next.js → Supabase
```

Só adicionar outra camada quando houver justificativa técnica real.

### Autenticação

Se necessária: **Supabase Auth** — nunca um sistema próprio.

Possível uso futuro: `/admin` para gerenciar empreendimentos, progresso, imagens, conteúdos e leads. **Não implementar painel administrativo antes de existir uma necessidade concreta.**

---

## 14. Supabase, RLS e segurança

Já existe um projeto Supabase. Usá-lo **apenas quando houver necessidade real de persistência**.

Possíveis dados futuros: `Developments`, `DevelopmentProgress`, `DevelopmentImages`, `Leads`, `ContactMessages`, `EngineeringProjects`, `SiteContent`.

Não criar essas tabelas antecipadamente.

> **Regra:** se o dado pode permanecer como conteúdo estático e não há necessidade de administração dinâmica, ele não vai para o banco.

### Regra crítica — RLS

**Não remover, substituir ou desabilitar RLS.** Não modificar políticas existentes sem necessidade explícita.

Preservar: env vars, secrets, RLS, configurações existentes e a estrutura existente do Supabase.

Se for necessário editar uma variável de ambiente:

1. identificar a necessidade;
2. alterar somente o necessário;
3. nunca expor valores secretos;
4. nunca imprimir secrets em logs;
5. nunca substituir uma env var sem entender seu uso.

---

## 15. Design system e theme showcase

Antes de construir todas as páginas, criar um design system mínimo.

**Foundations:** colors · typography · spacing · radius · shadows · containers · breakpoints · grid · motion.

**Components:** Header · Navigation · Footer · Button · Link · Badge · Card · DevelopmentCard · DevelopmentStatus · ProgressBar · ProgressTimeline · Gallery · Image · Video · Map · Form · Input · Select · Textarea · Modal · Accordion · CTA · WhatsAppButton.

### Theme showcase

Antes da implementação completa, um **theme showcase** demonstra visualmente o sistema para validação: logo, cores, tipografia, headings, body text, buttons, links, badges, cards, development cards, indicadores de progresso, forms, inputs, galeria, tratamento de imagem, mapa, CTA, header, footer, exemplos de seções, estados hover/active/disabled, exemplos mobile e princípios de motion.

O briefing previa um `theme-showcase.pdf`; ele foi entregue como a rota **`/theme-showcase`**. O design system não é considerado fechado antes dessa revisão (Gate A).

---

## 16. Responsividade

Projetar considerando **Mobile · Tablet · Desktop · Large Desktop**.

O design não deve ser simplesmente `Desktop → diminuir tudo → Mobile`. **Mobile tem composição própria.**

Validar: navegação, imagens, galerias, cards, mapas, formulários, CTAs, WhatsApp, progress bars, vídeos e performance.

---

## 17. SEO

SEO não é a prioridade número 1, mas deve existir uma base correta desde o início:

metadata · title · description · canonical · Open Graph · sitemap · robots · HTML semântico · headings corretos · alt text · URLs amigáveis · structured data quando fizer sentido.

Cada empreendimento (`/empreendimentos/[slug]`) tem metadata própria. Evitar SEO artificial ou keyword stuffing.

---

## 18. Performance

Priorizar: `next/image` · lazy loading · imagens responsivas · compressão · vídeos otimizados · carregamento progressivo · evitar JavaScript desnecessário · Server Components quando apropriado.

**Animação não pode destruir Core Web Vitals.**

---

## 19. Conteúdo

**Não inventar informações de empreendimentos.** Quando uma informação estiver ausente, marcar:

```
TODO: CONTENT REQUIRED
```

ou criar um mock explicitamente identificado. Nunca apresentar dados inventados como reais. As lacunas conhecidas estão em [`docs/CONTENT-GAPS.md`](docs/CONTENT-GAPS.md).

---

## 20. Estrutura do código

Separação clara entre **Content**, **Presentation**, **Business Logic** e **Infrastructure**. O briefing sugeria uma pasta `src/`; a organização adotada mantém as mesmas fronteiras na raiz do projeto:

```
app/                      # rotas (App Router) + Route Handlers (api/leads), sitemap, robots
components/               # layout (Header, Footer, MobileNav, WhatsAppButton)
  ui/                     # componentes-base do design system
  showcase/               # peças do /theme-showcase
features/
  developments/           # catálogo, filtros, template do empreendimento, galeria, progresso
  contact/                # formulários de lead / interesse
  home/                   # hero e apresentação institucional
  seo/                    # JSON-LD
content/developments/     # dados dos 11 empreendimentos
lib/                      # utilitários (whatsapp, maps, validators, rateLimit, email, site)
types/                    # modelos de domínio (Development, ConstructionProgress, …)
styles/                   # tokens e CSS global (Tailwind v4)
public/                   # assets servidos
img/                      # materiais originais do cliente
```

---

## 21. Regras de desenvolvimento

1. **Não codar antes de entender.** Analisar projeto, dependências, Supabase, assets, referências, skills e BMAD antes de implementar.
2. **Não destruir o que já existe.** Entender antes de modificar env, Supabase, RLS, configurações e dependências.
3. **Desenvolvimento local primeiro.** Toda validação inicial é local; deploy, CI/CD, produção, domínio e hosting ficam para uma fase posterior.
4. **Preferir simplicidade.** Sempre perguntar: *existe uma solução mais simples?* Se sim, preferi-la.
5. **Componentizar por comportamento.** Não transformar cada `<div>` em um arquivo. Criar componentes quando houver reutilização, comportamento, domínio, consistência visual ou complexidade própria.

---

## 22. Workflow de desenvolvimento

| Fase | Etapa | Conteúdo | Output |
| --- | --- | --- | --- |
| 0 | Discovery | Analisar repositório, assets, BMAD, skills, Supabase, site atual e NovoLar; levantar inconsistências | `PROJECT-DISCOVERY.md` |
| 1 | Product Brief | Objetivo, público, proposta, jornada, conversão, funcionalidades, escopo e fora do escopo | `product-brief.md` |
| 2 | UX / Information Architecture | Site map, navegação, user flows, estrutura de páginas, hierarquia de conteúdo, pontos de conversão | `information-architecture.md`, `user-flows.md` |
| 3 | Design Direction | UI/UX Pro Max + referências locais + identidade Natus: linguagem, tipografia, cores, grid, espaçamento, cards, botões, motion, imagens, responsividade | `design-system.md` |
| 4 | Theme Showcase | Revisão visual do sistema — **só continuar após aprovação** | theme showcase |
| 5 | Technical Architecture | Estrutura Next.js, componentes, modelo de dados, uso do Supabase, auth, API, conteúdo, SEO, mídia | `architecture.md` |
| 6 | Foundation | Base Next.js, fontes, tema, design tokens, layout, header, footer, botões, componentes-base | — |
| 7 | Home | `/` validada por completo: desktop, mobile, interações, motion, performance | — |
| 8 | Development Template | Uma única página `/empreendimentos/[slug]` completa — **validar o modelo antes de replicar** | — |
| 9 | Remaining Developments | Demais empreendimentos via dados, sem duplicar páginas | — |
| 10 | Institutional Pages | `/engenharia`, `/negocie-seu-terreno`, `/quem-somos`, `/contato` | — |
| 11 | Dynamic Features | Progresso das obras, mapas, formulários, WhatsApp, galerias, vídeos, conteúdo dinâmico | — |
| 12 | Admin | **Somente se houver necessidade real:** `/admin` com Supabase Auth (progresso, empreendimentos, imagens, conteúdo simples) | — |
| 13 | Validation | TypeScript, lint, build, responsividade, acessibilidade, SEO e performance — em mobile, tablet e desktop | — |

Após o discovery, a regra é **parar antes de implementar** e apresentar achados e decisões a validar — nunca avançar automaticamente para uma implementação grande.

### Ordem recomendada

Frontend, design e conteúdo primeiro; backend depois:

```
Discovery
   ↓
BMAD Brief
   ↓
UX / Sitemap
   ↓
Design System
   ↓
Theme Showcase
   ↓
Home
   ↓
Template de Empreendimento
   ↓
11 empreendimentos
   ↓
Páginas institucionais
   ↓
Formulários / WhatsApp / Maps
   ↓
Supabase
   ↓
Admin (se realmente necessário)
   ↓
SEO / Performance / QA
```

Isso evita modelar dezenas de tabelas antes de saber se alguém realmente precisa delas. O **empreendimento é a entidade central do produto**, não 11 páginas independentes — o que simplifica progresso das obras, imagens, mapas, SEO e um eventual painel administrativo.

---

## 23. Critério de qualidade visual

Antes de considerar uma página pronta:

- [ ] **Branding** — a página parece claramente Grupo Natus?
- [ ] **Design** — parece um produto profissional ou um template genérico?
- [ ] **UX** — o usuário entende rapidamente o que pode fazer?
- [ ] **Hierarchy** — existe uma hierarquia visual clara?
- [ ] **Conversion** — existe uma próxima ação evidente?
- [ ] **Motion** — as animações melhoram a experiência?
- [ ] **Responsive** — funciona realmente em mobile?
- [ ] **Performance** — a experiência continua rápida?
- [ ] **Content** — as informações são reais ou claramente identificadas como mock?

---

## 24. O que não fazer

- copiar o NovoLar;
- inventar dados;
- criar microservices;
- criar backend separado sem necessidade;
- criar CMS antes da hora;
- criar admin antes da hora;
- criar abstrações excessivas;
- instalar dezenas de dependências;
- alterar RLS sem motivo;
- alterar env vars sem necessidade;
- implementar todas as páginas antes de validar o design;
- usar animações gratuitamente;
- transformar o site em uma demonstração de biblioteca de UI.

---

## Documentação do projeto

| Documento | Conteúdo |
| --- | --- |
| [`NOTAS`](NOTAS) | Notas condensadas do cliente |
| [`docs/product-brief.md`](docs/product-brief.md) | Visão, público, escopo e os 11 empreendimentos |
| [`docs/prd.md`](docs/prd.md) | Requisitos funcionais/não funcionais e modelo de dados |
| [`_bmad-output/planning-artifacts/epics.md`](_bmad-output/planning-artifacts/epics.md) | Backlog canônico (epics e stories) |
| [`ARCHITECTURE-SPINE.md`](_bmad-output/planning-artifacts/architecture/architecture-natus-2026-09-16/ARCHITECTURE-SPINE.md) | Invariantes de arquitetura e stack verificada |
| [`docs/PROGRESS.md`](docs/PROGRESS.md) | Painel de progresso |
| [`docs/CONTENT-GAPS.md`](docs/CONTENT-GAPS.md) | Conteúdo real pendente |
| [`CLAUDE.md`](CLAUDE.md) | Guia para agentes de IA que trabalham no repositório |
