import { onTestFinished, vi } from "vitest";

/**
 * Põe todo elemento abaixo da tela e dá ao jsdom um `animate` (ele não tem
 * Web Animations). Restaura ao fim do teste, mesmo se uma asserção falhar.
 */
export function stubBelowTheFold() {
  const rect = vi
    .spyOn(HTMLElement.prototype, "getBoundingClientRect")
    .mockReturnValue({ top: window.innerHeight + 500, bottom: window.innerHeight + 900 } as DOMRect);
  const animate = vi.fn(() => ({ finished: Promise.resolve(), cancel() {}, onfinish: null }));
  Object.defineProperty(HTMLElement.prototype, "animate", { value: animate, configurable: true });
  onTestFinished(() => {
    rect.mockRestore();
    delete (HTMLElement.prototype as { animate?: unknown }).animate;
  });
  return { animate };
}
