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
    expect(screen.getByRole("heading", { name: /metodologia/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /capacidade técnica/i }),
    ).toBeInTheDocument();
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

  it("cita a certificação ISO 9001", () => {
    render(<EngenhariaPage />);
    expect(screen.getAllByText(/ISO 9001/i).length).toBeGreaterThan(0);
  });

  it("marca conteúdo pendente como TODO e tem CTA", () => {
    render(<EngenhariaPage />);
    expect(screen.getAllByText(/TODO: CONTENT REQUIRED/).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("link", { name: /fale conosco|contato/i }),
    ).toHaveAttribute("href", "/contato");
  });
});
