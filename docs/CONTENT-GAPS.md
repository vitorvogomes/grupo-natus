# 🔔 Lacunas de conteúdo — o que preciso da empresa

> Documento único (Story 2.2). O site já roda com os dados confirmados + placeholders `TODO: CONTENT REQUIRED` claramente rotulados. **Nada aqui bloqueia o desenvolvimento** — sigo construindo com mock; ao receber o material real, substituo sem retrabalho.
> **Regra:** nada é inventado. Enquanto não houver fonte confiável, o campo aparece como TODO/mock rotulado.

## 0. Validação geral (rápida, mas importante)
- [x] **Nomes e status** dos 11 empreendimentos confirmados pelo cliente na revisão v3 (2026-10-11). Vista do Lago saiu do portfólio.
- [x] **Contatos institucionais** confirmados pelo cliente (2026-10-17): WhatsApp (31) 98466-3280 · Tel (31) 98466-3280 · contato@natusgrupo.com.br · Av. Getúlio Vargas, 1621 — Savassi, BH · Seg–Sex 09–19h.

## 1. Por empreendimento (11) — revisão v3 (2026-10-11)

Status novos: **Lançamento** · **Em construção** · **Pronto para morar** (a página mostra o que houver de material; estágio de obra só nos dois primeiros) · **Breve lançamento** (seção mínima com a foto padrão). A fase de vendas (pré-lançamento · últimas unidades · 100% vendido) não é status: é a faixa do card (`salesBand`).

| # | Empreendimento | Bairro · Cidade/UF | Status | Faixa do card | MCMV | Material |
|---|---|---|---|---|---|---|
| 1 | Follow Savassi | Savassi · BH/MG | Em construção | Últimas unidades | — | completo (fotos da obra pendentes) |
| 2 | Solar Manilha | Manilha · Itaboraí/RJ | Lançamento | Pré-lançamento | ✔ | completo (34 imagens; 13 renders v2 de 5504 px, os demais de 1448–2111 px — ver §5) |
| 3 | Golden Ville Residence | Maria Paula · **Niterói**/RJ | Em construção | — | ✔ | descrição + imagens (fotos da obra pendentes) |
| 4 | Viver Mais | Itaboraí/RJ | Pronto para morar | 100% vendido | ✔ | descrição + imagens |
| 5 | Residencial Denver | Santa Lúcia · BH/MG | Pronto para morar | 100% vendido | — | descrição + imagens |
| 6 | Torres da Lagoa | Lagoa Santa/MG | Pronto para morar | 100% vendido | ✔ | descrição + imagens |
| 7 | Residenziale Colonnello Figueiredo | Pau Pombo · Nova Lima/MG | Pronto para morar | 100% vendido | — | descrição + imagens |
| 8 | Mirante Gutierrez | BH/MG | Breve lançamento | — | — | mínimo (maquetes guardadas em `public/`) |
| 9 | One Studios | Niterói/RJ | Breve lançamento | — | — | mínimo |
| 10 | Sunset Ville Residence | BH/MG | Breve lançamento | — | ✔ | mínimo |
| 11 | Royal Ville Residence | Vespasiano/MG | Breve lançamento | — | ✔ | mínimo |

- [x] **Descrições** (resumo da página) dos 7 com página: texto do cliente, verbatim, um item por linha. Corrigido um typo no Solar ("Terreno de com área" → "Terreno com área").
- [x] **Localização**: os 7 com página têm lat/lng, tirados dos links de mapa enviados. Os dois links `share.google` (Denver e Residenziale) abrem uma busca, não um place; as coordenadas e os endereços (R. Denver, 134; R. Manoel Moreira Silva, 70) vieram dessa busca no Maps. Pins conferidos pelo cliente (2026-10-17). Endereços do Golden Ville (R. Frederico Malesherbes Figueredo, Maria Paula) e do Solar Manilha (R. Carlota Maria do Amor Divino, Loteamento Santo Antônio, CEP 24856-500) informados pelo cliente em 2026-10-17. Grafia "Figueredo" mantida a pedido do cliente (2026-10-17).
- [ ] 🔔 **Chaves do Google Maps** (pin da Natus): passo a passo em [`docs/google-maps.md`](google-maps.md). Sem elas, o embed público mostra o pin vermelho do Google.
- [ ] **Diferenciais agrupados** (accordion): só os dois lançamentos têm. Nas páginas reduzidas a seção não aparece (por desenho).
- [x] **Breve lançamentos**: seção reduzida aprovada para o MVP (2026-10-17). Descrição, imagens e localização entram quando houver material.
- [x] **Tipologia** (faceta de busca): Viver Mais, Gutierrez e Sunset Ville = apartamento (cliente, 2026-10-17). Os 11 têm tipo.

