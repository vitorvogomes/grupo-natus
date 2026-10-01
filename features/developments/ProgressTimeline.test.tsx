import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProgressTimeline } from "./ProgressTimeline";
import { CONSTRUCTION_STAGES } from "./progress";
import type {
  ConstructionProgress,
  DevelopmentImage,
} from "@/types/development";

const progress: ConstructionProgress = {
  overallPercentage: 55,
  updatedAt: "2026-08-01T00:00:00.000Z",
  stages: [
    { name: "Terraplanagem", percentage: 100, order: 1 },
    { name: "Estrutura", percentage: 40, order: 4 },
  ],
};

const fotos: DevelopmentImage[] = [
  { src: "/brand/grupo-natus-principal.png", alt: "Obra 1", kind: "obra" },
  { src: "/brand/grupo-natus-preta.png", alt: "Obra 2", kind: "obra" },
];

function rotulos() {
  return screen
    .getAllByRole("progressbar")
    .map((el) => el.getAttribute("aria-label"));
}

describe("ProgressTimeline", () => {
  it("destaca o total construído e a data de atualização", () => {
    render(<ProgressTimeline progress={progress} />);
    expect(
      screen.getByRole("progressbar", { name: /total construído/i }),
    ).toHaveAttribute("aria-valuenow", "55");
    expect(screen.getByText(/01\/08\/2026/)).toBeInTheDocument();
  });

  it("mostra sempre as 7 etapas oficiais da Natus, na ordem", () => {
    render(<ProgressTimeline progress={progress} />);
    expect(rotulos()).toEqual(["Total Construído", ...CONSTRUCTION_STAGES]);
  });

  it("etapa sem dado aparece como 0%, não some", () => {
    render(<ProgressTimeline progress={progress} />);
    expect(
      screen.getByRole("progressbar", { name: "Acabamentos" }),
    ).toHaveAttribute("aria-valuenow", "0");
  });

  it("rotula percentuais ilustrativos como tais", () => {
    render(<ProgressTimeline progress={{ ...progress, isPreview: true }} />);
    expect(screen.getByText(/ilustrativos/i)).toBeInTheDocument();
  });

  it("mostra a galeria do canteiro quando há fotos", () => {
    render(<ProgressTimeline progress={progress} photos={fotos} />);
    expect(
      screen.getByRole("button", { name: /ampliar imagem: obra 1/i }),
    ).toBeInTheDocument();
  });

  it("sem foto, mostra o painel de acompanhamento em breve", () => {
    render(<ProgressTimeline progress={progress} />);
    expect(screen.getByText(/fotos da obra em breve/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /ampliar imagem/i }),
    ).not.toBeInTheDocument();
  });
});
