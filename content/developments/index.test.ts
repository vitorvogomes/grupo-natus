import { describe, expect, it } from "vitest";
import {
  assertUniqueSlugs,
  findBySlug,
  getAllDevelopments,
  getDevelopmentBySlug,
  getDevelopmentsGroupedByStatus,
  getHomeDevelopments,
  FEATURED_SLUGS,
} from "./index";
import type { Development } from "@/types/development";

function make(slug: string): Development {
  return {
    slug,
    name: slug,
    status: "lancamento",
    location: { city: "BH", state: "MG" },
    summary: "s",
    description: "d",
    images: [],
    features: [],
  };
}

describe("camada de conteúdo de empreendimentos (AD-2)", () => {
  it("assertUniqueSlugs passa com slugs únicos", () => {
    expect(() => assertUniqueSlugs([make("a"), make("b")])).not.toThrow();
  });

  it("assertUniqueSlugs rejeita slug duplicado", () => {
    expect(() => assertUniqueSlugs([make("a"), make("a")])).toThrow(/duplicad/i);
  });

  it("findBySlug encontra e retorna undefined quando ausente", () => {
    const list = [make("a"), make("b")];
    expect(findBySlug(list, "b")?.slug).toBe("b");
    expect(findBySlug(list, "z")).toBeUndefined();
  });

  it("getAllDevelopments retorna uma lista com slugs únicos", () => {
    const all = getAllDevelopments();
    expect(Array.isArray(all)).toBe(true);
    expect(() => assertUniqueSlugs(all)).not.toThrow();
  });

  it("getDevelopmentBySlug retorna undefined para slug inexistente", () => {
    expect(getDevelopmentBySlug("__nao-existe__")).toBeUndefined();
  });

  it("getDevelopmentsGroupedByStatus agrupa por status (só grupos com itens)", () => {
    const groups = getDevelopmentsGroupedByStatus();
    expect(groups.length).toBeGreaterThan(0);
    // Todo grupo tem rótulo e ao menos um item.
    for (const group of groups) {
      expect(group.label).toBeTruthy();
      expect(group.items.length).toBeGreaterThan(0);
    }
    // A soma dos itens é igual ao total de empreendimentos.
    const total = groups.reduce((n, g) => n + g.items.length, 0);
    expect(total).toBe(getAllDevelopments().length);
  });


  it("getHomeDevelopments mostra o catálogo inteiro, sem repetir nem perder nenhum", () => {
    const home = getHomeDevelopments();
    const all = getAllDevelopments();
    expect(home).toHaveLength(all.length);
    expect(new Set(home.map((d) => d.slug)).size).toBe(all.length);
    for (const dev of all) {
      expect(home.some((d) => d.slug === dev.slug)).toBe(true);
    }
  });

  it("getHomeDevelopments abre pelos destaques, na ordem editorial", () => {
    // Guard: renomear um slug em data.ts tiraria o empreendimento da abertura.
    expect(
      getHomeDevelopments()
        .slice(0, FEATURED_SLUGS.length)
        .map((d) => d.slug),
    ).toEqual([...FEATURED_SLUGS]);
  });

  it("os destaques têm imagem própria (a home não abre com placeholder)", () => {
    for (const dev of getHomeDevelopments().slice(0, FEATURED_SLUGS.length)) {
      expect(dev.images.length).toBeGreaterThan(0);
    }
  });
});
