import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { DevelopmentCatalog } from "./DevelopmentCatalog";
import type { Development } from "@/types/development";

function make(
  slug: string,
  status: Development["status"],
  city: string,
  state: string,
): Development {
  return {
    slug,
    name: slug,
    status,
    location: { city, state },
    summary: "s",
    description: "d",
    images: [],
    features: [],
  };
}

const list: Development[] = [
  make("a", "pronto", "Belo Horizonte", "MG"),
  make("b", "lancamento", "Belo Horizonte", "MG"),
  make("c", "lancamento", "Niterói", "RJ"),
];

const countCards = () =>
  screen.getAllByRole("link", { name: "Ver empreendimento" }).length;

describe("DevelopmentCatalog (filtros — FR2)", () => {
  it("mostra todos os empreendimentos por padrão", () => {
    render(<DevelopmentCatalog developments={list} />);
    expect(countCards()).toBe(3);
  });

  it("filtra por status sem recarregar", async () => {
    const user = userEvent.setup();
    render(<DevelopmentCatalog developments={list} />);
    await user.selectOptions(
      screen.getByLabelText(/status/i),
      "lancamento",
    );
    expect(countCards()).toBe(2);
  });

  it("filtra por localização", async () => {
    const user = userEvent.setup();
    render(<DevelopmentCatalog developments={list} />);
    await user.selectOptions(
      screen.getByLabelText(/localiza/i),
      "Niterói/RJ",
    );
    expect(countCards()).toBe(1);
  });

  it("combina filtros e trata ausência de resultado", async () => {
    const user = userEvent.setup();
    render(<DevelopmentCatalog developments={list} />);
    await user.selectOptions(screen.getByLabelText(/status/i), "pronto");
    await user.selectOptions(
      screen.getByLabelText(/localiza/i),
      "Niterói/RJ",
    );
    expect(screen.getByText(/nenhum empreendimento/i)).toBeInTheDocument();
  });
});
