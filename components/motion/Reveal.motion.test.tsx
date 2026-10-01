import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { Reveal } from "./Reveal";

/**
 * Arquivo separado de propósito.
 *
 * `useReducedMotion` lê a preferência uma única vez, na primeira renderização
 * do módulo que a usa (`hasReducedMotionListener`, estado de módulo do motion).
 * Stubar `matchMedia` depois disso não muda nada — era por isso que os testes
 * de reduced-motion que viviam em `Reveal.test.tsx` passavam sem exercitar o
 * ramo: afirmavam algo verdadeiro nos dois lados. Aqui o stub entra antes de
 * qualquer render e a Vitest dá a cada arquivo um registro de módulos próprio.
 */
beforeAll(() => {
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
});

describe("Reveal com prefers-reduced-motion", () => {
  it("entrega o conteúdo visível, sem opacity/transform de entrada", () => {
    render(
      <Reveal className="estatico">
        <span>sem motion</span>
      </Reveal>,
    );
    const wrapper = screen.getByText("sem motion").parentElement!;
    expect(wrapper).toHaveClass("estatico");
    // Com motion o wrapper nasce em `opacity: 0; transform: translateY(16px)`.
    expect(wrapper.getAttribute("style")).toBeNull();
  });

  it("mantém o elemento escolhido, sem quebrar a semântica da lista", () => {
    render(
      <ul>
        <Reveal as="li">
          <span>item</span>
        </Reveal>
      </ul>,
    );
    const item = screen.getByRole("listitem");
    expect(item).toContainElement(screen.getByText("item"));
    expect(item.getAttribute("style")).toBeNull();
  });
});
