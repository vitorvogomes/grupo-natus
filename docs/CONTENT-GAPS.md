# 🔔 Lacunas de conteúdo — o que preciso da empresa

> Documento único (Story 2.2). O site já roda com os dados confirmados + placeholders `TODO: CONTENT REQUIRED` claramente rotulados. **Nada aqui bloqueia o desenvolvimento** — sigo construindo com mock; ao receber o material real, substituo sem retrabalho.
> **Regra:** nada é inventado. Enquanto não houver fonte confiável, o campo aparece como TODO/mock rotulado.

## 0. Validação geral (rápida, mas importante)
- [x] **Nomes e status** dos 11 empreendimentos confirmados pelo cliente na revisão v3 (2026-10-11). Vista do Lago saiu do portfólio.
- [ ] Confirmar **contatos institucionais**: WhatsApp (31) 98466-3280 · Tel (31) 98466-3280 · contato@natusgrupo.com.br · Av. Getúlio Vargas, 1621 — Savassi, BH · Seg–Sex 09–19h.

## 1. Por empreendimento (11) — revisão v3 (2026-10-11)

Status novos: **Lançamento** (página completa, destaque) · **Em construção** e **Pronto para morar** (página reduzida) · **Breve lançamento** (seção mínima com a foto padrão). **100% vendido** é marca sobre "pronto" (faixa só no card), não status.

| # | Empreendimento | Bairro · Cidade/UF | Status | 100% vendido | MCMV | Material |
|---|---|---|---|---|---|---|
| 1 | Follow Savassi | Savassi · BH/MG | Lançamento | — | — | completo |
| 2 | Solar Manilha | Manilha · Itaboraí/RJ | Lançamento | — | ✔ | completo (34 imagens; fontes de 1448–2095 px — enviar versões maiores, se houver) |
| 3 | Golden Ville Residence | Maria Paula · **Niterói**/RJ | Em construção | — | ✔ | descrição + imagens |
| 4 | Viver Mais | Itaboraí/RJ | Pronto para morar | ✔ | ✔ | descrição + imagens |
| 5 | Residencial Denver | Santa Lúcia · BH/MG | Pronto para morar | ✔ | — | descrição + imagens |
| 6 | Torres da Lagoa | Lagoa Santa/MG | Pronto para morar | ✔ | ✔ | descrição + imagens |
| 7 | Residenziale Colonnello Figueiredo | Pau Pombo · Nova Lima/MG | Pronto para morar | ✔ | — | descrição + imagens |
| 8 | Gutierrez | BH/MG | Breve lançamento | — | — | mínimo (maquetes guardadas em `public/`) |
| 9 | One Studios | Niterói/RJ | Breve lançamento | — | — | mínimo |
| 10 | Sunset Ville Residence | BH/MG | Breve lançamento | — | ✔ | mínimo |
| 11 | Royal Ville Residence | Vespasiano/MG | Breve lançamento | — | ✔ | mínimo |

- [x] **Descrições** (resumo da página) dos 7 com página: texto do cliente, verbatim, um item por linha. Corrigido um typo no Solar ("Terreno de com área" → "Terreno com área").
- [x] **Localização**: os 7 com página têm lat/lng, tirados dos links de mapa enviados. Os dois links `share.google` (Denver e Residenziale) abrem uma busca, não um place; as coordenadas e os endereços (R. Denver, 134; R. Manoel Moreira Silva, 70) vieram dessa busca no Maps. **Conferir os dois pins.** Golden Ville e Solar Manilha não têm endereço de rua: o mapa usa as coordenadas.
- [ ] 🔔 **Chaves do Google Maps** (pin da Natus): passo a passo em [`docs/google-maps.md`](google-maps.md). Sem elas, o embed público mostra o pin vermelho do Google.
- [ ] **Diferenciais agrupados** (accordion): só os dois lançamentos têm. Nas páginas reduzidas a seção não aparece (por desenho).
- [ ] **Breve lançamentos**: material quando houver (descrição, imagens, localização).
- [ ] **Tipologia** (faceta de busca) ainda sem evidência: **Viver Mais**, **Gutierrez** e **Sunset Ville**. Solar Manilha = apartamento (planta "Apartamento Tipo"); Denver passou de apartamento para **studio** ("14 studios de 35 m²").

## 2. Progresso das obras

Etapas oficiais (v3): **Fundação · Estrutura · Alvenaria · Acabamento interno · Acabamento externo**. Etapas em 0% não aparecem. A seção existe em Lançamento e Em construção.

