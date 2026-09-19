---
stepsCompleted: [step-01-validate-prerequisites, step-02-design-epics, step-03-create-stories, step-04-final-validation]
inputDocuments:
  - docs/prd.md
  - docs/product-brief.md
  - docs/epics.md
---

# Website Grupo Natus - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Website Grupo Natus, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories. Generated via BMAD (bmad-create-epics-and-stories). Output language: Portuguese.

> **Notas de discovery:** PRD e Product Brief localizados em `docs/` (incluídos manualmente como inputs). **Não existe `architecture.md`** ainda (Fase 5 / decisão de arquitetura pendente) — requisitos técnicos abaixo derivam do PRD §5 e das restrições do README. **Não existe contrato de UX formal**; o `theme-showcase` (Gate A) é o marco de design a validar antes de construir todas as páginas.

## Requirements Inventory

### Functional Requirements

FR1: A Home exibe apresentação institucional + catálogo dos 11 empreendimentos, cada card com nome, localização, status, imagem, características-chave, CTA e link.
FR2: O catálogo permite filtrar por status (Lançamento / Em construção / Pronto para morar) e por localização (cidade/UF).
FR3: Cada empreendimento tem página própria em `/empreendimentos/[slug]`, gerada de um template único a partir de dados estruturados.
FR4: A página de empreendimento apresenta galeria de imagens, características/features, localização (mapa), status, descrição, progresso da obra (quando houver) e CTA de contato contextualizado.
FR5: O progresso da obra exibe percentual geral + etapas (nome, %, ordem) e data da última atualização; começa como dado estático, modelado para migrar a Supabase.
FR6: Botão flutuante de WhatsApp em todo o site, com mensagem contextual, via uma única abstração.
FR7: Localização via Google Maps por empreendimento (address, lat, lng, googleMapsUrl); iniciar por embed/link, sem acoplar toda a app à API.
FR8: Formulário de Fale Conosco (nome, email, telefone, assunto, mensagem).
FR9: Formulário de interesse em empreendimento (nome, telefone, email, empreendimento, mensagem).
FR10: Formulário Negocie seu Terreno (campos definidos no Epic 7).
FR11: Envio de formulários por email via Route Handler do Next (após fluxo definido); feedback claro de sucesso/erro; estratégia anti-spam.
FR12: Página Serviços de Engenharia (atuação, metodologia, tipos de projeto, capacidade técnica, obras, diferenciais, CTA).
FR13: Página Quem Somos (história, empresas, atuação, valores, números).
FR14: SEO por página e por empreendimento: metadata, title, description, canonical, Open Graph, sitemap, robots, structured data quando fizer sentido, URLs amigáveis, alt text.
FR15: (Condicional) Painel `/admin` com Supabase Auth para gerenciar progresso/conteúdo/imagens/leads — somente se necessidade concreta.

### NonFunctional Requirements

NFR1 (Performance): `next/image`, lazy loading, imagens responsivas, vídeos otimizados; animação não pode degradar Core Web Vitals.
NFR2 (Responsividade): Mobile / Tablet / Desktop / Large; mobile com composição própria (não apenas desktop reduzido).
NFR3 (Acessibilidade): HTML semântico, headings corretos, alt text, foco/teclado em forms e navegação, contraste.
NFR4 (Motion): reforça hierarquia/storytelling/navegação; sem parallax indiscriminado nem efeitos gratuitos; degrada bem em mobile e respeita `prefers-reduced-motion`.
NFR5 (Segurança/infra): preservar RLS, env vars e secrets existentes; nunca expor/logar secrets; alterar env apenas o necessário.
NFR6 (Manutenibilidade): empreendimento como dado; sem duplicação de páginas; componentização por comportamento; sem abstrações prematuras.
NFR7 (Conteúdo): nada inventado; ausências marcadas `TODO: CONTENT REQUIRED` ou mock rotulado.
NFR8 (SEO base): presente desde o início, sem keyword stuffing.
NFR9 (Qualidade/TDD): TDD sagrado (red→green→refactor); cobertura mínima de 90% (gate via Stop hook + threshold do Vitest); `lint` e `typecheck` limpos como Definition of Done.

### Additional Requirements

