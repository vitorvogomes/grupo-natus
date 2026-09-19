import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/empreendimentos",
}));

import { Header } from "./Header";
import { NAV_LINKS } from "@/lib/site";
import type { StatusNavGroup } from "@/content/developments";

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

  it("exibe o CTA persistente de contato (WhatsApp)", () => {
    render(<Header />);
    expect(
      screen.getByRole("link", { name: /falar com consultor/i }),
    ).toHaveAttribute("href", expect.stringContaining("wa.me"));
  });

  it("marca o link da página atual com aria-current=page", () => {
    render(<Header />);
    const nav = screen.getByRole("navigation", { name: /principal/i });
    expect(
      within(nav).getByRole("link", { name: "Empreendimentos" }),
    ).toHaveAttribute("aria-current", "page");
    // Um link não-ativo não recebe aria-current.
    expect(
      within(nav).getByRole("link", { name: "Quem Somos" }),
    ).not.toHaveAttribute("aria-current");
  });

  it("abre o mega-menu de Empreendimentos por status quando recebe grupos", async () => {
    const groups: StatusNavGroup[] = [
      {
        status: "lancamento",
        label: "Lançamento",
        items: [{ name: "Solar Manilha", slug: "solar-manilha" }],
      },
      {
        status: "pronto",
        label: "Pronto para morar",
        items: [{ name: "Viver Mais", slug: "viver-mais" }],
      },
    ];
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<Header empreendimentosMenu={groups} />);
    await user.click(screen.getByRole("button", { name: /empreendimentos/i }));
    expect(
      await screen.findByRole("link", { name: "Solar Manilha" }),
    ).toHaveAttribute("href", "/empreendimentos/solar-manilha");
  });
});
