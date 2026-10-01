import {
  PROPERTY_TYPES,
  type Development,
  type DevelopmentStatus,
  type PropertyType,
} from "@/types/development";

export type DevelopmentFilters = {
  status?: DevelopmentStatus | null;
  location?: string | null;
  propertyType?: PropertyType | null;
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

/**
 * Tipologias presentes na lista, na ordem canônica de PROPERTY_TYPES.
 * Empreendimento sem tipologia confirmada não entra — a faceta só oferece
 * o que o conteúdo sustenta.
 */
export function uniquePropertyTypes(
  list: readonly Development[],
): PropertyType[] {
  const present = new Set(list.flatMap((dev) => dev.propertyType ?? []));
  return PROPERTY_TYPES.filter((type) => present.has(type));
}

/**
 * Filtra por status, localização e/ou tipologia (ausência de filtro = sem
 * restrição). Um empreendimento sem `propertyType` nunca casa com um filtro
 * de tipo: melhor sumir do resultado do que aparecer como palpite.
 */
export function filterDevelopments(
  list: readonly Development[],
  filters: DevelopmentFilters,
): Development[] {
  return list.filter(
    (dev) =>
      (!filters.status || dev.status === filters.status) &&
      (!filters.location || locationLabel(dev) === filters.location) &&
      (!filters.propertyType || dev.propertyType === filters.propertyType),
  );
}
