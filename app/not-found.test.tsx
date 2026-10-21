import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound, { metadata } from "./not-found";

describe("404", () => {
  it("diz que a página não existe e leva aos empreendimentos e ao contato", () => {
    render(<NotFound />);
    expect(screen.getByRole("heading", { level: 1, name: /página não encontrada/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ver empreendimentos/i })).toHaveAttribute("href", "/empreendimentos");
    expect(screen.getByRole("link", { name: /fale conosco/i })).toHaveAttribute("href", "/contato");
    expect(screen.getByRole("link", { name: /início/i })).toHaveAttribute("href", "/");
  });

  it("não é indexada", () => {
    expect(metadata.robots).toEqual({ index: false });
  });
});
