import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";
import { getAllDevelopments } from "@/content/developments";

describe("Home", () => {
  it("renderiza o conteúdo dentro de um <main>", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("main")).toBeInTheDocument();
  });

  it("abre com o hero e leva à busca logo abaixo", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /busca de empreendimentos/i }),
    ).toHaveAttribute("href", "#buscar");
  });

  it("a busca leva ao catálogo completo", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /buscar/i })).toHaveAttribute(
      "href",
      "/empreendimentos",
    );
  });

  it("permite navegar por todos os empreendimentos no carrossel", () => {
    render(<Home />);
    expect(
      screen.getAllByRole("link", { name: "Ver empreendimento" }),
    ).toHaveLength(getAllDevelopments().length);
    expect(
      screen.getByRole("link", { name: /ver todos os empreendimentos/i }),
    ).toHaveAttribute("href", "/empreendimentos");
  });

  it("apresenta o Minha Casa Minha Vida com simulação pelo WhatsApp", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /seu sonho da casa própria/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /simule agora/i }).getAttribute("href"),
    ).toContain("wa.me");
  });

  it("apresenta o grupo e leva à página de história", () => {
    render(<Home />);
    expect(
      screen.getByRole("link", { name: /conheça a nossa história/i }),
    ).toHaveAttribute("href", "/quem-somos");
  });
});
