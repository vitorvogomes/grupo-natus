import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";
import { CONTACT, NAV_LINKS } from "@/lib/site";

describe("Footer", () => {
  it("renderiza dentro de um <footer> (contentinfo)", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("exibe email como link mailto e telefone como link tel", () => {
    render(<Footer />);
    expect(
      screen.getByRole("link", { name: new RegExp(CONTACT.email, "i") }),
    ).toHaveAttribute("href", `mailto:${CONTACT.email}`);
    expect(
      screen.getByRole("link", { name: /98337-4122/ }),
    ).toHaveAttribute("href", expect.stringContaining("tel:"));
  });

  it("exibe endereço e horário de atendimento", () => {
    render(<Footer />);
    expect(screen.getByText(/Savassi/)).toBeInTheDocument();
    expect(screen.getByText(/Seg/)).toBeInTheDocument();
  });

  it("repete os links de navegação no rodapé", () => {
    render(<Footer />);
    const nav = screen.getByRole("navigation", { name: /rodapé/i });
    for (const link of NAV_LINKS) {
      expect(
        within(nav).getByRole("link", { name: link.label }),
      ).toBeInTheDocument();
    }
  });
});
