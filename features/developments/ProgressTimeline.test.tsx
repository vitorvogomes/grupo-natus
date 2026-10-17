import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProgressTimeline } from "./ProgressTimeline";
import type {
  ConstructionProgress,
  DevelopmentImage,
} from "@/types/development";

const progress: ConstructionProgress = {
  overallPercentage: 55,
  updatedAt: "2026-08-01T00:00:00.000Z",
  stages: [
    { name: "Fundação", percentage: 100, order: 1 },
    { name: "Estrutura", percentage: 40, order: 2 },
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

  it("mostra só as etapas com avanço, na ordem oficial", () => {
    render(<ProgressTimeline progress={progress} />);
    expect(rotulos()).toEqual(["Total Construído", "Fundação", "Estrutura"]);
  });

  it("etapa em 0% não aparece", () => {
    render(<ProgressTimeline progress={progress} />);
    expect(
      screen.queryByRole("progressbar", { name: "Alvenaria" }),
    ).not.toBeInTheDocument();
  });

  it("rotula percentuais ilustrativos como tais", () => {
    render(<ProgressTimeline progress={{ ...progress, isPreview: true }} />);
    expect(screen.getByText(/ilustrativos/i)).toBeInTheDocument();
  });

  it("com fotos, abre a galeria do canteiro", () => {
    render(<ProgressTimeline progress={progress} photos={fotos} />);
    expect(
      screen.getByRole("button", { name: /ampliar imagem: obra 1/i }),
    ).toBeInTheDocument();
  });

  it("mostra a galeria do canteiro quando há fotos", () => {
    render(<ProgressTimeline progress={progress} photos={fotos} />);
    expect(
      screen.getByRole("heading", { name: /acompanhamento no canteiro/i }),
    ).toBeInTheDocument();
  });

  it("sem foto, não reserva espaço para o canteiro (total e etapas lado a lado)", () => {
    render(<ProgressTimeline progress={progress} />);
    expect(
      screen.queryByRole("heading", { name: /acompanhamento no canteiro/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/fotos da obra em breve/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /ampliar imagem/i }),
    ).not.toBeInTheDocument();
    expect(rotulos()).toEqual(["Total Construído", "Fundação", "Estrutura"]);
  });

  it("só com o total (sem etapas), mostra o total e omite a lista vazia", () => {
    render(<ProgressTimeline progress={{ overallPercentage: 15, stages: [] }} />);
    expect(rotulos()).toEqual(["Total Construído"]);
    expect(screen.queryByText(/etapas da obra/i)).not.toBeInTheDocument();
  });
});
