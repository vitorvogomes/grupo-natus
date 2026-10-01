import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Reveal } from "./Reveal";

describe("Reveal", () => {
  it("renderiza os filhos", () => {
    render(
      <Reveal>
        <p>conteúdo revelado</p>
      </Reveal>,
    );
    expect(screen.getByText("conteúdo revelado")).toBeInTheDocument();
  });

  it("aplica className no wrapper", () => {
    render(
      <Reveal className="minha-classe">
        <span>alvo</span>
      </Reveal>,
    );
    expect(screen.getByText("alvo").parentElement).toHaveClass("minha-classe");
  });

  it("renderiza como item de lista sem quebrar a semântica da lista", () => {
    render(
      <ul>
        <Reveal as="li">
          <span>item animado</span>
        </Reveal>
      </ul>,
    );
    // O <li> precisa ser filho direto do <ul>: um wrapper div no meio tiraria
    // o item da lista para leitores de tela.
    expect(screen.getByRole("listitem")).toContainElement(
      screen.getByText("item animado"),
    );
  });

});
