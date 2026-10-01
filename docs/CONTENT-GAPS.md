# 🔔 Lacunas de conteúdo — o que preciso da empresa

> Documento único (Story 2.2). O site já roda com os dados confirmados + placeholders `TODO: CONTENT REQUIRED` claramente rotulados. **Nada aqui bloqueia o desenvolvimento** — sigo construindo com mock; ao receber o material real, substituo sem retrabalho.
> **Regra:** nada é inventado. Enquanto não houver fonte confiável, o campo aparece como TODO/mock rotulado.

## 0. Validação geral (rápida, mas importante)
- [ ] **Confirmar nomes e status** dos 11 empreendimentos (abaixo) — vieram do site atual, podem estar desatualizados.
- [ ] Confirmar **contatos institucionais**: WhatsApp (31) 98466-3280 · Tel (31) 98337-4122 · administrativo@natusgrupo.com.br · Av. Getúlio Vargas, 1621 — Savassi, BH · Seg–Sex 09–19h.

## 1. Por empreendimento (11)

Para **cada** um dos empreendimentos abaixo preciso de:
- **Resumo** (1–2 linhas) e **descrição** completa.
- **Imagens** (renders, plantas humanizadas, externas, hero) — e a **indicação de quais arquivos de `img/` pertencem a cada empreendimento** (hoje não há esse mapeamento).
- **Características/features** (ex.: nº de quartos, área, vagas, lazer, tipologia).
- **Localização precisa**: endereço, e idealmente lat/lng ou link do Google Maps.
- **Progresso da obra** (só para "Em construção"): % geral, etapas e data (ver §2).

| # | Empreendimento | Cidade/UF | Status (confirmar) | Destaque confirmado |
|---|---|---|---|---|
| 1 | Viver Mais | Itaboraí/RJ | Pronto | — |
| 2 | Residencial Denver | Belo Horizonte/MG | Pronto | — |
| 3 | Torres da Lagoa | Lagoa Santa/MG | Pronto | — |
| 4 | Follow Savassi | Belo Horizonte/MG | Em construção | — |
| 5 | Golden Ville Residence | São Gonçalo/RJ | Em construção | — |
| 6 | Solar Manilha | Itaboraí/RJ | Lançamento | 368 un. MCMV |
| 7 | One Studios | Niterói/RJ | Lançamento | 180 studios |
| 8 | Vista do Lago | Nova Lima/MG | Lançamento | 508 lotes |
| 9 | Sunset Ville Residence | Belo Horizonte/MG | Lançamento | 72 un. MCMV |
| 10 | Royal Ville Residence | Vespasiano/MG | Lançamento | 96 casas MCMV |
| 11 | Gutierrez | Belo Horizonte/MG | Lançamento | 20 un. alto luxo |
| 12 | Residenziale Colonnello Figueiredo | Nova Lima/MG | Pronto para morar (confirmado) | 20 un. 2 e 3 quartos + coberturas lineares |

> **12º empreendimento** confirmado pelo cliente (portfólio do site atual: natusgrupo.com.br/portfolio-item/residenziale-colonnello-figueiredo). Metadata factual cadastrada; **imagens** (pasta `img/Residenziale Colonnello Figueiredo …`, inclui fachadas, coberturas e `PLANTA-3-QUARTOS`) a otimizar/wire na replicação. Se a obra estiver entregue, migrar status → "Pronto".

### Tipologia (faceta de busca da Home)

A busca da Home filtra por **Status · Cidade · Tipo de imóvel**. O tipo foi preenchido **só onde há evidência no próprio material** (tipologia declarada, plantas ou alt das imagens). Faltam 4 — cada um é uma resposta de uma palavra:

- [ ] **Viver Mais** (Itaboraí/RJ) — só há perspectivas e fotos de obra. Apartamento?
- [ ] **Gutierrez** (BH/MG) — "20 un. alto luxo" não diz o produto. Apartamento?
- [ ] **Solar Manilha** (Itaboraí/RJ) — "368 un. MCMV". Apartamento ou casa?
- [ ] **Sunset Ville Residence** (BH/MG) — "72 un. MCMV". Apartamento ou casa?

