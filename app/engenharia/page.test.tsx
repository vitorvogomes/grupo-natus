import { render, screen } from "@testing-library/react";
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

  it("marca conteúdo pendente como TODO e tem CTA", () => {
    render(<EngenhariaPage />);
    expect(screen.getAllByText(/TODO: CONTENT REQUIRED/).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("link", { name: /fale conosco|contato/i }),
    ).toHaveAttribute("href", "/contato");
  });
});
