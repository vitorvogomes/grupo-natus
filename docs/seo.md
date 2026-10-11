# SEO, migração de URLs e marca: plano de execução

Plano para fazer depois. Cada item diz **onde** mexer (arquivo, painel ou serviço) e **como saber que deu certo**. A ordem dos blocos é a de execução recomendada: a migração (§3) é o que mais pode custar ranking se for esquecida, e acontece no dia em que o site novo assumir o domínio.

> Levantamento de 2026-10-12, feito sobre o site atual (WordPress em `www.natusgrupo.com.br`) e sobre este repositório. Antes de executar, confira se nada mudou.

---

## 1. O que já existe no código

| Item | Onde | Estado |
|---|---|---|
| Sitemap | `app/sitemap.ts` | Rotas estáticas e um item por empreendimento |
| robots.txt | `app/robots.ts` | Libera tudo; bloqueia `/theme-showcase` e `/api/` |
| Metadados base | `app/layout.tsx` (`metadataBase`, `title.template = "%s \| Grupo Natus"`, OG `pt_BR`) | Descrição padrão genérica |
| Metadados por página | `export const metadata` em cada `page.tsx`; `generateMetadata` em `app/empreendimentos/[slug]/page.tsx` | Título = nome; descrição = `summary` |
| URL canônica | `alternates.canonical` nas páginas de empreendimento | Ok |
| JSON-LD | `features/seo/jsonLd.tsx`: `Organization` (nome, url, areaServed) e `Residence` por empreendimento | Mínimo: sem logo, contato, `sameAs`, `geo` |
| Domínio | `SITE_URL` em `lib/site.ts` = `https://www.natusgrupo.com.br` | **A confirmar** (www ou sem www) |
| Imagens | `next/image`, WEBP via pipeline, alt em todas | Ok |
| Acessibilidade e semântica | landmarks, um `h1` por página, skip-link | Ok |

---

## 2. Melhorias no código

Ferramenta: carregue a skill **`nextjs-seo`** antes de começar. Ela tem o checklist de auditoria e os padrões do App Router: metadata, imagens OG, JSON-LD e Core Web Vitals. A **`marketing:seo-audit`** serve para a revisão de conteúdo e palavras-chave.

### 2.1 Domínio e canônicas
1. Decida o domínio canônico: `www.natusgrupo.com.br` (o atual) ou sem `www`. O Google indexa hoje com `www`; manter isso evita uma migração extra.
2. Ajuste `SITE_URL` em `lib/site.ts`. Sitemap, robots, `metadataBase`, canônicas e JSON-LD derivam dele.
3. Adicione `alternates.canonical` às páginas estáticas que ainda não têm: home, `/empreendimentos`, `/engenharia`, `/quem-somos`, `/contato`, `/negocie-seu-terreno`.
4. No catálogo `/empreendimentos?status=…&cidade=…`, aponte a canônica para `/empreendimentos` sem a query, para os filtros não virarem páginas duplicadas.
5. **Verificar**: `curl -s https://<domínio>/empreendimentos/follow-savassi | grep canonical` mostra a URL absoluta correta.

### 2.2 Títulos e descrições com intenção de busca
Hoje o Google exibe "Uma empresa mineira que atua em MG e RJ, incorpora e…" em quase todos os resultados, porque o site atual não tem descrição por página. Corrigir isso é o ganho mais rápido.

1. **Home** (`app/layout.tsx`, `title.default` e `description`): nome **com descritor**. Por exemplo:
   - Título: "Grupo Natus — Incorporadora e construtora em BH e no RJ"
   - Descrição: "Do Minha Casa Minha Vida ao alto luxo: empreendimentos em Belo Horizonte, região metropolitana e Leste Fluminense. Aliatto Incorporadora e Oasi Engenharia."
2. **Empreendimentos** (`generateMetadata` em `app/empreendimentos/[slug]/page.tsx`): monte o título com tipologia e praça, por exemplo "Follow Savassi — Apartamentos de 1 a 3 suítes na Savassi, BH". Duas formas de fazer:
   - preencher `seo.title`/`seo.description` no seed; hoje o `fromSeed` em `content/developments/data.ts` não mapeia `seo`, então é preciso adicionar ao `Seed`;
   - ou derivar `"{nome} — {tagline/feature} em {bairro}, {cidade}"` dos campos que já existem.
3. **Institucionais**: título e descrição próprios em `quem-somos`, `engenharia`, `contato` e `negocie-seu-terreno`, com a praça e o serviço ("Engenharia e execução de obras em BH | Oasi Engenharia").
4. Limites de referência: título com ~50–60 caracteres, descrição com ~140–160, sem repetir a mesma descrição em duas páginas.
5. **Verificar**: crie um teste que percorre as rotas e falha com título ou descrição duplicados.

