import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DevelopmentOverview } from "./DevelopmentOverview";
import type { Development } from "@/types/development";

const base: Development = {
  slug: "x",
  name: "Follow Savassi",
  status: "em_construcao",
  location: {
    city: "Belo Horizonte",
    state: "MG",
    neighborhood: "Savassi",
    address: "Av. Getúlio Vargas, 1.676",
  },
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
      screen.queryByRole("heading", { name: /o empreendimento/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Follow Savassi" }),
    ).not.toBeInTheDocument();
  });

  it("titula pela praça: 'UF,' e depois 'Bairro - Cidade'", () => {
    render(<DevelopmentOverview development={base} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "MG, Savassi - Belo Horizonte" }),
    ).toBeInTheDocument();
  });

  it("sem bairro, o título fica 'UF, Cidade'", () => {
    render(
      <DevelopmentOverview
        development={{ ...base, location: { city: "Lagoa Santa", state: "MG" } }}
      />,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "MG, Lagoa Santa" }),
    ).toBeInTheDocument();
  });

  it("não repete o endereço com pin (a seção Localização cuida disso)", () => {
    const { container } = render(<DevelopmentOverview development={base} />);
    expect(screen.queryByText(/Getúlio Vargas/)).not.toBeInTheDocument();
    expect(container.querySelector("svg.lucide-map-pin")).toBeNull();
  });

  it("mostra os selos (status + MCMV), sem a faixa de vendido (só no card)", () => {
    render(
      <DevelopmentOverview
        development={{ ...base, status: "pronto", mcmv: true, soldOut: true }}
      />,
    );
    expect(screen.getByText("Pronto para morar")).toBeInTheDocument();
    expect(screen.getByText("Minha Casa Minha Vida")).toBeInTheDocument();
    expect(screen.queryByText(/100% vendido/i)).not.toBeInTheDocument();
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

  it("pede ao next/image a largura que o corte 4:3 exige — só quando a foto é mais larga", () => {
    // Regressão: com sizes=50vw, uma panorâmica 2,8:1 chegava em ~750 px de
    // largura (~270 de altura) e era ampliada ~1,5× para cobrir o bloco.
    const comFoto = (width: number, height: number) => ({
      ...base,
      images: [base.images[0]!, { ...base.images[1]!, width, height }],
    });
    const { rerender } = render(<DevelopmentOverview development={comFoto(2095, 750)} />);
    expect(screen.getByRole("img", { name: "Piscina" })).toHaveAttribute(
      "sizes",
      "(max-width: 768px) 210vw, 105vw",
    );
    // Foto 4:3 não paga bytes a mais.
    rerender(<DevelopmentOverview development={comFoto(1200, 900)} />);
    expect(screen.getByRole("img", { name: "Piscina" })).toHaveAttribute(
      "sizes",
      "(max-width: 768px) 100vw, 50vw",
    );
  });

  it("sem imagem, não deixa um buraco no lugar da foto", () => {
    render(<DevelopmentOverview development={{ ...base, images: [] }} />);
    expect(screen.getByText(/imagem em breve/i)).toBeInTheDocument();
  });
});
