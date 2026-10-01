import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("mantém um h1 para SEO e leitores de tela, mesmo sem texto visível", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /grupo natus/i,
    );
  });

  it("destaca a imagem do empreendimento", () => {
    render(<Hero />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("não carrega texto de venda nem CTA sobre a imagem", () => {
    // Decisão do cliente: hero é só imagem; a conversão começa na busca abaixo.
    render(<Hero />);
    expect(screen.queryByRole("button")).toBeNull();
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "#buscar");
  });

  it("convida a rolar até a busca de empreendimentos", () => {
    render(<Hero />);
    expect(
      screen.getByRole("link", { name: /busca de empreendimentos/i }),
    ).toHaveAttribute("href", "#buscar");
  });
});