## 2. Progresso das obras

Etapas oficiais (v3): **Fundação · Estrutura · Alvenaria · Acabamento interno · Acabamento externo**. Etapas em 0% não aparecem. A seção existe em Lançamento e Em construção.

- [x] **Percentuais informados pelo cliente**: Follow Savassi com Fundação 100% · Estrutura 100% · Alvenaria 90% · Acabamento interno 60% · Acabamento externo 50% (total 70%); Golden Ville com Fundação 70% (total 7%), aprovado. **Solar Manilha sem estágio de obra** (2026-10-17).
- [ ] **Fotos da obra** do Follow Savassi e do Golden Ville. Sem elas a seção mostra só os percentuais (o painel de canteiro aparece quando houver fotos).
- [x] ~~**Data ("última atualização")** e periodicidade~~ — descartado pelo cliente (2026-10-17). O campo `updatedAt` segue opcional no modelo: sem ele, a data não aparece.

## 3. Páginas institucionais (Epic 6)

**Construídas com conteúdo real do site atual + material da empresa** (`img/Quem Somos`, `img/Servico -*`). O que ficou grounded e o que segue TODO:

- [x] **Quem Somos** (`/quem-somos`) — texto do cliente na revisão v3 (2026-10-11): subtítulo, abertura em 3 parágrafos, empresas (Aliatto/Oasi), valores ("Parceria" no lugar de "Qualidade certificada") e **Certificações** (ISO 9001:2015 + **PBQP-H · SiAC Nível A**, logo em `public/quem-somos/pbqp-h.webp`). Na v4 (2026-10-17) a contagem saiu (frase fixa do cliente: "Hoje atuamos entre Belo Horizonte, região metropolitana e Leste Fluminense…"), a seção Empresas do grupo foi removida e o CTA ficou só com a logo da Natus.
- [x] **Serviços de Engenharia** (`/engenharia`): **obras por administração** (3 categorias reais do site: **Casa de alto padrão (Alphaville)**, **Condomínio (Avenida)**, **Galpão comercial**) com fotos reais otimizadas em `public/engenharia/`.
- [x] **Home**: seção `AboutNatus` com a copy institucional **fornecida pelo cliente** (2026-09-30) — "Nascemos em 2016…" + "É assim que a essência do novo morar sai do papel". A frase "Uma holding à frente da ALIATTO…" saiu na v3. Desde a v4 o site fala em nome do Grupo Natus: Aliatto/Oasi só aparecem na foto da recepção (Quem Somos).
- [x] **Números institucionais confirmados pelo cliente** (2026-09-30; unidades revistas em 2026-10-11): **10 anos** de experiência, **100 mil m²** de área construída, **+500 unidades** entregues. Exibidos na Home (`features/home/AboutNatus.tsx`) e em `/quem-somos` — **manter os dois em sincronia**. O "10" é literal, não calculado: revisar em 2027.
- [x] **Ano de fundação (2016) confirmado pelo cliente** na copy enviada.
- [x] **Seção "Nossa história" removida** de `/quem-somos` (2026-10-01, a pedido do cliente): era o único `TODO: CONTENT REQUIRED` visível da página. A narrativa de abertura continua na Home (`AboutNatus`, "Nascemos em 2016…"). Se a trajetória completa chegar, a seção volta com conteúdo.
- [x] **Engenharia** (v3; v4): o resumo (`ENGINEERING_SUMMARY`), os valores de execução e as certificações vêm de `features/institutional/content.ts`. Na v4 o cliente tirou a Oasi da página (eyebrow "Grupo Natus", "executamos obras por administração"); o tagline Aliatto/Oasi saiu.
- [ ] **Engenharia**: copy descritiva de cada obra (o site só tem o título "Obra por administração").
- [x] **Selo SAS/ISO 9001** (OCS0018, SAS Certificadora): escopo e validade confirmados pelo cliente (2026-10-17).

