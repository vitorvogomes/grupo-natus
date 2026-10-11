import type { DevelopmentLocation } from "@/types/development";

/**
 * "Bairro - Cidade" (ou só a cidade). A UF fica de fora de propósito: o
 * resumo a mostra na linha de cima e o card num selo próprio.
 */
export function formatLocality(
  location: Pick<DevelopmentLocation, "city" | "neighborhood">,
): string {
  return location.neighborhood
    ? `${location.neighborhood} - ${location.city}`
    : location.city;
}
