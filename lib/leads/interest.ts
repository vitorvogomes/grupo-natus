import "server-only";
import { after } from "next/server";
import type { Development } from "@/types/development";
import { syncLeadToCrm } from "@/lib/crm/cvcrm";
import { sendEmail } from "@/lib/email";
import { formatLeadEmail } from "./format";
import { UTM_KEYS, type InterestLead } from "./schema";
import { markEmailSent, saveSiteLead, updateSiteLeadCrm } from "./store";

/**
 * Lead da página do empreendimento (o anúncio leva o visitante até ela).
 *
 * 1. Grava em `site_leads` — é o registro que garante que o lead não se perde.
 * 2. Responde na hora; o CV CRM (cria só se não existir) e o e-mail para o
 *    marketing rodam em `after()`, sem o visitante esperar por eles.
 * Sem banco, e-mail e CRM saem antes da resposta: basta um deles registrar
 * o lead para o visitante não ver erro (senão ele reenviaria um lead que já
 * está no CRM).
 */
export async function handleInterestLead(
  lead: InterestLead,
  development: Development,
): Promise<{ ok: boolean }> {
  const utmEntries = UTM_KEYS.flatMap((k) => (lead[k] ? [[k, lead[k]] as const] : []));
  const saved = await saveSiteLead({
    development_slug: development.slug,
    crm_empreendimento_id: development.crmId ?? null,
    nome: lead.nome,
    email: lead.email,
    telefone: lead.telefone,
    utm: utmEntries.length ? Object.fromEntries(utmEntries) : null,
    pagina: lead.pagina ?? null,
  });

  const email = formatLeadEmail(lead, { empreendimento: development.name });
  const syncCrm = () =>
    syncLeadToCrm({ nome: lead.nome, email: lead.email, telefone: lead.telefone }, development.crmId);

  if (saved) {
    const notify = async () => {
      if ((await sendEmail(email)).delivered) await markEmailSent("site_leads", saved.id);
    };
    after(() => Promise.all([syncCrm().then((sync) => updateSiteLeadCrm(saved.id, sync)), notify()]));
    return { ok: true };
  }

  const [{ delivered }, sync] = await Promise.all([sendEmail(email), syncCrm()]);
  if (sync.status === "erro") console.error(`[leads] CRM: ${sync.error}`);
  return { ok: delivered || sync.status !== "erro" };
}
