# Product Brief — Website Grupo Natus

> Artefato BMAD (Fase 1 — Brief). Base: `README`, `NOTAS` e discovery do site atual (natusgrupo.com.br) e da referência estrutural (novolar.com.br).
> Idioma dos artefatos: Português (contexto do projeto). Marcações de conteúdo faltante: `TODO: CONTENT REQUIRED`.

## 1. Visão do produto

Novo website institucional do **Grupo Natus** — incorporadora e empresa de engenharia (BH/MG e RJ). O objetivo não é reproduzir o site atual, mas entregar uma experiência **profissional, moderna, sofisticada e orientada a conversão**, preservando a identidade visual e o logo oficiais. A entidade central do produto é o **empreendimento**; o site é, na prática, um catálogo institucional com páginas ricas por empreendimento e pontos de conversão claros (WhatsApp, formulários).

## 2. Público-alvo

- **Compradores/investidores** buscando imóveis (MCMV a alto luxo) em MG e RJ.
- **Proprietários de terreno / corretores** interessados em parcerias ("Negocie seu Terreno").
- **Clientes B2B de engenharia** (obras por administração, incorporação).

## 3. Proposta de valor / percepção a transmitir

Confiança, qualidade, sofisticação, transparência, experiência, solidez, capacidade de execução e proximidade. Experiência **predominantemente visual** — o usuário descobre empreendimentos, entende localização, visualiza imagens, acompanha a evolução da obra e inicia contato.

## 4. Jornada principal (conversão)

Descoberta (Home/Catálogo) → Interesse (página do empreendimento: galeria, localização, características, progresso) → Ação (WhatsApp contextualizado ou formulário) → Lead registrado.

## 5. Escopo (páginas)

1. **Home / Catálogo** — institucional + catálogo dos 11 empreendimentos + conversão.
2. **Empreendimento `[slug]`** — 12 páginas geradas de um único template a partir de dados.
3. **Serviços de Engenharia**.
4. **Negocie seu Terreno** — captação de proprietários/corretores.
5. **Quem Somos**.
6. **Fale Conosco** — contato + formulário (envio por email).

## 6. Empreendimentos (confirmados pelo cliente — revisão v3, 2026-10-11)

| # | Nome | Bairro · Cidade/UF | Status | Nota |
|---|------|-----------|--------|------|
| 1 | Follow Savassi | Savassi · Belo Horizonte/MG | Lançamento | |
| 2 | Solar Manilha | Manilha · Itaboraí/RJ | Lançamento | 368 un. · MCMV |
| 3 | Golden Ville Residence | Maria Paula · Niterói/RJ | Em construção | 104 un. · MCMV |
| 4 | Viver Mais | Itaboraí/RJ | Pronto para morar · 100% vendido | 256 un. · MCMV |
| 5 | Residencial Denver | Santa Lúcia · Belo Horizonte/MG | Pronto para morar · 100% vendido | 14 studios |
| 6 | Torres da Lagoa | Lagoa Santa/MG | Pronto para morar · 100% vendido | 112 aptos · MCMV |
| 7 | Residenziale Colonnello Figueiredo | Pau Pombo · Nova Lima/MG | Pronto para morar · 100% vendido | 20 un. |
| 8 | Gutierrez | Belo Horizonte/MG | Breve lançamento | 20 un. alto luxo |
| 9 | One Studios | Niterói/RJ | Breve lançamento | 180 studios |
| 10 | Sunset Ville Residence | Belo Horizonte/MG | Breve lançamento | 72 un. · MCMV |
| 11 | Royal Ville Residence | Vespasiano/MG | Breve lançamento | 96 casas · MCMV |

> Vista do Lago saiu do portfólio na revisão v3. O que ainda falta de conteúdo fica em `docs/CONTENT-GAPS.md`; ausências seguem `TODO: CONTENT REQUIRED` — **não inventar dados**.

## 7. Funcionalidades solicitadas pela empresa

- Progresso de evolução por empreendimento (atualizável conforme a obra avança).
- Contatos simples: formulários enviados por email + redirecionamento WhatsApp com botão flutuante.
- Localização dos empreendimentos via Google Maps.
- Site dinâmico/interativo com capacidade para vídeos, GIFs, galerias, animações (motion com função, sem exagero).
- SEO estruturado (base correta, não prioridade #1).

## 8. Contatos institucionais (site atual — confirmar)

WhatsApp (31) 98466-3280 · Tel (31) 98466-3280 · contato@natusgrupo.com.br · Av. Getúlio Vargas, 1621 — Savassi, Belo Horizonte · Seg–Sex 09:00–19:00.

## 9. Referências

- Estrutura/UX (referência, **não copiar visualmente**): novolar.com.br — filtros por localização/tipologia/fase, carrossel de destaques, cards com badge de status + CTA, métricas institucionais, páginas de imóvel com galeria/mapa/specs.
- Marca: logos oficiais em `img/LOGO-.../LOGO/{JPG,PDF}/` (Principal, Negativa, Preta, Assinatura). Cores derivadas da marca — não substituir por paleta arbitrária.

## 10. Fora de escopo (por ora)

Deploy/CI/CD/hosting; painel admin e persistência em banco **antes de necessidade concreta**; múltiplos backends/microservices; autenticação além de Supabase Auth quando/se necessária; CMS completo.

## 11. Stack e princípios

- **Next.js (App Router) + TypeScript**; Server Components por padrão, Client só quando necessário.
- Supabase apenas quando houver necessidade real de persistência; APIs via Route Handlers do Next; auth via Supabase Auth.
- **Sem over-engineering.** Empreendimento como entidade de dados (não 12 páginas duplicadas). Componentizar por comportamento/reuso.
- **Preservar** RLS, env vars e secrets do Supabase existente. Validação **100% local** primeiro.

## 12. Critérios de sucesso

- Parece claramente Grupo Natus (branding) e um produto profissional (não template/IA genérica).
- Próxima ação evidente em cada página (conversão).
- Funciona de verdade em mobile; motion melhora a experiência sem quebrar Core Web Vitals.
- Conteúdo real ou explicitamente marcado como mock — nunca dado inventado apresentado como real.
