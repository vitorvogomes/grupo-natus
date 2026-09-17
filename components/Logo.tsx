import Image from "next/image";

type LogoProps = {
  /** Usa a versão negativa (para fundos escuros). */
  negative?: boolean;
  className?: string;
};

/**
 * Logo oficial do Grupo Natus (AD-3: assets de marca em um só lugar).
 * Arquivos em public/brand — proporção original 1246×251.
 */
export function Logo({ negative = false, className }: LogoProps) {
  return (
    <Image
      src={
        negative
          ? "/brand/grupo-natus-negativa.png"
          : "/brand/grupo-natus-principal.png"
      }
      alt="Grupo Natus"
      width={1246}
      height={251}
      preload
      className={className}
    />
  );
}
