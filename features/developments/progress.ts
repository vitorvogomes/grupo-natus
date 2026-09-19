import type {
  ConstructionProgress,
  ConstructionStage,
} from "@/types/development";

/**
 * Helpers de progresso de obra (FR5).
 * TODO (processo): definir quem atualiza e a periodicidade — ver docs/CONTENT-GAPS.md.
 * O shape está pronto para migrar a Supabase (AD-5) sem mudar a UI.
 */

/**
 * Etapas de obra padronizadas pela Natus, na ordem oficial. O "Total Construído"
 * é o percentual geral (overallPercentage), não uma etapa. Fonte única: quando a
 * empresa fornecer os % reais, basta preencher por nome (ver docs/CONTENT-GAPS.md §2).
 */
export const CONSTRUCTION_STAGES = [
  "Terraplanagem",
  "Infraestrutura",
  "Fundações",
  "Estrutura",
  "Instalações",
  "Revestimento",
  "Acabamentos",
] as const;

export type ConstructionStageName = (typeof CONSTRUCTION_STAGES)[number];

/** Etapas ordenadas por `order` (não muta o array original). */
export function sortedStages(
  progress: ConstructionProgress,
): ConstructionStage[] {
  return [...progress.stages].sort((a, b) => a.order - b.order);
}

/**
 * Projeta o progresso nas 7 etapas canônicas da Natus, em ordem — casando por
 * nome com o que houver em `progress.stages` e preenchendo 0% no que faltar.
 * Garante que todo empreendimento mostre o mesmo conjunto de etapas.
 */
export function canonicalStages(
  progress: ConstructionProgress,
): ConstructionStage[] {
  const byName = new Map(progress.stages.map((s) => [s.name, s.percentage]));
  return CONSTRUCTION_STAGES.map((name, index) => ({
    name,
    order: index + 1,
    percentage: clampPercentage(byName.get(name) ?? 0),
  }));
}

/** Garante percentual dentro de [0, 100]. */
export function clampPercentage(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

/** Formata a data (ISO) como DD/MM/AAAA sem conversão de fuso. */
export function formatProgressDate(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${day}/${month}/${year}`;
}
