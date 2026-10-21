export type LeadPayload = Record<string, string> & { type: string };

export type SubmitResult = { ok: boolean };

/**
 * Mensagem única para qualquer falha de envio. O visitante não precisa saber
 * o motivo (limite, validação, rede) — e o site não expõe como funciona por
 * dentro. Sempre com a saída pelo WhatsApp.
 */
export const LEAD_ERROR_MESSAGE =
  "Não conseguimos concluir o envio agora. Tente novamente em alguns minutos ou fale com a gente pelo WhatsApp.";

/** Envia um lead ao Route Handler (AD-4: escrita server-side). */
export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
