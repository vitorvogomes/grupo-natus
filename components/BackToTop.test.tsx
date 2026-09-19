import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BackToTop } from "./BackToTop";

afterEach(() => vi.unstubAllGlobals());

describe("BackToTop", () => {
  it("rola a janela para o topo ao clicar", async () => {
    const scrollTo = vi.fn();
    vi.stubGlobal("scrollTo", scrollTo);
    const user = userEvent.setup();
    render(<BackToTop />);
    await user.click(screen.getByRole("button", { name: /voltar ao topo/i }));
    expect(scrollTo).toHaveBeenCalledWith({ top: 0 });
  });
});
