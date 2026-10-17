import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SocialLinks } from "./SocialLinks";
import { SOCIAL } from "@/lib/site";

describe("SocialLinks", () => {
  it("lista os perfis oficiais com nome acessível e abertura segura em nova aba", () => {
    render(<SocialLinks />);
    const esperado = [
      [/instagram do grupo natus/i, SOCIAL.instagram],
      [/facebook do grupo natus/i, SOCIAL.facebook],
      [/linkedin do grupo natus/i, SOCIAL.linkedin],
    ] as const;
    for (const [name, href] of esperado) {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("ícones são decorativos (o nome vem do aria-label)", () => {
    const { container } = render(<SocialLinks />);
    for (const svg of container.querySelectorAll("svg")) {
      expect(svg).toHaveAttribute("aria-hidden", "true");
    }
  });
});