<!-- Derivados do PRD §5 e README (architecture.md ainda não existe) -->
- **Starter/greenfield:** projeto sem código; **Epic 1 / Story 1 = scaffold Next.js (App Router) + TypeScript estrito** com ESLint, Vitest (coverage threshold 90%), scripts `dev`/`build`/`lint`/`typecheck`/`test:coverage`. (Impacta diretamente Epic 1 Story 1.)
- Camada de conteúdo estática em `src/content`; migração a Supabase apenas quando houver necessidade real de administração dinâmica.
- APIs via Next.js Route Handlers; auth (se necessária) via Supabase Auth; sem backend separado.
- Preservar RLS/env/secrets do Supabase existente (restrição crítica do README).
- Google Maps: iniciar por embed/link; avaliar API key/custo antes de acoplar.
- Provedor de email para envio de formulários: **a definir** (bloqueia FR11 até decisão).
- **Lacuna:** `architecture.md` (Fase 5) ainda não produzido — decisões finais de estrutura de pastas, estratégia de mídia e dados devem ser confirmadas antes/junto do Epic 1.

### UX Design Requirements

<!-- Não há contrato de UX formal (bmad-ux) ainda. Itens derivados do design system do README §22 e do gate theme-showcase. -->
- **UX-DR pendente de formalização** — o design system e o `theme-showcase` (Gate A) são o marco. Candidatos a UX-DR já mapeados:
- UX-DR1: Design tokens da marca Natus (cores institucionais extraídas dos logos, tipografia, spacing, radius, shadows, breakpoints, grid, motion) como fonte única.
- UX-DR2: Componentes reutilizáveis: Header, Footer, Navigation (+ nav mobile), Button, Link, Badge, Card, DevelopmentCard, DevelopmentStatus, ProgressBar, ProgressTimeline, Gallery, Image, Video, Map, Form, Input, Select, Textarea, Modal, Accordion, CTA, WhatsAppButton.
- UX-DR3: Acessibilidade — contraste, navegação por teclado, foco, ARIA, `prefers-reduced-motion`.
- UX-DR4: Responsividade com composição mobile própria (Mobile/Tablet/Desktop/Large).
- UX-DR5: `theme-showcase` demonstrando todos os componentes e estados (hover/active/disabled), exemplos mobile e princípios de motion — **aprovação obrigatória antes de construir todas as páginas**.

### FR Coverage Map

FR1: Epic 2 — Home exibe institucional + catálogo dos 11 empreendimentos
FR2: Epic 2 — Filtros por status e localização no catálogo
FR3: Epic 3 — Template único `/empreendimentos/[slug]`
FR4: Epic 3 — Conteúdo rico da página (galeria, features, localização, status, CTA)
FR5: Epic 4 — Progresso da obra (percentual + etapas + data)
FR6: Epic 1 (abstração WhatsApp) + aplicado contextualmente em Epic 3
FR7: Epic 3 — Localização via Google Maps (embed/link)
FR8: Epic 5 — Formulário Fale Conosco
FR9: Epic 5 — Formulário de interesse em empreendimento
FR10: Epic 5 — Formulário Negocie seu Terreno
FR11: Epic 5 — Envio por email + anti-spam
FR12: Epic 6 — Serviços de Engenharia
FR13: Epic 6 — Quem Somos
FR14: Epic 3 (metadata por empreendimento) + Epic 7 (SEO site-wide: sitemap/robots/OG/structured data)
FR15: Epic 8 — Painel /admin com Supabase Auth (condicional)

## Epic List

### Epic 1: Fundação & Identidade Navegável
Entrega uma base Next.js rodando com a identidade visual do Grupo Natus: um visitante navega um shell com header/nav/footer e botão flutuante de WhatsApp, e os stakeholders **aprovam o design system via theme-showcase** (Gate A). Base para todos os epics seguintes sem depender deles.
**FRs cobertos:** FR6 (abstração WhatsApp). **Também:** starter/scaffold (Additional Req), UX-DR1–UX-DR5, NFR2/3/4/9.

### Epic 2: Descoberta de Empreendimentos (Home / Catálogo)
Um visitante descobre e filtra os 11 empreendimentos ativos na Home, que funciona como catálogo e principal página de conversão. Cria o modelo de dados `Development` e a camada de conteúdo estática que alimenta todo o site.
**FRs cobertos:** FR1, FR2. **Habilita:** Epic 3 (mesmo modelo de dados).

