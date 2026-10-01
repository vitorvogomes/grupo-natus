import { MapPin, Navigation } from "lucide-react";
import { buildMapLink, buildWazeLink } from "@/lib/maps";
import { cn } from "@/lib/utils";
import { DevelopmentMap } from "./DevelopmentMap";
import type { DevelopmentLocation as Location } from "@/types/development";

type DevelopmentLocationProps = {
  name: string;
  location: Location;
};

const routeButtonClass = cn(
  "inline-flex items-center gap-2 rounded-full border border-navy-200/50 px-5 py-2.5",
  "text-sm font-medium text-white transition-colors hover:bg-white/10",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
);

export function DevelopmentLocation({
  name,
  location,
}: DevelopmentLocationProps) {
  return (
    <section>
      <div className="bg-navy-600 text-navy-50">
        <div className="mx-auto max-w-[var(--container-max)] px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:items-start md:gap-12">
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Localização
            </h2>
            {location.note ? (
              <p className="max-w-prose text-lg leading-relaxed text-navy-100">
                {location.note}
              </p>
            ) : null}
          </div>

          <div className="mt-10 flex flex-col gap-6 border-t border-navy-400/50 pt-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                Empreendimento
              </p>
              <p className="mt-1 inline-flex items-start gap-2 text-navy-50">
                <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0" />
                <span>
                  {location.address ? `${location.address}, ` : null}
                  {location.city} — {location.state}
                </span>
              </p>
            </div>

            {/* Rota é o que a pessoa realmente quer daqui; o mapa abaixo só
                situa. Por isso os dois apps ficam acima dele, não dentro. */}
            <div className="flex flex-wrap gap-3">
              <a
                href={buildMapLink(location)}
                target="_blank"
                rel="noopener noreferrer"
                className={routeButtonClass}
              >
                Google Maps
                <MapPin aria-hidden="true" className="size-4" />
              </a>
              <a
                href={buildWazeLink(location)}
                target="_blank"
                rel="noopener noreferrer"
                className={routeButtonClass}
              >
                Waze
                <Navigation aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <DevelopmentMap
        name={name}
        location={location}
        className="block h-[380px] w-full border-0 md:h-[460px]"
      />
    </section>
  );
}
