import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ThemeShowcasePage from "./page";

describe("Theme Showcase (Gate A)", () => {
  it("tem o título principal", () => {
    render(<ThemeShowcasePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Theme Showcase" }),
    ).toBeInTheDocument();
  });

  it("demonstra todas as seções do design system", () => {
    render(<ThemeShowcasePage />);
    for (const title of [
      "Logo",
      "Cores",
      "Tipografia",
      "Botões",
      "Links",
      "Badges",
      "Cards & Development card",
      "Formulários (prévia — Epic 5)",
      "Galeria & tratamento de imagem",
      "Mapa (localização)",
      "Interativos (Accordion & Modal)",
      "Princípios de motion",
    ]) {
      expect(
        screen.getByRole("heading", { level: 2, name: title }),
      ).toBeInTheDocument();
    }
  });

  it("mostra as três badges de status", () => {
    render(<ThemeShowcasePage />);
    expect(screen.getAllByText("Lançamento").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Em construção").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Pronto para morar").length).toBeGreaterThan(0);
  });
});
