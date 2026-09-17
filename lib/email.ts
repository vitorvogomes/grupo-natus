/**
 * Abstração única de e-mail (AD-3/AD-4). Envio server-side apenas.
 * Provedor: Resend `[ASSUMPTION]` — a confirmar (ver docs/CONTENT-GAPS.md §4).
 * Secrets referenciados por NOME (RESEND_API_KEY, LEADS_EMAIL_TO); nunca logados.
 */

export type Lead = { type: string } & Record<string, string>;

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.LEADS_EMAIL_TO);
}

function formatLead(lead: Lead): { subject: string; text: string } {
  const lines = Object.entries(lead)
    .filter(([key]) => key !== "type")
    .map(([key, value]) => `${key}: ${value}`);
  return {
    subject: `[Natus] Novo lead: ${lead.type}`,
    text: `Tipo: ${lead.type}\n${lines.join("\n")}`,
  };
}

export async function sendLeadEmail(lead: Lead): Promise<{ delivered: boolean }> {
  if (!isEmailConfigured()) {
    // Não perder o lead silenciosamente: registrar sem expor secret.
    console.warn(
      `[leads] e-mail não configurado — lead '${lead.type}' não entregue.`,
    );
    return { delivered: false };
  }

  const { subject, text } = formatLead(lead);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: "Grupo Natus <no-reply@natusgrupo.com.br>",
      to: process.env.LEADS_EMAIL_TO,
      subject,
      text,
    }),
  });

  return { delivered: res.ok };
}
