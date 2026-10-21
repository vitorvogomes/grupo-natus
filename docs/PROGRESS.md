# PROGRESSO — Website Grupo Natus

> Painel único de acompanhamento do desenvolvimento. **Atualize a cada story concluída** (o comando `/story` faz isso no fim da DoD; `/progress` audita).
> Legenda: ⬜ a fazer · 🔵 em andamento · ✅ concluída · ⛔ bloqueada.
> Backlog canônico: [`_bmad-output/planning-artifacts/epics.md`](../_bmad-output/planning-artifacts/epics.md) · Arquitetura: [ARCHITECTURE-SPINE](../_bmad-output/planning-artifacts/architecture/architecture-natus-2026-09-16/ARCHITECTURE-SPINE.md)

**Última atualização:** 2026-10-20 · **Concluídas:** 32/35 (Epics 1–7 ✅) · **Epic atual:** — (Epic 8 condicional) · **Última revisão:** **v5 ✅** — leads (Resend, Supabase, CV CRM), SEO/migração, Solar v2 · v4 ✅ · v3 ✅ · v2 ✅ · **Gate A: ✅** · **Gate B: ✅**

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
- ✅ 2.2 Seed dos 11 empreendimentos (conteúdo real nas revisões v3–v4; lacunas em `docs/CONTENT-GAPS.md`)
- ✅ 2.3 Hero + apresentação institucional (copy factual; números como TODO)
- ✅ 2.4 Grid de catálogo (DevelopmentCard + DevelopmentGrid) na Home e em `/empreendimentos` — FR1
- ✅ 2.5 Filtros por status e localização (DevelopmentCatalog client) — FR2

## Epic 3 — Página do Empreendimento & Catálogo Completo  ✅ 7/7 — Gate B aprovada
- ✅ 3.1 Rota dinâmica `/empreendimentos/[slug]` (generateStaticParams + 404) — FR3
- ✅ 3.2 Galeria de imagens (categorias, teclado, next/image) — FR4
- ✅ 3.3 Características, descrição e status — FR4
- ✅ 3.4 Localização via Google Maps (embed/link, sem API key; a revisão v2 acrescentou o caminho opcional com chave + pin da marca) — FR7
- ✅ 3.5 CTA contextualizado (WhatsApp com nome do empreendimento) — FR6
- ✅ 3.6 Metadata de SEO por empreendimento — FR14
- ✅ 3.7 Template validado **[Gate B aprovada]** — hero full-bleed, sub-nav âncora, visão geral, galeria, accordion de diferenciais; **12** páginas via SSG (template reorganizado na revisão v2)

## Epic 4 — Evolução das Obras  ✅ 3/3
- ✅ 4.1 Modelo `ConstructionProgress` + helpers (sortedStages/clamp/formatDate)
- ✅ 4.2 ProgressBar (acessível) + ProgressTimeline — FR5
- ✅ 4.3 Integração na seção "Estágio de Obra" (% informados pelo cliente desde a v3)

## Epic 5 — Conversão por Leads  ✅ 5/5
- ✅ 5.1 Componentes de formulário acessíveis (Input/Textarea/Select) + validadores
- ✅ 5.2 Fale Conosco (`/contato`) — FR8
- ✅ 5.3 Interesse em empreendimento (pré-preenchido pelo slug) — FR9
- ✅ 5.4 Negocie seu Terreno (`/negocie-seu-terreno`) — FR10 (campos confirmados na v4)
- ✅ 5.5 Envio por email + anti-spam (Route Handler + honeypot + rate-limit) — FR11 (Resend + Supabase + CV CRM desde a v5)

## Epic 6 — Páginas Institucionais  ✅ 2/2
- ✅ 6.1 Quem Somos (`/quem-somos`) — **conteúdo real** (holding · médio econômico e alto luxo · ALIATTO+OASI · ISO 9001 · hero recepção); história/números seguem 🔔 TODO — FR13
- ✅ 6.2 Serviços de Engenharia (`/engenharia`) — **portfólio real** (obras por administração: Alphaville / Avenida condomínio / galpão); descrições/capacidade técnica seguem 🔔 TODO — FR12

## Epic 7 — Descoberta Orgânica & Qualidade  ✅ 4/4
- ✅ 7.1 SEO site-wide (`sitemap.ts`, `robots.ts`, OG/metadataBase, JSON-LD Organization+Residence) — FR14
- ✅ 7.2 Performance: RSC padrão, `next/image` em todo lugar, tudo estático/SSG — NFR1 (validar Lighthouse local; comprimir fontes de img)
- ✅ 7.3 Responsividade & Acessibilidade: skip-link, landmarks, labels, alt obrigatório, foco/teclado — NFR2/3
- ✅ 7.4 Motion global: `prefers-reduced-motion` neutraliza transições/scroll — NFR4

