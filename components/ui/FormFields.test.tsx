import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { Select } from "./Select";

describe("Input", () => {
  it("associa label ao controle", () => {
    render(<Input id="nome" name="nome" label="Nome" />);
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
  });

  it("indica erro com aria-invalid e role alert", () => {
    render(<Input id="email" name="email" label="Email" error="Inválido" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Inválido");
    expect(input).toHaveAttribute("aria-describedby", "email-error");
  });

  it("marca obrigatório", () => {
    render(<Input id="n" name="n" label="Nome" required />);
    expect(screen.getByLabelText(/Nome/)).toBeRequired();
  });
});

describe("Textarea", () => {
  it("associa label e mostra erro", () => {
    render(
      <Textarea id="msg" name="msg" label="Mensagem" error="Obrigatório" />,
    );
    expect(screen.getByLabelText("Mensagem")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Obrigatório");
  });
});

describe("Select", () => {
  it("renderiza opções e associa label", () => {
    render(
      <Select
        id="assunto"
        name="assunto"
        label="Assunto"
        options={[
          { value: "a", label: "Compra" },
          { value: "b", label: "Visita" },
        ]}
      />,
    );
    const select = screen.getByLabelText("Assunto");
    expect(select).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Compra" })).toBeInTheDocument();
  });

  it("suporta placeholder, obrigatório e erro", () => {
    render(
      <Select
        id="uf"
        name="uf"
        label="UF"
        required
        error="Selecione uma opção"
        placeholder="Selecione"
        options={[{ value: "mg", label: "MG" }]}
      />,
    );
    expect(screen.getByLabelText(/UF/)).toBeRequired();
    expect(screen.getByRole("option", { name: "Selecione" })).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Selecione uma opção");
  });
});