Enquanto não confirmados, esses 4 **não aparecem** quando o filtro de tipo está ativo (melhor sumir do que aparecer como palpite). Confirmados: Residenziale, Torres da Lagoa, Follow Savassi, Golden Ville e Denver = apartamento; One Studios = studio; Vista do Lago = lote; Royal Ville = casa.

## 2. Progresso das obras (Epic 4)
- [x] **Follow Savassi**: progresso real do site oficial (Terraplanagem 100%, demais 0%, Total Construído 0% — obra recém-iniciada). Sem data no site (`updatedAt` omitido).
- [ ] **Golden Ville**: o site **não** expõe andamento — % geral/etapas/data pendentes da empresa.
- [ ] **Data ("última atualização")** de todos: o site não informa; definir quem atualiza e a periodicidade.
- [ ] **Quem** atualiza e com **qual periodicidade** (define se vira conteúdo estático ou administração dinâmica no futuro).

## 3. Páginas institucionais (Epic 6)

**Construídas com conteúdo real do site atual + material da empresa** (`img/Quem Somos`, `img/Servico -*`). O que ficou grounded e o que segue TODO:

- [x] **Quem Somos** (`/quem-somos`): posicionamento (holding · segmento médio econômico e alto luxo · transparência/ética/lealdade — copy verbatim do site), empresas do grupo (**ALIATTO Incorporadora** + **OASI Engenharia**), valores, **selo ISO 9001:2015** (imagem `public/quem-somos/iso-9001.webp`), hero (parede da recepção).
- [x] **Serviços de Engenharia** (`/engenharia`): OASI Engenharia · **obras por administração** (3 categorias reais do site: **Casa de alto padrão (Alphaville)**, **Condomínio (Avenida)**, **Galpão comercial**) com fotos reais otimizadas em `public/engenharia/`.
- [x] **Home**: seção `AboutNatus` com a copy institucional **fornecida pelo cliente** (2026-09-30) — "Nascemos em 2016…" + "É assim que a essência do novo morar sai do papel" — mantendo a menção a ALIATTO/OASI.
- [x] **Números institucionais confirmados pelo cliente** (2026-09-30): **10 anos** de experiência, **100 mil m²** de área construída, **+1.500 unidades** entregues. Exibidos na Home (`features/home/AboutNatus.tsx`) e em `/quem-somos` — **manter os dois em sincronia**. O "10" é literal, não calculado: revisar em 2027.
- [x] **Ano de fundação (2016) confirmado pelo cliente** na copy enviada.
- [ ] **TODO Quem Somos**: descrição individual de cada empresa (site só as nomeia); **história/trajetória completa** (a copy da Home dá o parágrafo de abertura, mas a página pede mais).
- [ ] **TODO Engenharia**: copy descritiva de cada obra (site só tem o título "Obra por administração"); **capacidade técnica** (equipe/certificações/números).
- [ ] **Selo SAS/ISO 9001** (OCS0018, SAS Certificadora): confirmar escopo/validade do certificado com o cliente antes de destacar como vigente.

## 4. Conversão (Epic 5)
- [ ] **Frase da seção MCMV**: "o sonho de conquistar o seu próprio **Natus** fica mais próximo" (texto enviado por você) não fecha gramaticalmente — "conquistar um Natus" não se diz — e repete a construção "o seu próprio Novolar" da referência. Sugestão: "o seu próprio lar". Não alterei por ser copy sua.
- [ ] **Marca Minha Casa Minha Vida**: confirmar o **direito de uso** da marca federal no site e **quais empreendimentos estão de fato enquadrados** no programa. A seção da Home exibe a marca e um claim sobre taxas — ambos sugerem credenciamento. **Os rótulos dos 3 benefícios foram reescritos** (os originais eram idênticos aos da referência Novolar): o claim do cliente "As menores taxas de juros" virou "As menores taxas do mercado **para quem se enquadra** no Minha Casa, Minha Vida", que qualifica a afirmação em vez de deixá-la absoluta. Confirmar a redação com a empresa.
- [ ] **Imagens do Solar Manilha**: é o maior empreendimento MCMV do portfólio (368 un.) e **não tem nenhuma imagem**, por isso ficou fora do carrossel de destaques da Home (entrou o Torres da Lagoa). Com os renders, volta trocando 1 linha em `FEATURED_SLUGS` (`content/developments/index.ts`).
- [ ] **Negocie seu Terreno**: confirmar os **campos exatos** do formulário (além de nome/contato/localização/área/tipo/observações).
- [ ] **Envio de e-mail**: definir **provedor** (ex.: Resend) e para **qual caixa** os leads/contatos vão. O valor do secret será fornecido por você e eu edito `.env` sem exibi-lo.