## Revisão v2 — Parte 2: empreendimento, Quem Somos, Engenharia ✅ (2026-10-01)

Continuação da Home v2, com o feedback do cliente sobre a página do empreendimento.

**Página do empreendimento** — nova ordem: descrição → galeria → o que oferece →
localização → estágio de obra → CTA → MCMV → explore empreendimentos.

- **Três formas, uma só página.** O status diz quais seções fazem sentido (obra
  só em "em construção") e o dado presente diz quais aparecem. Resultado: Follow
  Savassi completo; os 6 com material, reduzido; os 5 lançamentos sem imagem,
  um painel `DevelopmentComingSoon` no lugar de uma sequência de "em breve".
  Não há três templates — há uma composição condicional em `page.tsx`.
- **Galeria reescrita** (`Gallery.tsx`): palco + régua de miniaturas que sempre
  cabe (a ativa cresce, as outras encolhem), contador `3 / 12`, setas sobre o
  palco, clique abre o lightbox existente. Saiu o `FeaturedImage` com hover-zoom.
  Piso de `min-w-6` nas miniaturas por causa do alvo de 24×24 (WCAG 2.5.8) — a
  referência usa lascas de ~10 px. Reaproveitada em `/engenharia`.
- **Categorias de imagem simplificadas**: `externa`+`apartamento` → `imagens`;
  ficam `imagens · planta · obra`. 52/5/5 das 62 imagens. Ordem das abas vem de
  `DEVELOPMENT_IMAGE_KINDS`, não da ordem de aparição no dado.
- **Descrição ao lado da imagem**, sem checks (`DevelopmentOverview`), e o
  `<h2>` passou a ser o nome do empreendimento, não "Cidade, Estado".
  `DevelopmentDetails` foi apagado: a descrição subiu para a visão geral e as
  "Características" viraram o primeiro grupo do accordion.
- **"O que o X oferece"**: accordion com ícone lucide por categoria + foto ao
  lado, primeiro grupo aberto. Os emojis do texto de origem viraram ícones.
- **Localização**: painel navy com endereço, texto de entorno e botões Google
  Maps + **Waze** (`buildWazeLink`, novo em `lib/maps.ts`), com o mapa sangrado
  abaixo. **Era a primeira vez que o mapa renderizava** — nenhum empreendimento
  tinha endereço até agora.
- **`DevelopmentMap`** (novo): sem chave usa o embed público do Google (caminho
  atual); com `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` + `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID`
  carrega a JS API e põe um `AdvancedMarkerElement` com o pin da Natus. O embed
  público **não aceita marcador customizado** — daí os dois caminhos.
- **Pin e favicon**: `public/brand/pin-natus.png` compõe o símbolo oficial
  (`img/LOGOS/Favicon`) sobre moldura navy; `app/icon.png` dá ao site o favicon
  que ele não tinha. Ambos gerados por `npm run optimize:images brand`.
- **Estágio de obra** em duas colunas: etapas oficiais à esquerda, galeria do
  canteiro à direita. 🔔 O Follow Savassi **não tem foto de obra** — cai no
  painel de "em breve" (ver CONTENT-GAPS).
- **CTA compacto**: uma faixa com "Quer saber mais?" + Nome/Telefone/E-mail +
  "Quero saber mais!". O campo "Empreendimento" saiu da tela e virou contexto do
  `LeadForm` (segue no e-mail do lead).
- **`ExploreDevelopments`** (novo): carrossel de saída, sem o empreendimento
  aberto. Deliberadamente mais simples que o `FeaturedDevelopments` da Home —
  mexer naquele arriscaria regredir uma home já aprovada.
- **Sub-nav âncora** passou a receber as seções por prop e lista só as que a
  página renderizou; antes era fixa e apontava para âncoras inexistentes.
- **MCMV por enquadramento**: novo campo `mcmv`, hoje em Solar Manilha, Sunset
  Ville e Royal Ville. A marca federal não aparece em alto luxo nem na Savassi.

**Quem Somos**: seção "Nossa história" removida (era o único TODO visível).

**Engenharia**: cada obra passou a ter a galeria da página do empreendimento, no
lugar do grid de imagens. 3 fotos que estavam em `img/` sem nunca chegar ao site
entraram no pipeline (galerias: 7 · 2 · 3). O hero deixou de repetir a capa da
primeira obra.

**Limpeza de modelo**: saíram `highlights` (virou a `description` do Residenziale,
que era o único a usá-lo) e `presentationUrl` (inalcançável a partir de
`fromSeed`). `Accordion` ganhou `defaultOpen` e título como `ReactNode`.

**Gate:** 343 testes · cobertura 95,7% stmts · 92,9% branches · build 26 páginas.

