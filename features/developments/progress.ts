import type {
  ConstructionProgress,
  ConstructionStage,
} from "@/types/development";

/**
 * Helpers de progresso de obra (FR5). Os percentuais são informados pelo
 * cliente e atualizados no seed.
 * O shape está pronto para migrar a Supabase (AD-5) sem mudar a UI.
 */

/**
 * Critérios de progresso da Natus (revisão v3), na ordem da obra. O "Total
 * Construído" é o percentual geral (overallPercentage), não uma etapa. Fonte
 * única: quando a empresa fornecer os % reais, basta preencher por nome (ver
 * docs/CONTENT-GAPS.md §2).
 */
export const CONSTRUCTION_STAGES = [
  "Fundação",
  "Estrutura",
  "Alvenaria",
  "Acabamento interno",
  "Acabamento externo",
] as const;


/**
 * Projeta o progresso nas etapas oficiais da Natus, em ordem — casando por
 * nome com o que houver em `progress.stages`. Etapas em 0% (ou ausentes)
 * ficam de fora: numa obra no início, cinco barras quase todas vazias
 * escondem a única que diz algo. Lista vazia = nada a mostrar.
 */
export function canonicalStages(
  progress: ConstructionProgress,
): ConstructionStage[] {
  const byName = new Map(progress.stages.map((s) => [s.name, s.percentage]));
  return CONSTRUCTION_STAGES.map((name, index) => ({
    name,
    order: index + 1,
    percentage: clampPercentage(byName.get(name) ?? 0),
  })).filter((stage) => stage.percentage > 0);
}

/**
 * Há o que mostrar na seção de obra: o total ou alguma etapa acima de 0.
 * Só o total já é informação — sem etapas detalhadas, a seção mostra a barra
 * de "Total Construído" sozinha.
 */
export function hasProgressToShow(
  progress: ConstructionProgress | undefined,
): progress is ConstructionProgress {
  return (
    !!progress &&
    (clampPercentage(progress.overallPercentage) > 0 ||
      canonicalStages(progress).length > 0)
  );
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