### Epic 3: Página do Empreendimento & Catálogo Completo
Um visitante explora cada empreendimento em profundidade — galeria, características, localização em mapa, status e CTA contextualizado — via um template único que gera as 11 páginas por dados (Gate B: validar 1 antes de replicar). Inclui metadata de SEO por empreendimento.
**FRs cobertos:** FR3, FR4, FR7, FR6 (aplicado), FR14 (por empreendimento).

### Epic 4: Acompanhamento da Evolução das Obras
Um visitante acompanha o progresso de cada empreendimento (percentual geral + etapas + data da última atualização). Dado estático agora, modelado para migrar a Supabase.
**FRs cobertos:** FR5.

### Epic 5: Conversão por Leads (Formulários & Contato)
Visitantes e proprietários de terreno entram em contato e geram leads: Fale Conosco, interesse em empreendimento e Negocie seu Terreno, com validação, acessibilidade, envio por email e proteção anti-spam.
**FRs cobertos:** FR8, FR9, FR10, FR11.

### Epic 6: Páginas Institucionais
Um visitante conhece o Grupo Natus e a atuação em engenharia: Quem Somos e Serviços de Engenharia, com CTA de contato.
**FRs cobertos:** FR12, FR13.

### Epic 7: Descoberta Orgânica & Qualidade (SEO / Performance / A11y)
O site é encontrável e rápido: SEO site-wide (sitemap, robots, Open Graph, structured data), performance (Core Web Vitals) e validação de responsividade/acessibilidade/motion. Transversal, fechado ao final.
**FRs cobertos:** FR14 (site-wide). **NFRs:** NFR1, NFR2, NFR3, NFR4, NFR8, NFR9.

### Epic 8: Gestão de Conteúdo — Supabase & Admin (condicional) [Gate C]
Somente com necessidade concreta: persistência em Supabase (progresso/leads/mensagens) preservando RLS, e painel `/admin` com Supabase Auth para gerenciar conteúdo.
**FRs cobertos:** FR15. **NFR:** NFR5 (RLS/env/secrets).

---

> **Regras transversais para toda story:** TDD sagrado (red→green→refactor), cobertura ≥90% (Gate via Stop hook), `lint`+`typecheck` limpos; nada de conteúdo inventado (`TODO: CONTENT REQUIRED`); não tocar em RLS/env/secrets; derivar UI dos design tokens.

## Epic 1: Fundação & Identidade Navegável

Entrega uma base Next.js rodando com a identidade Natus, shell navegável, WhatsApp flutuante e o theme-showcase aprovado (Gate A).

### Story 1.1: Scaffold Next.js + TypeScript + infraestrutura de testes

As a desenvolvedor,
I want um projeto Next.js (App Router) + TypeScript estrito com Vitest e gate de cobertura,
So that toda feature seguinte seja construída sob TDD com qualidade garantida.

**Acceptance Criteria:**

**Given** o repositório sem código
**When** o scaffold é criado
**Then** `next dev` sobe sem erros com App Router + TypeScript estrito
**And** existem os scripts `dev`, `build`, `lint`, `typecheck` e `test:coverage`
**And** Vitest + Testing Library estão configurados com `coverage.thresholds` = 90% (lines/functions/branches/statements)
**And** um teste-smoke inicial passa e o gate de cobertura roda verde
**And** `.env.local` usa apenas placeholders (nenhum secret real versionado)

### Story 1.2: Design tokens da identidade Natus

As a designer/desenvolvedor,
I want tokens de marca (cores, tipografia, spacing, radius, shadows, breakpoints, grid, motion),
So that toda a UI derive de uma fonte única e reconhecível como Grupo Natus.

**Acceptance Criteria:**

**Given** os logos oficiais em `img/LOGO-.../`
**When** os tokens são definidos
**Then** as cores institucionais são extraídas dos logos e documentadas como tokens
**And** tipografia/spacing/radius/shadows/breakpoints/grid/motion existem como tokens reutilizáveis
**And** nenhuma cor fora dos tokens é usada em componentes (verificável por lint/teste de convenção)

