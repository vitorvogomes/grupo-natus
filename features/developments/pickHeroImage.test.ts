import { describe, expect, it } from "vitest";
import { pickHeroImage } from "./pickHeroImage";
import type { DevelopmentImage } from "@/types/development";

describe("pickHeroImage", () => {
  it("prefere a imagem com kind 'hero'", () => {
    const imgs: DevelopmentImage[] = [
      { src: "/g.jpg", alt: "g", kind: "gallery" },
      { src: "/h.jpg", alt: "h", kind: "hero" },
    ];
    expect(pickHeroImage(imgs)?.src).toBe("/h.jpg");
  });

  it("cai para a primeira imagem quando não há hero", () => {
    const imgs: DevelopmentImage[] = [{ src: "/a.jpg", alt: "a" }];
    expect(pickHeroImage(imgs)?.src).toBe("/a.jpg");
  });

  it("retorna undefined quando não há imagens", () => {
    expect(pickHeroImage([])).toBeUndefined();
  });
});
