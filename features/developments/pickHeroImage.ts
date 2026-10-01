import type { DevelopmentImage } from "@/types/development";

/** Imagem-placeholder p/ empreendimentos ainda sem foto (foto de obra genérica). */
export const PLACEHOLDER_IMAGE = "/empreendimentos/em-construcao.webp";

/**
 * Seleciona a imagem de capa: a primeira da categoria "imagens".
 *
 * O fallback para `images[0]` existe para acervos atípicos (só plantas, só
 * canteiro) — abrir a página com uma planta cotada ou uma laje crua vende mal,
 * mas é melhor que um placeholder quando há material.
 */
export function pickHeroImage(
  images: readonly DevelopmentImage[],
): DevelopmentImage | undefined {
  return images.find((img) => img.kind === "imagens") ?? images[0];
}
