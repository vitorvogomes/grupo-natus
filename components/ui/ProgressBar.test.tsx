import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
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

  it("observa o trilho (tamanho real), não o preenchimento que nasce em scaleX(0)", () => {
    // Regressão: observar o indicador fazia o IntersectionObserver medir uma
    // caixa de largura zero, e as barras das etapas às vezes nunca enchiam.
    const observe = vi.spyOn(globalThis.IntersectionObserver.prototype, "observe");
    render(<ProgressBar value={60} label="Alvenaria" />);
    const observed = observe.mock.calls.map(([el]) => el);
    expect(observed).toContain(screen.getByRole("progressbar"));
    observe.mockRestore();
  });
});
