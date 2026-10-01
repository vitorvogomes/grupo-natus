import { describe, expect, it } from "vitest";
import {
  filterDevelopments,
  locationLabel,
  uniqueLocations,
  uniquePropertyTypes,
} from "./filterDevelopments";
import type { Development } from "@/types/development";

function make(
  slug: string,
  status: Development["status"],
  city: string,
  state: string,
  propertyType?: Development["propertyType"],
): Development {
  return {
    slug,
    name: slug,
    status,
    location: { city, state },
    ...(propertyType ? { propertyType } : {}),
    summary: "s",
    description: "d",
    images: [],
    features: [],
  };
}

const list: Development[] = [
  make("a", "pronto", "Belo Horizonte", "MG", "apartamento"),
  make("b", "lancamento", "Belo Horizonte", "MG", "lote"),
  make("c", "lancamento", "Niterói", "RJ"), // tipologia ainda não confirmada
];

describe("filterDevelopments", () => {
  it("sem filtros retorna tudo", () => {
    expect(filterDevelopments(list, {})).toHaveLength(3);
  });

  it("filtra por status", () => {
    expect(
      filterDevelopments(list, { status: "lancamento" }).map((d) => d.slug),
    ).toEqual(["b", "c"]);
  });

  it("filtra por localização", () => {
    expect(
      filterDevelopments(list, { location: "Niterói/RJ" }).map((d) => d.slug),
    ).toEqual(["c"]);
  });

  it("combina status e localização", () => {
    expect(
      filterDevelopments(list, {
        status: "lancamento",
        location: "Belo Horizonte/MG",
      }).map((d) => d.slug),
    ).toEqual(["b"]);
  });

  it("locationLabel formata cidade/UF", () => {
    expect(locationLabel(list[0]!)).toBe("Belo Horizonte/MG");
  });

  it("uniqueLocations retorna localizações únicas ordenadas", () => {
    expect(uniqueLocations(list)).toEqual(["Belo Horizonte/MG", "Niterói/RJ"]);
  });

  it("filtra por tipologia", () => {
    expect(
      filterDevelopments(list, { propertyType: "lote" }).map((d) => d.slug),
    ).toEqual(["b"]);
  });

  it("empreendimento sem tipologia confirmada nunca casa com um filtro de tipo", () => {
    // "c" não tem propertyType: some do resultado em vez de aparecer como palpite.
    expect(
      filterDevelopments(list, { propertyType: "apartamento" }).map(
        (d) => d.slug,
      ),
    ).toEqual(["a"]);
  });

  it("combina as três facetas", () => {
    expect(
      filterDevelopments(list, {
        status: "lancamento",
        location: "Belo Horizonte/MG",
        propertyType: "lote",
      }).map((d) => d.slug),
    ).toEqual(["b"]);
  });

  it("uniquePropertyTypes lista só os tipos presentes, na ordem canônica", () => {
    expect(uniquePropertyTypes(list)).toEqual(["apartamento", "lote"]);
    expect(uniquePropertyTypes([])).toEqual([]);
  });
});
