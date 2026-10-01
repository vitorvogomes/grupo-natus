import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EmpreendimentosPage from "./page";

const countCards = () =>
  screen.getAllByRole("link", { name: "Ver empreendimento" }).length;

async function renderPage(
  searchParams: Record<string, string | string[] | undefined> = {},
) {
  render(await EmpreendimentosPage({ searchParams: Promise.resolve(searchParams) }));
}

describe("Página de catálogo /empreendimentos", () => {
  it("tem um título de catálogo", async () => {
    await renderPage();
    expect(
      screen.getByRole("heading", { level: 1, name: /empreendimentos/i }),
    ).toBeInTheDocument();
  });

  it("lista os 12 empreendimentos", async () => {
    await renderPage();
    expect(countCards()).toBe(12);
  });

  it("já chega filtrado quando a URL traz uma faceta", async () => {
    await renderPage({ status: "em_construcao" });
    // Sem flash: o HTML servido já reflete a busca feita na home.
    expect(countCards()).toBeLessThan(12);
    expect(countCards()).toBeGreaterThan(0);
  });

  it("ignora faceta inválida na URL em vez de quebrar", async () => {
    await renderPage({ status: "inexistente" });
    expect(countCards()).toBe(12);
  });
});
