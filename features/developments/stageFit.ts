import type { DevelopmentImage } from "@/types/development";

/** A partir de quanto a diferença de proporção faz o `cover` cortar demais. */
const MAX_MISMATCH = 1.3;

/**
 * Como a foto entra no palco de proporção fixa da galeria.
 *
 * `cover` preenche o palco cortando as sobras — ótimo quando a foto tem
 * proporção parecida. Numa panorâmica 2,8:1 num palco 16:10, porém, o corte
 * leva ~40% da largura e amplia a foto ~1,75× para cobrir a altura: num
 * render pequeno é exatamente o que borra. Aí a foto entra inteira (`contain`).
 * Sem dimensões no manifesto, fica o `cover` de sempre.
 */
export function stageFit(
  image: Pick<DevelopmentImage, "width" | "height">,
  stageAspect: number,
): "cover" | "contain" {
  if (!image.width || !image.height) return "cover";
  const aspect = image.width / image.height;
  const mismatch = Math.max(aspect / stageAspect, stageAspect / aspect);
  return mismatch > MAX_MISMATCH ? "contain" : "cover";
}
