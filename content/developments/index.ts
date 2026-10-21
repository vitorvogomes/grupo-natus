import type { Development } from "@/types/development";
import { DEVELOPMENT_STATUSES } from "@/types/development";
import { developments } from "./data";

/** Garante unicidade de slug (identificador do empreendimento — AD-2). */
export function assertUniqueSlugs(list: readonly Development[]): void {
  const seen = new Set<string>();
  for (const dev of list) {
    if (seen.has(dev.slug)) {
      throw new Error(`Slug de empreendimento duplicado: ${dev.slug}`);
    }
    seen.add(dev.slug);
  }
}

/** Busca pura por slug numa lista. */
export function findBySlug(
  list: readonly Development[],
  slug: string,
): Development | undefined {
  return list.find((dev) => dev.slug === slug);
}

/**
 * Ordena pela prioridade do status (`DEVELOPMENT_STATUSES`): lançamentos são
 * os destaques e abrem toda vitrine; breve lançamento fecha. A ordenação é
 * estável — dentro de um status vale a ordem do seed.
 */
export function sortByStatusPriority(
  list: readonly Development[],
): Development[] {
  const rank = (dev: Development) => DEVELOPMENT_STATUSES.indexOf(dev.status);
  return [...list].sort((a, b) => rank(a) - rank(b));
}

// Valida na carga do módulo: slug duplicado é erro de conteúdo.
assertUniqueSlugs(developments);

const ordered = sortByStatusPriority(developments);

/** Catálogo inteiro, na ordem de prioridade (Home, catálogo, "explore"). */
export function getAllDevelopments(): readonly Development[] {
  return ordered;
}

export function getDevelopmentBySlug(slug: string): Development | undefined {
  return findBySlug(developments, slug);
}

