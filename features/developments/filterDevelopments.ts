import type { Development, DevelopmentStatus } from "@/types/development";

export type DevelopmentFilters = {
  status?: DevelopmentStatus | null;
  location?: string | null;
};

/** Rótulo de localização no formato "Cidade/UF". */
export function locationLabel(dev: Development): string {
  return `${dev.location.city}/${dev.location.state}`;
}

/** Localizações únicas presentes na lista, ordenadas. */
export function uniqueLocations(list: readonly Development[]): string[] {
  return Array.from(new Set(list.map(locationLabel))).sort((a, b) =>
    a.localeCompare(b, "pt-BR"),
  );
}

/** Filtra por status e/ou localização (ausência de filtro = sem restrição). */
export function filterDevelopments(
  list: readonly Development[],
  filters: DevelopmentFilters,
): Development[] {
  return list.filter(
    (dev) =>
      (!filters.status || dev.status === filters.status) &&
      (!filters.location || locationLabel(dev) === filters.location),
  );
}