## 5. Mídia
- [ ] Confirmar direitos de uso das imagens em `img/` e o mapeamento arquivo → empreendimento (pastas já atribuídas: Follow Savassi, Gutierrez, Golden Ville).
- [x] **Pipeline de otimização** criado: `scripts/optimize-images.mjs` (sharp — resize + WEBP ~80%), `npm run optimize:images [slug]`. Lê os originais em `img/` e grava em `public/empreendimentos/<slug>/`. **Follow Savassi (piloto)** processado: 72 MB → **4 MB** (−90–97%/imagem), servindo `.webp`. TIF de 69 MB fica de fora.
- [x] Replicação concluída: **7 empreendimentos com imagens reais** otimizadas (Follow Savassi, Torres da Lagoa, Viver Mais, Residencial Denver, Gutierrez, Golden Ville, Residenziale) — total `public/empreendimentos/` ~15 MB (53 `.webp`). Mapeamento no `JOBS` de `scripts/optimize-images.mjs`. Identidade do Residenziale **confirmada pelo cliente** (12º empreendimento).
- [ ] **Sem foto ainda** (5 lançamentos): One Studios, Royal Ville, Solar Manilha, Sunset Ville, Vista do Lago — pendem assets da empresa.
- [ ] Revisar qualidade dos assets do **Residencial Denver** (massings simples/baixa resolução na origem) — substituir por renders/fotos melhores se a empresa fornecer.
- [x] **Home v2**: `public/home/familia-mcmv.webp` (3,1 MB → 555 KB, lado maior 2560) e `public/home/minha-casa-minha-vida-logo.png` (logo oficial do programa, fornecido pelo cliente). Originais versionados em `img/home/`.
- [x] **Hero da Home**: fachada noturna do Follow Savassi (render retrato 3071×3840 num hero em paisagem). O enquadramento vem do `object-position: center 75%` em `features/home/Hero.tsx`, que fixa a faixa visível na entrada; centralizado mostraria só parede. Trocar a imagem = 1 linha em `SINGLES` (`scripts/optimize-images.mjs`).
- [ ] **Vídeo/GIF para o hero**: o cliente pediu "imagem/gif em destaque" e **não há nenhum asset animado no repo** (zero `.mp4/.webm/.gif`). Enviar um MP4/WebM de 6–10 s (mudo, em loop) e o hero passa a `<video>` com `poster` — o layout já está pronto para isso.
- [ ] Vídeos/panorâmicas, se houver.

## 6. Navegação — Header/Footer (B5)
- [ ] **Redes sociais** do Grupo Natus (Instagram / Facebook / LinkedIn / YouTube): handles e URLs — **NÃO constam** no site atual.
- [ ] **CNPJ** e **CRECI** (registro imobiliário) para o rodapé legal / sub-footer — **não constam** no site; registro público cita CNPJ 24.353.357/0001-11 (Aliatto Emp. Imob. Ltda), **a confirmar com o cliente** antes de publicar.
- [ ] **Selos/certificações** (se houver) e **links de políticas** (privacidade / termos de uso).
- [ ] Confirmar o texto do **CTA persistente** do header (ex.: "Falar com consultor"?) e o destino (WhatsApp já configurado).
> Enquanto não confirmado, cada item entra rotulado como `TODO: CONTENT REQUIRED` (nada inventado).
