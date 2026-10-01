import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { DevelopmentSearchBar } from "./DevelopmentSearchBar";
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
  make("b", "lancamento", "Niterói", "RJ", "lote"),
  make("c", "lancamento", "Niterói", "RJ"), // tipologia não confirmada
];

async function pick(
  user: ReturnType<typeof userEvent.setup>,
  filter: RegExp,
  option: string | RegExp,
) {
  await user.click(screen.getByRole("combobox", { name: filter }));
  await user.click(await screen.findByRole("option", { name: option }));
}

const searchLink = () => screen.getByRole("link", { name: /buscar/i });

describe("DevelopmentSearchBar (busca da home)", () => {
  it("sem seleção, leva ao catálogo inteiro", () => {
    render(<DevelopmentSearchBar developments={list} />);
    expect(searchLink()).toHaveAttribute("href", "/empreendimentos");
  });

  it("oferece as três facetas", () => {
    render(<DevelopmentSearchBar developments={list} />);
    expect(screen.getByRole("combobox", { name: /status/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /cidade/i })).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /tipo de im/i }),
    ).toBeInTheDocument();
  });

  it("leva o status escolhido para a URL", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<DevelopmentSearchBar developments={list} />);
    await pick(user, /status/i, "Lançamento");
    expect(searchLink()).toHaveAttribute(
      "href",
      "/empreendimentos?status=lancamento",
    );
  });

  it("encoda a cidade acentuada na URL", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<DevelopmentSearchBar developments={list} />);
    await pick(user, /cidade/i, "Niterói/RJ");
    expect(searchLink()).toHaveAttribute(
      "href",
      "/empreendimentos?cidade=Niter%C3%B3i%2FRJ",
    );
  });

  it("combina as três facetas numa só URL", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<DevelopmentSearchBar developments={list} />);
    await pick(user, /status/i, "Lançamento");
    await pick(user, /cidade/i, "Niterói/RJ");
    await pick(user, /tipo de im/i, "Lotes");
    expect(searchLink()).toHaveAttribute(
      "href",
      "/empreendimentos?status=lancamento&cidade=Niter%C3%B3i%2FRJ&tipo=lote",
    );
  });

  it("só oferece tipologias que o conteúdo sustenta", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<DevelopmentSearchBar developments={list} />);
    await user.click(screen.getByRole("combobox", { name: /tipo de im/i }));
    expect(await screen.findByRole("option", { name: "Lotes" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Apartamentos" })).toBeInTheDocument();
    // Nenhum empreendimento da lista é casa ou studio.
    expect(screen.queryByRole("option", { name: "Casas" })).toBeNull();
    expect(screen.queryByRole("option", { name: "Studios" })).toBeNull();
  });

  it("permite voltar para 'todos' e limpar o filtro da URL", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<DevelopmentSearchBar developments={list} />);
    await pick(user, /status/i, "Lançamento");
    await pick(user, /status/i, "Todos os status");
    expect(searchLink()).toHaveAttribute("href", "/empreendimentos");
  });

  it("esconde a faceta de tipologia quando nenhum empreendimento tem tipo confirmado", () => {
    render(
      <DevelopmentSearchBar
        developments={[make("x", "pronto", "Lagoa Santa", "MG")]}
      />,
    );
    expect(screen.queryByRole("combobox", { name: /tipo de im/i })).toBeNull();
    expect(screen.getByRole("combobox", { name: /status/i })).toBeInTheDocument();
  });
});