### Story 1.3: Layout shell (Header, Navegação, Footer)

As a visitante,
I want um cabeçalho, navegação e rodapé consistentes,
So that eu me oriente e navegue o site em qualquer dispositivo.

**Acceptance Criteria:**

**Given** os tokens da Story 1.2
**When** o shell é renderizado
**Then** o Header exibe o logo e a nav (Empreendimentos, Serviços de Engenharia, Quem Somos, Negocie seu Terreno, Contato)
**And** existe navegação mobile própria (drawer) acessível por teclado
**And** o Footer exibe contatos institucionais e links
**And** o layout é responsivo (Mobile/Tablet/Desktop/Large) com HTML semântico

### Story 1.4: Componentes-base do design system

As a desenvolvedor,
I want primitivos reutilizáveis (Button, Link, Badge, Card, Image, Accordion, Modal),
So that páginas sejam montadas sem duplicar UI.

**Acceptance Criteria:**

**Given** os tokens
**When** os componentes-base são criados
**Then** cada um deriva dos tokens e cobre estados hover/active/disabled
**And** `Badge` suporta a variante DevelopmentStatus (lancamento/em_construcao/pronto)
**And** `Image` encapsula `next/image` exigindo `alt`
**And** cada componente tem testes unitários cobrindo variações e estados (≥90%)

### Story 1.5: Abstração WhatsApp (botão flutuante) — FR6

As a visitante,
I want um botão flutuante de WhatsApp em qualquer página,
So that eu inicie uma conversa rapidamente.

**Acceptance Criteria:**

**Given** um número institucional configurado via env/config
**When** o `WhatsAppButton` é renderizado
**Then** ele aparece flutuante, discreto, acessível e responsivo em todas as páginas
**And** aceita uma mensagem contextual (ex.: nome do empreendimento)
**And** é a única abstração de WhatsApp (não hardcodado em vários componentes)

### Story 1.6: Theme-showcase [Gate A]

As a stakeholder,
I want um showcase visual do design system,
So that eu aprove o design antes de construir todas as páginas.

**Acceptance Criteria:**

**Given** tokens e componentes-base prontos
**When** o theme-showcase é gerado
**Then** ele demonstra logo, cores, tipografia, headings, body, buttons, links, badges, cards, development card, progress, forms, gallery, tratamento de imagem, map, CTA, header, footer, exemplos de seção, estados e exemplos mobile + princípios de motion
**And** o design system só é considerado fechado após aprovação registrada

## Epic 2: Descoberta de Empreendimentos (Home / Catálogo)

Um visitante descobre e filtra os 11 empreendimentos; cria o modelo de dados que alimenta o site.

### Story 2.1: Modelo de dados `Development` + camada de conteúdo

As a desenvolvedor,
I want tipos e um loader de conteúdo para empreendimentos,
So that haja uma fonte única de verdade para Home e páginas de detalhe.

**Acceptance Criteria:**

**Given** o modelo do PRD §4
**When** a camada de conteúdo é criada em `src/content`
**Then** os tipos `Development`/`ConstructionProgress` estão em `src/types`
**And** existem `getAllDevelopments()` e `getDevelopmentBySlug()`
**And** slug duplicado é rejeitado (teste cobre unicidade)

### Story 2.2: Seed dos 11 empreendimentos

As a editor,
I want os 11 empreendimentos cadastrados com os dados conhecidos,
So that o site seja populado sem inventar informação.

**Acceptance Criteria:**

**Given** a tabela do Product Brief
**When** os 11 registros são criados
**Then** cada um tem nome, slug, cidade/UF e status (`lancamento|em_construcao|pronto`)
**And** campos sem fonte confiável são marcados `TODO: CONTENT REQUIRED`
**And** nomes/status são sinalizados como "a validar com a empresa"

### Story 2.3: Hero + apresentação institucional (Home)

As a visitante,
I want uma entrada visual forte e um resumo institucional,
So that eu entenda a marca em segundos e ganhe confiança.

**Acceptance Criteria:**

**Given** tokens e shell
**When** a Home carrega
**Then** o hero exibe identidade Natus, headline e CTA primária, responsivo (composição mobile própria)
**And** há uma seção institucional com números/diferenciais (`TODO: CONTENT REQUIRED` onde faltar) e link para Quem Somos

