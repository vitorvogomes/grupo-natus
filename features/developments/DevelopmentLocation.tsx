import { buildMapEmbedUrl, buildMapLink } from "@/lib/maps";
import type { DevelopmentLocation as Location } from "@/types/development";

type DevelopmentLocationProps = {
  name: string;
  location: Location;
};

export function DevelopmentLocation({
  name,
  location,
}: DevelopmentLocationProps) {
  const embedUrl = buildMapEmbedUrl(location);
  const mapLink = buildMapLink(location);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-ink">Localização</h2>

      <p className="text-ink-soft">
        {location.address ? <span>{location.address} — </span> : null}
        {location.city}/{location.state}
      </p>

      {embedUrl ? (
        <div className="overflow-hidden rounded-lg border border-border">
          <iframe
            title={`Mapa de ${name}`}
            src={embedUrl}
            loading="lazy"
            className="aspect-video w-full"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : null}

      <a
        href={mapLink}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-brand-strong hover:text-ink"
      >
        Ver no Google Maps →
      </a>
    </section>
  );
}
