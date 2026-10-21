import "server-only";
import { z } from "zod";

/**
 * Segredos e configuração do servidor (AD-4), lidos por NOME e validados na
 * hora do uso — nunca no import, para o build não depender deles. Nada aqui é
 * `NEXT_PUBLIC_`: chega só ao Route Handler. Um valor ausente ou malformado
 * devolve `null` e quem chama decide o que fazer; os valores nunca são logados.
 */

const filled = z.string().trim().min(1);
const emailList = z
  .string()
  .transform((v) => v.split(",").map((s) => s.trim()).filter(Boolean))
  .pipe(z.array(z.email()).min(1));

/**
 * Remetente de teste do Resend: o único aceito antes de o domínio ser
 * verificado (e só entrega na caixa do dono da conta). Com o domínio
 * verificado, `LEADS_EMAIL_FROM` = "Grupo Natus <no-reply@natusgrupo.com.br>".
 */
const DEFAULT_FROM = "Grupo Natus <onboarding@resend.dev>";

/** Resend. `LEADS_EMAIL_TO` aceita vários endereços separados por vírgula. */
export function emailEnv() {
  const r = z
    .object({ apiKey: filled, to: emailList, from: z.string().trim() })
    .safeParse({
      apiKey: process.env.RESEND_API_KEY,
      to: process.env.LEADS_EMAIL_TO,
      from: process.env.LEADS_EMAIL_FROM ?? "",
    });
  if (!r.success) return null;
  return { ...r.data, from: r.data.from || DEFAULT_FROM };
}

/**
 * Supabase com a chave de serviço (ignora RLS): só para o servidor gravar.
 * Nomes que o projeto já usava; a URL é pública, a chave nunca.
 */
export function supabaseEnv() {
  const r = z
    .object({ url: z.url({ protocol: /^https$/ }), secretKey: filled })
    .safeParse({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      secretKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    });
  return r.success ? r.data : null;
}

/** CV CRM: e-mail + token de um usuário administrativo da API. */
export function crmEnv() {
  const r = z
    .object({
      subdomain: z.string().regex(/^[a-z0-9-]+$/i),
      email: z.email(),
      token: filled,
    })
    .safeParse({
      subdomain: process.env.CVCRM_SUBDOMAIN,
      email: process.env.CVCRM_EMAIL,
      token: process.env.CVCRM_TOKEN,
    });
  if (!r.success) return null;
  const { subdomain, email, token } = r.data;
  return { baseUrl: `https://${subdomain}.cvcrm.com.br/api`, email, token };
}
