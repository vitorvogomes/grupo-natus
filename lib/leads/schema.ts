import { z } from "zod";
import { isEmail, isPhone } from "@/lib/validators";

/**
 * Contrato de cada formulário, validado no servidor. Os campos espelham os
 * formulários (`LeadForm`); o que não estiver aqui é descartado — nunca chega
 * ao e-mail, ao banco ou ao CRM.
 */

// Campo de uma linha (nome, telefone, localização…): sem quebra de linha nem
// caractere de controle — só chegariam por adulteração e iriam parar no
// assunto do e-mail e no CRM. Texto longo (mensagem) aceita \n e \t.
const CONTROL = /[\u0000-\u001f\u007f]/;
const MULTILINE_CONTROL = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;
const text = (max: number) =>
  z.string().trim().min(1).max(max).refine((v) => !CONTROL.test(v));
const longText = (max: number) =>
  z.string().trim().min(1).max(max).refine((v) => !MULTILINE_CONTROL.test(v));
// Campo opcional: o formulário manda "" quando o visitante deixa em branco.
const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess((v) => (typeof v === "string" && v.trim() === "" ? undefined : v), schema.optional());

// Rastreio (UTM, página): vem da URL do anúncio, não do visitante. Valor
// malformado é saneado ou descartado — nunca derruba o lead.
const tracking = (max: number) =>
  z.preprocess((v) => {
    if (typeof v !== "string") return undefined;
    return v.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max) || undefined;
  }, z.string().optional());

/** Tamanho máximo de cada campo dos formulários; o `LeadForm` aplica os mesmos. */
export const FIELD_MAX = {
  nome: 100,
  email: 100,
  telefone: 20,
  assunto: 50,
  mensagem: 5000,
  localizacao: 200,
  area: 100,
  tipo: 50,
  observacoes: 5000,
} as const;

const nome = text(FIELD_MAX.nome);
const email = z.string().trim().max(FIELD_MAX.email).refine(isEmail);
const telefone = z.string().trim().max(FIELD_MAX.telefone).refine((v) => isPhone(v) && !CONTROL.test(v));

const contato = z.object({
  type: z.literal("contato"),
  nome,
  email,
  telefone,
  assunto: optional(text(FIELD_MAX.assunto)),
  mensagem: longText(FIELD_MAX.mensagem),
});

const terreno = z.object({
  type: z.literal("terreno"),
  nome,
  telefone,
  email: optional(email),
  localizacao: text(FIELD_MAX.localizacao),
  area: optional(text(FIELD_MAX.area)),
  tipo: optional(text(FIELD_MAX.tipo)),
  observacoes: optional(longText(FIELD_MAX.observacoes)),
});

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

const utm = tracking(200);

const interesse = z.object({
  type: z.literal("interesse"),
  nome,
  telefone,
  email,
  slug: text(100),
  pagina: tracking(300),
  utm_source: utm,
  utm_medium: utm,
  utm_campaign: utm,
  utm_content: utm,
  utm_term: utm,
});

const leadSchema = z.discriminatedUnion("type", [contato, terreno, interesse]);

export type Lead = z.infer<typeof leadSchema>;
export type InterestLead = z.infer<typeof interesse>;

export function parseLead(input: unknown): { ok: true; lead: Lead } | { ok: false } {
  const r = leadSchema.safeParse(input);
  if (!r.success) return { ok: false };
  // Opcional em branco sai do objeto (não vira `email: undefined` no banco).
  const lead = Object.fromEntries(Object.entries(r.data).filter(([, v]) => v !== undefined));
  return { ok: true, lead: lead as Lead };
}
