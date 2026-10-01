import type { DevelopmentLocation } from "@/types/development";

/** Query de mapa: coordenadas > endereço completo > null (só cidade/UF). */
function mapQuery(loc: DevelopmentLocation): string | null {
  if (loc.lat != null && loc.lng != null) return `${loc.lat},${loc.lng}`;
  if (loc.address) return `${loc.address}, ${loc.city}, ${loc.state}`;
  return null;
}

/**
 * URL de embed do Google Maps (sem API key). `null` quando só há cidade/UF —
 * nesse caso a UI degrada para link (FR7).
 */
export function buildMapEmbedUrl(loc: DevelopmentLocation): string | null {
  const query = mapQuery(loc);
  if (!query) return null;
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

/**
 * Link do Waze. Coordenada é o que o app entende sem ambiguidade; sem ela
 * sobra a busca textual, que no Waze erra mais que no Google — por isso o
 * endereço completo, e não só a cidade.
 */
export function buildWazeLink(loc: DevelopmentLocation): string {
  if (loc.lat != null && loc.lng != null) {
    return `https://www.waze.com/ul?ll=${loc.lat}%2C${loc.lng}&navigate=yes`;
  }
  const query = loc.address
    ? `${loc.address}, ${loc.city}, ${loc.state}`
    : `${loc.city}, ${loc.state}`;
  return `https://www.waze.com/ul?q=${encodeURIComponent(query)}&navigate=yes`;
}

/** Link para o Google Maps: usa googleMapsUrl se houver, senão busca. */
export function buildMapLink(loc: DevelopmentLocation): string {
  if (loc.googleMapsUrl) return loc.googleMapsUrl;
  const query = mapQuery(loc) ?? `${loc.city}, ${loc.state}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
