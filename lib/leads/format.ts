import type { Lead } from "./schema";

export type EmailMessage = { subject: string; text: string; replyTo?: string };

// Rótulos na ordem em que o formulário pergunta.
const LABELS: Record<string, string> = {
  empreendimento: "Empreendimento",
  nome: "Nome",
  email: "E-mail",
  telefone: "Telefone",
  assunto: "Assunto",
  mensagem: "Mensagem",
  localizacao: "Localização",
  area: "Área",
  tipo: "Tipo",
  observacoes: "Observações",
  pagina: "Página",
  utm_source: "Origem (utm_source)",
  utm_medium: "Mídia (utm_medium)",
  utm_campaign: "Campanha (utm_campaign)",
  utm_content: "Conteúdo (utm_content)",
  utm_term: "Termo (utm_term)",
};

function subject(lead: Lead, extra: { empreendimento?: string }): string {
  switch (lead.type) {
    case "contato":
      return `[Site] Contato — ${lead.nome}`;
    case "terreno":
      return `[Site] Terreno — ${lead.localizacao}`;
    case "interesse":
      return `[Site] Interesse — ${extra.empreendimento ?? lead.slug}`;
  }
}

/** E-mail em texto puro para a caixa do marketing. Só entra o que o schema aceitou. */
export function formatLeadEmail(lead: Lead, extra: { empreendimento?: string } = {}): EmailMessage {
  const values: Record<string, string | undefined> = { ...lead, ...extra };
  const text = Object.entries(LABELS)
    .filter(([key]) => values[key])
    .map(([key, label]) => `${label}: ${values[key]}`)
    .join("\n");
  return { subject: subject(lead, extra), text, replyTo: lead.email };
}
