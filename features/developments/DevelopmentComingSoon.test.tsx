import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DevelopmentComingSoon } from "./DevelopmentComingSoon";
import type { Development } from "@/types/development";

const base: Development = {
  slug: "solar-manilha",
  name: "Solar Manilha",
  status: "lancamento",
  location: { city: "Itaboraí", state: "RJ" },
  summary: "TODO: CONTENT REQUIRED — resumo de Solar Manilha",
  description: "TODO: CONTENT REQUIRED — descrição completa de Solar Manilha",
  images: [],
  features: [{ label: "Tipologia", value: "368 un. MCMV" }],
};

describe("DevelopmentComingSoon", () => {
  it("mostra o nome e o status do empreendimento", () => {
    render(<DevelopmentComingSoon development={base} />);
    expect(
      screen.getByRole("heading", { name: "Solar Manilha" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Lançamento").length).toBeGreaterThan(0);
  });

  it("transforma o que se sabe em conteúdo, não em 'em breve'", () => {
    render(<DevelopmentComingSoon development={base} />);
    expect(screen.getByText("Itaboraí/RJ")).toBeInTheDocument();
    expect(screen.getByText("Tipologia")).toBeInTheDocument();
    expect(screen.getByText("368 un. MCMV")).toBeInTheDocument();
  });

  it("nunca mostra o placeholder rotulado na tela", () => {
    render(<DevelopmentComingSoon development={base} />);
    expect(screen.queryByText(/TODO/)).not.toBeInTheDocument();
  });

  it("dá um caminho de saída pelo WhatsApp, com o nome na mensagem", () => {
    render(<DevelopmentComingSoon development={base} />);
    const link = screen.getByRole("link", { name: /quero ser avisado/i });
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("https://wa.me/"),
    );
    expect(decodeURIComponent(link.getAttribute("href")!)).toContain(
      "Solar Manilha",
    );
  });

  it("sem tipologia cadastrada, ainda lista status e localização", () => {
    render(<DevelopmentComingSoon development={{ ...base, features: [] }} />);
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Localização")).toBeInTheDocument();
    expect(screen.queryByText("Tipologia")).not.toBeInTheDocument();
  });
});
