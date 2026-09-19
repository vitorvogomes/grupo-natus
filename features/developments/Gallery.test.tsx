import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Gallery } from "./Gallery";
import type { DevelopmentImage } from "@/types/development";

const images: DevelopmentImage[] = [
  { src: "/brand/grupo-natus-principal.png", alt: "Fachada", kind: "externa" },
  { src: "/brand/grupo-natus-negativa.png", alt: "Planta 2Q", kind: "planta" },
  { src: "/brand/grupo-natus-preta.png", alt: "Área externa", kind: "externa" },
];

const setup = () => userEvent.setup({ pointerEventsCheck: 0 });

describe("Gallery (FR4)", () => {
  it("mostra placeholder rotulado quando não há imagens", () => {
    render(<Gallery images={[]} />);
    expect(screen.getByText(/imagens em breve/i)).toBeInTheDocument();
  });

  it("exibe as imagens (aba Todas por padrão) com alt obrigatório", () => {
    render(<Gallery images={images} />);
    expect(screen.getByRole("img", { name: "Fachada" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Planta 2Q" })).toBeInTheDocument();
  });

  it("filtra por categoria via Radix Tabs", async () => {
    const user = setup();
    render(<Gallery images={images} />);
    await user.click(screen.getByRole("tab", { name: /plantas/i }));
    expect(screen.getByRole("img", { name: "Planta 2Q" })).toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: "Fachada" }),
    ).not.toBeInTheDocument();
  });

  it("abre o lightbox ampliado ao clicar numa imagem", async () => {
    const user = setup();
    render(<Gallery images={images} />);
    await user.click(
      screen.getByRole("button", { name: /ampliar imagem: fachada/i }),
    );
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("img", { name: "Fachada" })).toBeInTheDocument();
  });

  it("navega no lightbox com as setas (avança e dá a volta)", async () => {
    const user = setup();
    render(<Gallery images={images} />);
    await user.click(
      screen.getByRole("button", { name: /ampliar imagem: fachada/i }),
    );
    const dialog = screen.getByRole("dialog");
    await user.keyboard("{ArrowRight}");
    expect(
      within(dialog).getByRole("img", { name: "Planta 2Q" }),
    ).toBeInTheDocument();
    // De Planta (1) volta a Fachada (0); mais um ArrowLeft dá a volta p/ Área externa (2).
    await user.keyboard("{ArrowLeft}");
    await user.keyboard("{ArrowLeft}");
    expect(
      within(dialog).getByRole("img", { name: "Área externa" }),
    ).toBeInTheDocument();
  });

  it("navega pelos botões de próximo/anterior", async () => {
    const user = setup();
    render(<Gallery images={images} />);
    await user.click(
      screen.getByRole("button", { name: /ampliar imagem: fachada/i }),
    );
    const dialog = screen.getByRole("dialog");
    await user.click(within(dialog).getByRole("button", { name: /próxima imagem/i }));
    expect(
      within(dialog).getByRole("img", { name: "Planta 2Q" }),
    ).toBeInTheDocument();
    await user.click(
      within(dialog).getByRole("button", { name: /imagem anterior/i }),
    );
    expect(within(dialog).getByRole("img", { name: "Fachada" })).toBeInTheDocument();
  });

  it("fecha o lightbox no Escape", async () => {
    const user = setup();
    render(<Gallery images={images} />);
    await user.click(
      screen.getByRole("button", { name: /ampliar imagem: fachada/i }),
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
