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

## 2. Progresso das obras (Epic 4)
- [ ] Para cada empreendimento "Em construção" (Follow Savassi, Golden Ville): **% geral**, **etapas** (nome + % + ordem) e **data da última atualização**.
- [ ] **Quem** atualiza e com **qual periodicidade** (define se vira conteúdo estático ou administração dinâmica no futuro).

## 3. Páginas institucionais (Epic 6)
- [ ] **Quem Somos**: história, empresas do grupo, atuação, valores, números (ex.: nº de obras/entregas, tempo de mercado).
- [ ] **Serviços de Engenharia**: atuação, metodologia, tipos de projeto, capacidade técnica, obras realizadas, diferenciais.

## 4. Conversão (Epic 5)
- [ ] **Negocie seu Terreno**: confirmar os **campos exatos** do formulário (além de nome/contato/localização/área/tipo/observações).
- [ ] **Envio de e-mail**: definir **provedor** (ex.: Resend) e para **qual caixa** os leads/contatos vão. O valor do secret será fornecido por você e eu edito `.env` sem exibi-lo.

## 5. Mídia
- [ ] Confirmar direitos de uso das imagens em `img/` e o mapeamento arquivo → empreendimento (pastas já atribuídas: Follow Savassi, Gutierrez, Golden Ville).
- [x] **Pipeline de otimização** criado: `scripts/optimize-images.mjs` (sharp — resize + WEBP ~80%), `npm run optimize:images [slug]`. Lê os originais em `img/` e grava em `public/empreendimentos/<slug>/`. **Follow Savassi (piloto)** processado: 72 MB → **4 MB** (−90–97%/imagem), servindo `.webp`. TIF de 69 MB fica de fora.
- [ ] Replicar o pipeline nos demais com fotos prontas (Torres da Lagoa, Viver Mais, Residencial Denver, Gutierrez, Golden Ville) — mapear cada arquivo→saída no `JOBS` do script. Confirmar identidade da pasta **"Residenziale Colonnello Figueiredo"** (é o Vista do Lago?).
- [ ] Vídeos/panorâmicas, se houver.

## 6. Navegação — Header/Footer (B5)
- [ ] **Redes sociais** do Grupo Natus (Instagram / Facebook / LinkedIn / YouTube): handles e URLs.
- [ ] **CNPJ** e **CRECI** (registro imobiliário) para o rodapé legal / sub-footer.
- [ ] **Selos/certificações** (se houver) e **links de políticas** (privacidade / termos de uso).
- [ ] Confirmar o texto do **CTA persistente** do header (ex.: "Falar com consultor"?) e o destino (WhatsApp já configurado).
> Enquanto não confirmado, cada item entra rotulado como `TODO: CONTENT REQUIRED` (nada inventado).
