import { describe, expect, it } from "vitest";
import {
  assertUniqueSlugs,
  findBySlug,
  getAllDevelopments,
  getDevelopmentBySlug,
  sortByStatusPriority,
} from "./index";
import {
  DEVELOPMENT_STATUSES,
  type Development,
  type DevelopmentStatus,
} from "@/types/development";

function make(slug: string, status: DevelopmentStatus = "lancamento"): Development {
  return {
    slug,
    name: slug,
    status,
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

  it("sortByStatusPriority ordena pelo status e preserva a ordem dentro de cada um", () => {
    const sorted = sortByStatusPriority([
      make("breve", "breve_lancamento"),
      make("pronto-a", "pronto"),
      make("lanc-a"),
      make("obra", "em_construcao"),
      make("pronto-b", "pronto"),
      make("lanc-b"),
    ]);
    expect(sorted.map((d) => d.slug)).toEqual([
      "lanc-a",
      "lanc-b",
      "obra",
      "pronto-a",
      "pronto-b",
      "breve",
    ]);
  });

  it("getAllDevelopments abre pelos lançamentos (os destaques) e fecha no breve lançamento", () => {
    const ranks = getAllDevelopments().map((d) =>
      DEVELOPMENT_STATUSES.indexOf(d.status),
    );
    expect(ranks).toEqual([...ranks].sort((a, b) => a - b));
    expect(getAllDevelopments()[0]?.status).toBe("lancamento");
  });

  it("o top 3 do portfólio é Solar → Follow → Golden Ville (lançamento, depois as obras na ordem do seed)", () => {
    expect(getAllDevelopments().slice(0, 3).map((d) => d.slug)).toEqual([
      "solar-manilha",
      "follow-savassi",
      "golden-ville-residence",
    ]);
  });

  it("os lançamentos têm imagem própria (a vitrine não abre com placeholder)", () => {
    for (const dev of getAllDevelopments().filter((d) => d.status === "lancamento")) {
      expect(dev.images.length).toBeGreaterThan(0);
    }
  });
});
