import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DevelopmentGrid } from "./DevelopmentGrid";
import type { Development } from "@/types/development";

function make(slug: string, name: string): Development {
  return {
    slug,
    name,
    status: "lancamento",
    location: { city: "BH", state: "MG" },
    summary: "s",
    description: "d",
    images: [],
    features: [],
  };
}

describe("DevelopmentGrid", () => {
  it("renderiza um card por empreendimento", () => {
    render(
      <DevelopmentGrid
        developments={[make("a", "Alpha"), make("b", "Beta")]}
      />,
    );
    expect(screen.getByRole("heading", { name: "Alpha" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Beta" })).toBeInTheDocument();
  });

  it("mostra mensagem clara quando não há resultados", () => {
    render(<DevelopmentGrid developments={[]} />);
    expect(screen.getByText(/nenhum empreendimento/i)).toBeInTheDocument();
  });
});
