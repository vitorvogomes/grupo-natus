import type {
  ConstructionProgress,
  ConstructionStage,
} from "@/types/development";

/**
 * Helpers de progresso de obra (FR5).
 * TODO (processo): definir quem atualiza e a periodicidade — ver docs/CONTENT-GAPS.md.
 * O shape está pronto para migrar a Supabase (AD-5) sem mudar a UI.
 */

/** Etapas ordenadas por `order` (não muta o array original). */
export function sortedStages(
  progress: ConstructionProgress,
): ConstructionStage[] {
  return [...progress.stages].sort((a, b) => a.order - b.order);
}

/** Garante percentual dentro de [0, 100]. */
export function clampPercentage(value: number): number {
  return Math.max(0, Math.min(100, value));
}

/** Formata a data (ISO) como DD/MM/AAAA sem conversão de fuso. */
export function formatProgressDate(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${day}/${month}/${year}`;
}
