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

## Perguntas frequentes

### Vou expor minhas chaves em variáveis públicas?
A **chave** fica visível no código da página, e isso é inerente ao Maps JavaScript API: o mapa roda no navegador do visitante, então a chave viaja com a página. Isso vale para qualquer site com Google Maps, com ou sem o prefixo `NEXT_PUBLIC_`. A proteção vem das **restrições**, não do sigilo:

| Camada | Onde | Efeito |
|---|---|---|
| Restrição de aplicativo: referenciadores HTTP | Credenciais → a chave | Só `localhost` e o domínio do site podem usá-la; copiada para outro site, é recusada |
| Restrição de API | Credenciais → a chave | Só a Maps JavaScript API; vazada, não serve para Places, Geocoding etc. |
| Cota diária | APIs e serviços → Maps JavaScript API → Cotas | Limita o pior caso (abuso) a um valor conhecido |
| Alerta de orçamento | Faturamento → Orçamentos e alertas | Aviso por e-mail antes de qualquer surpresa |

Regras:
- **Uma chave só para o site**, criada na conta GCP do Grupo Natus. Nunca reaproveite uma chave pessoal sem restrição.
- **Nunca** coloque em `NEXT_PUBLIC_` uma chave de servidor (Places/Geocoding chamados do backend, chave de e-mail, Supabase service role). Essas ficam em variáveis sem o prefixo, lidas só no servidor (AD-4).
- Se a chave vazar sem restrição, gere uma nova no console e apague a antiga. Não é preciso mudar código, só o `.env`.

O **Map ID** não é segredo: é só o identificador de um estilo de mapa.

### Preciso de um Map ID para cada empreendimento?
**Não.** Um Map ID serve o site inteiro. Ele identifica a **configuração de estilo** do mapa (tipo vetorial, cores, quais pontos de interesse aparecem) e é exigido pelo marcador avançado (`AdvancedMarkerElement`). A **posição** de cada empreendimento vem de `lat`/`lng` em `content/developments/data.ts`, e o pin é a imagem da marca (`public/brand/pin-natus.png`), igual para todos.

Um segundo Map ID só faria sentido para um estilo diferente: por exemplo, um mapa escuro numa seção de fundo navy.

### Isso é cobrado?
- **Maps JavaScript API**: cobra por **carregamento de mapa dinâmico** (cada vez que a página cria o mapa). A Maps Platform oferece uma **cota mensal gratuita por SKU**; um site institucional com tráfego moderado tende a ficar dentro dela. O modelo mudou em 2025 (saiu o crédito mensal único, entraram cotas por SKU), então confirme os números atuais em *Google Maps Platform → Pricing* antes de ativar.
- **Map ID e marcador avançado**: sem custo próprio além do carregamento do mapa.
- **Embed público** (o caminho de hoje, sem chave): gratuito e sem limite prático, mas sem pin personalizado.
- **Faturamento ativo é obrigatório**, mesmo dentro da cota gratuita: sem ele, a API recusa a chave.
- **Para reduzir carregamentos**: hoje o `DevelopmentMap` carrega a API quando o componente monta. Carregar só quando a seção Localização entrar na tela (IntersectionObserver) evita cobrar a visita de quem não rola até lá. É uma melhoria futura, ainda não implementada.

## Verificação

Com as variáveis preenchidas, abra `/empreendimentos/follow-savassi`. O mapa deve carregar com o pin nude/navy da Natus. Se a chave falhar (restrição errada, faturamento inativo), a seção continua de pé com o endereço e os botões Google Maps/Waze, porque o mapa é acessório. O erro aparece no console do navegador.
