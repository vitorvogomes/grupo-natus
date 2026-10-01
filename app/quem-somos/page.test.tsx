import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import QuemSomosPage from "./page";

describe("Página /quem-somos (FR13)", () => {
  it("tem título e as seções institucionais", () => {
    render(<QuemSomosPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /holding/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /empresas do grupo/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /valores/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /números/i })).toBeInTheDocument();
  });

  it("apresenta o posicionamento e as empresas reais do grupo", () => {
    render(<QuemSomosPage />);
    expect(
      screen.getByText(/segmento médio econômico e alto luxo/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /aliatto incorporadora/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /oasi engenharia/i }),
    ).toBeInTheDocument();
  });

  it("mostra a certificação de qualidade ISO 9001:2015", () => {
    render(<QuemSomosPage />);
    expect(screen.getAllByText(/ISO 9001:2015/i).length).toBeGreaterThan(0);
  });

  it("usa o lockup de marca (holding + empresas) e a métrica de área construída", () => {
    render(<QuemSomosPage />);
    expect(
      screen.getByRole("img", {
        name: "Grupo Natus — ALIATTO Incorporadora e OASI Engenharia",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Área construída/i)).toBeInTheDocument();
  });

  it("não deixa placeholder rotulado na tela", () => {
    // A seção "Nossa história" foi removida a pedido do cliente: era o único
    // TODO visível da página, e um bloco com o texto do placeholder na tela
    // valia menos que a ausência dele.
    render(<QuemSomosPage />);
    expect(screen.queryByText(/TODO: CONTENT REQUIRED/)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /nossa história/i }),
    ).not.toBeInTheDocument();
  });

  it("tem CTA de contato", () => {
    render(<QuemSomosPage />);
    expect(
      screen.getByRole("link", { name: /fale conosco|contato/i }),
    ).toHaveAttribute("href", "/contato");
  });
});
