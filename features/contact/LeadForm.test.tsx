import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LeadForm, type LeadField } from "./LeadForm";
import * as submit from "./submitLead";

const fields: LeadField[] = [
  { name: "nome", label: "Nome", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "mensagem", label: "Mensagem", type: "textarea", required: true },
];

afterEach(() => vi.restoreAllMocks());

describe("LeadForm", () => {
  it("valida campos obrigatórios sem enviar", async () => {
    const spy = vi.spyOn(submit, "submitLead");
    const user = userEvent.setup();
    render(<LeadForm leadType="contato" fields={fields} />);
    await user.click(screen.getByRole("button", { name: /enviar/i }));
    expect(screen.getAllByRole("alert").length).toBeGreaterThan(0);
    expect(spy).not.toHaveBeenCalled();
  });

  it("envia payload válido e mostra sucesso", async () => {
    const spy = vi
      .spyOn(submit, "submitLead")
      .mockResolvedValue({ ok: true });
    const user = userEvent.setup();
    render(
      <LeadForm leadType="contato" fields={fields} context={{ origem: "home" }} />,
    );
    await user.type(screen.getByLabelText(/Nome/), "Maria");
    await user.type(screen.getByLabelText(/Email/), "maria@ex.com");
    await user.type(screen.getByLabelText(/Mensagem/), "Olá");
    await user.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(/enviada/i),
    );
    expect(spy).toHaveBeenCalledWith({
      type: "contato",
      origem: "home",
      nome: "Maria",
      email: "maria@ex.com",
      mensagem: "Olá",
    });
  });

  it("honeypot preenchido finge sucesso sem enviar", async () => {
    const spy = vi.spyOn(submit, "submitLead");
    const user = userEvent.setup();
    render(<LeadForm leadType="contato" fields={fields} />);
    await user.type(screen.getByLabelText(/não preencha/i), "bot");
    await user.click(screen.getByRole("button", { name: /enviar/i }));
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(spy).not.toHaveBeenCalled();
  });

  it("avisa, junto do envio, que os dados seguem a política de privacidade", () => {
    render(<LeadForm leadType="contato" fields={[{ name: "nome", label: "Nome", required: true }]} />);
    expect(screen.getByText(/os dados enviados são tratados conforme/i)).toBeInTheDocument();
    // Aviso, não consentimento implícito (a base legal é o art. 7º, V).
    expect(screen.queryByText(/você concorda/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /política de privacidade/i }),
    ).toHaveAttribute("href", "/politica-de-privacidade");
  });

  it("renderiza campo select do schema", () => {
    render(
      <LeadForm
        leadType="contato"
        fields={[
          {
            name: "assunto",
            label: "Assunto",
            type: "select",
            options: [{ value: "a", label: "Compra" }],
          },
        ]}
      />,
    );
    expect(screen.getByLabelText("Assunto")).toBeInTheDocument();
  });

  it("mostra erro quando o envio falha", async () => {
    vi.spyOn(submit, "submitLead").mockResolvedValue({
      ok: false,
      error: "Rate limit",
    });
    const user = userEvent.setup();
    render(<LeadForm leadType="contato" fields={fields} />);
    await user.type(screen.getByLabelText(/Nome/), "Maria");
    await user.type(screen.getByLabelText(/Email/), "maria@ex.com");
    await user.type(screen.getByLabelText(/Mensagem/), "Olá");
    await user.click(screen.getByRole("button", { name: /enviar/i }));
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("Rate limit"),
    );
  });
});
