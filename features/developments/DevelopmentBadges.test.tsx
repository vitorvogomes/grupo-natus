import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DevelopmentBadges, SalesBand } from "./DevelopmentBadges";

describe("DevelopmentBadges", () => {
  it("mostra o status", () => {
    render(<DevelopmentBadges development={{ status: "lancamento" }} />);
    expect(screen.getByText("Lançamento")).toBeInTheDocument();
  });

  it("acrescenta o selo MCMV só quando enquadrado", () => {
    const { rerender } = render(
      <DevelopmentBadges development={{ status: "pronto", mcmv: true }} />,
    );
    expect(screen.getByText("Minha Casa Minha Vida")).toBeInTheDocument();
    rerender(<DevelopmentBadges development={{ status: "pronto" }} />);
    expect(screen.queryByText("Minha Casa Minha Vida")).not.toBeInTheDocument();
  });
});

describe("SalesBand", () => {
  it.each([
    ["vendido", "100% vendido"],
    ["pre_lancamento", "Pré-lançamento"],
    ["ultimas_unidades", "Últimas unidades"],
  ] as const)("%s: anuncia “%s” na mesma faixa azul", (band, label) => {
    render(<SalesBand band={band} />);
    expect(screen.getByText(label)).toHaveClass("bg-band", "text-white");
  });
});
