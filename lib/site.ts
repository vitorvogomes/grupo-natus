/**
 * Configuração institucional do site (fonte única). Contatos confirmados pelo
 * cliente em 2026-10-17.
 */

/**
 * URL canônica do site: o domínio atual, com `www`, que é o que o Google já
 * indexa (docs/seo.md §2.1). A versão sem `www` redireciona na hospedagem.
 */
export const SITE_URL = "https://www.natusgrupo.com.br";

/**
 * Cor da barra do navegador no celular (`viewport.themeColor`). A meta tag
 * exige um literal; o teste garante que é o token --color-navy-700 (AD-7).
 */
export const THEME_COLOR = "#1d3145";

/** Rotas estáticas indexáveis (sitemap e validação dos redirects). */
export const STATIC_ROUTES = [
  "/",
  "/empreendimentos",
  "/engenharia",
  "/quem-somos",
  "/negocie-seu-terreno",
  "/contato",
  "/politica-de-privacidade",
] as const;

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

/** Sede, em partes: endereço estruturado do JSON-LD e, montado, `CONTACT.address`. */
export const HEADQUARTERS = {
  street: "Av. Getúlio Vargas, 1621",
  neighborhood: "Savassi",
  city: "Belo Horizonte",
  state: "MG",
} as const;

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
  phone: "+5531984663280",
  phoneDisplay: "(31) 98466-3280",
  email: "contato@natusgrupo.com.br",
  address: `${HEADQUARTERS.street} — ${HEADQUARTERS.neighborhood}, ${HEADQUARTERS.city}/${HEADQUARTERS.state}`,
  hours: "Seg–Sex, 09:00–19:00",
  mapsUrl: "https://www.google.com/maps?cid=2292552258238749315",
} as const;

/**
 * Dados legais do rodapé (CNPJ informado pelo cliente em 2026-10-17; o CRECI
 * foi descartado pelo cliente). Campo vazio não é renderizado.
 */
export const LEGAL: Readonly<{ cnpj?: string }> = {
  cnpj: "24.353.357/0001-11",
};

/** Perfis oficiais (rodapé + `sameAs` do JSON-LD). */
export const SOCIAL = {
  instagram: "https://www.instagram.com/gruponatus/",
  facebook: "https://www.facebook.com/p/Grupo-Natus-100093927445460/",
  linkedin: "https://www.linkedin.com/company/grupo-natus/",
} as const;
