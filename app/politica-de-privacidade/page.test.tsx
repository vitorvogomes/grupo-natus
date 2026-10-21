import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PoliticaPage from "./page";
import { CONTACT, LEGAL } from "@/lib/site";
import { CONSENT_COOKIE } from "@/lib/consent";

describe("Página /politica-de-privacidade", () => {
  it("identifica o controlador e a data da versão", () => {
    render(<PoliticaPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Política de Privacidade" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(LEGAL.cnpj!.replace(/[./]/g, "\\$&"))).length).toBeGreaterThan(0);
    expect(screen.getByText(/última atualização/i)).toBeInTheDocument();
  });

  it("cobre o que a LGPD pede: dados, finalidades, bases legais, compartilhamento, cookies, retenção e direitos", () => {
    render(<PoliticaPage />);
    for (const titulo of [
      /dados que coletamos/i,
      /para que usamos/i,
      /bases legais/i,
      /compartilhamento/i,
      /cookies/i,
      /por quanto tempo/i,
      /seus direitos/i,
      /fale com a gente/i,
    ]) {
      expect(screen.getByRole("heading", { level: 2, name: titulo })).toBeInTheDocument();
    }
  });

  it("descreve os cookies que o site usa de fato", () => {
    render(<PoliticaPage />);
    expect(screen.getByRole("cell", { name: CONSENT_COOKIE })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: /google maps/i })).toBeInTheDocument();
  });

  it("indica o canal para exercer os direitos e reabrir as preferências", () => {
    render(<PoliticaPage />);
    expect(
      screen.getAllByRole("link", { name: CONTACT.email })[0],
    ).toHaveAttribute("href", `mailto:${CONTACT.email}`);
    expect(
      screen.getByRole("button", { name: /preferências de cookies/i }),
    ).toBeInTheDocument();
  });

  it("não deixa placeholder rotulado na tela", () => {
    render(<PoliticaPage />);
    expect(screen.queryByText(/TODO/)).not.toBeInTheDocument();
  });
});
