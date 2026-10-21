import { crmEnv } from "@/lib/env";

/**
 * Integração mínima com o CV CRM (API v1, headers `email` + `token`).
 * Regra do cliente: lead que já existe (mesmo e-mail ou telefone) fica como
 * está — nada é editado (por isso o cadastro nunca manda `permitir_alteracao`).
 * Só o lead novo é criado, ligado ao empreendimento.
 * https://desenvolvedor.cvcrm.com.br/reference/getlead-1 · /postlead-1
 */

export type CrmContact = { nome: string; email?: string; telefone?: string };
export type CrmSync =
  | { status: "existente" | "criado"; leadId: string | null }
  | { status: "erro"; error: string };

/** Origem "WebSite" na tabela de origens do CV CRM. */
const ORIGEM_SITE = "SI";

/** DDD + número, sem o 55 do país. */
function nationalDigits(phone: string): string | null {
  let digits = phone.replace(/\D/g, "");
  if (digits.length > 11 && digits.startsWith("55")) digits = digits.slice(2);
  return digits.length === 10 || digits.length === 11 ? digits : null;
}

/** Formato do filtro `telefone` da busca: `+55(DD) 9XXXX-XXXX`. */
export function toCrmPhone(phone: string): string | null {
  const d = nationalDigits(phone);
  if (!d) return null;
  const ddd = d.slice(0, 2);
  const local = d.slice(2);
  const cut = local.length - 4;
  return `+55(${ddd}) ${local.slice(0, cut)}-${local.slice(cut)}`;
}

class CrmError extends Error {}

/** O que a busca devolve de cada lead (só o necessário para comparar). */
type CrmLead = { idlead: number | string; email?: string | null; telefone?: string | null; celular?: string | null };

export async function syncLeadToCrm(contact: CrmContact, empreendimentoId?: number): Promise<CrmSync> {
  const env = crmEnv();
  if (!env) return { status: "erro", error: "CV CRM não configurado" };

  const headers = { email: env.email, token: env.token, accept: "application/json" };
  const request = (path: string, init: RequestInit = {}) =>
    fetch(`${env.baseUrl}${path}`, {
      ...init,
      headers: { ...headers, ...init.headers },
      signal: AbortSignal.timeout(8000),
    });

  // A busca aceita um filtro por vez. "Não achou" é um 400 com "Lead não
  // encontrado"; outro 400 é erro. Filtro que a API não reconhece é ignorado e
  // volta a lista geral (medido: `telefone=lixo` → 200 com todos os leads), por
  // isso só conta um lead que seja a mesma pessoa.
  async function find(param: "email" | "telefone", value: string, label: string, isSame: (lead: CrmLead) => boolean) {
    const res = await request(`/v1/comercial/leads?${param}=${encodeURIComponent(value)}`);
    const data = await res.json().catch(() => ({}));
    if (res.status === 400 && /n[ãa]o encontrado/i.test(String(data?.error ?? ""))) return undefined;
    if (!res.ok) throw new CrmError(`busca por ${label}: HTTP ${res.status}`);
    const lead = ((data?.leads ?? []) as CrmLead[]).find(isSame);
    return lead ? String(lead.idlead) : undefined;
  }

  try {
    const email = contact.email?.trim().toLowerCase();
    const digits = contact.telefone ? nationalDigits(contact.telefone) : null;
    const phone = contact.telefone ? toCrmPhone(contact.telefone) : null;
    const existing =
      (email
        ? await find("email", email, "e-mail", (l) => l.email?.trim().toLowerCase() === email)
        : undefined) ??
      (phone && digits
        ? await find("telefone", phone, "telefone", (l) =>
            [l.telefone, l.celular].some((p) => p != null && nationalDigits(p) === digits),
          )
        : undefined);
    if (existing) return { status: "existente", leadId: existing };

    const res = await request("/v1/comercial/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        nome: contact.nome,
        ...(contact.email ? { email: contact.email } : {}),
        ...(contact.telefone && nationalDigits(contact.telefone)
          ? { telefone: nationalDigits(contact.telefone) }
          : {}),
        origem: ORIGEM_SITE,
        ...(empreendimentoId ? { idempreendimento: empreendimentoId } : {}),
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data?.sucesso) return { status: "criado", leadId: String(data.id) };
    // Outro envio criou o mesmo lead entre a busca e o cadastro.
    if (res.status === 400 && /j[áa] existe|duplicad/i.test(String(data?.error ?? ""))) {
      return { status: "existente", leadId: null };
    }
    throw new CrmError(`cadastro: HTTP ${res.status}`);
  } catch (err) {
    return { status: "erro", error: err instanceof Error ? err.message.slice(0, 200) : "falha desconhecida" };
  }
}
