import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EmpreendimentosPage from "./page";

describe("Página de catálogo /empreendimentos", () => {
  it("tem um título de catálogo", () => {
    render(<EmpreendimentosPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /empreendimentos/i }),
    ).toBeInTheDocument();
  });

  it("lista os 12 empreendimentos", () => {
    render(<EmpreendimentosPage />);
    // cada card tem um link "Ver empreendimento"
    expect(
      screen.getAllByRole("link", { name: "Ver empreendimento" }),
    ).toHaveLength(12);
  });
});
