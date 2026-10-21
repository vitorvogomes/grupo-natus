import { describe, expect, it } from "vitest";
import { coverFactor, coverSizes, type CoverBox } from "./coverSizes";

/** Bloco 4:3 em largura total até 768px e 50vw acima (resumo). */
const RESUMO: CoverBox[] = [
  { upTo: 768, vw: 100, aspect: 4 / 3 },
  { vw: 50, aspect: 4 / 3 },
];

describe("coverSizes (object-cover num bloco de proporção fixa)", () => {
  it("imagem até a proporção do bloco: a largura do bloco basta", () => {
    expect(coverSizes({ width: 1200, height: 900 }, RESUMO)).toBe(
      "(max-width: 768px) 100vw, 50vw",
    );
  });

  it("panorâmica: pede a largura extra que o corte exige para cobrir a altura", () => {
    // 2095×750 ≈ 2,79:1 num bloco 4:3 → fator ≈ 2,1
    expect(coverSizes({ width: 2095, height: 750 }, RESUMO)).toBe(
      "(max-width: 768px) 210vw, 105vw",
    );
  });

  it("sem dimensões conhecidas, assume a proporção do bloco", () => {
    expect(coverSizes({}, RESUMO)).toBe("(max-width: 768px) 100vw, 50vw");
  });

  it("cada faixa tem a sua proporção e o seu teto (hero: retrato no celular, quase quadrado no tablet)", () => {
    const hero: CoverBox[] = [
      { upTo: 768, vw: 100, aspect: 0.75, maxFactor: 1.5 },
      { upTo: 1024, vw: 100, aspect: 1.2, maxFactor: 1.5 },
      { vw: 100, aspect: 2.4, maxFactor: 1.5 },
    ];
    // 16:9 (Follow): o teto segura o celular; no tablet, 1,78/1,2 ≈ 1,48.
    expect(coverSizes({ width: 3000, height: 1688 }, hero)).toBe(
      "(max-width: 768px) 150vw, (max-width: 1024px) 148vw, 100vw",
    );
  });
});

describe("coverFactor", () => {
  it("1 até a proporção do bloco; acima, a sobra do corte", () => {
    expect(coverFactor({ width: 1200, height: 900 }, 4 / 3)).toBe(1);
    expect(coverFactor({ width: 3200, height: 1200 }, 4 / 3)).toBe(2);
    expect(coverFactor({}, 4 / 3)).toBe(1);
  });
});
