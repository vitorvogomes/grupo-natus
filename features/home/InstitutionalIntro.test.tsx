import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InstitutionalIntro } from "./InstitutionalIntro";

describe("InstitutionalIntro", () => {
  it("tem link para Quem Somos", () => {
    render(<InstitutionalIntro />);
    expect(
      screen.getByRole("link", { name: /quem somos|conheça a empresa/i }),
    ).toHaveAttribute("href", "/quem-somos");
  });

  it("apresenta o posicionamento real (holding, ALIATTO + OASI)", () => {
    render(<InstitutionalIntro />);
    expect(
      screen.getByRole("heading", { name: /holding/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/ALIATTO Incorporadora e OASI\s+Engenharia/i),
    ).toBeInTheDocument();
  });

  it("mostra números institucionais como placeholders TODO (não inventados)", () => {
    render(<InstitutionalIntro />);
    expect(screen.getAllByText(/TODO: CONTENT REQUIRED/).length).toBeGreaterThan(
      0,
    );
  });
});
