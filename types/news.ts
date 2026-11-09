/**
 * Natus News — a newsletter mensal do Grupo Natus, publicada também no site
 * (`/news/[slug]`). Cada edição é dado (como os empreendimentos, AD-2) e o
 * texto é o do e-mail enviado, sem reescrita: o cliente pediu a página fiel
 * ao original.
 */

/** Imagem servida pelo pipeline (`optimize:images news`), com as dimensões do manifesto. */
export type NewsImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** Parágrafo em trechos; `{ strong }` reproduz o negrito do e-mail. */
export type NewsRichText = readonly (string | { strong: string })[];

/** Cabeçalho de seção: o rótulo em caixa alta e o título. */
export type NewsSectionHeading = {
  eyebrow: string;
  title: string;
};

export type NewsRadarItem = {
  /** Frase em negrito que abre o item. */
  headline: string;
  text: string;
  /** Quem publicou o dado ("Copom / Banco Central"). */
  source: string;
  /** A notícia original (link externo). */
  url: string;
};

export type NewsDevelopmentUpdate = {
  /** Empreendimento do portfólio (`content/developments`), para o link interno. */
  developmentSlug: string;
  /** Rótulo do bloco, como no e-mail ("FOLLOW SAVASSI · BELO HORIZONTE/MG"). */
  eyebrow: string;
  headline: string;
  text: string;
  image: NewsImage;
};

export type NewsEdition = {
  /** Segmento da URL: `/news/<slug>`. */
  slug: string;
  /** Como o cliente numera a edição ("Edição 0"). */
  label: string;
  /** Mês de referência, por extenso ("novembro de 2026"). */
  monthLabel: string;
  /** Data de publicação (ISO, `AAAA-MM-DD`): ordena o índice e vai para o JSON-LD. */
  publishedAt: string;
  /** Resumo da edição (o pré-cabeçalho do e-mail): meta description e índice. */
  description: string;
  /** Arte do cabeçalho. Traz o título da edição como imagem: a página põe o h1 em texto. */
  banner: NewsImage;
  intro: readonly NewsRichText[];
  stats: readonly { value: string; label: string }[];
  radar: NewsSectionHeading & { items: readonly NewsRadarItem[] };
  updates: NewsSectionHeading & { items: readonly NewsDevelopmentUpdate[] };
  invite: {
    eyebrow: string;
    title: string;
    text: string;
    cta: { label: string; href: string };
  };
  /** Fecho da edição: a assinatura e as linhas abaixo dela (aviso legal). */
  closing: { signature: string; lines: readonly string[] };
};