## 4. Conversão (Epic 5)
- [x] **Frase da seção MCMV** — mantida a pedido do cliente (2026-10-17): "o sonho de conquistar o seu próprio **Natus** fica mais próximo" (texto enviado por você) não fecha gramaticalmente — "conquistar um Natus" não se diz — e repete a construção "o seu próprio Novolar" da referência. Sugestão: "o seu próprio lar". Não alterei por ser copy sua.
- [x] **Enquadramento MCMV por empreendimento** (campo `mcmv`), lista do cliente na v3: **Torres da Lagoa, Viver Mais, Golden Ville, Solar Manilha, Sunset Ville e Royal Ville**. A seção do programa aparece entre "Quer saber mais?" e "Explore nossos empreendimentos", e o selo entra junto do status no card e no resumo.
- [x] **Marca Minha Casa Minha Vida** — direito de uso, empreendimentos enquadrados e redação dos benefícios confirmados pelo cliente (2026-10-17). Histórico: confirmar o **direito de uso** da marca federal no site e **quais empreendimentos estão de fato enquadrados** no programa. A seção da Home exibe a marca e um claim sobre taxas — ambos sugerem credenciamento. **Os rótulos dos 3 benefícios foram reescritos** (os originais eram idênticos aos da referência Novolar): o claim do cliente "As menores taxas de juros" virou "As menores taxas do mercado **para quem se enquadra** no Minha Casa, Minha Vida", que qualifica a afirmação em vez de deixá-la absoluta. Confirmar a redação com a empresa.
- [x] **Imagens do Solar Manilha** chegaram (34 arquivos, 77 MB → 7,7 MB). Com a v3, a ordem da Home vem do status: lançamentos primeiro. `FEATURED_SLUGS` saiu.
- [x] **Negocie seu Terreno**: campos confirmados pelo cliente (2026-10-17): nome, telefone, e-mail, localização, área, tipo e observações.
- [x] **Envio de e-mail** (v5, 2026-10-20): Resend; destino `LEADS_EMAIL_TO` no `.env` (dev: caixa pessoal do desenvolvedor; **produção: marketing@natusgrupo.com.br**).
- [ ] 🔔 **Domínio no Resend**: verificar `natusgrupo.com.br` (registros SPF/DKIM no DNS) para enviar como `no-reply@natusgrupo.com.br`. Até lá, `LEADS_EMAIL_FROM` = `onboarding@resend.dev`, que só entrega para o dono da conta Resend. **Bloqueia a publicação.**
- [x] **CV CRM — ID de cada empreendimento** (`crmId` no seed, 2026-10-20). A API lista só 3 empreendimentos, com os mesmos nomes do site: Golden Ville = 2, Follow = 3, Solar = 4. Os outros entram no CRM sem empreendimento até serem cadastrados lá; quando forem, é só pôr o `crmId` no seed.
- [ ] 🔔 **Golden Ville — cidade**: o CRM cadastra o empreendimento em **São Gonçalo/RJ**; o site diz **Niterói**. Confirmar com o cliente qual é a correta.
- [x] **Supabase**: as duas migrações (`site_leads`, `site_contacts`) aplicadas no SQL Editor e testadas de ponta a ponta (2026-10-20); a chave pública não lê nem grava nelas.
- [ ] 🔔 **Hospedagem**: o proxy precisa sobrescrever `x-real-ip` com o IP do visitante (a Vercel faz isso; num nginx, `proxy_set_header X-Real-IP $remote_addr`). Sem isso, o limite de envios por IP pode ser contornado.
- [ ] 🔔 **Resend gratuito = 100 e-mails/dia** (3.000/mês). Todo lead fica no banco, então estourar não perde nada; os sem aviso ficam com `email_enviado = false`. Se o volume crescer, plano pago ou e-mail só para Contato/Terreno.
- [ ] **Retenção (LGPD)**: definir por quanto tempo os leads ficam no banco (a política diz "pelo tempo necessário"); depois, apagar ou anonimizar.

