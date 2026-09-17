import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProgressTimeline } from "./ProgressTimeline";
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

describe("ProgressTimeline (FR5)", () => {
  it("mostra o progresso geral", () => {
    render(<ProgressTimeline progress={progress} />);
    expect(
      screen.getByRole("progressbar", { name: /progresso geral/i }),
    ).toHaveAttribute("aria-valuenow", "62");
  });

  it("mostra a data da última atualização", () => {
    render(<ProgressTimeline progress={progress} />);
    expect(screen.getByText(/01\/08\/2026/)).toBeInTheDocument();
  });

  it("rotula visivelmente quando os dados são ilustrativos (isPreview)", () => {
    render(<ProgressTimeline progress={{ ...progress, isPreview: true }} />);
    expect(screen.getByText(/ilustrativos/i)).toBeInTheDocument();
  });

  it("lista as etapas ordenadas por order", () => {
    render(<ProgressTimeline progress={progress} />);
    const stageBars = screen
      .getAllByRole("progressbar")
      .map((el) => el.getAttribute("aria-label"));
    expect(stageBars).toEqual([
      "Progresso geral",
      "Fundação",
      "Estrutura",
      "Acabamento",
    ]);
  });
});
