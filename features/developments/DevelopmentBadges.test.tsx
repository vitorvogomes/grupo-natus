import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DevelopmentBadges, SoldOutBand } from "./DevelopmentBadges";

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

  it("100% vendido não vira badge (é a faixa)", () => {
    render(
      <DevelopmentBadges development={{ status: "pronto", soldOut: true }} />,
    );
    expect(screen.queryByText(/100% vendido/i)).not.toBeInTheDocument();
  });
});

describe("SoldOutBand", () => {
  it("anuncia 100% vendido", () => {
    render(<SoldOutBand />);
    expect(screen.getByText("100% vendido")).toBeInTheDocument();
  });
});
