import { describe, expect, it } from "vitest";
import {
  CONSTRUCTION_STAGES,
  canonicalStages,
  sortedStages,
  clampPercentage,
  formatProgressDate,
} from "./progress";
import type { ConstructionProgress } from "@/types/development";

const progress: ConstructionProgress = {
  overallPercentage: 62,
  updatedAt: "2026-08-01T00:00:00.000Z",
  stages: [
    { name: "Acabamento", percentage: 20, order: 3 },
    { name: "Fundação", percentage: 100, order: 1 },
    { name: "Estrutura", percentage: 70, order: 2 },
  ],
};

describe("progress helpers (FR5)", () => {
  it("ordena as etapas por 'order'", () => {
    expect(sortedStages(progress).map((s) => s.name)).toEqual([
      "Fundação",
      "Estrutura",
      "Acabamento",
    ]);
  });

  it("clampPercentage limita entre 0 e 100", () => {
    expect(clampPercentage(-5)).toBe(0);
    expect(clampPercentage(150)).toBe(100);
    expect(clampPercentage(62)).toBe(62);
  });

  it("canonicalStages projeta as 7 etapas da Natus, em ordem", () => {
    expect(canonicalStages(progress).map((s) => s.name)).toEqual([
      ...CONSTRUCTION_STAGES,
    ]);
  });

  it("canonicalStages casa por nome e preenche 0% no que falta", () => {
    const stages = canonicalStages(progress);
    const byName = Object.fromEntries(stages.map((s) => [s.name, s.percentage]));
    // "Fundações" (canônico) difere de "Fundação" (input antigo) → fica 0.
    expect(byName["Estrutura"]).toBe(70);
    expect(byName["Fundações"]).toBe(0);
    expect(byName["Terraplanagem"]).toBe(0);
  });

  it("formatProgressDate formata DD/MM/AAAA sem conversão de fuso", () => {
    expect(formatProgressDate("2026-08-01T00:00:00.000Z")).toBe("01/08/2026");
  });
});
