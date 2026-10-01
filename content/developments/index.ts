import type { Development, DevelopmentStatus } from "@/types/development";
import { DEVELOPMENT_STATUSES, STATUS_META } from "@/types/development";
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

/**
 * Curadoria editorial da Home: estes abrem o carrossel, nesta ordem.
 * Critério: empreendimentos com imagens próprias cadastradas — quem abre a
 * Home não entra com placeholder. Solar Manilha entra quando os renders
 * chegarem (ver docs/CONTENT-GAPS.md).
 */
export const FEATURED_SLUGS = [
  "follow-savassi",
  "golden-ville-residence",
  "torres-da-lagoa",
] as const;

/**
 * Catálogo inteiro na ordem da Home: destaques primeiro, depois o restante
 * na ordem de `data.ts`. O carrossel mostra todos — a curadoria define quem
 * aparece primeiro, não quem aparece. Slug de destaque sem correspondência é
 * ignorado: um erro de curadoria custa a posição, nunca um empreendimento.
 */
export function getHomeDevelopments(): readonly Development[] {
  const featured = FEATURED_SLUGS.flatMap(
    (slug) => getDevelopmentBySlug(slug) ?? [],
  );
  const featuredSlugs = new Set(featured.map((dev) => dev.slug));
  return [
    ...featured,
    ...getAllDevelopments().filter((dev) => !featuredSlugs.has(dev.slug)),
  ];
}

export type StatusNavGroup = {
  status: DevelopmentStatus;
  label: string;
  items: { name: string; slug: string }[];
};

/**
 * Empreendimentos agrupados por status (mega-menu do header). Só grupos com
 * itens; ordem canônica de `DEVELOPMENT_STATUSES`.
 */
export function getDevelopmentsGroupedByStatus(): StatusNavGroup[] {
  const all = getAllDevelopments();
  return DEVELOPMENT_STATUSES.map((status) => ({
    status,
    label: STATUS_META[status].label,
    items: all
      .filter((dev) => dev.status === status)
      .map((dev) => ({ name: dev.name, slug: dev.slug })),
  })).filter((group) => group.items.length > 0);
}
