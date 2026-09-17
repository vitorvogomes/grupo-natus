import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import QuemSomosPage from "./page";

describe("Página /quem-somos (FR13)", () => {
  it("tem título e as seções institucionais", () => {
    render(<QuemSomosPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /quem somos/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /valores/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /números/i })).toBeInTheDocument();
  });

  it("marca conteúdo pendente como TODO", () => {
    render(<QuemSomosPage />);
    expect(
      screen.getAllByText(/TODO: CONTENT REQUIRED/).length,
    ).toBeGreaterThan(0);
  });

  it("tem CTA de contato", () => {
    render(<QuemSomosPage />);
    expect(
      screen.getByRole("link", { name: /fale conosco|contato/i }),
    ).toHaveAttribute("href", "/contato");
  });
});