## Revisão v3 — portfólio, header, página de produto, Quem Somos ✅ (2026-10-11)

Terceira leva de feedback, agora com o conteúdo real dos empreendimentos (ver `docs/CONTENT-GAPS.md` §1–2).

**Ajustes manuais do cliente revisados.** Contato `contato@natusgrupo.com.br` + telefone = WhatsApp, a frase da holding fora da Home e "+500 unidades" estavam certos. Faltavam três coisas: dois testes que quebraram (`Footer`: dois links com o mesmo número, agora identificados pelo `href tel:`; `AboutNatus`: ainda esperava ALIATTO e +1.500), e o script de imagens, que ainda apontava para o `img/em-construcao.png` apagado.

**Portfólio**
- **4 status + 100% vendido.** `lancamento · em_construcao · pronto · breve_lancamento`. A ordem é a prioridade: `getAllDevelopments()` ordena por ela, então lançamentos abrem a Home, o catálogo e o "explore". `FEATURED_SLUGS` saiu. "100% vendido" é `soldOut` sobre "pronto" (teste de conteúdo), exibido como **faixa horizontal** (`SoldOutBand`), não como badge. Selo MCMV ao lado do status (`DevelopmentBadges`).
- **Vista do Lago saiu**: 11 empreendimentos. Gutierrez virou breve lançamento e perdeu as maquetes no dado (os arquivos ficam em `public/`).
- **Conteúdo real**: descrições verbatim, bairros, MCMV em 6, Golden Ville em **Niterói**, Denver como studio. Coordenadas dos 7 com página tiradas dos links do cliente. Solar Manilha completo: 34 imagens (77 MB → 7,7 MB) e accordion em 4 grupos.

**Header**
- 🐛 **Cliques bloqueados no topo da Home.** A faixa de captura de hover (z-50) ficava sobre o header (z-40) depois de revelá-lo. O alvo do hover passou a ser o invólucro fixo do próprio header. A logo branca do hero agora segue `revealed` e sai também no hover. Verificado no Chromium: `elementFromPoint` cai no link, e o clique navega.
- **Submenu de Empreendimentos removido**: link direto. `EmpreendimentosMenu`, `getDevelopmentsGroupedByStatus` e `@radix-ui/react-navigation-menu` saíram.

**Home**: card no layout do Novolar (selos sobre a foto, faixa de vendido, nome + selo da UF, "Bairro - Cidade"). O carrossel saiu do modo centralizado e mostra **3 por vez** no desktop (2 no tablet, 1 com espiada no celular), alinhado ao container. No fim do trilho, "próximo" volta ao primeiro.

**Página de produto**
- **Composição por status**: lançamento completo; em construção e pronto reduzidos; breve lançamento só com o painel mínimo (sem localização, CTA nem sub-nav).
- **Resumo**: o título vira "UF," / "Bairro - Cidade" no lugar de "O empreendimento"; o pin sai; os itens ganham divisórias.
- **Sub-nav** (ref. Novolar): Imagens · **Empreendimento** · Localização · Estágio de Obra · Falar com Consultor. "Empreendimento" leva a "O que oferece", ou ao resumo quando não há diferenciais.
- **Accordion `type="single"`**: um grupo aberto por vez.
- **Obra**: etapas Fundação · Estrutura · Alvenaria · Acabamento interno · Acabamento externo. As etapas em 0% somem. A seção aparece em lançamento e em construção. 🔔 Todos os % são estimativas `isPreview`, a aprovar.
- **Mapa com pin da Natus**: o código já existia. Faltam só as chaves, com o passo a passo em `docs/google-maps.md`; o `.env.example` ganhou os dois nomes.

**Quem Somos**: texto v3 completo ("4 entregues e 7 em desenvolvimento", alinhado ao portfólio). "Parceria" entrou no lugar de "Qualidade certificada". Nova seção **Certificações** com ISO 9001:2015 + **PBQP-H · SiAC Nível A** (`public/quem-somos/pbqp-h.webp`).

**Gate:** 379 testes · cobertura 96,0% stmts · 93,2% branches · lint, typecheck e build ok (25 páginas) · inspeção visual no Chromium (header, carrossel, Torres, Follow, Gutierrez, Quem Somos).

### Ajustes pós-v3 (2026-10-11)
- 🐛 **Rolagem horizontal na Home (crítico)**, com duas causas:
  1. o `<span class="sr-only">` do selo de UF do card (`absolute`) se ancorava no `Reveal` transformado, fora do trilho, e nos cards fora da tela alargava o documento para ~4600 px. O trilho agora é `relative` e contém os descendentes `absolute`.
  2. as setas usavam `scrollIntoView`, que rola também os ancestrais (inclusive a página). Agora é `track.scrollTo`.
  Ambos ficam no helper único `features/developments/carouselTrack.ts`, usado pelos dois carrosséis. Medido no Chromium: largura do documento = viewport em 390, 1440 e 2560 px, inclusive depois de 12 cliques.
