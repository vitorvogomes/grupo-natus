import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renderiza children", () => {
    render(<Card>conteúdo</Card>);
    expect(screen.getByText("conteúdo")).toBeInTheDocument();
  });

  it("aplica superfície com borda/raio derivados de token e mescla className", () => {
    render(<Card className="extra">x</Card>);
    const el = screen.getByText("x");
    expect(el.className).toContain("rounded");
    expect(el.className).toContain("border");
    expect(el).toHaveClass("extra");
  });

  it("permite trocar o elemento raiz via prop `as`", () => {
    render(<Card as="article">art</Card>);
    expect(screen.getByRole("article")).toBeInTheDocument();
  });
});
