---
description: Ciclo TDD red→green→refactor para uma unidade/comportamento específico.
argument-hint: <o que testar/implementar>
---

Aplique TDD estrito para: **$ARGUMENTS**

1. 🔴 **RED** — escreva o teste que descreve o comportamento esperado (Vitest + Testing Library). Rode e confirme que falha pelo motivo certo.
2. 🟢 **GREEN** — implemente o mínimo para passar. Nada além disso.
3. ♻️ **REFACTOR** — melhore o design mantendo os testes verdes.
4. Cubra casos de borda e estados (erro, vazio, loading, acessibilidade).
5. Rode `npm run test:coverage` e garanta **≥90%** nas linhas tocadas.

Regras: não inventar dados, não tocar RLS/env/secrets, seguir tokens do design system. Use a skill `vitest-testing` como referência.
