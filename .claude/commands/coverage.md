---
description: Roda o gate de TDD (testes + cobertura ≥90%) manualmente e reporta lacunas.
---

Rode o gate de qualidade e reporte o resultado:

1. `npm run test:coverage` (se o script/app ainda não existir, diga isso e pare).
2. Se algum teste falhar, liste as falhas e proponha correções.
3. Se a cobertura ficar **abaixo de 90%**, liste arquivos/linhas descobertos e proponha os testes faltantes (seguindo TDD).
4. Rode também `npm run lint` e `npm run typecheck` e reporte.

Não relaxe o limite de 90% nem edite a config de threshold para "passar" — o objetivo é cobrir de verdade.
