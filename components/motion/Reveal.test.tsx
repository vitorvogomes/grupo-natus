import { render, screen, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { stubBelowTheFold } from "@/tests/belowTheFold";
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

  it("o HTML do servidor já vem visível: o conteúdo não espera o JS", () => {
    const html = renderToString(
      <Reveal>
        <p>sem JS</p>
      </Reveal>,
    );
    expect(html).toContain("sem JS");
    expect(html).not.toMatch(/opacity|transform/);
  });

  it("abaixo da tela, esconde ao hidratar e revela ao entrar na viewport", async () => {
    // O IntersectionObserver de teste dispara na hora: o reveal já começa.
    const { animate } = stubBelowTheFold();
    render(
      <Reveal>
        <span>abaixo</span>
      </Reveal>,
    );
    const wrapper = screen.getByText("abaixo").parentElement!;
    await waitFor(() => expect(animate).toHaveBeenCalled());
    expect(wrapper.style.opacity).toBe("0");
  });
});
