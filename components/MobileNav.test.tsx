import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MobileNav } from "./MobileNav";
import { NAV_LINKS } from "@/lib/site";

describe("MobileNav (drawer acessível)", () => {
  it("começa fechado (botão não expandido, sem diálogo visível)", () => {
    render(<MobileNav />);
    const toggle = screen.getByRole("button", { name: /abrir menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("abre ao clicar e mostra todos os links", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    await user.click(screen.getByRole("button", { name: /abrir menu/i }));
    const dialog = screen.getByRole("dialog");
    for (const link of NAV_LINKS) {
      expect(
        within(dialog).getByRole("link", { name: link.label }),
      ).toHaveAttribute("href", link.href);
    }
  });

  it("fecha com a tecla Escape", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    await user.click(screen.getByRole("button", { name: /abrir menu/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("fecha ao clicar no overlay (fora do drawer)", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    await user.click(screen.getByRole("button", { name: /abrir menu/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByTestId("mobile-nav-overlay"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("fecha ao clicar em um link (navegação)", async () => {
    const user = userEvent.setup();
    render(<MobileNav />);
    await user.click(screen.getByRole("button", { name: /abrir menu/i }));
    await user.click(
      screen.getByRole("link", { name: NAV_LINKS[0]!.label }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
