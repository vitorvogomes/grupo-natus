import {
  DEVELOPMENT_STATUSES,
  PROPERTY_TYPES,
  type DevelopmentStatus,
  type PropertyType,
} from "@/types/development";
import type { Development } from "@/types/development";
import { uniqueLocations, type DevelopmentFilters } from "./filterDevelopments";

/** Nomes dos query params na URL pública (em português, como o resto do site). */
export const FILTER_PARAMS = {
  status: "status",
  location: "cidade",
  propertyType: "tipo",
} as const;

/** Primeiro valor de um param que pode chegar repetido (`?cidade=a&cidade=b`). */
function first(value: string | string[] | undefined): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw ? raw : undefined;
}

/**
 * Query params da URL → filtros validados. Valor que não corresponde a nada é
 * descartado, nunca lançado: uma URL adulterada mostra o catálogo inteiro, não
 * um resultado vazio sem explicação.
 *
 * `known` é a lista contra a qual validar `cidade`. Sem ela, uma cidade escrita
 * sem acento ou um empreendimento removido deixariam o catálogo em zero com o
 * select em branco — nada na tela diria por quê.
 */
export function parseDevelopmentFilters(
  raw: Record<string, string | string[] | undefined>,
  known?: readonly Development[],
): DevelopmentFilters {
  const filters: DevelopmentFilters = {};

  const status = first(raw[FILTER_PARAMS.status]);
  if (status && (DEVELOPMENT_STATUSES as readonly string[]).includes(status)) {
    filters.status = status as DevelopmentStatus;
  }

  const location = first(raw[FILTER_PARAMS.location]);
  if (location && (!known || uniqueLocations(known).includes(location))) {
    filters.location = location;
  }

  const type = first(raw[FILTER_PARAMS.propertyType]);
  if (type && (PROPERTY_TYPES as readonly string[]).includes(type)) {
    filters.propertyType = type as PropertyType;
  }

  return filters;
}

/** Filtros → href do catálogo. Sem filtro ativo, nem `?` aparece. */
export function buildDevelopmentsHref(filters: DevelopmentFilters): string {
  const query = new URLSearchParams();
  if (filters.status) query.set(FILTER_PARAMS.status, filters.status);
  if (filters.location) query.set(FILTER_PARAMS.location, filters.location);
  if (filters.propertyType) {
    query.set(FILTER_PARAMS.propertyType, filters.propertyType);
  }
  const qs = query.toString();
  return qs ? `/empreendimentos?${qs}` : "/empreendimentos";
}
