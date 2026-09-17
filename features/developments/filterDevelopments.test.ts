import { describe, expect, it } from "vitest";
import {
  filterDevelopments,
  locationLabel,
  uniqueLocations,
} from "./filterDevelopments";
import type { Development } from "@/types/development";

function make(
  slug: string,
  status: Development["status"],
  city: string,
  state: string,
): Development {
  return {
    slug,
    name: slug,
    status,
    location: { city, state },
    summary: "s",
    description: "d",
    images: [],
    features: [],
  };
}

const list: Development[] = [
  make("a", "pronto", "Belo Horizonte", "MG"),
  make("b", "lancamento", "Belo Horizonte", "MG"),
  make("c", "lancamento", "Niterói", "RJ"),
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
});
