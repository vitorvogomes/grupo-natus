import "server-only";
import { after } from "next/server";
import { sendEmail } from "@/lib/email";
import { formatLeadEmail } from "./format";
import type { Lead } from "./schema";
import { markEmailSent, saveSiteContact } from "./store";

type GeneralLead = Exclude<Lead, { type: "interesse" }>;

/**
 * Contato e Negocie seu Terreno: a linha em `site_contacts` é o registro do
 * lead; o e-mail para o marketing é aviso e sai depois da resposta (o Resend
 * gratuito tem limite diário — estourar não pode perder lead). Sem banco, o
 * e-mail passa a ser o registro e decide o sucesso.
 */
export async function handleGeneralLead(lead: GeneralLead): Promise<{ ok: boolean }> {
  const { type, nome, email, telefone, ...dados } = lead;
  const saved = await saveSiteContact({
    tipo: type,
    nome,
    email: email ?? null,
    telefone: telefone ?? null,
    dados,
  });
  const message = formatLeadEmail(lead);

  if (saved) {
    after(async () => {
      if ((await sendEmail(message)).delivered) await markEmailSent("site_contacts", saved.id);
    });
    return { ok: true };
  }

  const { delivered } = await sendEmail(message);
  return { ok: delivered };
}
