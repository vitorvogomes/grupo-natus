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
    expect(
      screen.getByRole("heading", { name: "Certificações" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /números/i })).toBeInTheDocument();
  });

  it("usa o texto institucional da revisão v3", () => {
    render(<QuemSomosPage />);
    expect(
      screen.getByText(
        "Do Minha Casa Minha Vida ao alto luxo, em Minas Gerais e no Rio de Janeiro.",
      ),
    ).toBeInTheDocument();
    // Alinhado ao portfólio: 4 prontos para morar e 7 nos demais status.
    expect(
      screen.getByText(/4 empreendimentos entregues e 7 em desenvolvimento/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/a Aliatto estrutura o empreendimento, a Oasi executa a obra/),
    ).toBeInTheDocument();
  });

  it("troca 'Qualidade certificada' por 'Parceria' (o selo tem bloco próprio)", () => {
    render(<QuemSomosPage />);
    expect(screen.getByRole("heading", { name: "Parceria" })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /qualidade certificada/i }),
    ).not.toBeInTheDocument();
  });

  it("apresenta as empresas reais do grupo", () => {
    render(<QuemSomosPage />);
    expect(
      screen.getByRole("heading", { name: /aliatto incorporadora/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /oasi engenharia/i }),
    ).toBeInTheDocument();
  });

  it("mostra as duas certificações: ISO 9001:2015 e PBQP-H (SiAC Nível A)", () => {
    render(<QuemSomosPage />);
    expect(
      screen.getByRole("heading", { name: "NBR ISO 9001:2015" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "PBQP-H · SiAC Nível A" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /PBQP-H/ })).toBeInTheDocument();
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
