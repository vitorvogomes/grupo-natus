import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InterestForm } from "./InterestForm";

describe("InterestForm (FR9)", () => {
  it("pré-preenche o empreendimento e mantém o campo somente leitura", () => {
    render(<InterestForm slug="follow-savassi" name="Follow Savassi" />);
    const field = screen.getByLabelText(/Empreendimento/) as HTMLInputElement;
    expect(field.value).toBe("Follow Savassi");
    expect(field).toHaveAttribute("readonly");
  });

  it("tem os campos de contato esperados", () => {
    render(<InterestForm slug="x" name="X" />);
    expect(screen.getByLabelText(/Nome/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telefone/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensagem/)).toBeInTheDocument();
  });
});
