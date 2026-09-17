import type { Development } from "@/types/development";
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

// Valida na carga do módulo: slug duplicado é erro de conteúdo.
assertUniqueSlugs(developments);

export function getAllDevelopments(): readonly Development[] {
  return developments;
}

export function getDevelopmentBySlug(slug: string): Development | undefined {
  return findBySlug(developments, slug);
}
