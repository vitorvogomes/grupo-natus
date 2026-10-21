import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { CrmSync } from "@/lib/crm/cvcrm";

/**
 * Registro dos leads no Supabase (migrações em supabase/migrations/). As duas
 * tabelas têm RLS sem policy: só esta camada, com a chave de serviço, escreve.
 * Falha nunca lança — devolve `null` e quem chama tem plano B (o e-mail).
 */

/** Linha de `public.site_leads` (formulário da página do empreendimento). */
export type SiteLeadInsert = {
  development_slug: string;
  crm_empreendimento_id: number | null;
  nome: string;
  email: string | null;
  telefone: string | null;
  utm: Record<string, string> | null;
  pagina: string | null;
};

/** Linha de `public.site_contacts` (Contato e Negocie seu Terreno). */
export type SiteContactInsert = {
  tipo: "contato" | "terreno";
  nome: string;
  email: string | null;
  telefone: string | null;
  dados: Record<string, string>;
};

type LeadTable = "site_leads" | "site_contacts";

async function insert(table: LeadTable, row: object): Promise<{ id: number } | null> {
  const db = getSupabaseAdmin();
  if (!db) return null;
  const { data, error } = await db.from(table).insert(row).select("id").single();
  if (error || !data) {
    console.error(`[leads] Supabase recusou o registro em ${table} (${error?.code ?? "sem dados"}).`);
    return null;
  }
  return { id: data.id as number };
}

export const saveSiteLead = (row: SiteLeadInsert) => insert("site_leads", row);
export const saveSiteContact = (row: SiteContactInsert) => insert("site_contacts", row);

async function update(table: LeadTable, id: number, values: object): Promise<void> {
  const db = getSupabaseAdmin();
  if (!db) return;
  const { error } = await db.from(table).update(values).eq("id", id);
  if (error) console.error(`[leads] não consegui atualizar ${table} ${id} (${error.code}).`);
}

/** Anota o resultado da sincronização com o CRM (para reprocessar os erros). */
export function updateSiteLeadCrm(id: number, sync: CrmSync): Promise<void> {
  return update("site_leads", id, {
    crm_status: sync.status,
    crm_lead_id: sync.status === "erro" ? null : sync.leadId,
    crm_error: sync.status === "erro" ? sync.error : null,
    crm_synced_at: new Date().toISOString(),
  });
}

/** O aviso por e-mail chegou ao Resend (o plano gratuito tem limite diário). */
export function markEmailSent(table: LeadTable, id: number): Promise<void> {
  return update(table, id, { email_enviado: true });
}