### Story 2.4: Grid de catálogo com DevelopmentCard — FR1

As a visitante,
I want ver todos os empreendimentos em cards,
So that eu descubra as opções disponíveis.

**Acceptance Criteria:**

**Given** `getAllDevelopments()`
**When** o catálogo renderiza
**Then** cada `DevelopmentCard` mostra nome, localização, badge de status, imagem principal, características-chave, CTA e link para `[slug]`
**And** o grid é responsivo e usa `next/image`

### Story 2.5: Filtros por status e localização — FR2

As a visitante,
I want filtrar o catálogo,
So that eu encontre rapidamente o que me interessa.

**Acceptance Criteria:**

**Given** o catálogo renderizado
**When** eu seleciono um status e/ou cidade/UF
**Then** a lista é filtrada sem recarregar a página
**And** "nenhum resultado" é tratado com mensagem clara
**And** os filtros são acessíveis por teclado

## Epic 3: Página do Empreendimento & Catálogo Completo

Um visitante explora cada empreendimento via template único que gera as 11 páginas.

### Story 3.1: Rota dinâmica `/empreendimentos/[slug]` — FR3

As a desenvolvedor,
I want geração de páginas por dados,
So that as 11 páginas existam sem duplicação de código.

**Acceptance Criteria:**

**Given** o loader de conteúdo
**When** a rota é acessada
**Then** `generateStaticParams` gera as rotas a partir dos slugs
**And** slug inexistente retorna 404
**And** a página é renderizada por `getDevelopmentBySlug()`

### Story 3.2: Galeria de imagens — FR4

As a visitante,
I want ver imagens do empreendimento,
So that eu o avalie visualmente.

**Acceptance Criteria:**

**Given** as imagens do empreendimento
**When** a galeria renderiza
**Then** ela é responsiva, com `next/image`, lazy loading e `alt` obrigatório
**And** suporta categorias (render/planta/externa) e navegação por teclado

### Story 3.3: Características, descrição e status — FR4

As a visitante,
I want informações estruturadas do empreendimento,
So that eu entenda o produto.

**Acceptance Criteria:**

**Given** os dados do empreendimento
**When** a seção renderiza
**Then** exibe features (label/value), descrição e badge de status
**And** ausências aparecem como `TODO: CONTENT REQUIRED` (dev/mock), nunca como dado real inventado

### Story 3.4: Localização via Google Maps — FR7

As a visitante,
I want ver onde o empreendimento fica,
So that eu avalie a região.

**Acceptance Criteria:**

**Given** `location` (cidade/UF/endereço/coords)
**When** a seção de localização renderiza
**Then** exibe cidade/UF/endereço e um mapa via embed/link do Google Maps
**And** não exige API key nesta etapa
**And** degrada para link quando faltarem coordenadas

### Story 3.5: CTA de contato contextualizado — FR6 (aplicado)

As a visitante,
I want contato específico daquele empreendimento,
So that eu demonstre interesse com contexto.

**Acceptance Criteria:**

**Given** a abstração `WhatsAppButton` (Story 1.5)
**When** estou numa página de empreendimento
**Then** o CTA de WhatsApp/formulário usa mensagem contextual com o nome do empreendimento

### Story 3.6: Metadata de SEO por empreendimento — FR14 (por empreendimento)

As a visitante de busca,
I want que cada empreendimento tenha metadata própria,
So that as páginas sejam encontráveis e compartilháveis.

**Acceptance Criteria:**

**Given** os dados do empreendimento
**When** a página é gerada
**Then** title/description/canonical/Open Graph são próprios do empreendimento
**And** a URL é amigável (`/empreendimentos/[slug]`) e imagens têm `alt`

### Story 3.7: Validação do template [Gate B] e geração das 11 páginas

As a stakeholder,
I want validar uma página completa antes de replicar,
So that o modelo seja validado antes de escalar.

**Acceptance Criteria:**

**Given** uma página de empreendimento completa
**When** ela é validada em desktop e mobile (interações, motion, performance)
**Then** a aprovação é registrada (Gate B)
**And** as 11 páginas passam a renderizar a partir dos dados sem código duplicado
**And** a navegação Home ↔ página funciona

