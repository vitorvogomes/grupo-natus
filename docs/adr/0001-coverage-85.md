# ADR 0001 — Piso de cobertura de testes: 90% → 85%

- **Data:** 2026-09-18
- **Status:** Aceito
- **Decisores:** Vitor Gomes (product owner) + Claude Code

## Contexto

O projeto nasceu com um gate de cobertura de **90%** (lines/functions/branches/statements),
aplicado por `vitest.config.ts` (`coverage.thresholds`) e por um Stop hook
(`.claude/hooks/coverage-gate.sh`). A regra explícita sempre foi: **não abaixar o threshold
"para passar" — cobrir de verdade**.

Na rodada de modernização de frontend (set/2026) decidiu-se pela **adoção completa do
shadcn/ui (Radix + cva)**. Componentes Radix (Dialog, Accordion, Tabs, e afins) introduzem
ramos de código ligados a **portais, focus-trap e pointer events** que o jsdom não implementa
plenamente. Cobrir esses ramos a 90% exige mocks frágeis e testes de baixo valor (alto custo,
baixo ROI, propensos a flakiness), sem reduzir risco real de produto.

## Decisão

Baixar o piso de cobertura de **90% para 85%** nas quatro métricas.

- 85% é **piso, não teto**: código novo de lógica de aplicação continua sendo escrito sob TDD
  e deve buscar cobertura alta. O objetivo do abaixamento é acomodar os ramos de UI de
  bibliotecas (Radix) que embrulhamos, não relaxar a disciplina.
- Preferir **cobrir o comportamento público** dos wrappers PascalCase (APIs estáveis) a testar
  os arquivos gerados do shadcn. Quando um arquivo gerado só é embrulhado (sem lógica própria),
  pode ser excluído cirurgicamente via `coverage.exclude`, sempre documentado aqui.

## Consequências

- `vitest.config.ts` → thresholds = 85.
- `.claude/hooks/coverage-gate.sh` e `.claude/settings.json` → textos atualizados para 85%.
- `CLAUDE.md` → referências ao gate atualizadas para 85%.
- O Stop hook continua **bloqueando** (exit 2) abaixo de 85% ou com testes falhando.

## Alternativas consideradas

- **Manter 90% e mockar tudo do Radix:** rejeitado (testes frágeis, baixo valor).
- **Excluir toda a pasta `components/ui` da cobertura:** rejeitado (esconderia lógica real dos
  wrappers). Exclusões, se houver, são pontuais e listadas neste ADR.
