import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WhatsAppButton } from "./WhatsAppButton";

describe("WhatsAppButton", () => {
  it("renderiza um link acessível para o WhatsApp", () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole("link", { name: /whatsapp/i });
    expect(link.getAttribute("href")).toMatch(/^https:\/\/wa\.me\/\d+/);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("é flutuante (posição fixa)", () => {
    render(<WhatsAppButton />);
    expect(screen.getByRole("link", { name: /whatsapp/i }).className).toContain(
      "fixed",
    );
  });

  it("embute mensagem contextual quando fornecida", () => {
    render(<WhatsAppButton message="Interesse no Follow Savassi" />);
    const link = screen.getByRole("link", { name: /whatsapp/i });
    expect(decodeURIComponent(link.getAttribute("href") ?? "")).toContain(
      "Interesse no Follow Savassi",
    );
  });

  it("aceita rótulo acessível customizado", () => {
    render(<WhatsAppButton label="Falar sobre o Gutierrez no WhatsApp" />);
    expect(
      screen.getByRole("link", {
        name: "Falar sobre o Gutierrez no WhatsApp",
      }),
    ).toBeInTheDocument();
  });
});
