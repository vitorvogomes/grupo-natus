import Link from "next/link";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { Image } from "@/components/ui/Image";
import { cn } from "@/lib/utils";
import { pickHeroImage } from "./pickHeroImage";
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
      className="group flex flex-col overflow-hidden transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
        {hero ? (
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Imagem em breve
          </div>
        )}
        <div className="absolute left-3 top-3">
          <Badge status={development.status} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-ink">{development.name}</h3>
        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
          {development.location.city}/{development.location.state}
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

        <div className="mt-auto pt-5">
          <Link
            href={href}
            className={cn(buttonVariants({ variant: "primary" }), "w-full")}
          >
            Ver empreendimento
          </Link>
        </div>
      </div>
    </Card>
  );
}
