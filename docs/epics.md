# Epics & Stories — Website Grupo Natus

> ⚠️ **Este arquivo é apenas um ponteiro.** A fonte de verdade do backlog é o artefato BMAD:
>
> **→ [`_bmad-output/planning-artifacts/epics.md`](../_bmad-output/planning-artifacts/epics.md)**
>
> Gerado via BMAD (`bmad-create-epics-and-stories`) a partir de `docs/prd.md` e `docs/product-brief.md`. Contém o Requirements Inventory (FR/NFR/UX-DR), o FR Coverage Map e **8 epics · 35 stories** em formato Given/When/Then. O rascunho anterior (10 epics) foi consolidado ali por valor de usuário.

## Estrutura canônica (resumo — 8 epics)

1. **Fundação & Identidade Navegável** — scaffold Next.js+TS+Vitest(90%), tokens da marca, shell, WhatsApp, theme-showcase (Gate A).
2. **Descoberta (Home / Catálogo)** — modelo `Development`, seed dos 11, Home, grid, filtros (FR1–2).
3. **Página do Empreendimento & Catálogo Completo** — template `[slug]`, galeria, mapa, status, CTA, SEO por empreendimento; Gate B (FR3,4,7,6,14).
4. **Acompanhamento da Evolução das Obras** — `ConstructionProgress`, componentes, integração (FR5).
5. **Conversão por Leads** — formulários (Contato, Interesse, Negocie seu Terreno) + email + anti-spam (FR8–11).
6. **Páginas Institucionais** — Quem Somos, Serviços de Engenharia (FR12–13).
7. **Descoberta Orgânica & Qualidade** — SEO site-wide, performance, a11y, motion (FR14, NFR1–4,8,9).
8. **Supabase & Admin (condicional) [Gate C]** — persistência + `/admin` (FR15, NFR5).

Consulte o arquivo canônico para as stories completas e critérios de aceite.
