import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FeaturedImage } from "./FeaturedImage";
import type { DevelopmentImage } from "@/types/development";

const image: DevelopmentImage = {
  src: "/brand/grupo-natus-principal.png",
  alt: "Fachada",
  kind: "render",
};

function stubRect(el: HTMLElement) {
  el.getBoundingClientRect = () =>
    ({
      width: 400,
      height: 250,
      left: 0,
      top: 0,
      right: 400,
      bottom: 250,
      x: 0,
      y: 0,
      toJSON: () => {},
    }) as DOMRect;
}

describe("FeaturedImage (lupa no hover)", () => {
  it("renderiza a imagem com botão de ampliar acessível", () => {
    render(<FeaturedImage image={image} onOpen={() => {}} />);
    expect(screen.getByRole("img", { name: "Fachada" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /ampliar imagem: fachada/i }),
    ).toBeInTheDocument();
  });

  it("abre (onOpen) ao clicar", async () => {
    const onOpen = vi.fn();
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<FeaturedImage image={image} onOpen={onOpen} />);
    await user.click(
      screen.getByRole("button", { name: /ampliar imagem: fachada/i }),
    );
    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("mostra a lupa ao mover o mouse e some ao sair", () => {
    render(<FeaturedImage image={image} onOpen={() => {}} />);
    const btn = screen.getByRole("button", { name: /ampliar imagem: fachada/i });
    stubRect(btn);

    fireEvent.pointerMove(btn, {
      pointerType: "mouse",
      clientX: 200,
      clientY: 125,
    });
    expect(screen.getByTestId("magnifier-lens")).toBeInTheDocument();

    fireEvent.pointerLeave(btn);
    expect(screen.queryByTestId("magnifier-lens")).not.toBeInTheDocument();
  });

  it("ignora ponteiro de toque (sem lupa)", () => {
    render(<FeaturedImage image={image} onOpen={() => {}} />);
    const btn = screen.getByRole("button", { name: /ampliar imagem: fachada/i });
    stubRect(btn);
    fireEvent.pointerMove(btn, {
      pointerType: "touch",
      clientX: 200,
      clientY: 125,
    });
    expect(screen.queryByTestId("magnifier-lens")).not.toBeInTheDocument();
  });
});
