---
description: Atualiza/audita o painel de progresso e verifica a coerência das documentações com o desenvolvimento.
argument-hint: "[opcional] ID da story concluída (ex. E1.2) ou 'audit'"
---

Gerencie o acompanhamento do desenvolvimento em `@docs/PROGRESS.md`.

**Se veio um ID de story concluída** (ex. `E1.2`):
1. Marque a story como ✅ em `docs/PROGRESS.md`, recalcule as contagens do epic e o total, e ajuste "Epic atual" / "Última atualização".
2. Rode o checklist de **Coerência das documentações** do PROGRESS.md: para cada doc (epics.md canônico, ARCHITECTURE-SPINE + `.memlog.md`, PRD/brief, CLAUDE.md), verifique se a implementação divergiu e **atualize o que precisar** — mantendo tudo coerente e sem duplicação.
3. Se uma decisão de arquitetura foi tomada, registre no `.memlog.md` e atualize o spine; resolva `[ASSUMPTION]` que foram confirmados.

**Se `audit` (ou sem argumento):**
1. Mostre o resumo (concluídas/total, por epic, próxima story sugerida, gates pendentes).
2. Faça uma auditoria de coerência: aponte divergências entre o código real e as docs (`epics.md`, spine, PRD, CLAUDE.md, PROGRESS.md) e proponha correções.
3. Liste decisões/pendências em aberto.

Regras: nunca inventar status; refletir o estado real do repositório. Não expor valores de credenciais/env ao inspecionar configuração.