## 5. Mídia
- [x] Direitos de uso das imagens em `img/` confirmados pelo cliente (2026-10-17) e o mapeamento arquivo → empreendimento (pastas já atribuídas: Follow Savassi, Gutierrez, Golden Ville).
- [x] **Pipeline de otimização** (`npm run optimize:images`, `scripts/optimize-images.mjs`): originais em `img/`, WEBP em `public/` (o site entrega em AVIF). Mapeamento arquivo → saída no `JOBS`. Os 7 empreendimentos com página têm imagens reais.
- [ ] **Sem foto** (breve lançamento, por desenho usam `public/empreendimentos/breve-lancamento.webp`, gerado de `img/breve-lancamento.png`): One Studios, Royal Ville, Sunset Ville e Mirante Gutierrez. Este último tem 6 maquetes guardadas, fora do dado.
- [ ] **Solar Manilha, fotos fora da remessa v2** (limite da fonte em telas retina, densidade 0,7×): os 15 internos de 1536 px, a implantação, a vista aérea, as duas plantas, o quiosque com academia, o bicicletário e o redário com a mulher lendo. Em tela comum estão nítidas; uma versão de ≥ 2560 px as deixaria iguais às da v2.
- [ ] **Golden Ville**: a fachada (capa do hero) tem 1688 px; em tela retina o hero pede 2880. Se houver o render em resolução maior, substituir.
- [ ] **Viver Mais**: a foto de lazer (card) tem 1024 px.
- [ ] Revisar qualidade dos assets do **Residencial Denver** (massings simples/baixa resolução na origem) — substituir por renders/fotos melhores se a empresa fornecer.
- [x] **Home v2**: `public/home/familia-mcmv.webp` (3,1 MB → 555 KB, lado maior 2560) e `public/home/minha-casa-minha-vida-logo.png` (logo oficial do programa, fornecido pelo cliente). Originais versionados em `img/home/`.
- [x] **Hero da Home**: fachada noturna do Follow Savassi (render retrato 3071×3840 num hero em paisagem). O enquadramento vem do `object-position: center 75%` em `features/home/Hero.tsx`, que fixa a faixa visível na entrada; centralizado mostraria só parede. Trocar a imagem = 1 linha em `SINGLES` (`scripts/optimize-images.mjs`).
- [ ] **Vídeo/GIF para o hero**: o cliente pediu "imagem/gif em destaque" e **não há nenhum asset animado no repo** (zero `.mp4/.webm/.gif`). Enviar um MP4/WebM de 6–10 s (mudo, em loop) e o hero passa a `<video>` com `poster` — o layout já está pronto para isso.
- [x] **Engenharia**: 3 fotos que estavam em `img/` sem nunca chegar ao site entraram no pipeline (2 da casa de alto padrão, 1 do interior do galpão). As galerias por obra passaram a 7 · 2 · 3.
- [ ] **Galpão/condomínio**: 2 e 3 fotos é pouco para uma galeria — enviar mais se houver.
- [x] **Favicon**: o site não tinha nenhum. Agora usa o símbolo oficial (`app/icon.png`, gerado de `img/LOGOS/Favicon/favicon-natus-beige.png` sobre o navy da marca).
- [ ] Vídeos/panorâmicas, se houver. A galeria já prevê uma aba de vídeo — falta o arquivo.

## 6. Navegação — Header/Footer (B5)
- [x] **Redes sociais** (2026-10-17): Instagram, Facebook e LinkedIn no rodapé e no `sameAs` do JSON-LD (`SOCIAL` em `lib/site.ts`).
- [x] **CNPJ** 24.353.357/0001-11 enviado pelo cliente (2026-10-17), no rodapé e na política.
- [ ] 🔔 **Razão social** do CNPJ: o registro público o associa a "Aliatto Emp. Imob. Ltda". Confirmar qual razão social publicar (rodapé, política e o `legalName` do JSON-LD). Até lá o JSON-LD não publica o CNPJ (`taxID`).
- [x] ~~**CRECI**~~ — descartado pelo cliente (2026-10-17); o campo saiu de `LEGAL`.
- [x] **Política de Privacidade** e **consentimento de cookies** (2026-10-17): `/politica-de-privacidade`, banner e preferências no rodapé. Sem aceite, os mapas do Google não carregam.
- [ ] 🔔 **Revisão jurídica da política**: o texto foi redigido a partir do que o site faz. Faltam razão social, encarregado (DPO), prazo de retenção definido e o nome do provedor de e-mail. Ao adicionar GA4/Pixel/Ads, criar a categoria "Análise e marketing" no consentimento e atualizar a política.
- [ ] **Botão fixo do header** (canto superior direito, em todas as páginas): hoje diz "Falar com consultor" e abre o WhatsApp (31) 98466-3280. Confirmar com o cliente o texto e o destino (WhatsApp, telefone ou página de contato).
> Enquanto não confirmado, cada item entra rotulado como `TODO: CONTENT REQUIRED` (nada inventado).
