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
  propertyType?: Development["propertyType"],
): Development {
  return {
    slug,
    name: slug,
    status,
    location: { city, state },
    ...(propertyType ? { propertyType } : {}),
    summary: "s",
    description: "d",
    images: [],
    features: [],
  };
}

const list: Development[] = [
  make("a", "pronto", "Belo Horizonte", "MG", "apartamento"),
  make("b", "lancamento", "Belo Horizonte", "MG", "lote"),
  make("c", "lancamento", "Niterói", "RJ", "apartamento"),
];

const countCards = () =>
  screen.getAllByRole("link", { name: /^Ver empreendimento/ }).length;

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
    await pick(user, /cidade/i, "Niterói/RJ");
    expect(countCards()).toBe(1);
  });

  it("combina filtros e trata ausência de resultado", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<DevelopmentCatalog developments={list} />);
    await pick(user, /status/i, "Pronto para morar");
    await pick(user, /cidade/i, "Niterói/RJ");
    expect(screen.getByText(/nenhum empreendimento/i)).toBeInTheDocument();
  });

  it("filtra por tipologia", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<DevelopmentCatalog developments={list} />);
    await pick(user, /tipo de im/i, "Lotes");
    expect(countCards()).toBe(1);
  });

  it("monta já filtrado a partir dos filtros vindos da URL", () => {
    render(
      <DevelopmentCatalog
        developments={list}
        initialFilters={{ status: "lancamento", propertyType: "lote" }}
      />,
    );
    expect(countCards()).toBe(1);
  });

  it("oferece limpar filtros só quando há algum ativo", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<DevelopmentCatalog developments={list} />);
    expect(screen.queryByRole("button", { name: /limpar filtros/i })).toBeNull();

    await pick(user, /status/i, "Lançamento");
    await user.click(screen.getByRole("button", { name: /limpar filtros/i }));

    expect(countCards()).toBe(3);
    expect(screen.queryByRole("button", { name: /limpar filtros/i })).toBeNull();
  });

  it("deixa desfazer um filtro que veio da URL e não tem select na tela", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    // Nenhum item tem tipologia confirmada: o select de tipo nem é renderizado.
    const semTipo = [make("x", "pronto", "Lagoa Santa", "MG")];
    render(
      <DevelopmentCatalog
        developments={semTipo}
        initialFilters={{ propertyType: "lote" }}
      />,
    );
    expect(screen.queryByRole("combobox", { name: /tipo de im/i })).toBeNull();
    expect(screen.getByText(/nenhum empreendimento/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /limpar filtros/i }));
    expect(countCards()).toBe(1);
  });
});
