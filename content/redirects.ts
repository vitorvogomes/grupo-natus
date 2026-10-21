/**
 * URLs do site antigo (WordPress em www.natusgrupo.com.br) → destino no site
 * novo. Fonte do `redirects()` do next.config.ts (308, permanente).
 *
 * Levantamento de 2026-10-20: links da home ao vivo + Wayback Machine (CDX).
 * Antes de publicar, complete com o export do Search Console (docs/seo.md §3.1).
 *
 * Regras (testadas em content/redirects.test.ts):
 * - `from` sem barra final: o Next tira a barra antes (`/x/` → `/x`), então
 *   uma entrada cobre as duas formas.
 * - `to` é uma rota que existe, nunca outra URL antiga (sem cadeias).
 * Sem imports com alias: este arquivo é lido pelo next.config.
 */
export type LegacyRedirect = { readonly from: string; readonly to: string };

export const LEGACY_REDIRECTS: readonly LegacyRedirect[] = [
  // Empreendimentos (WordPress: /portfolio-item/<slug>/)
  { from: "/portfolio-item/follow-savassi", to: "/empreendimentos/follow-savassi" },
  { from: "/portfolio-item/golden-ville-residence", to: "/empreendimentos/golden-ville-residence" },
  { from: "/portfolio-item/torres-da-lagoa", to: "/empreendimentos/torres-da-lagoa" },
  {
    from: "/portfolio-item/residenziale-colonnello-figueiredo",
    to: "/empreendimentos/residenziale-colonnello-figueiredo",
  },
  { from: "/portfolio-item/residencial-denver-bh-mg", to: "/empreendimentos/residencial-denver" },
  { from: "/portfolio-item/residencial-viver-mais-itaborai-rj", to: "/empreendimentos/viver-mais" },
  { from: "/portfolio-item/residencial-viver-mais-itaborai-rj-2", to: "/empreendimentos/viver-mais" },
  // Obras por administração: viraram a página de engenharia.
  { from: "/portfolio-item/avenida-condominio", to: "/engenharia" },
  { from: "/portfolio-item/casa-alphaville", to: "/engenharia" },
  { from: "/portfolio-item/galpao-comercial", to: "/engenharia" },
  // Página do programa: a seção MCMV fica na home.
  { from: "/portfolio-item/minha-casa-minha-vida-faixa-15", to: "/" },
  // Arquivo do portfólio.
  { from: "/portfolio-item", to: "/empreendimentos" },
  // Páginas técnicas do WordPress que o Google guardou.
  { from: "/home", to: "/" },
  { from: "/feed", to: "/" },
  { from: "/home/feed", to: "/" },
  { from: "/comments/feed", to: "/" },
  { from: "/sitemap.html", to: "/" },
  { from: "/page-sitemap.html", to: "/" },
  { from: "/sitemap-misc.html", to: "/" },
];

/** Formato do `redirects()` do Next. */
export function toNextRedirects(list: readonly LegacyRedirect[] = LEGACY_REDIRECTS) {
  return list.map(({ from, to }) => ({ source: from, destination: to, permanent: true }));
}
