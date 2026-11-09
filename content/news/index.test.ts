import { describe, expect, it } from "vitest";
import type { NewsEdition } from "@/types/news";
import {
  assertUniqueEditionSlugs,
  editionName,
  findEditionBySlug,
  getEditionBySlug,
  newsTitle,
  sortByPublishedDesc,
} from "./index";

function make(slug: string, publishedAt: string): NewsEdition {
  return { ...getEditionBySlug("edicao-0")!, slug, publishedAt };
}

describe("Natus News: acesso às edições", () => {
  it("acusa slug duplicado", () => {
    expect(() =>
      assertUniqueEditionSlugs([make("a", "2026-11-01"), make("a", "2026-12-01")]),
    ).toThrow(/duplicado: a/);
    expect(() =>
      assertUniqueEditionSlugs([make("a", "2026-11-01"), make("b", "2026-12-01")]),
    ).not.toThrow();
  });

  it("ordena da edição mais recente para a mais antiga", () => {
    const list = [make("nov", "2026-11-09"), make("jan", "2027-01-05"), make("dez", "2026-12-07")];
    expect(sortByPublishedDesc(list).map((e) => e.slug)).toEqual(["jan", "dez", "nov"]);
  });

  it("busca por slug e devolve undefined quando não existe", () => {
    expect(getEditionBySlug("edicao-0")?.label).toBe("Edição 0");
    expect(getEditionBySlug("nao-existe")).toBeUndefined();
    expect(findEditionBySlug([make("x", "2026-11-01")], "x")?.slug).toBe("x");
  });

  it("nomeia a edição num formato só: h1, título da aba, JSON-LD e card do índice", () => {
    const edition = getEditionBySlug("edicao-0")!;
    expect(editionName(edition)).toBe("Edição 0 — novembro de 2026");
    expect(newsTitle(edition)).toBe("Natus News · Edição 0 — novembro de 2026");
  });
});
