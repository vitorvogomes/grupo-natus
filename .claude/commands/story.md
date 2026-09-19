---
description: Implementa uma story de docs/epics.md com TDD estrito (red→green→refactor) e gate de cobertura ≥90%.
argument-hint: <ID da story, ex. E4.2> ou uma descrição
---

Implemente a story **$ARGUMENTS** com **TDD sagrado**. Não pule etapas.

## Antes de codar
1. Localize a story em `@docs/epics.md` (e o epic pai). Releia seus **Critérios de Aceite (CA)**.
2. Consulte `@docs/prd.md` (FR/NFR e modelo de dados) e `@CLAUDE.md` (restrições críticas).
3. Carregue as skills relevantes ao que vai construir: `nextjs-app-router-patterns`, `tailwind-design-system`, `framer-motion-animator`, `nextjs-seo`, `supabase` / `supabase-postgres-best-practices`, `vitest-testing`.
4. Respeite as regras do README: **não inventar conteúdo** (`TODO: CONTENT REQUIRED`), **não tocar em RLS/env/secrets**, preservar branding Natus, sem over-engineering.

## Ciclo TDD (por unidade/comportamento)
- 🔴 **RED**: escreva primeiro o(s) teste(s) que expressam os CA. Rode e veja falhar.
- 🟢 **GREEN**: implemente o mínimo para passar.
- ♻️ **REFACTOR**: limpe mantendo verde.
- Repita até cobrir todos os CA da story.

## Definition of Done
- Todos os CA da story atendidos.
- `npm run test:coverage` **verde com cobertura ≥90%** (o Stop hook bloqueia se não estiver).
- `npm run lint` e `npm run typecheck` sem erros.
- Sem conteúdo inventado; mocks claramente rotulados.
- **Atualize o progresso e a coerência das docs:** execute `/progress <ID>` — marque a story em `@docs/PROGRESS.md` e rode o checklist de coerência (epics.md canônico, ARCHITECTURE-SPINE + `.memlog.md`, PRD/brief, CLAUDE.md), atualizando o que a implementação exigir.
- **Segredos:** ao usar/manipular env/credenciais, faça por NOME; nunca imprima VALORES no contexto (o guard `PreToolUse` bloqueia). Edite `.env` às cegas.
- Ao final, resuma o que foi feito e qual a próxima story sugerida.
