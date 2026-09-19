import { describe, expect, it } from "vitest";
import { pickHeroImage } from "./pickHeroImage";
import type { DevelopmentImage } from "@/types/development";

describe("pickHeroImage", () => {
  it("prefere a primeira imagem 'externa' (fachada)", () => {
    const imgs: DevelopmentImage[] = [
      { src: "/i.jpg", alt: "i", kind: "apartamento" },
      { src: "/e.jpg", alt: "e", kind: "externa" },
    ];
    expect(pickHeroImage(imgs)?.src).toBe("/e.jpg");
  });

  it("cai para a primeira imagem quando não há externa", () => {
    const imgs: DevelopmentImage[] = [{ src: "/a.jpg", alt: "a" }];
    expect(pickHeroImage(imgs)?.src).toBe("/a.jpg");
  });

  it("retorna undefined quando não há imagens", () => {
    expect(pickHeroImage([])).toBeUndefined();
  });
});