- **"Explore" proporcional**: o trilho foi para dentro do container, com o mesmo tamanho de card da Home (antes, 31% da tela inteira) e respiro lateral. No fim do trilho, volta ao primeiro. Os cards ocupam a altura do slide (CTAs alinhados).
- **Faixa "100% vendido"** saiu do resumo; fica só nos cards.
- **Progresso informado pelo cliente**: Follow e Solar com Fundação 99 · Estrutura 100 · Alvenaria 90 · Acab. interno 60 · Acab. externo 50 (total 70); Golden Ville com Fundação 70 (total 7). Saiu o `isPreview`, e com ele o rótulo "ilustrativos".
- **Resolução do Solar Manilha**: os renders de origem têm 1448–2095 px e sofriam duas compressões (pipeline q86 + `next/image` q75). Agora o job usa `quality` 96 + `smartSubsample`, e o palco da galeria, o lightbox e o hero entregam em q90.
- **Engenharia** reescrita com o conteúdo de Quem Somos: hero e texto da Oasi, "Como trabalhamos" (Método · Eficiência · Transparência) e o bloco de Certificações. Saiu o TODO visível. Textos e certificações vivem em `features/institutional/` (fonte única das duas páginas).
- **Accordion de "O que oferece"**: já era `type="single"` em todos (é o mesmo componente). Num servidor recém-iniciado, Follow e Solar ficam com um aberto só. O print com todos abertos era de um bundle anterior ao ajuste.

**Gate:** 386 testes · cobertura 96,1% stmts · 93,0% branches · lint, typecheck e build ok (25 páginas).

### Ajustes pós-v3 — 2ª rodada (2026-10-11)
- **Selos neutros**: todo status usa o mesmo selo branco do MCMV (`components/ui/Badge`, um estilo só). Saíram o `badgeClassName` do `STATUS_META` e os tokens `status-lancamento/em-construcao/breve-lancamento`, que ficaram sem uso. A faixa "100% vendido" é o único destaque colorido do card.
- 🐛 **Barras das etapas vazias**: o `whileInView` observava o preenchimento, que nasce em `scaleX(0)`, e uma caixa de largura zero não cruza o limiar do IntersectionObserver de forma confiável. O `ProgressBar` agora observa o trilho (`useInView`) e anima o preenchimento. Verificado com salto instantâneo até a seção: todas enchem.
- **"O que oferece" do Solar**: novo campo `amenitiesImage` (src de uma das `images`; padrão = 3ª imagem), e o Solar usa a vista do apartamento tipo (`apto tipo 03`). O script aceita `quality`/`sharpen` por imagem (essa vai a q98 com nitidez leve), e o componente entrega em q90.
- **Capa do Solar = Implantação 2D** (render aéreo humanizado, reclassificado de `planta` para `imagens`; a regra "capa nunca é planta" segue valendo).
- 🐛 **Imagem do resumo borrada**: o bloco é 4:3 com `object-cover`, mas declarava `sizes=50vw`. Uma panorâmica 2,8:1 (acesso do Solar) chegava em ~750 px de largura e era ampliada ~1,5×. Agora o `sizes` é calculado da proporção real de cada foto (`coverSizes` + manifesto de dimensões), e a entrega é em q90. Só a panorâmica pede mais largura. Medido em 1440 px: sem ampliação em DPR 1; 1,18× em DPR 2, que é o limite da fonte de 750 px de altura.

### Code review + limpeza (2026-10-12)
`/code-review high` sobre o diff da v3: 10 achados, 6 corrigidos.
- 🐛 **Carrosséis**: a seta "anterior" no fim do trilho dava cliques que não moviam nada, e o contador não chegava ao último. Helpers `visibleIndex`/`prevIndex` em `carouselTrack.ts`, usados pela Home e pelo "explore".
- 🐛 **Obra só com o total** (sem etapas) sumia da página. `hasProgressToShow` (total ou etapa > 0); o `ProgressTimeline` omite a lista vazia.
- **`sizes` por proporção**: um valor fixo inflado (para servir uma panorâmica) pesava todas as páginas. O pipeline grava `content/developments/image-dimensions.json`, o seed anexa largura/altura e `coverSizes` calcula o fator. Teste de conteúdo acusa imagem fora do manifesto.
- **Contagem de Quem Somos** derivada do portfólio (`getPortfolioCounts`), não fixa no texto.
- **Números da operação** (`OPERATION_STATS`) em `features/institutional/content.ts`, fonte única de Home e Quem Somos.
- Não aplicados, por decisão do cliente: obra em lançamento, progresso informado, faixa de vendido fora do resumo e "Itaboraí" sem complemento. Os comentários que ainda diziam "card e resumo" foram corrigidos.
- Na verificação no Chromium, o fim do trilho passou a ser "último card na tela, com até meio gap de folga": o snap para alguns px antes do scroll máximo.
- **Limpeza**: comentários-lápide reescritos no presente; código morto removido (`SOCIAL`, que o Footer nunca lia; `ConstructionStageName`); `.claude/` alinhado ao piso de 85%; `CLAUDE.md` reescrito como estado atual (sem crônica); brief e PRD com o portfólio v3; pasta vazia do Vista do Lago removida.