- [x] **Percentuais informados pelo cliente** (2026-10-11): Follow Savassi e Solar Manilha com Fundação 99% · Estrutura 100% · Alvenaria 90% · Acabamento interno 60% · Acabamento externo 50% (total 70%); Golden Ville com Fundação 70% (total 7%). Sem rótulo de "ilustrativos".
- [ ] **Data ("última atualização")** e **quem atualiza / periodicidade**.

## 3. Páginas institucionais (Epic 6)

**Construídas com conteúdo real do site atual + material da empresa** (`img/Quem Somos`, `img/Servico -*`). O que ficou grounded e o que segue TODO:

- [x] **Quem Somos** (`/quem-somos`) — texto do cliente na revisão v3 (2026-10-11): subtítulo, abertura em 3 parágrafos, empresas (Aliatto/Oasi), valores ("Parceria" no lugar de "Qualidade certificada") e **Certificações** (ISO 9001:2015 + **PBQP-H · SiAC Nível A**, logo em `public/quem-somos/pbqp-h.webp`). A abertura diz "**4** empreendimentos entregues e **7** em desenvolvimento" (o texto enviado dizia 3 e 8; ajustado ao portfólio com o cliente). Mudou o portfólio, revise a frase.
- [x] **Serviços de Engenharia** (`/engenharia`): OASI Engenharia · **obras por administração** (3 categorias reais do site: **Casa de alto padrão (Alphaville)**, **Condomínio (Avenida)**, **Galpão comercial**) com fotos reais otimizadas em `public/engenharia/`.
- [x] **Home**: seção `AboutNatus` com a copy institucional **fornecida pelo cliente** (2026-09-30) — "Nascemos em 2016…" + "É assim que a essência do novo morar sai do papel". A frase "Uma holding à frente da ALIATTO…" saiu na v3; as empresas ficam em Quem Somos.
- [x] **Números institucionais confirmados pelo cliente** (2026-09-30; unidades revistas em 2026-10-11): **10 anos** de experiência, **100 mil m²** de área construída, **+500 unidades** entregues. Exibidos na Home (`features/home/AboutNatus.tsx`) e em `/quem-somos` — **manter os dois em sincronia**. O "10" é literal, não calculado: revisar em 2027.
- [x] **Ano de fundação (2016) confirmado pelo cliente** na copy enviada.
- [x] **Seção "Nossa história" removida** de `/quem-somos` (2026-10-01, a pedido do cliente): era o único `TODO: CONTENT REQUIRED` visível da página. A narrativa de abertura continua na Home (`AboutNatus`, "Nascemos em 2016…"). Se a trajetória completa chegar, a seção volta com conteúdo.
- [x] **Engenharia** (v3): o texto da Oasi, os valores de execução e as certificações vêm do conteúdo de Quem Somos (`features/institutional/content.ts`). O card "Capacidade técnica" com TODO saiu.
- [ ] **Engenharia**: copy descritiva de cada obra (o site só tem o título "Obra por administração").
- [ ] **Selo SAS/ISO 9001** (OCS0018, SAS Certificadora): confirmar escopo/validade do certificado com o cliente antes de destacar como vigente.

## 4. Conversão (Epic 5)
- [ ] **Frase da seção MCMV**: "o sonho de conquistar o seu próprio **Natus** fica mais próximo" (texto enviado por você) não fecha gramaticalmente — "conquistar um Natus" não se diz — e repete a construção "o seu próprio Novolar" da referência. Sugestão: "o seu próprio lar". Não alterei por ser copy sua.
- [x] **Enquadramento MCMV por empreendimento** (campo `mcmv`), lista do cliente na v3: **Torres da Lagoa, Viver Mais, Golden Ville, Solar Manilha, Sunset Ville e Royal Ville**. A seção do programa aparece entre "Quer saber mais?" e "Explore nossos empreendimentos", e o selo entra junto do status no card e no resumo.
- [ ] **Marca Minha Casa Minha Vida**: confirmar o **direito de uso** da marca federal no site e **quais empreendimentos estão de fato enquadrados** no programa. A seção da Home exibe a marca e um claim sobre taxas — ambos sugerem credenciamento. **Os rótulos dos 3 benefícios foram reescritos** (os originais eram idênticos aos da referência Novolar): o claim do cliente "As menores taxas de juros" virou "As menores taxas do mercado **para quem se enquadra** no Minha Casa, Minha Vida", que qualifica a afirmação em vez de deixá-la absoluta. Confirmar a redação com a empresa.
- [x] **Imagens do Solar Manilha** chegaram (34 arquivos, 77 MB → 7,7 MB). Com a v3, a ordem da Home vem do status: lançamentos primeiro. `FEATURED_SLUGS` saiu.
- [ ] **Negocie seu Terreno**: confirmar os **campos exatos** do formulário (além de nome/contato/localização/área/tipo/observações).
- [ ] **Envio de e-mail**: definir **provedor** (ex.: Resend) e para **qual caixa** os leads/contatos vão. O valor do secret será fornecido por você e eu edito `.env` sem exibi-lo.

