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

  it("aplica os limites do servidor: o campo não passa do tamanho e o excesso é explicado", async () => {
    const spy = vi.spyOn(submit, "submitLead");
    const user = userEvent.setup();
    render(<LeadForm leadType="contato" fields={fields} />);
    const nome = screen.getByLabelText(/nome/i);
    expect(nome).toHaveAttribute("maxLength", "100");
    expect(screen.getByLabelText(/mensagem/i)).toHaveAttribute("maxLength", "5000");
    // Colar além do limite (o atributo não barra `fireEvent`/autofill em todo navegador).
    nome.removeAttribute("maxLength");
    await user.type(nome, "x".repeat(101));
    await user.type(screen.getByLabelText(/email/i), "a@b.com");
    await user.type(screen.getByLabelText(/mensagem/i), "Oi");
    await user.click(screen.getByRole("button", { name: /enviar/i }));
    expect(await screen.findByText("Use até 100 caracteres.")).toBeInTheDocument();
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

  it("mostra uma mensagem genérica quando o envio falha (sem o motivo)", async () => {
    vi.spyOn(submit, "submitLead").mockResolvedValue({ ok: false });
    const user = userEvent.setup();
    render(<LeadForm leadType="contato" fields={fields} />);
    await user.type(screen.getByLabelText(/Nome/), "Maria");
    await user.type(screen.getByLabelText(/Email/), "maria@ex.com");
    await user.type(screen.getByLabelText(/Mensagem/), "Olá");
    await user.click(screen.getByRole("button", { name: /enviar/i }));
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(submit.LEAD_ERROR_MESSAGE),
    );
  });
});
