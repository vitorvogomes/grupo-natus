#!/usr/bin/env bash
# TDD sagrado — gate de cobertura (>=85%).
# Stop hook: impede finalizar o turno enquanto testes falharem ou a cobertura < 85%.
# O limite de 85% é aplicado pela config do runner (vitest coverage.thresholds); aqui
# apenas rodamos e bloqueamos em caso de falha. No-op enquanto o app não estiver scaffolded.
set -uo pipefail

ROOT="${CLAUDE_PROJECT_DIR:-$PWD}"
cd "$ROOT" 2>/dev/null || exit 0

# Nada a aplicar até existir package.json com script de cobertura.
[ -f package.json ] || exit 0
grep -q '"test:coverage"' package.json || exit 0

MARKER=".claude/.tdd-last-pass"
# Pula se nada de código/teste mudou desde o último gate verde (evita rodar em turnos de conversa).
if [ -f "$MARKER" ]; then
  CHANGED="$(find src app components lib features tests test 2>/dev/null -type f \
    \( -name '*.ts' -o -name '*.tsx' \) -newer "$MARKER" | head -1)"
  [ -z "$CHANGED" ] && exit 0
fi

OUT="$(npm run test:coverage --silent 2>&1)"
CODE=$?
if [ "$CODE" -ne 0 ]; then
  {
    echo "❌ TDD GATE FALHOU — testes ou cobertura (<85%) não passaram."
    echo "Corrija antes de finalizar: rode 'npm run test:coverage' e faça o gate ficar verde."
    echo "----- últimas linhas -----"
    echo "$OUT" | tail -n 30
  } >&2
  exit 2
fi

mkdir -p "$(dirname "$MARKER")" 2>/dev/null
touch "$MARKER" 2>/dev/null
exit 0
