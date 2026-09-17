import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renderiza como <button> com o rótulo", () => {
    render(<Button>Enviar</Button>);
    expect(screen.getByRole("button", { name: "Enviar" })).toBeInTheDocument();
  });

  it("usa a variante primary por padrão (cor da marca via token)", () => {
    render(<Button>X</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-brand");
  });

  it("aceita variantes secondary e ghost", () => {
    const { rerender } = render(<Button variant="secondary">X</Button>);
    expect(screen.getByRole("button").className).toContain("border");
    rerender(<Button variant="ghost">X</Button>);
    expect(screen.getByRole("button").className).toContain("bg-transparent");
  });

  it("aplica tamanhos sm/md/lg", () => {
    const { rerender } = render(<Button size="sm">X</Button>);
    expect(screen.getByRole("button").className).toContain("text-sm");
    rerender(<Button size="lg">X</Button>);
    expect(screen.getByRole("button").className).toContain("text-lg");
  });

  it("fica desabilitado e não dispara onClick", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button disabled onClick={onClick}>
        X
      </Button>,
    );
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("dispara onClick quando habilitado e mescla className", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button onClick={onClick} className="extra">
        X
      </Button>,
    );
    const btn = screen.getByRole("button");
    expect(btn).toHaveClass("extra");
    await user.click(btn);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
