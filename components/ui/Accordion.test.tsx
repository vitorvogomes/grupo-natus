import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Accordion } from "./Accordion";

const items = [
  { id: "a", title: "Pergunta A", content: "Resposta A" },
  { id: "b", title: "Pergunta B", content: "Resposta B" },
];

describe("Accordion", () => {
  it("mostra os títulos e esconde os conteúdos inicialmente", () => {
    render(<Accordion items={items} />);
    expect(
      screen.getByRole("button", { name: "Pergunta A" }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Resposta A")).not.toBeInTheDocument();
  });

  it("expande um item ao clicar e recolhe ao clicar de novo", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const header = screen.getByRole("button", { name: "Pergunta A" });
    await user.click(header);
    expect(header).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Resposta A")).toBeInTheDocument();
    await user.click(header);
    expect(header).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Resposta A")).not.toBeInTheDocument();
  });

  it("permite múltiplos itens abertos de forma independente", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    await user.click(screen.getByRole("button", { name: "Pergunta A" }));
    await user.click(screen.getByRole("button", { name: "Pergunta B" }));
    expect(screen.getByText("Resposta A")).toBeInTheDocument();
    expect(screen.getByText("Resposta B")).toBeInTheDocument();
  });
});
