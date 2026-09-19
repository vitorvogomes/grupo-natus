import { BedDouble, MapPin, Play } from "lucide-react";
import { Image } from "@/components/ui/Image";
import { PLACEHOLDER_IMAGE, pickHeroImage } from "./pickHeroImage";
import type { Development } from "@/types/development";

type DevelopmentHeroProps = {
  development: Development;
};

export function DevelopmentHero({ development }: DevelopmentHeroProps) {
  const hero = pickHeroImage(development.images);

  return (
    <section className="relative min-h-[60vh] overflow-hidden bg-navy-700">
      <Image
        src={hero ? hero.src : PLACEHOLDER_IMAGE}
        alt={hero ? hero.alt : `${development.name} — imagem em breve`}
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      {hero ? null : (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-navy-900/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          Imagem em breve
        </span>
      )}

      {/* Overlay para legibilidade (cor de token). */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 via-navy-900/30 to-navy-900/20" />

      <div className="relative mx-auto flex min-h-[60vh] max-w-[var(--container-max)] flex-col justify-end px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white md:text-6xl">
          {development.name}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-navy-50">
          <span className="inline-flex items-center gap-2">
            <MapPin aria-hidden="true" className="size-4" />
            {development.location.city}/{development.location.state}
          </span>
          {development.tagline ? (
            <span className="inline-flex items-center gap-2">
              <BedDouble aria-hidden="true" className="size-4" />
              {development.tagline}
            </span>
          ) : null}
          {development.videoUrl ? (
            <a
              href={development.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-white hover:text-brand"
            >
              <Play aria-hidden="true" className="size-4" />
              Assista ao vídeo
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
