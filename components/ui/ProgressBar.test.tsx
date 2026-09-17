import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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
});
