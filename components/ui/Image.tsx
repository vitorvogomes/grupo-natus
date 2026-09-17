import NextImage, { type ImageProps as NextImageProps } from "next/image";

/**
 * Wrapper único de next/image (NFR1/NFR3). O `alt` é obrigatório —
 * use `alt=""` explicitamente apenas para imagens puramente decorativas.
 */
export type ImageProps = NextImageProps & { alt: string };

export function Image(props: ImageProps) {
  return <NextImage {...props} />;
}