## 5. Mídia
- [ ] Confirmar direitos de uso das imagens em `img/` e o mapeamento arquivo → empreendimento (pastas já atribuídas: Follow Savassi, Gutierrez, Golden Ville).
- [x] **Pipeline de otimização** criado: `scripts/optimize-images.mjs` (sharp — resize + WEBP ~80%), `npm run optimize:images [slug]`. Lê os originais em `img/` e grava em `public/empreendimentos/<slug>/`. **Follow Savassi (piloto)** processado: 72 MB → **4 MB** (−90–97%/imagem), servindo `.webp`. TIF de 69 MB fica de fora.
- [x] Replicação concluída: **7 empreendimentos com imagens reais** otimizadas (Follow Savassi, Torres da Lagoa, Viver Mais, Residencial Denver, Gutierrez, Golden Ville, Residenziale) — total `public/empreendimentos/` ~15 MB (53 `.webp`). Mapeamento no `JOBS` de `scripts/optimize-images.mjs`. Identidade do Residenziale **confirmada pelo cliente** (12º empreendimento).
- [ ] **Sem foto** (breve lançamento, por desenho usam `public/empreendimentos/breve-lancamento.webp`, gerado de `img/breve-lancamento.png`): One Studios, Royal Ville, Sunset Ville e Gutierrez. Este último tem 6 maquetes guardadas, fora do dado.
- [ ] Revisar qualidade dos assets do **Residencial Denver** (massings simples/baixa resolução na origem) — substituir por renders/fotos melhores se a empresa fornecer.
- [x] **Home v2**: `public/home/familia-mcmv.webp` (3,1 MB → 555 KB, lado maior 2560) e `public/home/minha-casa-minha-vida-logo.png` (logo oficial do programa, fornecido pelo cliente). Originais versionados em `img/home/`.
- [x] **Hero da Home**: fachada noturna do Follow Savassi (render retrato 3071×3840 num hero em paisagem). O enquadramento vem do `object-position: center 75%` em `features/home/Hero.tsx`, que fixa a faixa visível na entrada; centralizado mostraria só parede. Trocar a imagem = 1 linha em `SINGLES` (`scripts/optimize-images.mjs`).
- [ ] **Vídeo/GIF para o hero**: o cliente pediu "imagem/gif em destaque" e **não há nenhum asset animado no repo** (zero `.mp4/.webm/.gif`). Enviar um MP4/WebM de 6–10 s (mudo, em loop) e o hero passa a `<video>` com `poster` — o layout já está pronto para isso.
- [x] **Engenharia**: 3 fotos que estavam em `img/` sem nunca chegar ao site entraram no pipeline (2 da casa de alto padrão, 1 do interior do galpão). As galerias por obra passaram a 7 · 2 · 3.
- [ ] **Galpão/condomínio**: 2 e 3 fotos é pouco para uma galeria — enviar mais se houver.
- [ ] **Favicon**: o site não tinha nenhum. Agora usa o símbolo oficial (`app/icon.png`, gerado de `img/LOGOS/Favicon/favicon-natus-beige.png` sobre o navy da marca).
- [ ] Vídeos/panorâmicas, se houver. A galeria já prevê uma aba de vídeo — falta o arquivo.

## 6. Navegação — Header/Footer (B5)
- [ ] **Redes sociais** do Grupo Natus (Instagram / Facebook / LinkedIn / YouTube): handles e URLs — **NÃO constam** no site atual.
- [ ] **CNPJ** e **CRECI** (registro imobiliário) para o rodapé legal / sub-footer — **não constam** no site; registro público cita CNPJ 24.353.357/0001-11 (Aliatto Emp. Imob. Ltda), **a confirmar com o cliente** antes de publicar.
- [ ] **Selos/certificações** (se houver) e **links de políticas** (privacidade / termos de uso).
- [ ] Confirmar o texto do **CTA persistente** do header (ex.: "Falar com consultor"?) e o destino (WhatsApp já configurado).
> Enquanto não confirmado, cada item entra rotulado como `TODO: CONTENT REQUIRED` (nada inventado).
