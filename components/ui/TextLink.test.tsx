import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TextLink } from "./TextLink";

describe("TextLink", () => {
  it("renderiza um link com href e children", () => {
    render(<TextLink href="/contato">Contato</TextLink>);
    const link = screen.getByRole("link", { name: "Contato" });
    expect(link).toHaveAttribute("href", "/contato");
  });

  it("marca links externos com rel de segurança e target", () => {
    render(
      <TextLink href="https://wa.me/5531984663280" external>
        WhatsApp
      </TextLink>,
    );
    const link = screen.getByRole("link", { name: "WhatsApp" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("mescla className", () => {
    render(
      <TextLink href="/x" className="extra">
        x
      </TextLink>,
    );
    expect(screen.getByRole("link")).toHaveClass("extra");
  });
});
