import type { NewsEdition } from "@/types/news";
import { editions } from "./data";

/** Garante unicidade de slug (é o segmento da URL). */
export function assertUniqueEditionSlugs(list: readonly NewsEdition[]): void {
  const seen = new Set<string>();
  for (const edition of list) {
    if (seen.has(edition.slug)) {
      throw new Error(`Slug de edição da Natus News duplicado: ${edition.slug}`);
    }
    seen.add(edition.slug);
  }
}

export function findEditionBySlug(
  list: readonly NewsEdition[],
  slug: string,
): NewsEdition | undefined {
  return list.find((edition) => edition.slug === slug);
}

/** "Edição 0 — novembro de 2026": a edição e o mês de referência (card do índice). */
export function editionName(edition: NewsEdition): string {
  return `${edition.label} — ${edition.monthLabel}`;
}

/** "Natus News · Edição 0 — novembro de 2026": h1, título da aba e headline do JSON-LD. */
export function newsTitle(edition: NewsEdition): string {
  return `Natus News · ${editionName(edition)}`;
}

/** Mais recente primeiro (datas ISO comparam como texto). */
export function sortByPublishedDesc(list: readonly NewsEdition[]): NewsEdition[] {
  return [...list].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

// Valida na carga do módulo: slug duplicado é erro de conteúdo.
assertUniqueEditionSlugs(editions);

const ordered = sortByPublishedDesc(editions);

/** Todas as edições, da mais recente para a mais antiga (índice /news). */
export function getAllEditions(): readonly NewsEdition[] {
  return ordered;
}

export function getEditionBySlug(slug: string): NewsEdition | undefined {
  return findEditionBySlug(editions, slug);
}
