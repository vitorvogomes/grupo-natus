/**
 * Configuração institucional do site (fonte única).
 * Contatos derivados do site atual (natusgrupo.com.br) — `TODO`: validar com a empresa.
 */

/** URL canônica do site. TODO: confirmar domínio de produção com a empresa. */
export const SITE_URL = "https://www.natusgrupo.com.br";

export type NavLink = {
  readonly label: string;
  readonly href: string;
};

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Empreendimentos", href: "/empreendimentos" },
  { label: "Serviços de Engenharia", href: "/engenharia" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Negocie seu Terreno", href: "/negocie-seu-terreno" },
  { label: "Contato", href: "/contato" },
] as const;

export type Contact = {
  readonly whatsapp: string; // E.164 sem símbolos, para wa.me
  readonly whatsappDisplay: string;
  readonly phone: string; // E.164 para href tel:
  readonly phoneDisplay: string;
  readonly email: string;
  readonly address: string;
  readonly hours: string;
  readonly mapsUrl: string; // link do perfil (place) da sede no Google Maps
};

export const CONTACT: Contact = {
  whatsapp: "5531984663280",
  whatsappDisplay: "(31) 98466-3280",
  phone: "+5531983374122",
  phoneDisplay: "(31) 98337-4122",
  email: "administrativo@natusgrupo.com.br",
  address: "Av. Getúlio Vargas, 1621 — Savassi, Belo Horizonte/MG",
  hours: "Seg–Sex, 09:00–19:00",
  mapsUrl: "https://www.google.com/maps?cid=2292552258238749315",
} as const;
