import { describe, expect, it } from "vitest";
import { pickHeroImage } from "./pickHeroImage";
import type { DevelopmentImage } from "@/types/development";

describe("pickHeroImage", () => {
  it("prefere a primeira imagem da categoria 'imagens'", () => {
    const imgs: DevelopmentImage[] = [
      { src: "/p.jpg", alt: "p", kind: "planta" },
      { src: "/e.jpg", alt: "e", kind: "imagens" },
    ];
    expect(pickHeroImage(imgs)?.src).toBe("/e.jpg");
  });

  it("nunca escolhe obra quando há render disponível", () => {
    const imgs: DevelopmentImage[] = [
      { src: "/o.jpg", alt: "o", kind: "obra" },
      { src: "/e.jpg", alt: "e", kind: "imagens" },
    ];
    expect(pickHeroImage(imgs)?.src).toBe("/e.jpg");
  });

  it("cai para a primeira imagem quando o acervo não tem render", () => {
    const imgs: DevelopmentImage[] = [{ src: "/a.jpg", alt: "a" }];
    expect(pickHeroImage(imgs)?.src).toBe("/a.jpg");
  });

  it("retorna undefined quando não há imagens", () => {
    expect(pickHeroImage([])).toBeUndefined();
  });
});
