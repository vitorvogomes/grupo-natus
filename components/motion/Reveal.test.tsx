import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Reveal } from "./Reveal";

afterEach(() => {
  vi.unstubAllGlobals();
});

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

  it("degrada para wrapper estático quando prefers-reduced-motion", () => {
    vi.stubGlobal(
      "matchMedia",
      (query: string) =>
        ({
          matches: true,
          media: query,
          onchange: null,
          addEventListener: () => {},
          removeEventListener: () => {},
          addListener: () => {},
          removeListener: () => {},
          dispatchEvent: () => false,
        }) as unknown as MediaQueryList,
    );
    render(
      <Reveal className="estatico">
        <span>sem motion</span>
      </Reveal>,
    );
    expect(screen.getByText("sem motion")).toBeInTheDocument();
  });
});
