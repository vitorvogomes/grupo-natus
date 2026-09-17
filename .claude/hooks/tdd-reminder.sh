#!/usr/bin/env bash
# TDD sagrado — lembrete (não bloqueante).
# PostToolUse (Write|Edit): se um arquivo-fonte for criado/editado sem teste irmão,
# injeta contexto lembrando de escrever o teste primeiro (red-green-refactor).
set -uo pipefail

f="$(jq -r '.tool_input.file_path // .tool_response.filePath // empty' 2>/dev/null)"
[ -z "$f" ] && exit 0

# Ignora os próprios testes.
case "$f" in
  *.test.ts|*.test.tsx|*.spec.ts|*.spec.tsx) exit 0 ;;
esac
# Só código TS/TSX.
case "$f" in
  *.ts|*.tsx) : ;;
  *) exit 0 ;;
esac
# Só dirs de código da aplicação.
case "$f" in
  */src/*|*/app/*|*/components/*|*/lib/*|*/features/*) : ;;
  *) exit 0 ;;
esac

base="${f%.*}"; ext="${f##*.}"
if [ ! -f "${base}.test.${ext}" ] && [ ! -f "${base}.spec.${ext}" ]; then
  printf '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":"TDD sagrado: %s não tem teste irmão (%s.test.%s). Escreva/atualize o teste primeiro (red→green→refactor) e mantenha a cobertura >=90%%."}}\n' "$f" "$base" "$ext"
fi
exit 0
