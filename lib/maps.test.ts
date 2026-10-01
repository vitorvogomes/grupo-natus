import { describe, expect, it } from "vitest";
import { buildMapEmbedUrl, buildMapLink, buildWazeLink } from "./maps";
import type { DevelopmentLocation } from "@/types/development";

const cityOnly: DevelopmentLocation = { city: "Belo Horizonte", state: "MG" };
const withCoords: DevelopmentLocation = {
  city: "BH",
  state: "MG",
  lat: -19.9,
  lng: -43.9,
};
const withAddress: DevelopmentLocation = {
  city: "BH",
  state: "MG",
  address: "Av. Getúlio Vargas, 1621",
};

describe("lib/maps (AD-3, sem API key)", () => {
  it("embed usa coordenadas quando existem", () => {
    expect(buildMapEmbedUrl(withCoords)).toBe(
      "https://www.google.com/maps?q=-19.9%2C-43.9&output=embed",
    );
  });

  it("embed usa endereço quando não há coordenadas", () => {
    expect(buildMapEmbedUrl(withAddress)).toContain("output=embed");
    expect(buildMapEmbedUrl(withAddress)).toContain(
      encodeURIComponent("Av. Getúlio Vargas"),
    );
  });

  it("embed é null quando só há cidade/UF (degrada para link)", () => {
    expect(buildMapEmbedUrl(cityOnly)).toBeNull();
  });

  it("link prioriza googleMapsUrl quando informado", () => {
    expect(
      buildMapLink({ ...cityOnly, googleMapsUrl: "https://maps.app/x" }),
    ).toBe("https://maps.app/x");
  });

  it("link cai para busca por cidade/UF", () => {
    expect(buildMapLink(cityOnly)).toBe(
      "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent("Belo Horizonte, MG"),
    );
  });

  it("waze navega por coordenada quando existe", () => {
    expect(buildWazeLink(withCoords)).toBe(
      "https://www.waze.com/ul?ll=-19.9%2C-43.9&navigate=yes",
    );
  });

  it("waze cai para o endereço completo, não só a cidade", () => {
    const url = buildWazeLink(withAddress);
    expect(url).toContain(encodeURIComponent("Av. Getúlio Vargas, 1621, BH, MG"));
    expect(url).toContain("navigate=yes");
  });

  it("waze com só cidade/UF ainda devolve um link utilizável", () => {
    expect(buildWazeLink(cityOnly)).toContain(
      encodeURIComponent("Belo Horizonte, MG"),
    );
  });
});