### 2.3 Imagem de compartilhamento (Open Graph)
1. **Por empreendimento**: um `opengraph-image.tsx` em `app/empreendimentos/[slug]/`, ou o `seo.ogImage` apontando para a capa (`pickHeroImage`). O campo existe no tipo, mas o seed nunca o preenche.
2. **Site inteiro**: um `app/opengraph-image.png` (1200×630) com a marca, como padrão.
3. **Verificar**: cole a URL no depurador de compartilhamento do Facebook ou do LinkedIn, ou num grupo de WhatsApp.

### 2.4 Dados estruturados (JSON-LD), em `features/seo/jsonLd.tsx`
1. **Organization**, na home e no layout:
   - `logo` (URL absoluta de `public/brand/…`), `legalName` (quando o CNPJ for confirmado), `address` (Av. Getúlio Vargas, 1621), `telephone`, `email`;
   - `contactPoint`;
   - `sameAs` com as URLs dos perfis oficiais (Instagram, LinkedIn, perfil no Google). Depende de `docs/CONTENT-GAPS.md` §6;
   - `subOrganization` com a Aliatto Incorporadora e a Oasi Engenharia.
   - **Nunca** coloque o nome de um concorrente em `alternateName` (ver §5).
2. **Empreendimentos**: troque `Residence` por `ApartmentComplex` (ou `Residence` com `containsPlace`). Inclua:
   - `geo` (`GeoCoordinates` com `lat`/`lng`, já presentes nos dados);
   - `image` (capa, URL absoluta);
   - `address.neighborhood`;
   - um `offers` só se houver preço real.
