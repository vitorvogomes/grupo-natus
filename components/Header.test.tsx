import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";
import { NAV_LINKS } from "@/lib/site";

describe("Header", () => {
  it("renderiza dentro de um <header> (banner)", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("exibe o logo do Grupo Natus com link para a Home", () => {
    render(<Header />);
    const logoLink = screen.getByRole("link", { name: /grupo natus/i });
    expect(logoLink).toHaveAttribute("href", "/");
    expect(within(logoLink).getByRole("img")).toHaveAccessibleName(
      /grupo natus/i,
    );
  });

  it("exibe a navegação principal com todos os links", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: /principal/i });
    for (const link of NAV_LINKS) {
      const el = within(nav).getByRole("link", { name: link.label });
      expect(el).toHaveAttribute("href", link.href);
    }
  });

  it("oferece um botão de menu mobile", () => {
    render(<Header />);
    expect(
      screen.getByRole("button", { name: /abrir menu/i }),
    ).toBeInTheDocument();
  });
});
