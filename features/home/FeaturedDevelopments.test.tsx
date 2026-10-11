import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FeaturedDevelopments } from "./FeaturedDevelopments";
import type { Development } from "@/types/development";

// `useReducedMotion` cacheia o MediaQueryList no módulo do motion na primeira
// renderização, então stubar `matchMedia` depois não tem efeito. Mockamos só o
// sensor do ambiente — o que está sob teste é como o carrossel reage a ele.
const { reduceMotion } = vi.hoisted(() => ({ reduceMotion: { value: false } }));
vi.mock("motion/react", () => ({
  useReducedMotion: () => reduceMotion.value,
}));

function make(slug: string, name: string): Development {
  return {
    slug,
    name,
    status: "em_construcao",
    location: { city: "Belo Horizonte", state: "MG" },
    summary: "s",
    description: "d",
    images: [],
    features: [],
  };
}

const list: Development[] = [
  make("follow-savassi", "Follow Savassi"),
  make("golden-ville-residence", "Golden Ville Residence"),
  make("torres-da-lagoa", "Torres da Lagoa"),
];

function spyScroll() {
  return vi.spyOn(Element.prototype, "scrollTo").mockImplementation(() => {});
}

beforeEach(() => {
  reduceMotion.value = false;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("FeaturedDevelopments (carrossel da home)", () => {
  it("mostra todos os empreendimentos recebidos", () => {
    render(<FeaturedDevelopments developments={list} />);
    expect(
      screen.getByRole("heading", { name: /nossos empreendimentos/i }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /^Ver empreendimento/ }),
    ).toHaveLength(3);
  });

  it("informa a posição atual no catálogo", async () => {
    spyScroll();
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { container } = render(<FeaturedDevelopments developments={list} />);
    const counter = () => container.querySelector("p.tabular-nums")?.textContent;
    expect(counter()).toContain("1");
    await user.click(screen.getByRole("button", { name: /próximo/i }));
    expect(counter()).toContain("2");
  });

  it("acompanha a rolagem manual do trilho (swipe muda o destaque)", () => {
    const { container } = render(<FeaturedDevelopments developments={list} />);
    const track = container.querySelector("ul");
    expect(track).not.toBeNull();
    fireEvent.scroll(track!);
    // Sem layout no jsdom todos os slides medem 0: o importante é que o
    // handler rode sem explodir e mantenha um ativo coerente.
    expect(
      screen.getByRole("button", { name: /ir para o empreendimento 1/i }),
    ).toHaveAttribute("aria-current", "true");
  });

  it("rotula cada slide com a posição no trilho", () => {
    render(<FeaturedDevelopments developments={list} />);
    for (const label of ["1 de 3", "2 de 3", "3 de 3"]) {
      expect(screen.getByRole("group", { name: label })).toBeInTheDocument();
    }
  });

  it("avança para o próximo empreendimento com rolagem suave", async () => {
    const scrollTo = spyScroll();
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<FeaturedDevelopments developments={list} />);

    await user.click(screen.getByRole("button", { name: /próximo/i }));

    expect(
      screen.getByRole("button", { name: /ir para o empreendimento 2/i }),
    ).toHaveAttribute("aria-current", "true");
    expect(scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: "smooth" }),
    );
  });

  it("volta do primeiro para o último (navegação circular)", async () => {
    spyScroll();
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<FeaturedDevelopments developments={list} />);

    await user.click(screen.getByRole("button", { name: /anterior/i }));

    expect(
      screen.getByRole("button", { name: /ir para o empreendimento 3/i }),
    ).toHaveAttribute("aria-current", "true");
  });

  it("vai direto para um empreendimento pelo indicador", async () => {
    spyScroll();
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<FeaturedDevelopments developments={list} />);

    await user.click(
      screen.getByRole("button", { name: /ir para o empreendimento 3/i }),
    );

    expect(
      screen.getByRole("button", { name: /ir para o empreendimento 3/i }),
    ).toHaveAttribute("aria-current", "true");
  });

  it("salta sem animação quando o usuário prefere menos movimento", async () => {
    reduceMotion.value = true;
    const scrollTo = spyScroll();
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<FeaturedDevelopments developments={list} />);

    await user.click(screen.getByRole("button", { name: /próximo/i }));

    expect(scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: "auto" }),
    );
  });

  it("leva ao catálogo completo", () => {
    render(<FeaturedDevelopments developments={list} />);
    expect(
      screen.getByRole("link", { name: /ver todos os empreendimentos/i }),
    ).toHaveAttribute("href", "/empreendimentos");
  });

  it("não renderiza setas nem indicadores com um único empreendimento", () => {
    render(<FeaturedDevelopments developments={[list[0]!]} />);
    expect(screen.queryByRole("button", { name: /próximo/i })).toBeNull();
    expect(screen.getByRole("group", { name: "1 de 1" })).toBeInTheDocument();
  });

  it("soma cliques rápidos nas setas em vez de perder a conta", async () => {
    spyScroll();
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<FeaturedDevelopments developments={list} />);
    const next = screen.getByRole("button", { name: /próximo/i });
    await user.click(next);
    await user.click(next);
    expect(
      screen.getByRole("button", { name: /ir para o empreendimento 3/i }),
    ).toHaveAttribute("aria-current", "true");
  });

  it("a rolagem em curso não desfaz o destino de um clique", async () => {
    spyScroll();
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { container } = render(<FeaturedDevelopments developments={list} />);
    await user.click(screen.getByRole("button", { name: /próximo/i }));
    // Eventos de scroll chegam enquanto a rolagem programática acontece; se o
    // sync respondesse a eles, o destaque voltaria para o slide de partida.
    fireEvent.scroll(container.querySelector("ul")!);
    expect(
      screen.getByRole("button", { name: /ir para o empreendimento 2/i }),
    ).toHaveAttribute("aria-current", "true");
  });

  it("rola só o trilho — nunca a página (sem rolagem horizontal do documento)", async () => {
    const scrollTo = spyScroll();
    const intoView = vi.spyOn(Element.prototype, "scrollIntoView");
    const user = userEvent.setup();
    const { container } = render(<FeaturedDevelopments developments={list} />);
    await user.click(screen.getByRole("button", { name: /próximo/i }));
    expect(scrollTo.mock.contexts.at(-1)).toBe(container.querySelector("ul"));
    expect(intoView).not.toHaveBeenCalled();
    // Nenhum card "apagado": com 3 na tela, todos são legíveis.
    for (const slide of screen.getAllByRole("group")) {
      expect(slide.className).not.toMatch(/opacity-55|scale-/);
    }
  });

  it("no fim do trilho, 'próximo' volta ao primeiro em vez de virar botão morto", async () => {
    // Com 3 cards visíveis, os últimos nunca chegam à borda esquerda: quando
    // o trilho já está no fim, avançar o índice não moveria nada.
    const scrollTo = spyScroll();
    const user = userEvent.setup();
    const { container } = render(<FeaturedDevelopments developments={list} />);
    const track = container.querySelector("ul")!;
    Object.defineProperty(track, "scrollWidth", { value: 1500, configurable: true });
    Object.defineProperty(track, "clientWidth", { value: 1000, configurable: true });
    Object.defineProperty(track, "scrollLeft", { value: 500, configurable: true });

    await user.click(screen.getByRole("button", { name: /próximo/i }));

    expect(
      screen.getByRole("button", { name: /ir para o empreendimento 1/i }),
    ).toHaveAttribute("aria-current", "true");
    expect(scrollTo).toHaveBeenLastCalledWith(
      expect.objectContaining({ left: 0 }),
    );
  });
});
