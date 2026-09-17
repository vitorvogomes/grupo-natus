import { describe, expect, it } from "vitest";
import {
  assertUniqueSlugs,
  findBySlug,
  getAllDevelopments,
  getDevelopmentBySlug,
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
});
