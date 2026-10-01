import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Gallery } from "./Gallery";
import type { DevelopmentImage } from "@/types/development";

const images: DevelopmentImage[] = [
  { src: "/brand/grupo-natus-principal.png", alt: "Fachada", kind: "imagens" },
  { src: "/brand/grupo-natus-preta.png", alt: "Piscina", kind: "imagens" },
  { src: "/brand/grupo-natus-negativa.png", alt: "Planta 2Q", kind: "planta" },
];

const setup = () => userEvent.setup({ pointerEventsCheck: 0 });

/** Palco = o botão que amplia; o alt dele é a imagem ativa no momento. */
function palco() {
  return screen.getByRole("button", { name: /^ampliar imagem:/i });
}

describe("Gallery", () => {
  it("mostra placeholder rotulado quando não há imagens", () => {
    render(<Gallery images={[]} />);
    expect(screen.getByText(/imagens em breve/i)).toBeInTheDocument();
  });

  it("abre no primeiro item da categoria, com contador de posição", () => {
    render(<Gallery images={images} />);
    expect(palco()).toHaveAccessibleName(/fachada/i);
    expect(screen.getByText("1 / 2")).toBeInTheDocument();
  });

  it("a miniatura troca o palco e marca a posição ativa", async () => {
    const user = setup();
    render(<Gallery images={images} />);
    const miniaturas = screen.getAllByRole("button", { name: /^ver imagem:/i });
    expect(miniaturas[0]).toHaveAttribute("aria-current", "true");

    await user.click(miniaturas[1]!);
    expect(palco()).toHaveAccessibleName(/piscina/i);
    expect(screen.getByText("2 / 2")).toBeInTheDocument();
    expect(miniaturas[1]).toHaveAttribute("aria-current", "true");
    expect(miniaturas[0]).not.toHaveAttribute("aria-current");
  });

  it("a régua é uma parada de Tab só, navegada pelas setas", async () => {
    const user = setup();
    render(<Gallery images={images} />);
    const miniaturas = screen.getAllByRole("button", { name: /^ver imagem:/i });
    // Roving tabindex: só a ativa é tabulável.
    expect(miniaturas[0]).toHaveAttribute("tabindex", "0");
    expect(miniaturas[1]).toHaveAttribute("tabindex", "-1");

    miniaturas[0]!.focus();
    await user.keyboard("{ArrowRight}");
    expect(palco()).toHaveAccessibleName(/piscina/i);
    expect(miniaturas[1]).toHaveFocus();
    expect(miniaturas[1]).toHaveAttribute("tabindex", "0");

    await user.keyboard("{End}");
    expect(palco()).toHaveAccessibleName(/piscina/i);
    await user.keyboard("{Home}");
    expect(palco()).toHaveAccessibleName(/fachada/i);
  });

  it("as setas do palco circulam (próxima no fim volta ao começo)", async () => {
    const user = setup();
    render(<Gallery images={images} />);
    await user.click(screen.getByRole("button", { name: /próxima imagem/i }));
    expect(palco()).toHaveAccessibleName(/piscina/i);
    await user.click(screen.getByRole("button", { name: /próxima imagem/i }));
    expect(palco()).toHaveAccessibleName(/fachada/i);
    await user.click(screen.getByRole("button", { name: /imagem anterior/i }));
    expect(palco()).toHaveAccessibleName(/piscina/i);
  });

  it("filtra por categoria e reinicia o palco na nova aba", async () => {
    const user = setup();
    render(<Gallery images={images} />);
    await user.click(screen.getByRole("tab", { name: /plantas/i }));
    expect(palco()).toHaveAccessibleName(/planta 2q/i);
    // Categoria de uma imagem só: sem setas, sem régua, sem contador.
    expect(
      screen.queryByRole("button", { name: /próxima imagem/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/ \/ /)).not.toBeInTheDocument();
  });

  it("sem categoria nenhuma (uso institucional) não renderiza abas", () => {
    render(
      <Gallery
        images={[
          { src: "/brand/grupo-natus-principal.png", alt: "Obra A" },
          { src: "/brand/grupo-natus-preta.png", alt: "Obra B" },
        ]}
      />,
    );
    expect(screen.queryByRole("tab")).not.toBeInTheDocument();
    expect(palco()).toHaveAccessibleName(/obra a/i);
  });

  it("o palco abre o lightbox e ele navega dentro da categoria ativa", async () => {
    const user = setup();
    render(<Gallery images={images} />);
    await user.click(palco());
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("img", { name: "Fachada" })).toBeInTheDocument();

    await user.keyboard("{ArrowRight}");
    expect(within(dialog).getByRole("img", { name: "Piscina" })).toBeInTheDocument();
    // Dá a volta dentro de "imagens" — a planta é de outra aba e não entra.
    await user.keyboard("{ArrowRight}");
    expect(within(dialog).getByRole("img", { name: "Fachada" })).toBeInTheDocument();
  });

  it("não fica em branco ao trocar de empreendimento com a aba órfã", async () => {
    // O App Router reaproveita a instância entre dois [slug] — é o caminho do
    // carrossel "Explore nossos empreendimentos".
    const user = setup();
    const outro: DevelopmentImage[] = [
      { src: "/brand/grupo-natus-assinatura.webp", alt: "Outro render", kind: "imagens" },
      { src: "/brand/grupo-natus-negativa.png", alt: "Outra obra", kind: "obra" },
    ];
    const { rerender } = render(<Gallery images={images} />);
    await user.click(screen.getByRole("tab", { name: /plantas/i }));
    expect(palco()).toHaveAccessibleName(/planta 2q/i);

    rerender(<Gallery images={outro} />);
    expect(palco()).toHaveAccessibleName(/outro render/i);
    expect(screen.queryByRole("tab", { name: /plantas/i })).toBeNull();
  });

  it("o painel da aba continua ligado ao gatilho por aria-controls", () => {
    render(<Gallery images={images} />);
    const gatilho = screen.getByRole("tab", { name: /imagens/i });
    const alvo = gatilho.getAttribute("aria-controls");
    expect(alvo).toBeTruthy();
    expect(document.getElementById(alvo!)).not.toBeNull();
  });

  it("fecha o lightbox no Escape", async () => {
    const user = setup();
    render(<Gallery images={images} />);
    await user.click(palco());
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
