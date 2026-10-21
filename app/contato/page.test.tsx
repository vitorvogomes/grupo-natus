import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ContatoPage from "./page";
import { ConsentProvider } from "@/features/consent/ConsentProvider";
import { CONSENT_COOKIE, writeConsent } from "@/lib/consent";
import { CONTACT } from "@/lib/site";

afterEach(() => {
  document.cookie = `${CONSENT_COOKIE}=; Max-Age=0; Path=/`;
});

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

  it("mostra o endereço como link do Google Maps e, com mapas aceitos, o mapa da sede", () => {
    writeConsent({ mapas: true });
    render(
      <ConsentProvider>
        <ContatoPage />
      </ConsentProvider>,
    );
    const addressLink = screen.getByRole("link", { name: /Savassi/ });
    expect(addressLink).toHaveAttribute("href", CONTACT.mapsUrl);
    expect(
      screen.getByTitle(/mapa da sede do grupo natus/i),
    ).toBeInTheDocument();
  });

  it("sem consentimento, o mapa da sede não carrega (o link do endereço continua)", () => {
    render(
      <ConsentProvider>
        <ContatoPage />
      </ConsentProvider>,
    );
    expect(screen.queryByTitle(/mapa da sede do grupo natus/i)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /carregar mapa/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Savassi/ })).toBeInTheDocument();
  });

  it("avisa que o envio segue a política de privacidade", () => {
    render(<ContatoPage />);
    expect(
      screen.getByRole("link", { name: /política de privacidade/i }),
    ).toHaveAttribute("href", "/politica-de-privacidade");
  });
});
