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

async function pick(
  user: ReturnType<typeof userEvent.setup>,
  filter: RegExp,
  option: string | RegExp,
) {
  await user.click(screen.getByRole("combobox", { name: filter }));
  await user.click(await screen.findByRole("option", { name: option }));
}

describe("DevelopmentCatalog (filtros — FR2)", () => {
  it("mostra todos os empreendimentos por padrão", () => {
    render(<DevelopmentCatalog developments={list} />);
    expect(countCards()).toBe(3);
  });

  it("filtra por status sem recarregar", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<DevelopmentCatalog developments={list} />);
    await pick(user, /status/i, "Lançamento");
    expect(countCards()).toBe(2);
  });

  it("filtra por localização", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<DevelopmentCatalog developments={list} />);
    await pick(user, /localiza/i, "Niterói/RJ");
    expect(countCards()).toBe(1);
  });

  it("combina filtros e trata ausência de resultado", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<DevelopmentCatalog developments={list} />);
    await pick(user, /status/i, "Pronto para morar");
    await pick(user, /localiza/i, "Niterói/RJ");
    expect(screen.getByText(/nenhum empreendimento/i)).toBeInTheDocument();
  });
});
