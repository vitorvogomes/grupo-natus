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

## 2. Progresso das obras (Epic 4)
- [x] **Follow Savassi**: progresso real do site oficial (Terraplanagem 100%, demais 0%, Total Construído 0% — obra recém-iniciada). Sem data no site (`updatedAt` omitido).
- [ ] **Golden Ville**: o site **não** expõe andamento — % geral/etapas/data pendentes da empresa.
- [ ] **Data ("última atualização")** de todos: o site não informa; definir quem atualiza e a periodicidade.
- [ ] **Quem** atualiza e com **qual periodicidade** (define se vira conteúdo estático ou administração dinâmica no futuro).

## 3. Páginas institucionais (Epic 6)

**Construídas com conteúdo real do site atual + material da empresa** (`img/Quem Somos`, `img/Servico -*`). O que ficou grounded e o que segue TODO:

- [x] **Quem Somos** (`/quem-somos`): posicionamento (holding · segmento médio econômico e alto luxo · transparência/ética/lealdade — copy verbatim do site), empresas do grupo (**ALIATTO Incorporadora** + **OASI Engenharia**), valores, **selo ISO 9001:2015** (imagem `public/quem-somos/iso-9001.webp`), hero (parede da recepção).
- [x] **Serviços de Engenharia** (`/engenharia`): OASI Engenharia · **obras por administração** (3 categorias reais do site: **Casa de alto padrão (Alphaville)**, **Condomínio (Avenida)**, **Galpão comercial**) com fotos reais otimizadas em `public/engenharia/`.
- [x] **Home**: `InstitutionalIntro` com o posicionamento real (holding + ALIATTO/OASI).
- [ ] **TODO Quem Somos**: descrição individual de cada empresa (site só as nomeia); **história/trajetória** (site não tem — registros públicos citam Aliatto Emp. Imob. Ltda, CNPJ 24.353.357/0001-11, fundada 2016, **não confirmar como oficial sem o cliente**); **números** (anos de mercado, nº de empreendimentos/unidades) — permanecem `TODO: CONTENT REQUIRED`.
- [ ] **TODO Engenharia**: copy descritiva de cada obra (site só tem o título "Obra por administração"); **capacidade técnica** (equipe/certificações/números).
- [ ] **Selo SAS/ISO 9001** (OCS0018, SAS Certificadora): confirmar escopo/validade do certificado com o cliente antes de destacar como vigente.

## 4. Conversão (Epic 5)
- [ ] **Negocie seu Terreno**: confirmar os **campos exatos** do formulário (além de nome/contato/localização/área/tipo/observações).
- [ ] **Envio de e-mail**: definir **provedor** (ex.: Resend) e para **qual caixa** os leads/contatos vão. O valor do secret será fornecido por você e eu edito `.env` sem exibi-lo.

## 5. Mídia
- [ ] Confirmar direitos de uso das imagens em `img/` e o mapeamento arquivo → empreendimento (pastas já atribuídas: Follow Savassi, Gutierrez, Golden Ville).
- [x] **Pipeline de otimização** criado: `scripts/optimize-images.mjs` (sharp — resize + WEBP ~80%), `npm run optimize:images [slug]`. Lê os originais em `img/` e grava em `public/empreendimentos/<slug>/`. **Follow Savassi (piloto)** processado: 72 MB → **4 MB** (−90–97%/imagem), servindo `.webp`. TIF de 69 MB fica de fora.
- [x] Replicação concluída: **7 empreendimentos com imagens reais** otimizadas (Follow Savassi, Torres da Lagoa, Viver Mais, Residencial Denver, Gutierrez, Golden Ville, Residenziale) — total `public/empreendimentos/` ~15 MB (53 `.webp`). Mapeamento no `JOBS` de `scripts/optimize-images.mjs`. Identidade do Residenziale **confirmada pelo cliente** (12º empreendimento).
- [ ] **Sem foto ainda** (5 lançamentos): One Studios, Royal Ville, Solar Manilha, Sunset Ville, Vista do Lago — pendem assets da empresa.
- [ ] Revisar qualidade dos assets do **Residencial Denver** (massings simples/baixa resolução na origem) — substituir por renders/fotos melhores se a empresa fornecer.
- [ ] Vídeos/panorâmicas, se houver.

## 6. Navegação — Header/Footer (B5)
- [ ] **Redes sociais** do Grupo Natus (Instagram / Facebook / LinkedIn / YouTube): handles e URLs — **NÃO constam** no site atual.
- [ ] **CNPJ** e **CRECI** (registro imobiliário) para o rodapé legal / sub-footer — **não constam** no site; registro público cita CNPJ 24.353.357/0001-11 (Aliatto Emp. Imob. Ltda), **a confirmar com o cliente** antes de publicar.
- [ ] **Selos/certificações** (se houver) e **links de políticas** (privacidade / termos de uso).
- [ ] Confirmar o texto do **CTA persistente** do header (ex.: "Falar com consultor"?) e o destino (WhatsApp já configurado).
> Enquanto não confirmado, cada item entra rotulado como `TODO: CONTENT REQUIRED` (nada inventado).
