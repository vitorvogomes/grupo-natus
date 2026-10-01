import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ExploreDevelopments } from "./ExploreDevelopments";
import type { Development } from "@/types/development";

function make(slug: string): Development {
  return {
    slug,
    name: slug.toUpperCase(),
    status: "lancamento",
    location: { city: "BH", state: "MG" },
    summary: "s",
    description: "d",
    images: [],
    features: [],
  };
}

const tres = [make("a"), make("b"), make("c")];

describe("ExploreDevelopments", () => {
  it("não renderiza nada quando não sobra empreendimento", () => {
    const { container } = render(<ExploreDevelopments developments={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("lista um card por empreendimento, cada um rotulado por posição", () => {
    render(<ExploreDevelopments developments={tres} />);
    expect(
      screen.getAllByRole("link", { name: /ver empreendimento/i }),
    ).toHaveLength(3);
    expect(screen.getByRole("group", { name: "1 de 3" })).toBeInTheDocument();
    expect(screen.getByRole("group", { name: "3 de 3" })).toBeInTheDocument();
  });

  it("as setas rolam o trilho e dão a volta no fim", async () => {
    const scrollIntoView = vi.fn();
    vi.spyOn(Element.prototype, "scrollIntoView").mockImplementation(
      scrollIntoView,
    );
    const user = userEvent.setup();
    render(<ExploreDevelopments developments={tres} />);

    await user.click(screen.getByRole("button", { name: /próximo/i }));
    expect(scrollIntoView).toHaveBeenLastCalledWith(
      expect.objectContaining({ behavior: "smooth", inline: "start" }),
    );
    // Do índice 0, "anterior" circula para o último em vez de travar.
    await user.click(screen.getByRole("button", { name: /anterior/i }));
    expect(scrollIntoView).toHaveBeenCalledTimes(2);
    vi.restoreAllMocks();
  });

  it("com um só empreendimento, não mostra setas", () => {
    render(<ExploreDevelopments developments={[make("a")]} />);
    expect(screen.queryByRole("button", { name: /próximo/i })).toBeNull();
    expect(screen.getByRole("link", { name: /ver todos/i })).toHaveAttribute(
      "href",
      "/empreendimentos",
    );
  });
});
