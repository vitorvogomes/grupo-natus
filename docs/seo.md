# SEO, migração de URLs e marca: plano de execução

> **Estado em 2026-10-20 (v5):** a parte de código (§2 e §3.2) está feita; o que resta é fora do código (§3.1 completar com o Search Console, §3.3, §4). Itens feitos marcados com ✅.

Cada item diz **onde** mexer (arquivo, painel ou serviço) e **como saber que deu certo**. A ordem dos blocos é a de execução recomendada: a migração (§3) é o que mais pode custar ranking se for esquecida, e acontece no dia em que o site novo assumir o domínio.

> Levantamento de 2026-10-12, feito sobre o site atual (WordPress em `www.natusgrupo.com.br`) e sobre este repositório. Antes de executar, confira se nada mudou.

---

## 1. O que já existe no código

| Item | Onde | Estado |
|---|---|---|
| Sitemap | `app/sitemap.ts` (rotas de `STATIC_ROUTES` em `lib/site.ts` + um item por empreendimento) | ✅ |
| robots.txt | `app/robots.ts` | ✅ libera tudo; bloqueia `/theme-showcase` (404 em produção) e `/api/` |
| Metadados base | `app/layout.tsx`: `metadataBase`, `title.default` com descritor, template, OG/Twitter padrão, `themeColor` | ✅ |
| Metadados por página | `pageMetadata()` / `developmentMetadata()` em `features/seo/metadata.ts` | ✅ canônica + OG + Twitter em todas; teste de unicidade em `app/metadata.test.ts` |
| JSON-LD | `features/seo/jsonLd.tsx`: `Organization` (logo, sede, contato, `sameAs`), `WebSite` (home), `ApartmentComplex`/`Residence` (geo, capa, CEP), `BreadcrumbList` | ✅ falta só `legalName`/`taxID` (razão social) |
| Imagem de compartilhamento | `public/brand/og-grupo-natus.jpg` (padrão) e a capa no empreendimento | ✅ |
| 404 | `app/not-found.tsx` com links para empreendimentos e contato | ✅ |
| Redirects do WordPress | `content/redirects.ts` → `next.config.ts` (308); `npm run check:redirects` | ✅ 19 URLs; completar com o Search Console |
| Domínio | `SITE_URL` = `https://www.natusgrupo.com.br` (com `www`, como o Google indexa hoje) | ✅ decidido; "sem www → www" na hospedagem |

---

## 2. Melhorias no código

Ferramenta: carregue a skill **`nextjs-seo`** antes de mexer. Ela tem o checklist de auditoria e os padrões do App Router: metadata, imagens OG, JSON-LD e Core Web Vitals. A **`marketing:seo-audit`** serve para a revisão de conteúdo e palavras-chave.

### 2.1–2.4 Feito na v5 ✅
O que existe está na tabela do §1. As decisões que não aparecem no código:
- **Domínio**: `www.natusgrupo.com.br`, como o Google indexa hoje (evita uma migração extra). "Sem www → www" é configuração da hospedagem.
- **Catálogo filtrado** (`/empreendimentos?status=…`): a canônica é `/empreendimentos`, para os filtros não virarem páginas duplicadas.
- **Títulos**: a home leva nome + descritor ("Grupo Natus — Incorporadora e construtora em BH e no RJ"); o empreendimento é montado do dado ("{nome} — {tipo} em {bairro}, {cidade}/{UF}"); referência de ~50–60 caracteres no título e ~140–160 na descrição.
- **JSON-LD**: sem `subOrganization` (o site fala só em nome do Grupo Natus) e sem `offers` (não há preço). `legalName`/`taxID` entram quando a razão social do CNPJ for confirmada.
- **Breve lançamentos**: indexados, com descrição factual montada do dado.
- **Verificar** depois de publicar: `curl -s https://www.natusgrupo.com.br/empreendimentos/follow-savassi | grep canonical`; [Rich Results Test](https://search.google.com/test/rich-results) e [Schema Markup Validator](https://validator.schema.org/) numa URL de cada tipo; o depurador de compartilhamento do Facebook ou do LinkedIn.

### 2.5 Conteúdo (opcional, ganho de ranking)
1. **Texto por empreendimento**: um parágrafo autoral sobre a localização (`location.note`, que só o Follow tem) ajuda a ranquear por "apartamento em {bairro}".
2. **Links internos**: o "explore" e o catálogo já ligam tudo. Das institucionais, vale linkar Quem Somos → empreendimentos em destaque.

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

### 3.2 Implementação (código) ✅
`content/redirects.ts` é a tabela; o `next.config.ts` gera os `redirects()` (308, tratado pelo Google como 301). O teste garante que todo destino existe (slug ou rota estática), que não há cadeia e que as origens são únicas. Com `trailingSlash: false` o Next tira a barra antes: `/x/` → `/x` → destino (2 saltos, aceito pelo Google), então uma entrada cobre as duas formas.

Para acrescentar URLs (do Search Console): uma linha na tabela, e depois `npm run build && npm start` + `npm run check:redirects`, que confere 308 + `Location` e 200 no destino.

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
- **LGPD**: o banner de consentimento e a `/politica-de-privacidade` já existem (`features/consent/`). Ao entrar GA4 ou pixel, crie a categoria "Análise e marketing" em `lib/consent.ts`, carregue o script só com `useConsent()` e atualize a política.

---

## 5. "Grupo Natos" e a desambiguação da marca

Não há como controlar o ranking de outra empresa. O que funciona é dar ao Google sinais fortes e consistentes de que "Grupo Natus" é **esta** entidade:

1. **Perfil da Empresa no Google verificado** (§4.2). É o sinal mais forte para a busca pela marca.
2. **Título da home com nome e descritor** (§2.1–2.4). "Grupo Natus — Incorporadora e construtora em BH e no RJ" distingue mais que o nome sozinho.
3. **JSON-LD `Organization` completo** (§1): logo, endereço, área de atuação e `sameAs` para os perfis oficiais.
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
- [x] Domínio canônico decidido; `SITE_URL` ajustado
- [x] Títulos e descrições únicos em todas as rotas (com teste)
- [x] Imagem OG padrão e por empreendimento
- [x] JSON-LD completo (Organization, empreendimento, BreadcrumbList) — validar no Rich Results Test após publicar
- [x] Decisão sobre `noindex` dos breve lançamentos (indexados, descrição factual)
- [ ] Tabela de redirects completa — Wayback e home ao vivo ✅; falta o export do Search Console (e Screaming Frog, opcional). Testada contra o build ✅
- [ ] Search Console verificado por DNS e relatórios antigos exportados
- [ ] Perfil da Empresa no Google criado ou reivindicado

**No dia**
- [ ] Deploy no mesmo domínio
- [ ] Sitemap enviado; URLs-chave inspecionadas

**Nas 4–6 semanas seguintes**
- [ ] 404 e redirecionamentos no Search Console zerados
- [ ] Core Web Vitals no verde
- [ ] Links externos atualizados; avaliações no perfil do Google
