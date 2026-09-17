import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ShowcaseInteractive } from "./ShowcaseInteractive";

describe("ShowcaseInteractive", () => {
  it("mostra o accordion de exemplo", () => {
    render(<ShowcaseInteractive />);
    expect(
      screen.getByRole("button", { name: /o que é um empreendimento/i }),
    ).toBeInTheDocument();
  });

  it("abre e fecha o modal de exemplo", async () => {
    const user = userEvent.setup();
    render(<ShowcaseInteractive />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /abrir modal/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
