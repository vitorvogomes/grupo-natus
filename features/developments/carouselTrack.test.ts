import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CAROUSEL_TRACK_CLASS,
  isTrackAtEnd,
  leftmostIndex,
  prevIndex,
  scrollTrackTo,
  visibleIndex,
} from "./carouselTrack";

function track(widths: {
  scrollWidth: number;
  clientWidth: number;
  scrollLeft: number;
}) {
  const ul = document.createElement("ul");
  for (const [i, left] of [0, 300, 600].entries()) {
    const li = document.createElement("li");
    li.dataset.i = String(i);
    Object.defineProperty(li, "offsetLeft", { value: 100 + left });
    ul.appendChild(li);
  }
  for (const [key, value] of Object.entries(widths)) {
    Object.defineProperty(ul, key, { value, configurable: true });
  }
  return ul;
}

afterEach(() => vi.restoreAllMocks());

describe("scrollTrackTo", () => {
  it("rola só o trilho até o slide, relativo ao primeiro (nunca a página)", () => {
    const ul = track({ scrollWidth: 900, clientWidth: 300, scrollLeft: 0 });
    const scrollTo = vi.spyOn(ul, "scrollTo");
    const intoView = vi.spyOn(Element.prototype, "scrollIntoView");
    scrollTrackTo(ul, 2, true);
    expect(scrollTo).toHaveBeenCalledWith({ left: 600, behavior: "smooth" });
    // scrollIntoView rolaria também os ancestrais — inclusive o documento.
    expect(intoView).not.toHaveBeenCalled();
  });

  it("sem animação quando pedido, e ignora índice inexistente", () => {
    const ul = track({ scrollWidth: 900, clientWidth: 300, scrollLeft: 0 });
    const scrollTo = vi.spyOn(ul, "scrollTo");
    scrollTrackTo(ul, 0, false);
    expect(scrollTo).toHaveBeenCalledWith({ left: 0, behavior: "auto" });
    scrollTrackTo(ul, 9, true);
    scrollTrackTo(null, 0, true);
    expect(scrollTo).toHaveBeenCalledTimes(1);
  });
});

describe("isTrackAtEnd", () => {
  it("detecta o fim só quando há overflow de fato", () => {
    expect(
      isTrackAtEnd(
        track({ scrollWidth: 900, clientWidth: 300, scrollLeft: 600 }),
      ),
    ).toBe(true);
    expect(
      isTrackAtEnd(
        track({ scrollWidth: 900, clientWidth: 300, scrollLeft: 100 }),
      ),
    ).toBe(false);
    // Sem layout (jsdom) ou com poucos cards, não existe "fim" a detectar.
    expect(
      isTrackAtEnd(track({ scrollWidth: 0, clientWidth: 0, scrollLeft: 0 })),
    ).toBe(false);
    expect(isTrackAtEnd(null)).toBe(false);
  });
});

describe("CAROUSEL_TRACK_CLASS", () => {
  it("é relative: o trilho contém os descendentes absolute (sr-only dos cards)", () => {
    // Regressão: sem bloco de contenção no trilho, os sr-only dos cards fora
    // da tela vazavam e geravam rolagem horizontal no documento.
    expect(CAROUSEL_TRACK_CLASS.split(" ")).toContain("relative");
  });
});

/** Trilho com N slides de 300px; o trilho está rolado em `scrollLeft`. */
function laidOut(scrollLeft: number, count = 5, clientWidth = 900) {
  const ul = document.createElement("ul");
  vi.spyOn(ul, "getBoundingClientRect").mockReturnValue({
    left: 0,
    right: clientWidth,
  } as DOMRect);
  for (let i = 0; i < count; i += 1) {
    const li = document.createElement("li");
    vi.spyOn(li, "getBoundingClientRect").mockReturnValue({
      left: i * 300 - scrollLeft,
      right: i * 300 - scrollLeft + 300,
      width: 300,
    } as DOMRect);
    ul.appendChild(li);
  }
  for (const [key, value] of Object.entries({
    scrollWidth: count * 300,
    clientWidth,
    scrollLeft,
  })) {
    Object.defineProperty(ul, key, { value, configurable: true });
  }
  return ul;
}

describe("isTrackAtEnd com layout real", () => {
  it("o fim é o último card inteiro na tela — o snap pode parar px antes do scroll máximo", () => {
    // scroll máximo = 600; o snap parou em 596, e o último card já cabe.
    const ul = laidOut(596);
    Object.defineProperty(ul, "scrollLeft", { value: 596, configurable: true });
    vi.spyOn(
      ul.lastElementChild as HTMLElement,
      "getBoundingClientRect",
    ).mockReturnValue({
      left: 604,
      right: 900,
      width: 300,
    } as DOMRect);
    expect(isTrackAtEnd(ul)).toBe(true);
    // Snap parou com o último card 7 px cortado (medido no Chromium): é o fim.
    vi.spyOn(
      ul.lastElementChild as HTMLElement,
      "getBoundingClientRect",
    ).mockReturnValue({
      left: 607,
      right: 907,
      width: 300,
    } as DOMRect);
    expect(isTrackAtEnd(ul)).toBe(true);
    expect(isTrackAtEnd(laidOut(300))).toBe(false);
  });
});

describe("índices do trilho (vários cards visíveis)", () => {
  it("leftmostIndex: o slide mais perto da borda esquerda", () => {
    expect(leftmostIndex(laidOut(0))).toBe(0);
    expect(leftmostIndex(laidOut(310))).toBe(1);
  });

  it("visibleIndex: no fim do trilho, o último — os últimos nunca chegam à borda", () => {
    // 5 slides, 3 visíveis: no fim, a borda esquerda está no slide 2, mas
    // o último está na tela; o contador precisa poder chegar a 5/5.
    expect(visibleIndex(laidOut(600))).toBe(4);
    expect(visibleIndex(laidOut(300))).toBe(1);
  });

  it("prevIndex: do fim, volta a partir do que está na borda (sem clique morto)", () => {
    // Índice 4 (fim), borda no 2: voltar para o 3 não moveria nada.
    expect(prevIndex(laidOut(600), 4, 5)).toBe(1);
    // Fora do fim, só decrementa — e do início dá a volta.
    expect(prevIndex(laidOut(300), 1, 5)).toBe(0);
    expect(prevIndex(laidOut(0), 0, 5)).toBe(4);
  });
});
