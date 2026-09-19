import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProgressTimeline } from "./ProgressTimeline";
import type { ConstructionProgress } from "@/types/development";

const progress: ConstructionProgress = {
  overallPercentage: 55,
  updatedAt: "2026-08-01T00:00:00.000Z",
  stages: [
    { name: "Estrutura", percentage: 80, order: 4 },
    { name: "Fundações", percentage: 100, order: 3 },
    { name: "Terraplanagem", percentage: 100, order: 1 },
  ],
};

describe("ProgressTimeline (FR5)", () => {
  it("mostra o Total Construído (percentual geral)", () => {
    render(<ProgressTimeline progress={progress} />);
    expect(
      screen.getByRole("progressbar", { name: /total construído/i }),
    ).toHaveAttribute("aria-valuenow", "55");
  });

  it("mostra a data da última atualização", () => {
    render(<ProgressTimeline progress={progress} />);
    expect(screen.getByText(/01\/08\/2026/)).toBeInTheDocument();
  });

  it("rotula visivelmente quando os dados são ilustrativos (isPreview)", () => {
    render(<ProgressTimeline progress={{ ...progress, isPreview: true }} />);
    expect(screen.getByText(/ilustrativos/i)).toBeInTheDocument();
  });

  it("projeta as 7 etapas canônicas da Natus, na ordem oficial", () => {
    render(<ProgressTimeline progress={progress} />);
    const labels = screen
      .getAllByRole("progressbar")
      .map((el) => el.getAttribute("aria-label"));
    expect(labels).toEqual([
      "Total Construído",
      "Terraplanagem",
      "Infraestrutura",
      "Fundações",
      "Estrutura",
      "Instalações",
      "Revestimento",
      "Acabamentos",
    ]);
  });

  it("usa o % informado e preenche 0% nas etapas sem dado", () => {
    render(<ProgressTimeline progress={progress} />);
    expect(
      screen.getByRole("progressbar", { name: "Estrutura" }),
    ).toHaveAttribute("aria-valuenow", "80");
    expect(
      screen.getByRole("progressbar", { name: "Infraestrutura" }),
    ).toHaveAttribute("aria-valuenow", "0");
  });
});
