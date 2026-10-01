import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MinhaCasaMinhaVida } from "./MinhaCasaMinhaVida";

describe("Seção Minha Casa Minha Vida", () => {
  it("apresenta o programa com o título da campanha", () => {
    render(<MinhaCasaMinhaVida />);
    expect(
      screen.getByRole("heading", { name: /seu sonho da casa própria/i }),
    ).toBeInTheDocument();
  });

  it("exibe a marca do programa federal", () => {
    render(<MinhaCasaMinhaVida />);
    expect(
      screen.getByRole("img", { name: /minha casa minha vida/i }),
    ).toBeInTheDocument();
  });

  it("leva a simulação para o WhatsApp com a mensagem de contexto", () => {
    render(<MinhaCasaMinhaVida />);
    const cta = screen.getByRole("link", { name: /simule agora/i });
    expect(cta).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me"),
    );
    expect(cta.getAttribute("href")).toContain("simula");
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("lista os três benefícios do programa, cada um com sua explicação", () => {
    render(<MinhaCasaMinhaVida />);
    for (const title of [
      /parcela que cabe no mês/i,
      /juros reduzidos do programa/i,
      /seu fgts vale mais/i,
    ]) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
    // O título sozinho é um rótulo; a linha de apoio é o que informa.
    expect(screen.getByText(/entrada facilitada/i)).toBeInTheDocument();
    expect(screen.getByText(/abater o financiamento/i)).toBeInTheDocument();
  });

  it("apresenta os benefícios como lista, não como texto solto", () => {
    render(<MinhaCasaMinhaVida />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });
});
