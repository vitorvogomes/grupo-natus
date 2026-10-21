import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";

const { animate, inView } = vi.hoisted(() => ({
  animate: vi.fn(() => ({ stop: vi.fn() })),
  inView: vi.fn(),
}));
vi.mock("motion/mini", () => ({ animate }));
vi.mock("motion", () => ({ inView }));

import { armReveal, BRAND_EASE } from "./armReveal";

const at = (top: number) => {
  const el = document.createElement("div");
  el.getBoundingClientRect = vi.fn(() => ({ top, bottom: top + 100 }) as DOMRect);
  return el;
};
const below = () => at(window.innerHeight + 200);
const options = { from: { opacity: "0" }, to: { opacity: "1" } };
// O lote roda numa microtask enfileirada antes desta.
const flushed = () => Promise.resolve();

let enter: () => void;
const stopObserving = vi.fn();
beforeEach(() => {
  inView.mockImplementation((_el: Element, cb: () => void) => {
    enter = cb;
    return stopObserving;
  });
});
afterEach(() => vi.clearAllMocks());

describe("armReveal", () => {
  it("abaixo da tela: parte do estado inicial e anima só ao entrar na viewport", async () => {
    const el = below();
    armReveal(el, el, { ...options, delay: 0.2 });
    await flushed();
    expect(el.style.opacity).toBe("0");
    expect(animate).not.toHaveBeenCalled();

    enter();
    expect(animate).toHaveBeenCalledWith(el, { opacity: "1" }, expect.objectContaining({ delay: 0.2 }));
  });

  it("o que já está na tela (ou acima) quando o JS chega fica no estado final", async () => {
    const els = [at(100), at(-500)];
    for (const el of els) armReveal(el, el, options);
    await flushed();
    for (const el of els) expect(el.style.opacity).toBe("1");
    expect(inView).not.toHaveBeenCalled();
  });

  it("mede todos de uma vez, num lote só por commit", async () => {
    const els = [below(), at(0), below()];
    for (const el of els) armReveal(el, el, options);
    for (const el of els) expect(el.getBoundingClientRect).not.toHaveBeenCalled();
    await flushed();
    for (const el of els) expect(el.getBoundingClientRect).toHaveBeenCalledTimes(1);
  });

  it("observa o gatilho, que pode não ser o elemento animado", async () => {
    const trigger = below();
    const el = document.createElement("div");
    armReveal(el, trigger, { ...options, amount: 0.3 });
    await flushed();
    expect(inView).toHaveBeenCalledWith(trigger, expect.any(Function), expect.objectContaining({ amount: 0.3 }));
    expect(el.style.opacity).toBe("0");
  });

  it("com prefers-reduced-motion não esconde nem anima", async () => {
    const spy = vi.spyOn(window, "matchMedia").mockReturnValue({ matches: true } as MediaQueryList);
    const el = below();
    armReveal(el, el, options);
    await flushed();
    expect(el.style.opacity).toBe("");
    expect(inView).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("a limpeza para tudo e devolve o estado final (nada fica escondido ou no meio)", async () => {
    const stop = vi.fn();
    animate.mockReturnValueOnce({ stop });
    const el = below();
    const cleanup = armReveal(el, el, options);
    await flushed();
    enter();
    cleanup();
    expect(stopObserving).toHaveBeenCalled();
    expect(stop).toHaveBeenCalled();
    expect(el.style.opacity).toBe("1");
  });

  it("desmontado antes do lote, não é medido nem escondido", async () => {
    const el = below();
    armReveal(el, el, options)();
    await flushed();
    expect(el.getBoundingClientRect).not.toHaveBeenCalled();
    expect(el.style.opacity).toBe("1");
  });

  it("o ease é o mesmo token --ease-brand do tema", () => {
    const css = readFileSync("styles/theme.css", "utf8");
    expect(css).toContain(`--ease-brand: cubic-bezier(${BRAND_EASE.join(", ")});`);
  });
});
