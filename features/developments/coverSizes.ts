import type { DevelopmentImage } from "@/types/development";

type Dimensions = Pick<DevelopmentImage, "width" | "height">;

/**
 * Quantas vezes a largura do bloco uma foto `object-cover` ocupa: 1 até a
 * proporção do bloco; acima dela, a sobra que o corte joga fora.
 */
export function coverFactor(image: Dimensions, boxAspect: number): number {
  const aspect = image.width && image.height ? image.width / image.height : boxAspect;
  return Math.max(1, aspect / boxAspect);
}

/** Uma faixa de viewport do `sizes`. */
export type CoverBox = {
  /** Até esta largura de viewport (px). Ausente = o restante (vai por último). */
  upTo?: number;
  /** Largura do bloco, em vw. */
  vw: number;
  /** Proporção do bloco (largura / altura). */
  aspect: number;
  /**
   * Teto do fator. No hero (LCP com preload), sem teto o celular pediria a
   * fonte inteira: troca-se um pouco de nitidez por bytes.
   */
  maxFactor?: number;
};

/**
 * `sizes` do next/image para uma foto com `object-cover` num bloco de
 * proporção fixa. Uma foto mais larga que o bloco precisa de largura extra
 * para cobrir a altura: uma panorâmica 2,8:1 num bloco 4:3 pede ~2,1× a
 * largura do bloco. Com o `sizes` do bloco ela chega pequena e é ampliada.
 *
 * O fator vem das dimensões reais (manifesto gerado pelo pipeline de
 * imagens), então só as fotos que precisam pagam os bytes a mais.
 */
export function coverSizes(image: Dimensions, boxes: readonly CoverBox[]): string {
  return boxes
    .map(({ upTo, vw, aspect, maxFactor = Infinity }) => {
      const factor = Math.min(maxFactor, coverFactor(image, aspect));
      const size = `${Math.round(vw * factor)}vw`;
      return upTo ? `(max-width: ${upTo}px) ${size}` : size;
    })
    .join(", ");
}
