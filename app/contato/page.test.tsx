import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContatoPage from "./page";
import { CONTACT } from "@/lib/site";

describe("Página /contato (FR8)", () => {
  it("tem título e o formulário de contato", () => {
    render(<ContatoPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /fale conosco|contato/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Nome/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensagem/)).toBeInTheDocument();
  });

  it("exibe os canais institucionais", () => {
    render(<ContatoPage />);
    expect(
      screen.getByRole("link", { name: new RegExp(CONTACT.email, "i") }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Savassi/)).toBeInTheDocument();
  });

  it("mostra o endereço como link do Google Maps e um mapa embutido da sede", () => {
    render(<ContatoPage />);
    const addressLink = screen.getByRole("link", { name: /Savassi/ });
    expect(addressLink).toHaveAttribute("href", CONTACT.mapsUrl);
    expect(
      screen.getByTitle(/mapa da sede do grupo natus/i),
    ).toBeInTheDocument();
  });
});
