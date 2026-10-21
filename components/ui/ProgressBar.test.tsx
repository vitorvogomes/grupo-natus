import { render, screen, waitFor } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, onTestFinished, vi } from "vitest";
import { stubBelowTheFold } from "@/tests/belowTheFold";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar (acessível, não só cor)", () => {
  it("expõe role progressbar com aria-valuenow", () => {
    render(<ProgressBar value={65} label="Fundação" />);
    const bar = screen.getByRole("progressbar", { name: /fundação/i });
    expect(bar).toHaveAttribute("aria-valuenow", "65");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("mostra o percentual como texto (não depende de cor)", () => {
    render(<ProgressBar value={65} label="Fundação" />);
    expect(screen.getByText("65%")).toBeInTheDocument();
  });

  it("limita valores fora de 0–100", () => {
    render(<ProgressBar value={150} label="X" />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
  });

  it("suporta a variante de destaque (size=lg) mantendo a acessibilidade", () => {
    render(<ProgressBar value={62} label="Progresso geral" size="lg" />);
    const bar = screen.getByRole("progressbar", { name: /progresso geral/i });
    expect(bar).toHaveAttribute("aria-valuenow", "62");
    expect(screen.getByText("62%")).toBeInTheDocument();
  });

  it("o HTML do servidor já traz a barra no valor, sem esperar o JS", () => {
    const html = renderToString(<ProgressBar value={60} label="Alvenaria" />);
    expect(html).toContain("scaleX(0.6)");
  });

  it("abaixo da tela: o preenchimento parte de 0 e enche quando o TRILHO entra na tela", async () => {
    // O trilho tem o tamanho real; o preenchimento em scaleX(0) é uma caixa de
    // largura zero, que não cruza o limiar do IntersectionObserver.
    const { animate } = stubBelowTheFold();
    const observe = vi.spyOn(globalThis.IntersectionObserver.prototype, "observe");
    onTestFinished(() => observe.mockRestore());

    render(<ProgressBar value={60} label="Alvenaria" />);
    const track = screen.getByRole("progressbar");
    await waitFor(() => expect(animate).toHaveBeenCalled());
    expect(observe.mock.calls.map(([el]) => el)).toContain(track);
    expect((track.firstElementChild as HTMLElement).style.transform).toBe("scaleX(0)");
  });
});
