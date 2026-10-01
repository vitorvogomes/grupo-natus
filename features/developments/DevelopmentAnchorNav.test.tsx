import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DevelopmentAnchorNav, DEV_SECTIONS } from "./DevelopmentAnchorNav";

const todas = Object.values(DEV_SECTIONS);

describe("DevelopmentAnchorNav", () => {
  it("renderiza um link âncora por seção recebida", () => {
    render(<DevelopmentAnchorNav sections={todas} />);
    const nav = screen.getByRole("navigation", {
      name: /seções do empreendimento/i,
    });
    for (const section of todas) {
      expect(
        within(nav).getByRole("link", { name: section.label }),
      ).toHaveAttribute("href", `#${section.id}`);
    }
  });

  it("não inventa âncora para seção que a página não renderizou", () => {
    render(
      <DevelopmentAnchorNav
        sections={[DEV_SECTIONS.empreendimento, DEV_SECTIONS.localizacao]}
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
