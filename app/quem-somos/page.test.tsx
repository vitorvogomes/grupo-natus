import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import QuemSomosPage from "./page";

describe("Página /quem-somos (FR13)", () => {
  it("tem título e as seções institucionais", () => {
    render(<QuemSomosPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /holding/i }),
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
    // Frase fixa do cliente (revisão v4), no lugar da contagem por status.
    expect(
      screen.getByText(
        "Hoje atuamos entre Belo Horizonte, região metropolitana e Leste Fluminense. Boa parte dos nossos empreendimentos nascem de parcerias com proprietários de terreno, construtores e investidores.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText(/empreendimentos entregues/)).not.toBeInTheDocument();
    expect(screen.queryByText(/por meio da Aliatto/)).not.toBeInTheDocument();
  });

  it("troca 'Qualidade certificada' por 'Parceria' (o selo tem bloco próprio)", () => {
    render(<QuemSomosPage />);
    expect(screen.getByRole("heading", { name: "Parceria" })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /qualidade certificada/i }),
    ).not.toBeInTheDocument();
  });

  it("não tem mais a seção Empresas do grupo (revisão v4)", () => {
    render(<QuemSomosPage />);
    expect(
      screen.queryByRole("heading", { name: /empresas do grupo/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /aliatto incorporadora/i }),
    ).not.toBeInTheDocument();
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

  it("mostra a métrica de área construída", () => {
    render(<QuemSomosPage />);
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

  it("tem CTA de contato só com a logo da Natus (sem o lockup das empresas)", () => {
    render(<QuemSomosPage />);
    expect(
      screen.getByRole("link", { name: /fale conosco|contato/i }),
    ).toHaveAttribute("href", "/contato");
    expect(screen.getByRole("img", { name: "Grupo Natus" })).toHaveAttribute(
      "src",
      expect.stringContaining("grupo-natus-negativa.png"),
    );
    expect(document.querySelector('img[src*="assinatura"]')).toBeNull();
  });
});
