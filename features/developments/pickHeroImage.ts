import type { DevelopmentImage } from "@/types/development";

/** Imagem-placeholder p/ empreendimentos ainda sem foto (foto de obra genérica). */
export const PLACEHOLDER_IMAGE = "/empreendimentos/em-construcao.webp";

/** Seleciona a imagem principal: primeira 'externa' (fachada) se houver, senão a primeira. */
export function pickHeroImage(
  images: readonly DevelopmentImage[],
): DevelopmentImage | undefined {
  return images.find((img) => img.kind === "externa") ?? images[0];
}
