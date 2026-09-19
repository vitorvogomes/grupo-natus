import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Image } from "@/components/ui/Image";
import type { Development } from "@/types/development";

type DevelopmentOverviewProps = {
  development: Development;
};

export function DevelopmentOverview({ development }: DevelopmentOverviewProps) {
  const image = development.images[1] ?? development.images[0];
  const highlights = development.highlights ?? [];

  return (
    <div className="grid gap-10 md:grid-cols-2 md:items-center">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-surface-muted">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Imagem em breve
          </div>
        )}
      </div>

      <div>
        <Badge status={development.status} />
        <h2 className="mt-4 text-2xl font-semibold text-ink md:text-3xl">
          {development.location.city}, {development.location.state}
        </h2>
        {development.location.address ? (
          <p className="mt-1 text-ink-soft">{development.location.address}</p>
        ) : null}

        {highlights.length > 0 ? (
          <ul className="mt-6 flex flex-col gap-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-ink-soft">
                <Check
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-brand-strong"
                />
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-ink-soft">{development.summary}</p>
        )}
      </div>
    </div>
  );
}