**Gate:** 399 testes · cobertura 96,2% stmts · 93,2% branches · lint, typecheck e build ok (25 páginas) · carrossel e rolagem horizontal reverificados no Chromium.


---

## Revisão v4 — pendências do cliente, cookies e privacidade ✅ (2026-10-17)
- ✅ **Conteúdo**: endereço do Golden Ville (grafia do cliente, "Figueredo") e do Solar Manilha com **CEP** (novo `location.postalCode`, mostrado na Localização e no `PostalAddress` do JSON-LD). `propertyType` = apartamento em Viver Mais, Gutierrez e Sunset Ville: agora os 11 têm tipo. Follow Savassi com Fundação 100%. **Solar sem estágio de obra** (decisão do cliente). Capa do Solar = acesso principal; a implantação passou a 2ª (é a foto do resumo 4:3).
- ✅ **Estágio de obra sem fotos**: o painel "Fotos da obra em breve" saiu. Sem fotos, total e etapas dividem a largura; a galeria do canteiro só aparece quando há fotos.
- ✅ **Rodapé**: CNPJ 24.353.357/0001-11, perfis sociais (`SOCIAL` em `lib/site.ts`, ícones SVG inline em `components/SocialLinks.tsx`) e links Política de Privacidade / Preferências de cookies. `organizationSchema` ganhou `sameAs` e `taxID`.
- ✅ **Quem Somos**: frase fixa no lugar da contagem por status; seção "Empresas do grupo" removida; CTA só com a logo. Saíram `getPortfolioCounts`, `COMPANIES`, `ALIATTO` e os lockups `grupo-natus-assinatura*.webp`.
- ✅ **Imagens (Solar)**: os originais de `img/` são os maiores que existem. O pipeline passou a escolher a faixa pelo tamanho da fonte: **alta** (≥ alvo, reduz + q86) ou **compacta** (abaixo do alvo, tamanho nativo + q95), com relatório no fim. A **galeria ficou compacta** (1024px) no site todo, e `stageFit` mostra panorâmicas inteiras (`contain`) sobre um fundo desfocado da própria foto, em vez de cortar e ampliar ~1,75×. `coverSizes`/`coverFactor` passaram a valer no card, no hero (proporção própria no celular) e no "O que oferece": a capa panorâmica do Solar chegava ampliada no card.
- ✅ **Cookies (LGPD)**: cookie primário `natus_consent` (`lib/consent.ts`, 6 meses), `ConsentProvider`/`useConsent` (store externo sobre `document.cookie`, sem divergência de hidratação), `CookieBanner` (Aceitar todos · Só necessários · Preferências) e `MapConsentGate`: sem aceite, nenhum mapa do Google (empreendimento e sede) é criado, e um painel "Carregar mapa" libera a categoria. Formulários e WhatsApp não usam cookies.
- ✅ **Política de Privacidade** (`/politica-de-privacidade`, no sitemap), redigida a partir do que o site faz. Aviso com link sob o envio do `LeadForm`. 🔔 Rascunho para revisão jurídica (CONTENT-GAPS §6).

Verificação: **442 testes** · cobertura **96,1% stmts / 93,2% branches** · lint, typecheck e build (26 páginas) ok · Chromium em 1440 e 390px: consentimento (recusar → painel → carregar → revogar), Solar, Follow, Golden, Quem Somos, política, rodapé, sem rolagem horizontal em 8 rotas.

