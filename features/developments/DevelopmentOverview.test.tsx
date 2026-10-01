import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DevelopmentOverview } from "./DevelopmentOverview";
import type { Development } from "@/types/development";

const base: Development = {
  slug: "x",
  name: "Follow Savassi",
  status: "em_construcao",
  location: { city: "Belo Horizonte", state: "MG", address: "Savassi" },
  summary: "Resumo factual do empreendimento",
  description: "Primeira linha da descrição.\nSegunda linha da descrição.",
  images: [
    { src: "/brand/grupo-natus-principal.png", alt: "Fachada", kind: "imagens" },
    { src: "/brand/grupo-natus-preta.png", alt: "Piscina", kind: "imagens" },
  ],
  features: [],
};

describe("DevelopmentOverview", () => {
  it("não repete o nome do empreendimento, que o hero já anuncia como h1", () => {
    render(<DevelopmentOverview development={base} />);
    expect(
      screen.getByRole("heading", { name: /o empreendimento/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Follow Savassi" }),
    ).not.toBeInTheDocument();
  });

  it("mostra badge de status e cidade/UF", () => {
    render(<DevelopmentOverview development={base} />);
    expect(screen.getByText("Em construção")).toBeInTheDocument();
    expect(screen.getByText(/Belo Horizonte\/MG/)).toBeInTheDocument();
  });

  it("quebra a descrição em um parágrafo por linha, sem ícone de check", () => {
    const { container } = render(<DevelopmentOverview development={base} />);
    expect(screen.getByText("Primeira linha da descrição.")).toBeInTheDocument();
    expect(screen.getByText("Segunda linha da descrição.")).toBeInTheDocument();
    expect(container.querySelector("svg.lucide-check")).toBeNull();
  });

  it("cai para o resumo enquanto a descrição for TODO", () => {
    render(
      <DevelopmentOverview
        development={{
          ...base,
          description: "TODO: CONTENT REQUIRED — descrição completa de X",
        }}
      />,
    );
    expect(
      screen.getByText("Resumo factual do empreendimento"),
    ).toBeInTheDocument();
    expect(screen.queryByText(/TODO/)).not.toBeInTheDocument();
  });

  it("sem imagem, não deixa um buraco no lugar da foto", () => {
    render(<DevelopmentOverview development={{ ...base, images: [] }} />);
    expect(screen.getByText(/imagem em breve/i)).toBeInTheDocument();
  });
});
