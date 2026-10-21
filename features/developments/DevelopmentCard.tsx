import Link from "next/link";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import { Image } from "@/components/ui/Image";
import { cn } from "@/lib/utils";
import { DevelopmentBadges, SalesBand } from "./DevelopmentBadges";
import { formatLocality } from "./locality";
import { PLACEHOLDER_IMAGE, pickHeroImage } from "./pickHeroImage";
import { coverSizes } from "./coverSizes";
import type { Development } from "@/types/development";

type DevelopmentCardProps = {
  development: Development;
};

export function DevelopmentCard({ development }: DevelopmentCardProps) {
  const hero = pickHeroImage(development.images);
  const href = `/empreendimentos/${development.slug}`;

  return (
    <Card
      as="article"
      className="group flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
        <Image
          src={hero ? hero.src : PLACEHOLDER_IMAGE}
          alt={hero ? hero.alt : `${development.name} — imagem em breve`}
          fill
          sizes={coverSizes(hero ?? {}, [
            { upTo: 768, vw: 100, aspect: 4 / 3 },
            { vw: 33, aspect: 4 / 3 },
          ])}
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
        {hero ? null : (
          <span className="absolute bottom-3 left-3 rounded-full bg-navy-900/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            Imagem em breve
          </span>
        )}
        <DevelopmentBadges
          development={development}
          className="absolute inset-x-3 top-3"
        />
      </div>

      {development.salesBand ? <SalesBand band={development.salesBand} /> : null}

      <div className="flex flex-1 flex-col p-4">
        {/* Nome + UF no selo (ref. Novolar): a UF separa as duas praças da
            Natus num relance, e a linha de baixo fica livre para o bairro. */}
        <div className="flex items-start justify-between gap-3 border-b border-border pb-3">
          <h3 className="text-lg font-semibold leading-snug text-ink">
            {development.name}
          </h3>
          <span className="shrink-0 rounded-md border border-ink/30 px-1.5 py-0.5 text-xs font-semibold text-ink">
            <span className="sr-only">Estado: </span>
            {development.location.state}
          </span>
        </div>
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
          {formatLocality(development.location)}
        </p>
        {development.features.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {development.features.slice(0, 3).map((f) => (
              <li
                key={f.label}
                className="rounded-full bg-surface-muted px-3 py-1 text-xs text-ink"
              >
                {f.value ? `${f.label}: ${f.value}` : f.label}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto pt-4">
          {/* O nome entra no rótulo acessível: numa lista de 11 cards, 11 links
              chamados só "Ver empreendimento" são indistinguíveis para quem
              navega por links. O texto visível segue contido no nome (WCAG 2.5.3). */}
          <Link
            href={href}
            aria-label={`Ver empreendimento ${development.name}`}
            className={cn(buttonVariants({ variant: "primary" }), "w-full")}
          >
            Ver empreendimento
          </Link>
        </div>
      </div>
    </Card>
  );
}
