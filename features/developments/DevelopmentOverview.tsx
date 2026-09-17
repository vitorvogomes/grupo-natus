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
          <div className="flex h-full items-center justify-center text-sm text-muted">
            Imagem em breve
          </div>
        )}
      </div>

      <div>
        <Badge status={development.status} />
        <h2 className="mt-4 text-3xl font-semibold text-ink">
          {development.location.city}, {development.location.state}
          {development.location.address ? (
            <span className="text-ink-soft"> — {development.location.address}</span>
          ) : null}
        </h2>

        {highlights.length > 0 ? (
          <ul className="mt-6 flex flex-col">
            {highlights.map((item) => (
              <li
                key={item}
                className="border-b border-border py-3 text-ink-soft"
              >
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
