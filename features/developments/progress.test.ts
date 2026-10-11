import { describe, expect, it } from "vitest";
import {
  CONSTRUCTION_STAGES,
  canonicalStages,
  hasProgressToShow,
  clampPercentage,
  formatProgressDate,
} from "./progress";
import type { ConstructionProgress } from "@/types/development";

const progress: ConstructionProgress = {
  overallPercentage: 62,
  updatedAt: "2026-08-01T00:00:00.000Z",
  stages: [
    { name: "Alvenaria", percentage: 20, order: 3 },
    { name: "Fundação", percentage: 100, order: 1 },
    { name: "Estrutura", percentage: 70, order: 2 },
    // Nome fora do vocabulário (etapa antiga): não entra na projeção.
    { name: "Terraplanagem", percentage: 100, order: 0 },
  ],
};

describe("progress helpers (FR5)", () => {

  it("clampPercentage limita entre 0 e 100", () => {
    expect(clampPercentage(-5)).toBe(0);
    expect(clampPercentage(150)).toBe(100);
    expect(clampPercentage(62)).toBe(62);
  });

  it("as etapas oficiais são as 5 da Natus, na ordem da obra", () => {
    expect(CONSTRUCTION_STAGES).toEqual([
      "Fundação",
      "Estrutura",
      "Alvenaria",
      "Acabamento interno",
      "Acabamento externo",
    ]);
  });

  it("canonicalStages casa por nome e segue a ordem oficial, não a do dado", () => {
    expect(canonicalStages(progress)).toEqual([
      { name: "Fundação", percentage: 100, order: 1 },
      { name: "Estrutura", percentage: 70, order: 2 },
      { name: "Alvenaria", percentage: 20, order: 3 },
    ]);
  });

  it("canonicalStages omite as etapas em 0% (uma régua de zeros só polui)", () => {
    const stages = canonicalStages({
      overallPercentage: 2,
      stages: [
        { name: "Fundação", percentage: 10, order: 1 },
        { name: "Estrutura", percentage: 0, order: 2 },
      ],
    });
    expect(stages.map((s) => s.name)).toEqual(["Fundação"]);
    expect(canonicalStages({ overallPercentage: 0, stages: [] })).toEqual([]);
  });

  it("hasProgressToShow: total ou alguma etapa acima de 0", () => {
    expect(hasProgressToShow({ overallPercentage: 15, stages: [] })).toBe(true);
    expect(
      hasProgressToShow({
        overallPercentage: 0,
        stages: [{ name: "Fundação", percentage: 10, order: 1 }],
      }),
    ).toBe(true);
    expect(hasProgressToShow({ overallPercentage: 0, stages: [] })).toBe(false);
    expect(hasProgressToShow(undefined)).toBe(false);
  });

  it("formatProgressDate formata DD/MM/AAAA sem conversão de fuso", () => {
    expect(formatProgressDate("2026-08-01T00:00:00.000Z")).toBe("01/08/2026");
  });
});
