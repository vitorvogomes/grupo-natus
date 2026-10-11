import type { DevelopmentImage } from "@/types/development";

/**
 * `sizes` do next/image para uma foto com `object-cover` num bloco de
 * proporção fixa. Uma foto mais larga que o bloco precisa de largura extra
 * para cobrir a altura: uma panorâmica 2,8:1 num bloco 4:3 pede ~2,1× a
 * largura do bloco. Com o `sizes` do bloco ela chega pequena e é ampliada.
 *
 * O fator vem das dimensões reais (manifesto gerado pelo pipeline de
 * imagens), então só as fotos que precisam pagam os bytes a mais.
 */
export function coverSizes(
  image: Pick<DevelopmentImage, "width" | "height">,
  boxAspect: number,
  desktopVw: number,
): string {
  const aspect =
    image.width && image.height ? image.width / image.height : boxAspect;
  const factor = Math.max(1, aspect / boxAspect);
  const vw = (base: number) => `${Math.round(base * factor)}vw`;
  return `(max-width: 768px) ${vw(100)}, ${vw(desktopVw)}`;
}
