import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ThemeShowcasePage from "./page";

afterEach(() => vi.unstubAllEnvs());

describe("Theme Showcase (Gate A)", () => {
  it("não existe em produção (404)", () => {
    vi.stubEnv("NODE_ENV", "production");
    expect(() => ThemeShowcasePage()).toThrow(/NEXT_HTTP_ERROR_FALLBACK;404|NEXT_NOT_FOUND/);
  });

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
      "Ícones (lucide)",
      "Botões",
      "Links",
      "Badges",
      "Cards & Development card",
      "Progresso da obra",
      "Formulários",
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
