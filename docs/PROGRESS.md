# PROGRESSO — Website Grupo Natus

> Painel único de acompanhamento do desenvolvimento. **Atualize a cada story concluída** (o comando `/story` faz isso no fim da DoD; `/progress` audita).
> Legenda: ⬜ a fazer · 🔵 em andamento · ✅ concluída · ⛔ bloqueada.
> Backlog canônico: [`_bmad-output/planning-artifacts/epics.md`](../_bmad-output/planning-artifacts/epics.md) · Arquitetura: [ARCHITECTURE-SPINE](../_bmad-output/planning-artifacts/architecture/architecture-natus-2026-09-16/ARCHITECTURE-SPINE.md)

**Última atualização:** 2026-09-30 · **Concluídas:** 32/35 (Epics 1–7 ✅) · **Epic atual:** — (Epic 8 condicional) · **Iniciativa ativa:** **Home v2** (feedback do cliente sobre a v1) — **home concluída**; a seguir, página de empreendimento e serviços de engenharia · **Gate A: ✅** · **Gate B: ✅**

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
- ✅ 6.1 Quem Somos (`/quem-somos`) — **conteúdo real** (holding · médio econômico e alto luxo · ALIATTO+OASI · ISO 9001 · hero recepção); história/números seguem 🔔 TODO — FR13
- ✅ 6.2 Serviços de Engenharia (`/engenharia`) — **portfólio real** (obras por administração: Alphaville / Avenida condomínio / galpão); descrições/capacidade técnica seguem 🔔 TODO — FR12

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

## Iniciativa — Modernização de Frontend & Design (desde 2026-09-18)

> Fora do backlog original (Epics 1–8). Eleva o design a um patamar premium: shadcn/ui + Radix,
> tipografia Fraunces/Inter, ícones lucide, motion. Gate baixado p/ 85% (ver `docs/adr/0001-coverage-85.md`).
> Commits na `main` (mesmo fluxo do restante do projeto).

- ✅ Fase 0 — tooling (npm, `cn`, deps, skills, MCP)
- ✅ Gate 90→85 + ADR
- ✅ A1 — Tipografia (Fraunces display + Inter)
- ✅ A2 — Tokens shadcn ↔ marca (colisão `muted` resolvida)
- ✅ A3 — Ícones lucide (zero emojis/glifos)
- ✅ A4 — Primitivos → shadcn/Radix (Button cva; Dialog/Accordion Radix)
- ✅ A5 — Motion (framer-motion): Reveal on scroll + hover de cards + **B5-a** (Header scroll-aware + link ativo)
- ✅ B1 — Reorder (empreendimento antes da galeria)
- ✅ B2 — Zoom/lightbox galeria (Radix Tabs + Radix Dialog lightbox com setas/teclado)
- ✅ B3 — Google Maps do HQ
- ✅ **B5 — Navegação (Header/Footer)**: CTA persistente, mega-menu (NavigationMenu), MobileNav→Sheet, Footer rico + sub-footer
- ✅ QW — hero CTA on-dark (`outlineInverse`) + 📍→lucide (MapPin/BedDouble/Play) + ícones de contato
- ✅ Rebuild da seção do empreendimento (Overview/Details): remove duplicação status+localização; características em grid de cards; placeholder discreto p/ descrição TODO
- ✅ Progresso → **Radix Progress** (somente leitura): geral em card destaque + etapas em grid; fill em gradiente de marca (sliders descartados; referência usa barras)
- ✅ **Radix Select** nos filtros do catálogo (`SelectField`) + **Forms com react-hook-form + zod** (schema dinâmico; honeypot/rate-limit/`/api/leads` preservados). `<select>` nativo mantido no lead form (robustez, ADR 0001)
- ✅ Galeria — **imagem em destaque + hover-zoom (zoom-and-pan seguindo o cursor, estilo 21st.dev)** + grade das demais + lightbox (gated por `prefers-reduced-motion`/pointer)
- ✅ A6/B4 — theme-showcase refrescado (Fraunces/Inter, seção Ícones, `outlineInverse`, ProgressTimeline real, primitivos de form reais) + polir card (Link estilizado no lugar de `<a><button>`; MapPin na localização)
- ✅ Estágio de obra com as **etapas oficiais da Natus** (Terraplanagem→Acabamentos + Total Construído) via `CONSTRUCTION_STAGES`/`canonicalStages` (fonte única; casa por nome, 0% no que falta); layout reorganizado (Total Construído em destaque + card de etapas). % reais seguem 🔔 TODO (`isPreview`)
- ✅ Revisão de design (auto-review do diff): resolvidos todos os achados — **contraste AA** (`muted-foreground`→stone-600; cor de erro dedicada `--color-status-error` no lugar do âmbar); % da etapa em `text-ink`; ProgressBar anima o fill on-view (motion); chevron do Select rotaciona no open + scroll buttons; hint "Ampliar" também no foco de teclado; raio da galeria unificado
- ✅ Fase C — pipeline de imagens `scripts/optimize-images.mjs` (sharp, WEBP q86, lado maior 2560/3000; passthrough p/ webp já otimizado) + `npm run optimize:images`. **7 empreendimentos com imagens reais** (Follow Savassi, Torres da Lagoa, Viver Mais, Denver, Gutierrez, Golden Ville, Residenziale) — 53 `.webp` ~15 MB. 🔔 Faltam 5 lançamentos sem foto (assets da empresa); Denver com assets fracos
- ✅ **12º empreendimento** cadastrado (Residenziale Colonnello Figueiredo, Nova Lima/MG — do site atual; **pronto para morar**). Catálogo/SSG agora com 12 empreendimentos
- ✅ Galeria **diversificada por contexto** (abas Externa / Apartamento / Plantas / Obras — inspirado no site atual). `DevelopmentImageKind` recategorizado; imagens re-tagueadas + fotos de **obra** (Viver Mais) e interiores extras (Follow Savassi)
- ✅ Progresso **real** do site oficial no Follow Savassi (Terraplanagem 100%, resto 0%); `updatedAt` opcional (site não informa data)
- ✅ **Conteúdo institucional (Fase C2)** — Quem Somos + Engenharia reconstruídas com copy verbatim do site atual + material da empresa; 11 imagens institucionais otimizadas (`public/quem-somos/*`, `public/engenharia/*`, keyword `institucional` no pipeline); Home `InstitutionalIntro` grounded. Lacunas restantes rotuladas TODO (ver `docs/CONTENT-GAPS.md §3`)
- ✅ Verificação: 232 testes · cobertura 98%+/91% · typecheck/lint/build (**25 páginas**) ok
- 🔔 `interface-review` — execução formal continua **manual** (`/interface-review`; skill com `disable-model-invocation`). Auto-revisão aplicada; os `better-*` de domínio não estão instalados

