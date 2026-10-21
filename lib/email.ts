import { emailEnv } from "@/lib/env";
import type { EmailMessage } from "@/lib/leads/format";

/**
 * Abstração única de e-mail (AD-3/AD-4): Resend via HTTP, só no servidor.
 * Destino e remetente vêm do .env (`LEADS_EMAIL_TO`, `LEADS_EMAIL_FROM`), para
 * dev e produção apontarem para caixas diferentes. Os logs não levam dados do
 * lead nem a chave.
 */
export async function sendEmail(message: EmailMessage): Promise<{ delivered: boolean }> {
  const env = emailEnv();
  if (!env) {
    console.warn("[leads] e-mail não configurado (RESEND_API_KEY / LEADS_EMAIL_TO).");
    return { delivered: false };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: env.from,
        to: env.to,
        subject: message.subject,
        text: message.text,
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error(`[leads] Resend respondeu ${res.status}.`);
    return { delivered: res.ok };
  } catch {
    console.error("[leads] falha de rede ao enviar e-mail.");
    return { delivered: false };
  }
}
