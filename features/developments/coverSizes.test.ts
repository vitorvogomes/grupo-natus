import { describe, expect, it } from "vitest";
import { coverSizes } from "./coverSizes";

describe("coverSizes (object-cover num bloco de proporção fixa)", () => {
  it("imagem até a proporção do bloco: a largura do bloco basta", () => {
    expect(coverSizes({ width: 1200, height: 900 }, 4 / 3, 50)).toBe(
      "(max-width: 768px) 100vw, 50vw",
    );
  });

  it("panorâmica: pede a largura extra que o corte exige para cobrir a altura", () => {
    // 2095×750 ≈ 2,79:1 num bloco 4:3 → fator ≈ 2,1
    expect(coverSizes({ width: 2095, height: 750 }, 4 / 3, 50)).toBe(
      "(max-width: 768px) 210vw, 105vw",
    );
  });

  it("sem dimensões conhecidas, assume a proporção do bloco", () => {
    expect(coverSizes({}, 4 / 3, 50)).toBe("(max-width: 768px) 100vw, 50vw");
  });
});
