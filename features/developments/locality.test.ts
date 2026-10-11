import { describe, expect, it } from "vitest";
import { formatLocality } from "./locality";

describe("formatLocality", () => {
  it("bairro e cidade, quando há bairro", () => {
    expect(
      formatLocality({ city: "Belo Horizonte", neighborhood: "Savassi" }),
    ).toBe("Savassi - Belo Horizonte");
  });

  it("só a cidade, sem bairro", () => {
    expect(formatLocality({ city: "Lagoa Santa" })).toBe("Lagoa Santa");
  });
});
