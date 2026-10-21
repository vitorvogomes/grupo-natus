import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import EngenhariaPage from "./page";

describe("Página /engenharia (FR12)", () => {
  it("tem título e as seções de engenharia", () => {
    render(<EngenhariaPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /engenharia/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Como trabalhamos" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Certificações" })).toBeInTheDocument();
  });

  it("fala em nome do Grupo Natus, com os valores compartilhados com Quem Somos", () => {
    render(<EngenhariaPage />);
    expect(
      screen.getByText(/Do canteiro à entrega das chaves: planejamento, execução e controle de obra/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Além dos empreendimentos do grupo, executamos obras por administração/),
    ).toBeInTheDocument();
    // Desde a v4 as empresas não são apresentadas separadamente.
    expect(screen.queryByText(/Aliatto|Oasi/)).not.toBeInTheDocument();
    for (const valor of ["Método", "Eficiência", "Transparência"]) {
      expect(screen.getByRole("heading", { name: valor })).toBeInTheDocument();
    }
  });

  it("lista as obras por administração reais (portfólio)", () => {
    render(<EngenhariaPage />);
    expect(
      screen.getByRole("heading", { name: /obras por administração/i }),
    ).toBeInTheDocument();
    // Um kicker "Obra por administração" por categoria (3).
    expect(
      screen.getAllByText(/^obra por administração$/i).length,
    ).toBeGreaterThanOrEqual(3);
    expect(
      screen.getByRole("heading", { name: /casa de alto padrão/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /avenida condomínio/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /galpão comercial/i }),
    ).toBeInTheDocument();
  });

  it("agrupa as fotos de cada obra numa galeria, uma por serviço", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<EngenhariaPage />);
    // Um palco por obra (3), em vez de 12 imagens soltas empilhadas.
    const palcos = screen.getAllByRole("button", {
      name: /^ampliar imagem:/i,
    });
    expect(palcos).toHaveLength(3);

    // A régua de miniaturas troca o palco dentro da própria obra.
    const miniaturas = screen.getAllByRole("button", { name: /^ver imagem:/i });
    await user.click(miniaturas[1]!);
    expect(
      screen.getAllByRole("button", { name: /^ampliar imagem:/i })[0],
    ).toHaveAccessibleName(/piscina/i);
  });

  it("mostra as certificações ISO 9001 e PBQP-H", () => {
    render(<EngenhariaPage />);
    expect(screen.getByRole("heading", { name: "NBR ISO 9001:2015" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "PBQP-H · SiAC Nível A" })).toBeInTheDocument();
  });

  it("não deixa placeholder na tela e tem CTA", () => {
    render(<EngenhariaPage />);
    expect(screen.queryByText(/TODO: CONTENT REQUIRED/)).toBeNull();
    expect(
      screen.getByRole("link", { name: /fale conosco|contato/i }),
    ).toHaveAttribute("href", "/contato");
  });
});
