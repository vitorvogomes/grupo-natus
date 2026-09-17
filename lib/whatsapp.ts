import { CONTACT } from "./site";

/** Número de WhatsApp institucional (env público, com fallback ao contato). */
export function whatsappNumber(): string {
  const fromEnv = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  return fromEnv && fromEnv.length > 0 ? fromEnv : CONTACT.whatsapp;
}

type WhatsAppOptions = {
  /** Mensagem pré-preenchida (contexto, ex.: nome do empreendimento). */
  message?: string;
  /** Telefone específico; default = número institucional. */
  phone?: string;
};

/** Monta a URL wa.me — abstração única de WhatsApp do projeto (AD-3). */
export function buildWhatsAppUrl(options: WhatsAppOptions = {}): string {
  const digits = (options.phone ?? whatsappNumber()).replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  return options.message
    ? `${base}?text=${encodeURIComponent(options.message)}`
    : base;
}
