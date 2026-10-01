import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { InterestForm } from "./InterestForm";
import * as submit from "./submitLead";

describe("InterestForm (FR9)", () => {
  it("pede só nome, telefone e e-mail", () => {
    render(<InterestForm slug="follow-savassi" name="Follow Savassi" />);
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")).toHaveLength(3);
    expect(screen.queryByLabelText(/mensagem/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/empreendimento/i)).not.toBeInTheDocument();
  });

  it("usa o CTA pedido pelo cliente", () => {
    render(<InterestForm slug="x" name="X" />);
    expect(
      screen.getByRole("button", { name: "Quero saber mais!" }),
    ).toBeInTheDocument();
  });

  it("envia o empreendimento junto, mesmo sem campo na tela", async () => {
    const spy = vi
      .spyOn(submit, "submitLead")
      .mockResolvedValue({ ok: true });
    const user = userEvent.setup();
    render(<InterestForm slug="follow-savassi" name="Follow Savassi" />);

    await user.type(screen.getByLabelText(/nome/i), "Maria");
    await user.type(screen.getByLabelText(/telefone/i), "31988887777");
    await user.type(screen.getByLabelText(/e-mail/i), "maria@exemplo.com");
    await user.click(screen.getByRole("button", { name: /quero saber mais/i }));

    expect(spy).toHaveBeenCalledWith({
      type: "interesse",
      slug: "follow-savassi",
      empreendimento: "Follow Savassi",
      nome: "Maria",
      telefone: "31988887777",
      email: "maria@exemplo.com",
    });
    spy.mockRestore();
  });
});