3. **BreadcrumbList** nas páginas de empreendimento: Início › Empreendimentos › {nome}.
4. **WebSite** na home (nome do site). `SearchAction` só se a busca do site tiver URL própria.
5. **Verificar**: [Rich Results Test](https://search.google.com/test/rich-results) e [Schema Markup Validator](https://validator.schema.org/) em uma URL de cada tipo, com zero erros.

### 2.5 Conteúdo e indexação
1. **Breve lançamentos** (Gutierrez, One Studios, Sunset Ville, Royal Ville) são páginas com pouco texto. Decida entre:
   - (a) `robots: { index: false }` no `generateMetadata` quando `status === "breve_lancamento"`, até haver material;
   - (b) manter indexado e escrever um parágrafo real sobre o bairro e o produto.
   Com (a), a página sai do sitemap também (filtre em `app/sitemap.ts`).
2. **Texto por empreendimento**: um parágrafo autoral sobre a localização (o `location.note` já existe e só o Follow o tem) ajuda a ranquear por "apartamento em {bairro}".
3. **Links internos**: o "explore" e o catálogo já ligam tudo. Das institucionais, vale linkar Quem Somos → empreendimentos em destaque.

### 2.6 Desempenho (Core Web Vitals)
1. Rode o PageSpeed Insights na home, numa página de lançamento e em `/quem-somos`, no celular. Meta: LCP < 2,5 s, CLS < 0,1, INP < 200 ms.
2. Pontos já conhecidos:
   - o hero é o LCP (já tem `preload`);
   - o mapa carrega a API do Google quando existe chave. Carregar só quando a seção aparece economiza banda e cota (ver `docs/google-maps.md`);
   - as imagens grandes usam q90.
3. Depois de publicar, acompanhe o relatório *Core Web Vitals* do Search Console, que mede com dados reais de usuários.

---

## 3. Migração de URLs (evitar 404)

O site atual é WordPress, e **o sitemap dele está vazio**: `/sitemap.xml` lista só a home, e o `page-sitemap.xml` não tem nenhuma URL. Ele não serve como fonte. O levantamento abaixo juntou um rastreamento dos links da home e o histórico do Wayback Machine.

### 3.1 URLs antigas conhecidas → destino

| URL antiga (WordPress) | Destino no site novo | Observação |
|---|---|---|
| `/portfolio-item/follow-savassi/` | `/empreendimentos/follow-savassi` | |
| `/portfolio-item/golden-ville-residence/` | `/empreendimentos/golden-ville-residence` | |
| `/portfolio-item/torres-da-lagoa/` | `/empreendimentos/torres-da-lagoa` | |
| `/portfolio-item/residenziale-colonnello-figueiredo/` | `/empreendimentos/residenziale-colonnello-figueiredo` | |
| `/portfolio-item/residencial-denver-bh-mg/` | `/empreendimentos/residencial-denver` | só no Wayback |
| `/portfolio-item/residencial-viver-mais-itaborai-rj/` | `/empreendimentos/viver-mais` | só no Wayback |
| `/portfolio-item/residencial-viver-mais-itaborai-rj-2/` | `/empreendimentos/viver-mais` | versão atual |
| `/portfolio-item/avenida-condominio/` | `/engenharia` | obra por administração |
| `/portfolio-item/casa-alphaville/` | `/engenharia` | obra por administração |
| `/portfolio-item/galpao-comercial/` | `/engenharia` | obra por administração |
| `/portfolio-item/minha-casa-minha-vida-faixa-15/` | **decidir**: `/` (seção MCMV) ou `/empreendimentos?…` | |
| `/sitemap.html`, `/page-sitemap.html`, `/sitemap-misc.html` | `/` | páginas de sitemap do plugin |
| `/portfolio-item/` (arquivo, se existir) | `/empreendimentos` | confirmar no Search Console |
| Vista do Lago (slug a descobrir) | `/empreendimentos` | saiu do portfólio |

**Esta lista não está completa.** Antes de publicar, complete com:
1. **Search Console** (a fonte mais importante): exporte *Indexação → Páginas* (o que o Google conhece) e *Desempenho → Páginas* dos últimos 16 meses (o que recebe clique). Toda URL com clique precisa de destino.
2. **Screaming Frog** (grátis até 500 URLs) rodando no site atual, para pegar tudo que é alcançável por link: menus, rodapé, páginas de contato do WordPress.
3. **Wayback Machine**:
   ```
   curl -s "https://web.archive.org/cdx/search/cdx?url=natusgrupo.com.br/*&fl=original&collapse=urlkey&filter=statuscode:200"
   ```
4. A busca `site:natusgrupo.com.br` no Google.
5. URLs típicas de WordPress que o Google pode ter guardado: `/?p=123`, `/category/…`, `/tag/…`, `/author/…`, `/feed/`, `/wp-login.php`. Redirecione para `/` as que tiverem tráfego; o resto pode retornar 404/410.

### 3.2 Implementação (código)
1. Em `next.config.ts`, adicione `async redirects()` com `permanent: true` (308, tratado pelo Google como 301). Cubra as duas formas, com e sem barra final:
   ```ts
   { source: "/portfolio-item/follow-savassi", destination: "/empreendimentos/follow-savassi", permanent: true },
   { source: "/portfolio-item/follow-savassi/", destination: "/empreendimentos/follow-savassi", permanent: true },
   ```
   Ou com um parâmetro opcional: `source: "/portfolio-item/:slug/"`, mais um mapa explícito para os slugs que mudaram.
2. Mantenha a tabela num arquivo de dados (ex.: `content/redirects.ts`) e gere o `redirects()` a partir dele, com teste. O teste deve garantir que todo destino existe: é um slug de `getAllDevelopments()` ou uma rota estática.
3. Destino nunca é outra URL antiga (sem cadeias), e uma URL antiga nunca aponta para uma página `noindex`.
4. **Verificar antes de publicar**: um script que, contra o build local (`npm run build && npm start`), faz `curl -sI` em cada URL antiga e confere `308`/`301` com `Location` correto, e depois `200` no destino.

### 3.3 Dia da troca (fora do código)
1. Publique o site novo **no mesmo domínio**. Sem troca de domínio, a ferramenta "Mudança de endereço" do Search Console não se aplica.
2. Search Console: envie o novo `sitemap.xml` e inspecione 5–10 URLs (home, um lançamento, Quem Somos, duas URLs antigas redirecionadas).
3. Durante 4–6 semanas, acompanhe *Indexação → Páginas* (erros 404, "Página com redirecionamento", "Rastreada, mas não indexada") e corrija os destinos.
4. Mantenha os redirects por **pelo menos 12 meses**; na prática, para sempre (custo zero).
5. Peça a atualização dos links externos conhecidos (portais, parceiros, redes sociais, assinatura de e-mail) para as URLs novas.

---

## 4. Configurações fora do código

### 4.1 Google Search Console
1. Adicione uma propriedade do tipo **Domínio** (`natusgrupo.com.br`) e verifique por registro **TXT no DNS**. Ela cobre `www`, sem `www`, `http` e `https`.
2. Envie `https://www.natusgrupo.com.br/sitemap.xml`.
3. Antes da migração, exporte os relatórios (§3.1), que são a base dos redirects.
4. Associe ao GA4 (*Configurações → Associações*).

### 4.2 Perfil da Empresa no Google (Google Business Profile)
É o maior ganho para a busca pela marca e o que gera o painel lateral com mapa, telefone e avaliações.
1. Reivindique ou crie "Grupo Natus" em [business.google.com](https://business.google.com) com o endereço da sede (Av. Getúlio Vargas, 1621 — Savassi, BH). Verifique por vídeo ou carta.
2. Preencha com o padrão do site:
   - categoria principal "Incorporadora imobiliária" e secundária "Construtora";
   - horário (Seg–Sex 09–19h), telefone, site, descrição, logo, capa e fotos dos empreendimentos.
3. **Golden Ville Residence** já existe como local no Maps (o link enviado aponta para um *place*). Reivindique-o ou sugira correções, para que aponte para o site e não fique solto.
4. Peça avaliações a clientes de empreendimentos entregues (Viver Mais, Torres da Lagoa, Denver, Residenziale) e responda a todas.

### 4.3 Consistência de nome, endereço e telefone
Use o mesmo nome, endereço e telefone em todo lugar: site (`lib/site.ts` → `CONTACT`), perfil no Google, Instagram, LinkedIn, portais imobiliários (ZAP, VivaReal, OLX), Reclame Aqui. Divergência enfraquece o sinal de entidade.

### 4.4 Autoridade (links externos)
- Sites ou perfis da Aliatto e da Oasi linkando para o Grupo Natus, e vice-versa.
- Parceiros (Escon Engenharia no Torres da Lagoa, o escritório Estela Netto no Follow Savassi), imprensa local de BH, Niterói e Itaboraí, e associações (Sinduscon-MG, CBIC).
- Anúncios em portais imobiliários com link para a página do empreendimento.

### 4.5 Medição
- **GA4**: conversões nos cliques de WhatsApp e nos envios de formulário. O evento entra no código quando a decisão for tomada (consentimento LGPD, ver abaixo).
- **Search Console**: consultas, CTR e posição por página.
- **Bing Webmaster Tools**: importa a propriedade direto do Search Console.
- **LGPD**: se entrar GA4 ou pixel, use um banner de consentimento e atualize a política de privacidade (pendente em `docs/CONTENT-GAPS.md` §6).

---

## 5. "Grupo Natos" e a desambiguação da marca

Não há como controlar o ranking de outra empresa. O que funciona é dar ao Google sinais fortes e consistentes de que "Grupo Natus" é **esta** entidade:

1. **Perfil da Empresa no Google verificado** (§4.2). É o sinal mais forte para a busca pela marca.
2. **Título da home com nome e descritor** (§2.2). "Grupo Natus — Incorporadora e construtora em BH e no RJ" distingue mais que o nome sozinho.
3. **JSON-LD `Organization` completo** (§2.4): logo, endereço, área de atuação, subsidiárias e `sameAs` para os perfis oficiais.
4. **Mesmo nome, logo e link em todos os perfis** (§4.3), apontando para o site.
5. **Não** usar "Natos" em lugar nenhum do site: nem em texto, nem em `alternateName`, nem como palavra-chave. Isso associaria as duas entidades em vez de separá-las.
6. Se o concorrente aparecer acima em anúncios: uma campanha pequena de **Google Ads com a própria marca** ("Grupo Natus") protege a primeira posição a custo baixo.
7. Se houver confusão de marca de fato (clientes ligando para o lugar errado), verifique com o jurídico o registro de "Natus" no **INPI** e a classe de atividade. Isso foge do site.

---

## 6. Ferramentas e skills

| Para quê | Ferramenta |
|---|---|
| Auditoria e implementação no Next.js | skill **`nextjs-seo`** (instalada) |
| Revisão de conteúdo e palavras-chave | skill **`marketing:seo-audit`** (instalada) |
| Descobrir outras skills | `npx skills find seo` (via `find-skills`); avalie antes de instalar |
| Dados estruturados | Rich Results Test, Schema Markup Validator |
| Desempenho | PageSpeed Insights, Lighthouse (DevTools) |
| Rastreio e mapa de URLs | Screaming Frog, Wayback CDX, Search Console |
| Indexação e consultas | Google Search Console, Bing Webmaster Tools |

---

## 7. Checklist resumido

**Antes de publicar**
- [ ] Domínio canônico decidido; `SITE_URL` ajustado
- [ ] Títulos e descrições únicos em todas as rotas (com teste)
- [ ] Imagem OG padrão e por empreendimento
- [ ] JSON-LD completo e validado (Organization, empreendimento, BreadcrumbList)
- [ ] Decisão sobre `noindex` dos breve lançamentos
- [ ] Tabela de redirects completa (Search Console + Screaming Frog + Wayback) e testada contra o build
- [ ] Search Console verificado por DNS e relatórios antigos exportados
- [ ] Perfil da Empresa no Google criado ou reivindicado

**No dia**
- [ ] Deploy no mesmo domínio
- [ ] Sitemap enviado; URLs-chave inspecionadas

**Nas 4–6 semanas seguintes**
- [ ] 404 e redirecionamentos no Search Console zerados
- [ ] Core Web Vitals no verde
- [ ] Links externos atualizados; avaliações no perfil do Google
