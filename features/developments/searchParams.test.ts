import { describe, expect, it } from "vitest";
import {
  FILTER_PARAMS,
  buildDevelopmentsHref,
  parseDevelopmentFilters,
} from "./searchParams";
import type { Development } from "@/types/development";

describe("parseDevelopmentFilters", () => {
  it("sem params devolve filtros vazios", () => {
    expect(parseDevelopmentFilters({})).toEqual({});
  });

  it("lê as três facetas", () => {
    expect(
      parseDevelopmentFilters({
        status: "lancamento",
        cidade: "Niterói/RJ",
        tipo: "lote",
      }),
    ).toEqual({
      status: "lancamento",
      location: "Niterói/RJ",
      propertyType: "lote",
    });
  });

  it("descarta status e tipo fora do enum em vez de lançar", () => {
    expect(
      parseDevelopmentFilters({ status: "<script>", tipo: "mansão" }),
    ).toEqual({});
  });

  it("usa o primeiro valor quando o param se repete", () => {
    expect(parseDevelopmentFilters({ cidade: ["Niterói/RJ", "Itaboraí/RJ"] })).toEqual({
      location: "Niterói/RJ",
    });
  });

  it("trata string vazia como ausência de filtro", () => {
    expect(parseDevelopmentFilters({ cidade: "", status: "" })).toEqual({});
  });

  it("ignora params desconhecidos", () => {
    expect(parseDevelopmentFilters({ utm_source: "instagram" })).toEqual({});
  });
});

describe("parseDevelopmentFilters com lista conhecida", () => {
  function dev(city: string, state: string): Development {
    return {
      slug: city,
      name: city,
      status: "pronto",
      location: { city, state },
      summary: "s",
      description: "d",
      images: [],
      features: [],
    };
  }
  const conhecidos = [dev("Niterói", "RJ"), dev("Belo Horizonte", "MG")];

  it("aceita uma cidade que existe no catálogo", () => {
    expect(
      parseDevelopmentFilters({ cidade: "Niterói/RJ" }, conhecidos),
    ).toEqual({ location: "Niterói/RJ" });
  });

  it("descarta cidade inexistente em vez de zerar o catálogo", () => {
    // Sem acento, com erro de digitação ou de um empreendimento já removido:
    // o filtro cai fora e a pessoa vê a lista inteira, não um vazio sem motivo.
    for (const cidade of ["Niteroi/RJ", "xpto", "Niterói"]) {
      expect(parseDevelopmentFilters({ cidade }, conhecidos)).toEqual({});
    }
  });

  it("sem lista conhecida, aceita o valor (compatibilidade)", () => {
    expect(parseDevelopmentFilters({ cidade: "qualquer" })).toEqual({
      location: "qualquer",
    });
  });
});

describe("buildDevelopmentsHref", () => {
  it("sem filtros aponta para o catálogo, sem querystring", () => {
    expect(buildDevelopmentsHref({})).toBe("/empreendimentos");
    expect(
      buildDevelopmentsHref({ status: null, location: null, propertyType: null }),
    ).toBe("/empreendimentos");
  });

  it("monta a querystring na ordem das facetas", () => {
    expect(
      buildDevelopmentsHref({
        status: "lancamento",
        location: "Belo Horizonte/MG",
        propertyType: "lote",
      }),
    ).toBe(
      "/empreendimentos?status=lancamento&cidade=Belo+Horizonte%2FMG&tipo=lote",
    );
  });

  it("encoda acentos e a barra da cidade", () => {
    expect(buildDevelopmentsHref({ location: "Niterói/RJ" })).toBe(
      "/empreendimentos?cidade=Niter%C3%B3i%2FRJ",
    );
  });

  it("faz ida-e-volta com parseDevelopmentFilters", () => {
    const filters = {
      status: "pronto" as const,
      location: "Itaboraí/RJ",
      propertyType: "apartamento" as const,
    };
    const query = buildDevelopmentsHref(filters).split("?")[1] ?? "";
    const raw = Object.fromEntries(new URLSearchParams(query));
    expect(parseDevelopmentFilters(raw)).toEqual(filters);
  });

  it("expõe os nomes dos params usados na URL", () => {
    expect(FILTER_PARAMS).toEqual({
      status: "status",
      location: "cidade",
      propertyType: "tipo",
    });
  });
});