### Code review v4 (2026-10-17)
- ✅ **LCP do hero**: o `sizes` do celular pedia ~2,4× a tela (a fonte inteira no LCP com preload). `coverSizes` passou a receber faixas (`upTo`/`vw`/proporção/`maxFactor`): o hero tem celular, tablet (antes caía na regra do desktop e chegava ampliado ~1,5×) e desktop, com teto de 1,5×. A cópia inline do cálculo em "O que oferece" saiu.
- ✅ **Pipeline**: q95 na faixa compacta só para originais sem perda (PNG/TIFF). JPEGs pequenos (Viver Mais, Denver, Residenziale) voltaram aos arquivos anteriores, que tinham ficado 50–75% maiores sem ganho.
- ✅ **Galeria do canteiro**: `desktopWidth` (600) no lugar dos 1024px do palco, que faziam baixar ~3× os pixels necessários.
- ✅ **Consentimento**: revogar os mapas com a JS API carregada recarrega a página (o script não descarrega). O aviso do formulário deixou de dizer "você concorda" (a base legal é o art. 7º, V, não consentimento). O foco volta ao botão "Preferências" ao fechar o diálogo: o aviso fica montado, e o `Modal` passou a devolver o foco a quem o abriu.
- ✅ **Limpeza**: a guarda duplicada do embed em `GoogleMap` saiu (a URL é montada uma vez). O `taxID` saiu do JSON-LD até a razão social do CNPJ ser confirmada.
- ✅ **Engenharia** (edição manual do cliente/dev): a página deixou de citar a Oasi. `OASI`, `Company` e `COMPANIES_TAGLINE` deram lugar a `ENGINEERING_SUMMARY`; metadata e teste acompanharam.


## Revisão v5 — leads (Resend, Supabase, CV CRM), SEO/migração e Solar v2 ✅ (2026-10-20)
- ✅ **Conteúdo** (ajuste do usuário): o Solar abre o portfólio (ordem do seed, fixada em teste) e o Gutierrez passou a **Mirante Gutierrez** (o slug `gutierrez` não muda: é a URL e a chave no CRM).
- ✅ **Solar v2**: 13 renders novos (5504×3072, com gente, luz de fim de tarde) substituem as cenas equivalentes. Os nomes de saída se mantêm, então só o `src` do `JOBS` mudou. Eles caem na faixa **alta** (hero 3000 px, galeria 2560, q92) e saem do `contain` da galeria, porque não são mais panorâmicos. Originais versionados em `img/Solar Manilha - Itaborai RJ/Humanizadas - v2/`; os antigos substituídos ficaram órfãos no lugar.
- ✅ **Rota de leads com contrato no servidor** (`lib/leads/schema.ts`, zod): cada formulário tem os seus campos. O que sobra é descartado e o interesse resolve o empreendimento pelo slug no servidor.
  - Todo lead é gravado no banco; o e-mail é aviso. O visitante só vê erro se nada registrou o lead.
  - Os segredos passam por `lib/env.ts` (`server-only`), por nome.
- ✅ **E-mail (Resend, `fetch`)**: destino e remetente só no `.env` (`LEADS_EMAIL_TO`, `LEADS_EMAIL_FROM`). Em dev vai para a caixa pessoal; em produção, para marketing@. O corpo leva os rótulos em português e o `reply_to` é o lead.
- ✅ **Lead da página do empreendimento**:
  - grava em `public.site_leads` (Supabase, RLS ligado, **sem policy**, `anon`/`authenticated` revogados) e responde na hora;
  - o **CV CRM** e o e-mail rodam em `after()`. O CRM busca o lead por e-mail e depois por telefone: se existir, **nada é feito**; se não, cria com `idempreendimento` (`crmId` no dado) e origem `SI`. O resultado fica na linha (`crm_status`).
  - Sem banco, o e-mail vira o registro do lead.
  - A UTM do anúncio é lida da URL no envio, sem cookie.
- ✅ **SEO**:
  - canônica, Open Graph e Twitter em todas as páginas (`pageMetadata`);
  - títulos com intenção de busca (empreendimento: "{nome} — {tipo} em {bairro}, {cidade}/{UF}");
  - o breve lançamento deixou de publicar "TODO" como descrição;
  - teste de unicidade de títulos e descrições.
  - Imagem de compartilhamento padrão e `apple-icon`.
  - JSON-LD com logo, sede, contato, `WebSite`, `ApartmentComplex`/`Residence` com `geo` e capa, e `BreadcrumbList`.
  - 404 com saída; `/theme-showcase` é 404 em produção.
