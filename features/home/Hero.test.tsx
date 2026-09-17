import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("exibe uma headline como título principal", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { level: 1 }),
    ).toBeInTheDocument();
  });

  it("tem CTA primária para o catálogo de empreendimentos", () => {
    render(<Hero />);
    expect(
      screen.getByRole("link", { name: /ver empreendimentos/i }),
    ).toHaveAttribute("href", "/empreendimentos");
  });
});
