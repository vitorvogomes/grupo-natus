import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getEditionBySlug } from "@/content/news";
import { NewsEditionCard } from "./NewsEditionCard";

const edition = getEditionBySlug("edicao-0")!;

describe("NewsEditionCard — uma edição no índice /news", () => {
  it("é um link único para a edição, com título, mês e resumo", () => {
    render(<NewsEditionCard edition={edition} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/news/edicao-0");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Edição 0 — novembro de 2026");
    expect(screen.getByText(edition.description)).toBeInTheDocument();
  });

  it("a arte é decorativa: o título do card já diz o que ela diz", () => {
    const { container } = render(<NewsEditionCard edition={edition} />);
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("marca a data de publicação em <time>", () => {
    const { container } = render(<NewsEditionCard edition={edition} />);
    expect(container.querySelector("time")).toHaveAttribute("datetime", "2026-11-09");
  });
});