## Epic 4: Acompanhamento da Evolução das Obras

### Story 4.1: Modelo `ConstructionProgress`

As a desenvolvedor,
I want um modelo de progresso preparado para evolução,
So that o acompanhamento cresça (histórico/atualizações) e possa migrar a Supabase.

**Acceptance Criteria:**

**Given** o PRD §4
**When** o modelo é criado
**Then** suporta percentual geral, etapas (nome/%/ordem) e `updatedAt`
**And** documenta como `TODO` quem atualiza/periodicidade
**And** o shape está pronto para futura migração a Supabase (sem criar tabela agora)

### Story 4.2: Componentes ProgressBar e ProgressTimeline — FR5

As a visitante,
I want ver o avanço da obra,
So that eu acompanhe a evolução do empreendimento.

**Acceptance Criteria:**

**Given** um `ConstructionProgress`
**When** os componentes renderizam
**Then** `ProgressBar` mostra o percentual geral e `ProgressTimeline` as etapas ordenadas
**And** exibe a data da última atualização
**And** a informação não depende só de cor (acessível)

### Story 4.3: Integração do progresso na página de empreendimento

As a visitante,
I want ver o progresso dentro da página do empreendimento quando houver,
So that eu tenha o contexto completo.

**Acceptance Criteria:**

**Given** um empreendimento com/sem progresso
**When** a página renderiza
**Then** o progresso aparece somente quando há dado
**And** a ausência é tratada sem quebrar o layout
**And** percentuais refletem o dado de conteúdo (mock rotulado enquanto não houver fonte)

## Epic 5: Conversão por Leads (Formulários & Contato)

### Story 5.1: Componentes de formulário acessíveis

As a desenvolvedor,
I want primitivos de formulário com validação e acessibilidade,
So that todos os formulários tenham UX e a11y consistentes.

**Acceptance Criteria:**

**Given** os tokens
**When** Input/Select/Textarea são criados
**Then** têm labels, foco, aria e mensagens de erro/sucesso
**And** validação client + server é suportada
**And** testes cobrem estados válido/erro (≥90%)

### Story 5.2: Formulário Fale Conosco — FR8

As a visitante,
I want enviar uma mensagem de contato,
So that eu fale com o Grupo Natus.

**Acceptance Criteria:**

**Given** a página `/contato`
**When** preencho nome, email, telefone, assunto e mensagem e envio
**Then** os campos são validados e recebo feedback claro
**And** a página exibe email, telefone, WhatsApp, endereço, mapa e horário

### Story 5.3: Formulário de interesse em empreendimento — FR9

As a visitante interessado,
I want demonstrar interesse num empreendimento,
So that a equipe me contate sobre ele.

**Acceptance Criteria:**

**Given** uma página de empreendimento
**When** abro o formulário de interesse
**Then** os campos são nome, telefone, email, empreendimento (pré-preenchido pelo `[slug]`) e mensagem
**And** a validação e o feedback funcionam

### Story 5.4: Formulário Negocie seu Terreno — FR10

As a proprietário/corretor,
I want submeter meu terreno,
So that eu inicie uma negociação com o Grupo Natus.

**Acceptance Criteria:**

**Given** a página Negocie seu Terreno
**When** ela carrega
**Then** explica a proposta/como funciona
**And** o formulário coleta nome, contato (telefone/email), localização do terreno, área, tipo/uso e observações (`TODO`: confirmar campos com a empresa)
**And** gera um lead com validação e feedback

### Story 5.5: Envio por email + anti-spam (Route Handler) — FR11

As a operação Natus,
I want receber os formulários por email com proteção anti-spam,
So that leads cheguem de forma confiável.

**Acceptance Criteria:**

**Given** um provedor de email configurado via env (sem expor secret)
**When** um formulário válido é enviado
**Then** um Route Handler do Next envia o conteúdo por email
**And** há estratégia anti-spam (honeypot/rate-limit no mínimo)
**And** sucesso e erro retornam feedback claro ao usuário
**And** implementado somente após o fluxo/provedor definidos (`TODO` se pendente)

## Epic 6: Páginas Institucionais

### Story 6.1: Quem Somos — FR13

As a visitante,
I want conhecer o Grupo Natus,
So that eu confie na empresa.

