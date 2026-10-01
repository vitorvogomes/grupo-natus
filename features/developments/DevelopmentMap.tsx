"use client";

import { useEffect, useRef } from "react";
import { buildMapEmbedUrl } from "@/lib/maps";
import type { DevelopmentLocation } from "@/types/development";

type DevelopmentMapProps = {
  name: string;
  location: DevelopmentLocation;
  className?: string;
};

/** Dimensões CSS do pin (o arquivo é 2x, ver scripts/optimize-images.mjs). */
const PIN_W = 51;
const PIN_H = 62;

type MapsGlobal = {
  maps: { importLibrary: (name: string) => Promise<unknown> };
};

/**
 * Carrega a JS API uma única vez por documento. A promessa fica no módulo
 * porque dois mapas na mesma página pediriam o mesmo script duas vezes — e o
 * segundo `<script>` do Google derruba o primeiro com um aviso no console.
 */
let apiLoader: Promise<void> | null = null;

function loadMapsApi(key: string): Promise<void> {
  apiLoader ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      key,
    )}&loading=async&libraries=marker&v=weekly`;
    script.async = true;
    script.dataset.googleMaps = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Maps não carregou"));
    document.head.appendChild(script);
  });
  return apiLoader;
}

/**
 * Mapa da seção Localização.
 *
 * Dois caminhos, escolhidos pela presença das chaves:
 *
 * - **Sem chave** (estado atual do projeto): o embed público do Google, que
 *   não aceita marcador customizado — ele desenha o próprio pin vermelho.
 *   Custa zero e funciona em local.
 * - **Com `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` + `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID`**:
 *   a JS API com um `AdvancedMarkerElement` carregando o pin da Natus. O
 *   Map ID não é opcional — marcador avançado sem ele não renderiza.
 *
 * Em qualquer um dos dois, os botões Google Maps/Waze acima do mapa são o
 * caminho real de navegação; o mapa aqui localiza, não roteiriza.
 */
export function DevelopmentMap({
  name,
  location,
  className,
}: DevelopmentMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;
  const { lat, lng } = location;
  const branded = Boolean(apiKey && mapId && lat != null && lng != null);

  useEffect(() => {
    if (!branded) return;
    let cancelled = false;

    loadMapsApi(apiKey!)
      .then(async () => {
        const api = (window as unknown as { google?: MapsGlobal }).google;
        if (cancelled || !ref.current || !api) return;

        // A API é carregada por <script>, então não há tipos em tempo de
        // compilação; os casts abaixo são o contrato documentado da v3.
        const { Map } = (await api.maps.importLibrary("maps")) as {
          Map: new (el: HTMLElement, opts: Record<string, unknown>) => unknown;
        };
        const { AdvancedMarkerElement } = (await api.maps.importLibrary(
          "marker",
        )) as {
          AdvancedMarkerElement: new (opts: Record<string, unknown>) => unknown;
        };
        if (cancelled || !ref.current) return;

        const center = { lat, lng };
        const map = new Map(ref.current, {
          center,
          zoom: 16,
          mapId,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });

        const pin = document.createElement("img");
        pin.src = "/brand/pin-natus.png";
        pin.width = PIN_W;
        pin.height = PIN_H;
        pin.alt = "";
        new AdvancedMarkerElement({ map, position: center, content: pin, title: name });
      })
      .catch(() => {
        // Mapa é acessório: se a API não carregar (chave inválida, offline,
        // bloqueador), a seção segue com endereço e os dois botões.
      });

    return () => {
      cancelled = true;
    };
  }, [branded, apiKey, mapId, lat, lng, name]);

  if (branded) {
    return (
      <div
        ref={ref}
        role="application"
        aria-label={`Mapa de ${name}`}
        className={className}
      />
    );
  }

  const embedUrl = buildMapEmbedUrl(location);
  if (!embedUrl) return null;

  return (
    <iframe
      title={`Mapa de ${name}`}
      src={embedUrl}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={className}
    />
  );
}
