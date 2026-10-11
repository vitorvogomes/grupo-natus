import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DevelopmentAnchorNav, DEV_SECTIONS } from "./DevelopmentAnchorNav";

const todas = Object.values(DEV_SECTIONS);

describe("DevelopmentAnchorNav", () => {
  it("renderiza um link âncora por seção recebida, na ordem", () => {
    const sections = [
      DEV_SECTIONS.imagens,
      DEV_SECTIONS.oferece,
      DEV_SECTIONS.localizacao,
      DEV_SECTIONS.obra,
      DEV_SECTIONS.contato,
    ];
    render(<DevelopmentAnchorNav sections={sections} />);
    const nav = screen.getByRole("navigation", {
      name: /seções do empreendimento/i,
    });
    expect(
      within(nav)
        .getAllByRole("link")
        .map((a) => a.getAttribute("href")),
    ).toEqual(sections.map((s) => `#${s.id}`));
  });

  it("'O que oferece' some do vocabulário: a seção é anunciada como Empreendimento", () => {
    expect(todas.map((s) => s.label)).not.toContain("O que oferece");
    expect(DEV_SECTIONS.oferece.label).toBe("Empreendimento");
    expect(DEV_SECTIONS.resumo.label).toBe("Empreendimento");
  });

  it("não inventa âncora para seção que a página não renderizou", () => {
    render(
      <DevelopmentAnchorNav
        sections={[DEV_SECTIONS.resumo, DEV_SECTIONS.localizacao]}
      />,
    );
    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(
      screen.queryByRole("link", { name: /estágio de obra/i }),
    ).not.toBeInTheDocument();
  });

  it("some quando sobrou uma seção só — uma barra de um item não navega nada", () => {
    const { container } = render(
      <DevelopmentAnchorNav sections={[DEV_SECTIONS.localizacao]} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("o vocabulário cobre as seções da página, na ordem de leitura", () => {
    expect(todas.map((s) => s.id)).toEqual([
      "empreendimento",
      "imagens",
      "o-que-oferece",
      "localizacao",
      "estagio-de-obra",
      "falar-com-consultor",
    ]);
  });
});