---

## Coerência das documentações (checar a cada story/epic)

Ao concluir uma story, verifique se a mudança exige atualizar — e atualize:
- [ ] **PROGRESS.md** — marcar a story e recalcular contagens/epic atual.
- [ ] **epics.md** (canônico) — se o escopo/AC de alguma story mudou na prática.
- [ ] **ARCHITECTURE-SPINE.md** — se uma decisão de arquitetura foi tomada/alterada; registrar no `.memlog.md` e resolver `[ASSUMPTION]` confirmados.
- [ ] **PRD / product-brief** — se requisito, dado real ou status de empreendimento mudou.
- [ ] **CLAUDE.md** — se comandos, scripts, stack ou convenções mudaram.

## Iniciativa — Home v2 (feedback do cliente, desde 2026-09-30)

Retorno do cliente sobre a v1: tipografia de título serifada, hero com ruído e home poluída pelo catálogo inteiro. Nova ordem: **hero limpo → busca → carrossel de 3 destaques → MCMV → Grupo Natus**.

- ✅ **Tipografia** — títulos de **Fraunces (serifa) → Outfit (sans geométrica)**, escolhida por ecoar a geometria circular do logotipo NATUS. Só `--font-heading` + o import no layout mudaram: os 41 headings herdam do seletor global. De quebra, **9 arquivos de fonte → 2** (a Fraunces carregava 4 pesos × 2 estilos, com itálico que o site nunca usou). Tracking regravado em dois níveis (−0.011em geral, −0.022em em h1/h2): o −0.02em fora calibrado para serifa e colava as letras em h4–h6. `font-heading` saiu do `ProgressBar` — a Outfit não tem figuras tabulares e anulava o `tabular-nums`.
- ✅ **Hero** só com imagem, sem texto nem CTA, `<h1>` em `sr-only` (SEO/a11y) e seta animada para `#buscar`. Altura **84svh** (não a tela inteira): a borda da busca assoma na dobra, senão a Home parece ter só a imagem. Imagem: **fachada noturna do Follow Savassi** — render retrato (3071×3840) num hero em paisagem, então `object-position: center 75%` fixa a faixa visível na entrada (madeira + lobby + jardim); centralizada mostraria só parede. **Logo branca sobreposta** no topo enquanto o header está oculto — some na rolagem, exatamente onde a logo do header entra, e é `aria-hidden` (o link real vive no header, acessível por Tab). Preparado para virar `<video>` quando houver asset animado.
- ✅ **Header revela na rolagem** — `fixed` + oculto só na Home (`usePathname() === "/"`), `sticky` nas demais rotas. Oculto é opacidade + transform com `focus-within` de volta: nunca `hidden`/`aria-hidden`, para o Tab não perder a navegação. Estado observável em `data-revealed`. `Header.test.tsx` seguiu intacto; o caso da Home vive em `Header.home.test.tsx` (mock de rota é por arquivo).
- ✅ **Busca de empreendimentos** (`DevelopmentSearchBar`) — Status · Cidade · Tipo de imóvel. "Buscar" é um `<Link>`, não `router.push`: a ação é navegação, então ganha prefetch, Ctrl+clique e URL compartilhável — e o destino é verificável no DOM sem mock de router.
- ✅ **Estado de filtro na URL** — `parseDevelopmentFilters`/`buildDevelopmentsHref` (`features/developments/searchParams.ts`, puro e exaustivamente testado). O catálogo recebe `searchParams` como prop do RSC e monta já filtrado (sem flash). **`/empreendimentos` passou a ser dinâmica (SSR)** — build agora: 24 estáticas + `/empreendimentos` e `/api/leads` dinâmicas.
- ✅ **Nova faceta `propertyType`** em `types/development.ts` (apartamento/casa/lote/studio), preenchida **só com evidência no material** — 8 dos 12 confirmados, 4 pendentes e invisíveis ao filtro de tipo (ver CONTENT-GAPS §1).
- ✅ **Carrossel do catálogo** (`FeaturedDevelopments`) — **modo centralizado**: o slide ativo fica no meio em tamanho cheio e os vizinhos espiam reduzidos dos dois lados (margens percentuais nas pontas, porque padding em container de scroll é inconsistente entre browsers). Mostra **todos os 12**; `FEATURED_SLUGS` passou a definir só quem abre (Follow Savassi · Golden Ville · **Torres da Lagoa**, no lugar do Solar Manilha, que não tem imagem) via `getHomeDevelopments()`. O índice **acompanha a rolagem**, para que o swipe mude o destaque, com trava durante a rolagem programática — sem ela, os eventos da própria animação reescreviam o índice e cliques rápidos avançavam um slide só. Scroll-snap nativo + wrap, **sem embla/shadcn**: o `carousel.tsx` do shadcn cairia dentro do `coverage.include` (≈250 linhas a cobrir) e o embla mede layout, que o jsdom não faz — os botões renderizariam `disabled` e o teste de "avançar slide" seria impossível sem mockar a lib.
- ✅ **Seção Minha Casa Minha Vida** — logo oficial do programa (arquivo do cliente, sem recolorir/distorcer), copy fornecida, "Simule agora" via `buildWhatsAppUrl` (AD-3) e 3 cards de benefício. **Redesenhada para não espelhar a referência**: painel único (conteúdo e foto encostados numa só peça, em vez de dois blocos soltos) e benefícios como **faixa separada por fios**, não três caixas — cada um com título próprio e linha de apoio, no lugar dos rótulos soltos. Fundo no **navy-600 do rodapé** (era navy-800, destoava do resto do site). Nitidez da foto: **`sizes` tem de descrever a largura RENDERIZADA, não a do box**. Com `object-cover` num box mais alto que a proporção da foto (637×520 contra 16:9), o browser desenha a imagem a ~930 px e corta as laterais; declarar os 640 px do box o fazia baixar a variante de 640 e ampliá-la 1,46×. Corrigido para `950px` (medido no browser: fator 1,46 → 0,86) e o original subiu para 2560, para que a variante de 1920 das telas 2× venha de um arquivo maior. **Reconferir esse valor sempre que o painel mudar de altura** — já quebrou duas vezes por mudança de layout.
- ✅ **Seção Grupo Natus** (`AboutNatus`, substitui `InstitutionalIntro`) — copy real do cliente e os 3 números agora reais (10 anos · 100 mil m² · +1.500), empilhados à direita, com selo de ícone em navy, número em destaque e rótulo abaixo (referência: Pro Domo). Os mesmos números preencheram o `STATS` de `/quem-somos`, que estava em `TODO: CONTENT REQUIRED`.
- 🔔 Pendente do cliente: vídeo/GIF do hero; tipologia de 4 empreendimentos; imagens do Solar Manilha; direito de uso da marca MCMV.

