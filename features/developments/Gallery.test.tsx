import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Gallery } from "./Gallery";
import type { DevelopmentImage } from "@/types/development";

const images: DevelopmentImage[] = [
  { src: "/brand/grupo-natus-principal.png", alt: "Fachada", kind: "render" },
  { src: "/brand/grupo-natus-negativa.png", alt: "Planta 2Q", kind: "plant" },
  { src: "/brand/grupo-natus-preta.png", alt: "Área externa", kind: "render" },
];

describe("Gallery (FR4)", () => {
  it("mostra placeholder rotulado quando não há imagens", () => {
    render(<Gallery images={[]} />);
    expect(screen.getByText(/imagens em breve/i)).toBeInTheDocument();
  });

  it("exibe a imagem principal com alt obrigatório", () => {
    render(<Gallery images={images} />);
    const main = screen.getByTestId("gallery-main");
    expect(within(main).getByRole("img", { name: "Fachada" })).toBeInTheDocument();
  });

  it("permite filtrar por categoria", async () => {
    const user = userEvent.setup();
    render(<Gallery images={images} />);
    await user.click(screen.getByRole("button", { name: /plantas/i }));
    const main = screen.getByTestId("gallery-main");
    expect(within(main).getByRole("img", { name: "Planta 2Q" })).toBeInTheDocument();
  });

  it("navega com as setas do teclado", async () => {
    const user = userEvent.setup();
    render(<Gallery images={images} />);
    const region = screen.getByRole("group", { name: /galeria/i });
    region.focus();
    await user.keyboard("{ArrowRight}");
    const main = screen.getByTestId("gallery-main");
    expect(within(main).getByRole("img", { name: "Planta 2Q" })).toBeInTheDocument();
  });

  it("navega para trás com ArrowLeft (dá a volta)", async () => {
    const user = userEvent.setup();
    render(<Gallery images={images} />);
    const region = screen.getByRole("group", { name: /galeria/i });
    region.focus();
    await user.keyboard("{ArrowLeft}");
    const main = screen.getByTestId("gallery-main");
    expect(
      within(main).getByRole("img", { name: "Área externa" }),
    ).toBeInTheDocument();
  });

  it("seleciona imagem pelo thumbnail", async () => {
    const user = userEvent.setup();
    render(<Gallery images={images} />);
    await user.click(screen.getByRole("button", { name: /ver imagem: área externa/i }));
    const main = screen.getByTestId("gallery-main");
    expect(
      within(main).getByRole("img", { name: "Área externa" }),
    ).toBeInTheDocument();
  });
});
