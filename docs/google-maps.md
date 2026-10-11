# Google Maps com o pin da Natus

O mapa da seção **Localização** (`features/developments/DevelopmentMap.tsx`) tem dois caminhos:

| Situação | O que renderiza |
|---|---|
| Sem chave (padrão) | Embed público do Google. Custo zero, mas **não aceita marcador customizado**: usa o pin vermelho do Google. |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` + `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID` | Maps JavaScript API com `AdvancedMarkerElement` e o pin da marca (`public/brand/pin-natus.png`). |

O código do segundo caminho já existe. Para ativá-lo, falta só a configuração abaixo. Os 7 empreendimentos com página (todos os que não estão em "breve lançamento") já têm `lat`/`lng` em `content/developments/data.ts`.

## Passo a passo (conta GCP do Grupo Natus)

1. **Projeto + faturamento.** No [Google Cloud Console](https://console.cloud.google.com/), crie um projeto (ex.: `natus-site`) e vincule uma conta de faturamento. A Maps Platform exige faturamento ativo mesmo dentro da cota gratuita. Ela cobra por SKU com cota mensal gratuita, e o carregamento de mapa dinâmico de um site institucional fica folgado nela. Confira a tabela atual em *Google Maps Platform → Pricing*.
2. **API.** Em *APIs e serviços → Biblioteca*, ative só a **Maps JavaScript API**.
3. **Chave.** Em *APIs e serviços → Credenciais → Criar credenciais → Chave de API*, aplique duas restrições:
   - **Restrição de aplicativo → Referenciadores HTTP (sites)**: `http://localhost:3000/*` e o domínio de produção, ainda a confirmar (provavelmente `https://natusgrupo.com.br/*` e `https://www.natusgrupo.com.br/*`).
   - **Restrição de API**: somente *Maps JavaScript API*.
4. **Map ID.** Em *Google Maps Platform → Gerenciamento de mapas → Criar ID do mapa*, escolha o tipo **JavaScript** (vetorial). Sem o Map ID, o marcador avançado não renderiza. O estilo do mapa (cores) também pode ser ajustado ali, sem tocar no código.
5. **Ambiente.** No `.env.local` (nunca commitado), preencha:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<chave>
   NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID=<map id>
   ```
   Depois reinicie o `npm run dev`. Variáveis `NEXT_PUBLIC_` entram no bundle no build.
6. **Produção.** Cadastre as mesmas duas variáveis no provedor de hospedagem.

## Segurança

A chave é **pública por natureza**: ela vai para o navegador. A proteção vem das restrições de referenciador e de API do passo 3, não do sigilo. Por isso nada de reaproveitar uma chave pessoal sem restrição, e nada de ativar outras APIs nela.

Opcional: crie um **alerta de orçamento** em *Faturamento → Orçamentos e alertas*.

## Verificação

Com as variáveis preenchidas, abra `/empreendimentos/follow-savassi`. O mapa deve carregar com o pin nude/navy da Natus. Se a chave falhar (restrição errada, faturamento inativo), a seção continua de pé com o endereço e os botões Google Maps/Waze, porque o mapa é acessório. O erro aparece no console do navegador.
