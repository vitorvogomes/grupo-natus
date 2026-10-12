#!/usr/bin/env bash
# Guard de segredos — PreToolUse (Bash).
# Bloqueia comandos que expõem credenciais/env no contexto do agente.
# Regra: env vars e secrets são usados/manipulados por NOME; nunca imprimir VALORES.
set -uo pipefail

cmd="$(jq -r '.tool_input.command // empty' 2>/dev/null)"
[ -z "$cmd" ] && exit 0

deny() {
  printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"%s"}}\n' "$1"
  exit 0
}

low="$(printf '%s' "$cmd" | tr 'A-Z' 'a-z')"

# 1) Ler/imprimir/carregar arquivos .env (cat, less, head, tail, nl, bat, xxd, od, strings, source, .)
if printf '%s' "$low" | grep -Eq '(^|[|&;[:space:]])(cat|less|more|head|tail|nl|bat|xxd|od|strings|source|\.)[[:space:]]+[^|&;]*\.env'; then
  deny "Nao exponha arquivos .env no contexto. Edite as cegas (Edit/Write) ou leia apenas NOMES de chaves; nunca imprima VALORES de secrets."
fi

# 2) Buscar dentro de .env (grep/rg/awk/sed)
if printf '%s' "$low" | grep -Eq '(grep|rg| grep|awk|sed)[^|&;]*\.env'; then
  deny "Leitura de .env bloqueada. Referencie variaveis por nome, sem revelar valores."
fi

# 3) Dump de ambiente: printenv (sempre) ou `env` isolado / `env |` / `env >`
if printf '%s' "$low" | grep -Eq '(^|[|&;[:space:]])printenv([[:space:]]|$)'; then
  deny "printenv pode revelar secrets. Nao imprima valores de variaveis de ambiente."
fi
if printf '%s' "$low" | grep -Eq '(^|[|&;[:space:]])env([[:space:]]*(\||>|$))'; then
  deny "Dump de variaveis de ambiente bloqueado (pode conter secrets). Use nomes especificos, sem imprimir valores."
fi

# 4) Imprimir valores de variaveis sensiveis (echo/printf $KEY/$SECRET/$TOKEN/$PASSWORD/$CREDENTIAL/$SERVICE_ROLE)
if printf '%s' "$cmd" | grep -Eq '(echo|printf)[^|&;]*\$\{?[A-Za-z_]*(KEY|SECRET|TOKEN|PASSWORD|PASSWD|CREDENTIAL|SERVICE_ROLE)[A-Za-z_]*'; then
  deny "Nao imprima valores de variaveis sensiveis (KEY/SECRET/TOKEN/PASSWORD/CREDENTIAL/SERVICE_ROLE)."
fi

exit 0
