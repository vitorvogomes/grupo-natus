import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { ExploreDevelopments } from "./ExploreDevelopments";
import type { Development } from "@/types/development";

/**
 * Arquivo separado de propósito.
 *
 * `useReducedMotion` do motion guarda a preferência em estado de módulo
 * (`hasReducedMotionListener`), lido uma única vez na primeira renderização
 * que o usa. Stubar `matchMedia` depois disso não muda nada — é por isso que
 * os testes de reduced-motion do Reveal passam sem de fato exercitar o ramo.
 * Aqui o stub entra antes de qualquer render do arquivo, e a Vitest dá a cada
 * arquivo um registro de módulos próprio.
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

function make(slug: string): Development {
  return {
    slug,
    name: slug.toUpperCase(),
    status: "lancamento",
    location: { city: "BH", state: "MG" },
    summary: "s",
    description: "d",
    images: [],
    features: [],
  };
}

describe("ExploreDevelopments com prefers-reduced-motion", () => {
  it("rola sem animação — scrollIntoView recebe behavior 'auto'", async () => {
    const scrollIntoView = vi.fn();
    vi.spyOn(Element.prototype, "scrollIntoView").mockImplementation(
      scrollIntoView,
    );
    const user = userEvent.setup();
    render(<ExploreDevelopments developments={[make("a"), make("b")]} />);

    await user.click(screen.getByRole("button", { name: /próximo/i }));
    expect(scrollIntoView).toHaveBeenLastCalledWith(
      expect.objectContaining({ behavior: "auto" }),
    );
    vi.restoreAllMocks();
  });
});
