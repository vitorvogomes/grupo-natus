import type { Metadata } from "next";
import type { Development } from "@/types/development";
import { PROPERTY_TYPE_LABELS, STATUS_META } from "@/types/development";
import { pickHeroImage } from "@/features/developments/pickHeroImage";

export const SITE_NAME = "Grupo Natus";

/** Título da home: nome + descritor (distingue a marca na busca, docs/seo.md §5). */
export const HOME_TITLE = "Grupo Natus — Incorporadora e construtora em BH e no RJ";

export const HOME_DESCRIPTION =
  "Empreendimentos do Grupo Natus em Belo Horizonte, região metropolitana e Leste Fluminense: lançamentos, obras em andamento e imóveis prontos, do Minha Casa Minha Vida ao alto luxo.";

/** Imagem de compartilhamento padrão (gerada pelo `optimize:images brand`). */
export const DEFAULT_SHARE_IMAGE = {
  url: "/brand/og-grupo-natus.jpg",
  width: 1200,
  height: 630,
  alt: "Grupo Natus",
};

type ShareImage = { url: string; width?: number; height?: number; alt?: string };

/**
 * Metadados de uma página: canônica + Open Graph + Twitter. O Next substitui
 * (não mescla) o `openGraph` do layout quando a página declara o seu, então
 * todo o bloco sai daqui — siteName e locale nunca se perdem.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_SHARE_IMAGE,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: ShareImage;
  /** Sem o sufixo " | Grupo Natus" do template (a home já leva a marca). */
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: SITE_NAME,
      url: path,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

function locality(dev: Development): string {
  const { neighborhood, city, state } = dev.location;
  return neighborhood ? `${neighborhood}, ${city}/${state}` : `${city}/${state}`;
}

/**
 * Título com a intenção de busca, montado só do dado:
 * "{nome} — {tipo} em {bairro}, {cidade}/{UF}". O breve lançamento diz o que é.
 */
export function developmentTitle(dev: Development): string {
  if (dev.status === "breve_lancamento") {
    return `${dev.name} — ${STATUS_META.breve_lancamento.label} em ${dev.location.city}/${dev.location.state}`;
  }
  const kind = dev.propertyType ? PROPERTY_TYPE_LABELS[dev.propertyType] : STATUS_META[dev.status].label;
  return `${dev.name} — ${kind} em ${locality(dev)}`;
}

export function developmentMetadata(dev: Development): Metadata {
  const cover = dev.status === "breve_lancamento" ? undefined : pickHeroImage(dev.images);
  return pageMetadata({
    title: developmentTitle(dev),
    description: dev.summary,
    path: `/empreendimentos/${dev.slug}`,
    image: cover
      ? { url: cover.src, width: cover.width, height: cover.height, alt: cover.alt }
      : DEFAULT_SHARE_IMAGE,
  });
}