**Acceptance Criteria:**

**Given** conteúdo institucional (ou `TODO: CONTENT REQUIRED`)
**When** a página renderiza
**Then** apresenta história, empresas, atuação, valores e números
**And** evita texto genérico e traz um CTA

### Story 6.2: Serviços de Engenharia — FR12

As a cliente B2B,
I want entender a atuação em engenharia,
So that eu avalie contratar o Grupo Natus.

**Acceptance Criteria:**

**Given** conteúdo (ou `TODO: CONTENT REQUIRED`)
**When** a página renderiza
**Then** apresenta atuação, metodologia, tipos de projeto, capacidade técnica, obras realizadas e diferenciais
**And** traz um CTA de contato

## Epic 7: Descoberta Orgânica & Qualidade (SEO / Performance / A11y)

### Story 7.1: SEO site-wide — FR14 (site-wide)

As a visitante de busca,
I want que o site seja encontrável,
So that eu chegue às páginas do Grupo Natus.

**Acceptance Criteria:**

**Given** as rotas do site
**When** o SEO base é implementado
**Then** existem sitemap e robots
**And** metadata/title/description/canonical/Open Graph por página
**And** structured data onde fizer sentido, sem keyword stuffing

### Story 7.2: Performance (Core Web Vitals) — NFR1

As a visitante,
I want um site rápido,
So that a experiência seja fluida em qualquer dispositivo.

**Acceptance Criteria:**

**Given** o site construído
**When** medido no Lighthouse mobile
**Then** `next/image`/lazy loading/imagens e vídeos responsivos e comprimidos estão em uso
**And** Server Components são o padrão
**And** as métricas de Core Web Vitals ficam saudáveis

### Story 7.3: Responsividade & Acessibilidade — NFR2/NFR3

As a visitante em qualquer dispositivo,
I want um site utilizável e acessível,
So that eu consiga usar todas as funções.

**Acceptance Criteria:**

**Given** as páginas do site
**When** validadas em Mobile/Tablet/Desktop/Large
**Then** navegação, galerias, cards, mapas, formulários, CTAs, WhatsApp, progress e vídeos funcionam
**And** checagens de a11y (contraste, teclado, semântica) passam

### Story 7.4: Motion global — NFR4

As a visitante,
I want animações que reforcem a experiência,
So that a navegação pareça premium sem prejudicar performance.

**Acceptance Criteria:**

**Given** os princípios de motion do design system
**When** animações são aplicadas
**Then** reforçam hierarquia/storytelling/navegação
**And** respeitam `prefers-reduced-motion` e não degradam Core Web Vitals
**And** não há parallax indiscriminado nem efeito gratuito

## Epic 8: Gestão de Conteúdo — Supabase & Admin (condicional) [Gate C]

> Só iniciar com necessidade concreta e explícita. Preservar RLS/env/secrets.

### Story 8.1: Inicializar Supabase local — NFR5

As a desenvolvedor,
I want inicializar o Supabase local sem afetar o remoto,
So that eu tenha persistência para validar localmente com segurança.

**Acceptance Criteria:**

**Given** um projeto Supabase remoto existente
**When** o Supabase local é inicializado
**Then** nenhuma RLS/secret/env existente é alterada
**And** a validação é 100% local

### Story 8.2: Migrar entidades necessárias com RLS

As a operação Natus,
I want persistir apenas os dados que precisam de administração dinâmica,
So that o conteúdo estável permaneça estático e o banco fique enxuto.

**Acceptance Criteria:**

**Given** uma necessidade concreta
**When** tabelas são criadas (ex.: DevelopmentProgress, Leads, ContactMessages)
**Then** cada uma tem RLS adequada
**And** conteúdo estável permanece como conteúdo estático (não vai ao banco)

### Story 8.3: Painel /admin com Supabase Auth — FR15

As a administrador de conteúdo,
I want gerenciar progresso/conteúdo/imagens/leads em um painel protegido,
So that eu atualize o site sem depender de deploy.

**Acceptance Criteria:**

**Given** Supabase Auth
**When** acesso `/admin`
**Then** o acesso é protegido por Supabase Auth (sem auth caseira)
**And** posso gerenciar o escopo mínimo viável (progresso/conteúdo/imagens/leads)