- ✅ **Motion nas seções da Home** — `Reveal` ganhou `as?: "div" | "li"` para escalonar itens sem meter um `div` entre a lista e seus itens (quebraria a semântica para leitores de tela). Benefícios do MCMV e cards de números entram em cascata (delay de 90 ms por item); as duas seções perderam o `Reveal` externo em `app/page.tsx`, que duplicaria o movimento. Verificado no browser: opacidade 0 → 0,98/0,90/0,66 a 300 ms → 1 ao final, e item fora da viewport não antecipa.
- ✅ **Aviso do Next** `next-image-unconfigured-qualities`: `images.qualities = [75, 90]` em `next.config.ts` (75 é o padrão; 90 só nas fotos com rosto, onde o artefato aparece na pele).
- ✅ **Aviso do Next** `missing-data-scroll-behavior` eliminado: `data-scroll-behavior="smooth"` no `<html>` declara que o scroll suave do `globals.css` é intencional (verificado navegando entre 3 rotas — zero avisos no log).

Verificação: **300 testes** (eram 239) · cobertura **98,4% stmts / 93,5% branches** (era 91,5%) / 98,6% funcs / 99% lines · typecheck, lint e build ok · inspeção visual em 1440px e 390px · animações medidas no browser via CDP.

### Correções da revisão (code review + interface review)

