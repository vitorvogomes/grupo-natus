import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("renderiza dentro de um <main>", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("main")).not.toBeNull();
  });

  it("exibe o hero com CTA para o catálogo", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /ver empreendimentos/i }),
    ).toHaveAttribute("href", "/empreendimentos");
  });

  it("exibe a apresentação institucional com link para Quem Somos", () => {
    render(<Home />);
    expect(
      screen.getByRole("link", { name: /conheça a empresa/i }),
    ).toHaveAttribute("href", "/quem-somos");
  });

  it("exibe o catálogo com os 12 empreendimentos", () => {
    render(<Home />);
    // Nome exato "Ver empreendimento" (card), não o CTA "Ver empreendimentos" do hero.
    expect(
      screen.getAllByRole("link", { name: "Ver empreendimento" }),
    ).toHaveLength(12);
  });
});
