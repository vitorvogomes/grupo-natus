import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NewsIndexPage, { metadata } from "./page";
import { getAllEditions } from "@/content/news";

describe("Página /news (índice da Natus News)", () => {
  it("apresenta a newsletter com um h1", () => {
    render(<NewsIndexPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Natus News" })).toBeInTheDocument();
  });

  it("lista todas as edições, da mais recente para a mais antiga", () => {
    render(<NewsIndexPage />);
    const links = screen.getAllByRole("link").filter((a) => a.getAttribute("href")?.startsWith("/news/"));
    expect(links.map((a) => a.getAttribute("href"))).toEqual(
      getAllEditions().map((e) => `/news/${e.slug}`),
    );
  });

  it("tem canônica própria", () => {
    expect(metadata.alternates?.canonical).toBe("/news");
  });
});
