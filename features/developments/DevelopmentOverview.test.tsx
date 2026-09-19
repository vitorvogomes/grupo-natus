import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DevelopmentOverview } from "./DevelopmentOverview";
import type { Development } from "@/types/development";

const base: Development = {
  slug: "x",
  name: "X",
  status: "em_construcao",
  location: { city: "Belo Horizonte", state: "MG", address: "Savassi" },
  summary: "Resumo factual do empreendimento",
  description: "d",
  images: [
    { src: "/empreendimentos/follow-savassi/fachada-diurna.jpg", alt: "Fachada", kind: "externa" },
  ],
  features: [],
  highlights: ["Lazer no rooftop", "Localização privilegiada"],
};

describe("DevelopmentOverview", () => {
  it("mostra badge de status e localização", () => {
    render(<DevelopmentOverview development={base} />);
    expect(screen.getByText("Em construção")).toBeInTheDocument();
    expect(screen.getByText(/Belo Horizonte/)).toBeInTheDocument();
  });

  it("lista os destaques quando existem", () => {
    render(<DevelopmentOverview development={base} />);
    expect(screen.getByText("Lazer no rooftop")).toBeInTheDocument();
    expect(screen.getByText("Localização privilegiada")).toBeInTheDocument();
  });

  it("cai para o resumo quando não há destaques", () => {
    render(<DevelopmentOverview development={{ ...base, highlights: [] }} />);
    expect(
      screen.getByText("Resumo factual do empreendimento"),
    ).toBeInTheDocument();
  });
});
