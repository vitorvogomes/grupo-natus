import type { DevelopmentImage } from "@/types/development";

/** Seleciona a imagem principal: kind 'hero' se houver, senão a primeira. */
export function pickHeroImage(
  images: readonly DevelopmentImage[],
): DevelopmentImage | undefined {
  return images.find((img) => img.kind === "hero") ?? images[0];
}
