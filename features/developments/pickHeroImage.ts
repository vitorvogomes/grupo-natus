import type { DevelopmentImage } from "@/types/development";

/** Seleciona a imagem principal: primeira 'externa' (fachada) se houver, senão a primeira. */
export function pickHeroImage(
  images: readonly DevelopmentImage[],
): DevelopmentImage | undefined {
  return images.find((img) => img.kind === "externa") ?? images[0];
}
