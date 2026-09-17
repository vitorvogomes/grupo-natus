import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Image } from "./Image";

describe("Image", () => {
  it("renderiza um <img> com alt e src obrigatórios", () => {
    render(<Image src="/brand/grupo-natus-principal.png" alt="Logo" width={100} height={20} />);
    const img = screen.getByRole("img", { name: "Logo" });
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain("grupo-natus-principal");
  });

  it("permite alt vazio explícito (imagem decorativa)", () => {
    const { container } = render(
      <Image src="/brand/grupo-natus-preta.png" alt="" width={100} height={20} />,
    );
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img).toHaveAttribute("alt", "");
  });
});
