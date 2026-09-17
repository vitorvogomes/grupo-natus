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
});
