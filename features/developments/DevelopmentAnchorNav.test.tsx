import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DevelopmentAnchorNav, DEV_SECTIONS } from "./DevelopmentAnchorNav";

describe("DevelopmentAnchorNav", () => {
  it("lista as âncoras de seção esperadas", () => {
    expect(DEV_SECTIONS.map((s) => s.label)).toEqual([
      "Empreendimento",
      "Imagens",
      "Localização",
      "Estágio de Obra",
      "Falar com Consultor",
    ]);
  });

  it("renderiza links âncora para cada seção", () => {
    render(<DevelopmentAnchorNav />);
    const nav = screen.getByRole("navigation", {
      name: /seções do empreendimento/i,
    });
    for (const section of DEV_SECTIONS) {
      expect(
        within(nav).getByRole("link", { name: section.label }),
      ).toHaveAttribute("href", `#${section.id}`);
    }
  });
});