- ✅ **Redirects do WordPress** (`content/redirects.ts` → `next.config.ts`, 308): 19 URLs (Wayback + home ao vivo). O teste garante que o destino existe e que não há cadeia. `npm run check:redirects` confere contra o servidor: 38/38. A forma com barra final dá 2 saltos, porque o Next tira a barra antes.
- ✅ **Revisão de segurança (2026-10-21)**:
  - todo lead também no banco (`site_contacts` para Contato/Terreno), com o e-mail como aviso (`email_enviado`);
  - mensagem de falha única e genérica (a API não diz o motivo);
  - rota só JSON, da mesma origem, com até 16 KB;
  - rate-limit com teto de memória e `x-real-ip`;
  - campos de uma linha sem caractere de controle;
  - cabeçalhos de segurança;
  - política de privacidade atualizada (banco, CRM, UTM);
  - variáveis do Supabase com os nomes que já existiam (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`).
  - O bundle do navegador sai sem segredo nem cliente de servidor. Carga local: 325 req/s, p95 136 ms, zero erros.
- ✅ **Qualidade das imagens (2026-10-21)**:
  - **Causa da galeria ruim:** o cache do `next dev` (`.next/dev/cache/images`, desde 30/09) servia a panorâmica **antiga** de 2095 px nas larguras 1080–3840. O pipeline agora apaga o cache ao terminar.
  - **Medição** (PSNR na variante entregue, renders v2):
    - fonte q86 → q92: +0,5 dB;
    - fonte quase sem perda: +2–3 dB, mas sem diferença visível e com `public/` indo de 36 para 162 MB (descartada).
  - **Entrega:** AVIF (metade dos bytes, mesma aparência); palco e lightbox em q100 (AVIF 63); `deviceSizes` ganhou 2560.
  - **Hero:** passou a ser limitado pela largura (os renders em retrato do Follow e da Home passaram de 2399 para 3000 px) e o teto de ampliação foi de 1,5× para 2× (capa do Solar no celular 3×: densidade de 0,71 para ≥ 1; 243 KB em AVIF).
  - **Conferência de 174 imagens** em 1440@1×, 1440@2× e 390@3×: o que sobra abaixo de 0,9× é só limite da fonte (fachada do Golden Ville com 1688 px; lazer do Viver Mais com 1024 px).
  - `public/`: 36 → 52 MB.
- ✅ **Teste de ponta a ponta (2026-10-20)**, com as chaves reais, preenchendo os formulários no Chromium (`next start`):
  - Contato e Terreno gravaram em `site_contacts`, e o e-mail chegou (`email_enviado`);
  - Interesse no Solar: gravou com a UTM. O CRM foi testado nos três caminhos: lead novo criado (origem WebSite, empreendimento 4, corretor atribuído); 2º envio com o mesmo e-mail = `existente`; e um telefone já cadastrado = `existente`, sem editar nada;
  - a chave pública do Supabase não lê nem grava nas duas tabelas (42501);
  - `crmId` ligado pela lista da API, com nomes idênticos aos do site: Golden Ville = 2, Follow = 3, Solar = 4. Os outros 8 não estão no CRM e entram sem empreendimento.

### Code review v5 (2026-10-20)
`/code-review` sobre o diff da v5: 10 achados + 3 menores. Corrigidos com teste:
- 🐛 **CV CRM — falso "existente"**: medido na API, um filtro que ela não reconhece é ignorado e devolve a lista geral (`telefone=lixo` → 200 com 6.212 leads), e o código tomava o 1º como o mesmo lead. Agora só conta um lead com o mesmo e-mail ou telefone. Um 400 só é "não encontrado" com "Lead não encontrado"; outro 400 é erro, sem criar às cegas.
- **Rate-limit**: sem `x-real-ip`, vale o **último** `x-forwarded-for` (o que o proxy acrescentou), não o 1º, que o cliente pode forjar. Na inundação de chaves novas, quem está bloqueado não é descartado. O corpo é medido em bytes.
- **Origem atrás de proxy**: aceita o domínio do site e o 1º `x-forwarded-host`. Antes, um `Host` interno recusava todo envio.
- **Remetente padrão** `onboarding@resend.dev` (o `no-reply@` só funciona com o domínio verificado).
- **UTM malformada** (quebra de linha vinda do nome do anúncio) é saneada, não derruba o lead. Os limites de tamanho são um só (`FIELD_MAX`): o `LeadForm` mostra "Use até N caracteres" em vez do erro genérico, e a área do terreno subiu para 100.
- **Sem banco**: e-mail e CRM saem antes da resposta, e basta um registrar o lead.
- **Limpeza**: um cliente Supabase por processo. Saíram o `seo` do modelo (o seed nunca o preenchia), `readOnly`/`defaultValue` do `LeadField` e um TODO de processo já resolvido. `CONTACT.address` passou a ser montado de `HEADQUARTERS`. Os hooks do `.claude/` foram alinhados ao `coverage.include` (`content/`, `types/`).
- Não aplicado: `og:image` do empreendimento em WEBP (WhatsApp, Facebook e Instagram aceitam; o LinkedIn pode não mostrar). Gerar um JPEG por capa fica para quando o compartilhamento no LinkedIn importar.

**Gate:** 529 testes · cobertura 96,7% stmts · 92,8% branches · lint e typecheck ok.

- 🔔 **Pendente**:
  - verificar o domínio no Resend (hoje sai pela conta pessoal, para o e-mail de dev);
  - export do Search Console para completar a tabela de redirects;
  - hospedagem com o proxy sobrescrevendo `x-real-ip`.

## Epic 8 — Supabase & Admin (condicional)  ⬜ 0/3 — **[Gate C]**
> A v5 usa o Supabase só para gravar leads (`site_leads`, `site_contacts`, RLS sem policy, aplicadas no SQL Editor). Não há Supabase local, migração de conteúdo nem painel: o Gate C segue fechado.
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
- ✅ Galeria — imagem em destaque + hover-zoom + grade das demais + lightbox — **substituída na revisão v2** por palco + régua de miniaturas (ver o bloco da Parte 2)
- ✅ A6/B4 — theme-showcase refrescado (Fraunces/Inter, seção Ícones, `outlineInverse`, ProgressTimeline real, primitivos de form reais) + polir card (Link estilizado no lugar de `<a><button>`; MapPin na localização)
- ✅ Estágio de obra com as etapas da Natus via `CONSTRUCTION_STAGES`/`canonicalStages` (fonte única; casa por nome). Etapas e % atualizadas na v3
- ✅ Revisão de design (auto-review do diff): resolvidos todos os achados — **contraste AA** (`muted-foreground`→stone-600; cor de erro dedicada `--color-status-error` no lugar do âmbar); % da etapa em `text-ink`; ProgressBar anima o fill on-view (motion); chevron do Select rotaciona no open + scroll buttons; hint "Ampliar" também no foco de teclado; raio da galeria unificado
- ✅ Fase C — pipeline de imagens `scripts/optimize-images.mjs` (sharp, WEBP q86, lado maior 2560/3000; passthrough p/ webp já otimizado) + `npm run optimize:images`. **7 empreendimentos com imagens reais** (Follow Savassi, Torres da Lagoa, Viver Mais, Denver, Gutierrez, Golden Ville, Residenziale) — 53 `.webp` ~15 MB (hoje: faixas alta/compacta e entrega AVIF, ver v4 e v5)
- ✅ **12º empreendimento** cadastrado (Residenziale Colonnello Figueiredo, Nova Lima/MG — do site atual; **pronto para morar**). Catálogo/SSG agora com 12 empreendimentos
- ✅ Galeria **diversificada por contexto** (abas Externa / Apartamento / Plantas / Obras). **Simplificada na revisão v2** para `imagens · planta · obra` — Externa e Apartamento viravam duas abas quase idênticas
- ✅ `updatedAt` opcional no progresso (o cliente descartou a data na v4)
- ✅ **Conteúdo institucional (Fase C2)** — Quem Somos + Engenharia reconstruídas com copy verbatim do site atual + material da empresa; 11 imagens institucionais otimizadas (`public/quem-somos/*`, `public/engenharia/*`, keyword `institucional` no pipeline); Home `InstitutionalIntro` grounded. Lacunas restantes rotuladas TODO (ver `docs/CONTENT-GAPS.md §3`)
- ✅ Verificação: 232 testes · cobertura 98%+/91% · typecheck/lint/build (**25 páginas**) ok
- ✅ `interface-review` — skills `better-*` de domínio **instaladas** (ver `skills-lock.json`) e a revisão formal foi executada na Home v2 e na revisão v2 (ver blocos abaixo)

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
- ✅ **Seção Grupo Natus** (`AboutNatus`, substitui `InstitutionalIntro`) — copy real do cliente e os 3 números agora reais (10 anos · 100 mil m² · +1.500, revisto para +500 na v3), empilhados à direita, com selo de ícone em navy, número em destaque e rótulo abaixo (referência: Pro Domo). Os mesmos números preencheram o `STATS` de `/quem-somos`, que estava em `TODO: CONTENT REQUIRED`.
- 🔔 Pendente do cliente: vídeo/GIF do hero (tipologia, imagens do Solar e uso da marca MCMV resolvidos na v3–v4).

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
- ~~Provedor de email (FR11)~~ — decidido (v5): Resend via `fetch`; destino e remetente no `.env`. Falta verificar o domínio `natusgrupo.com.br` no Resend para o remetente `no-reply@`.
- ~~Supabase~~ — decidido (v5): só `@supabase/supabase-js` no servidor, para `site_leads` e `site_contacts`, sem auth e sem `@supabase/ssr`. O painel admin (Gate C) segue fora.
- ~~Leads → CRM~~ — decidido (v5): CV CRM, cria só o que não existe (`lib/crm/cvcrm.ts`). A UTM fica só no banco: no CRM o lead entra como "WebSite", sem mídia, para não criar mídias novas lá.
- ~~Google Maps embed vs. API~~ — decidido: embed sem chave; JS API com o pin da Natus quando houver chave + Map ID (`docs/google-maps.md`), sempre atrás do consentimento.
- ~~Conteúdo e status dos 11 empreendimentos~~ — confirmados pelo cliente (v3 e v4); pendências de conteúdo em `docs/CONTENT-GAPS.md`.
