import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

// Arquivo próprio porque o mock de rota é por arquivo no Vitest: aqui estamos
// na Home, onde o header começa oculto sobre o hero.
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import { Header } from "./Header";

function scrollTo(y: number) {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true });
  fireEvent.scroll(window);
}

afterEach(() => {
  scrollTo(0);
});

describe("Header na Home (revela na rolagem)", () => {
  it("começa oculto para não competir com o hero", () => {
    render(<Header />);
    expect(screen.getByRole("banner")).toHaveAttribute(
      "data-revealed",
      "false",
    );
  });

  it("aparece assim que a página rola", () => {
    render(<Header />);
    scrollTo(120);
    expect(screen.getByRole("banner")).toHaveAttribute("data-revealed", "true");
  });

  it("some de novo ao voltar ao topo", () => {
    render(<Header />);
    scrollTo(120);
    scrollTo(0);
    expect(screen.getByRole("banner")).toHaveAttribute(
      "data-revealed",
      "false",
    );
  });

  it("mesmo oculto, continua acessível por teclado e leitores de tela", () => {
    // Oculto é opacidade + transform, nunca `display:none`/`aria-hidden`:
    // tirar o header da árvore deixaria a navegação inalcançável por Tab.
    render(<Header />);
    const banner = screen.getByRole("banner");
    expect(banner).not.toHaveAttribute("aria-hidden");
    expect(
      screen.getByRole("link", { name: /grupo natus/i }),
    ).toBeInTheDocument();
  });

  it("marca a página com a logo branca enquanto o header está oculto", () => {
    render(<Header />);
    const marca = screen.getByTestId("hero-brand");
    expect(marca).toHaveAttribute("data-visible", "true");
    // Decorativa: a navegação real (e seu link para a Home) está no header,
    // que segue acessível. Duplicar o link confundiria leitores de tela.
    expect(marca).toHaveAttribute("aria-hidden", "true");
  });

  it("entrega a marca ao header assim que ele aparece", () => {
    render(<Header />);
    scrollTo(120);
    expect(screen.getByTestId("hero-brand")).toHaveAttribute(
      "data-visible",
      "false",
    );
  });

  it("revela o header quando o ponteiro chega ao topo", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const banner = screen.getByRole("banner");
    expect(banner).toHaveAttribute("data-revealed", "false");

    // Sem isto, quem usa mouse precisaria rolar para alcançar a navegação —
    // o teclado já tinha o `focus-within`.
    await user.hover(banner);
    expect(banner).toHaveAttribute("data-revealed", "true");

    await user.unhover(banner);
    expect(banner).toHaveAttribute("data-revealed", "false");
  });

  it("nenhuma camada fica por cima do header revelado pelo hover", async () => {
    // Regressão: uma faixa de captura (z-50) sobre o header (z-40) revelava a
    // navegação mas engolia todos os cliques. O alvo do hover agora é o
    // invólucro do próprio header — não existe camada irmã sobre ele.
    const user = userEvent.setup();
    render(<Header />);
    expect(screen.queryByTestId("header-hover-zone")).toBeNull();

    const banner = screen.getByRole("banner");
    await user.hover(banner);
    const link = screen.getByRole("link", { name: "Empreendimentos" });
    expect(banner).toContainElement(link);
    expect(banner).toHaveAttribute("data-revealed", "true");
  });

  it("a logo branca sai quando o hover revela o header (não fica atrás dele)", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.hover(screen.getByRole("banner"));
    expect(screen.getByTestId("hero-brand")).toHaveAttribute(
      "data-visible",
      "false",
    );
  });
});