Rodadas `/code-review` e `better-interface` com as skills `better-*` (que estavam ausentes do `.claude/skills/` — só o orquestrador fora instalado). Todas as medições feitas no browser via CDP, antes e depois.

- ✅ **Cor — quatro tokens, alcance em todo o site.** `--color-brand-strong` nude-600 → **nude-700**: como texto de acento media 3,77:1, abaixo de AA, e isso atingia eyebrows *e todos os links de acento* (“Ver no Google Maps”, “Ver todos os empreendimentos”) em 4 rotas → agora 5,49:1. `--color-ring` deixou de apontar para `--color-brand` (2,19:1) e virou **nude-600**, o único passo do ramp que cobre 3:1 contra branco, surface-muted, navy-600 e navy-700 → 3,77:1; os dois mecanismos de foco (`outline-brand` e `ring-ring`) foram unificados em `outline-ring`. `--color-input` ganhou papel próprio (**stone-400**, 3,09:1): a borda que delimita um campo precisa de 3:1, enquanto `--color-border` segue em stone-200 para divisórias, que são estrutura. `--color-status-em-construcao` escurecido para **#976b30** (4,71:1 com texto branco, antes 3,34).
- ✅ **A11y/layout.** Dots do carrossel passaram de 8×8 para **24×24** (WCAG 2.5.8) sem engordar o traço — o botão virou a área, a barra virou `<span>`. `#buscar` ganhou `scroll-mt-20`: a âncora cobria 17px do card de busca sob o header fixo (medido: agora 0). `/empreendimentos` ganhou um `<h2>` em `sr-only`, fechando o único salto `h1 → h3` do site. O header passa a revelar-se também no **hover** perto do topo — o teclado já tinha `focus-within`, o ponteiro não tinha equivalente.
- ✅ **Regressão corrigida.** Os números de “Quem somos” tinham virado `<ul>` para caber o `Reveal as="li"`, perdendo o par rótulo↔valor e divergindo de `/quem-somos`, que seguia em `<dl>`. Voltaram a `<dl>`: o próprio `Reveal` carrega o estilo do cartão, porque o modelo de conteúdo de `<dl>` não admite um segundo `div` entre o grupo e `dt`/`dd`.
- ✅ **Tipografia.** O `<br>` manual no h2 do MCMV custava uma linha extra abaixo de ~400px → `text-balance` (4 linhas → 3).
- ✅ **Correções funcionais.** `cidade` era a única faceta sem validação: `?cidade=Niteroi` (sem acento) zerava o catálogo com o select em branco — agora é validada contra as localizações existentes e, não casando, cai fora. O catálogo ganhou **“Limpar filtros”**, sem o qual um filtro vindo da URL podia ficar sem controle na tela para desfazê-lo. O guard de “fonte ausente não aborta o lote” foi estendido ao laço de `JOBS` em `optimize-images.mjs`, que era o caminho padrão e seguia desprotegido. `syncIndexToScroll` passou a medir por `getBoundingClientRect` em vez de `offsetLeft`, que só coincidia enquanto o trilho começasse em x=0.
- 🔔 **Não aplicado, por ser conteúdo seu:** “conquistar o seu próprio **Natus**” (seção MCMV) não fecha em português e espelha o “o seu próprio Novolar” da referência. É a copy que você enviou — registrado em CONTENT-GAPS para confirmação, não reescrito por conta própria.

Verificação: **306 testes** · cobertura 98,4% stmts / **93,9% branches** / 98,7% funcs / 99% lines · typecheck, lint e build ok · contraste, área de toque, âncora e hierarquia remedidos no browser depois da mudança.

## Decisões & pendências em aberto
- Provedor de email (FR11) — `[ASSUMPTION]` Resend, a confirmar.
- Pins Supabase (`@supabase/ssr`) — a confirmar no Gate C.
- Google Maps embed vs. API — decidir no Epic 3.
- Conteúdo real dos 11 empreendimentos e confirmação de status/nomes com a empresa.
