import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NegocieTerrenoPage from "./page";

describe("Página /negocie-seu-terreno (FR10)", () => {
  it("explica a proposta e tem o formulário do terreno", () => {
    render(<NegocieTerrenoPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /negocie seu terreno/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Localização do terreno/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Área/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome/)).toBeInTheDocument();
  });
});
