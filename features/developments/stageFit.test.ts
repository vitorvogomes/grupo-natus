import { describe, expect, it } from "vitest";
import { stageFit } from "./stageFit";

const STAGE = 16 / 10;

describe("stageFit (cover × contain no palco da galeria)", () => {
  it("proporção próxima do palco: cover preenche sem cortar o assunto", () => {
    expect(stageFit({ width: 2560, height: 1440 }, STAGE)).toBe("cover"); // 16:9
    expect(stageFit({ width: 1536, height: 1024 }, STAGE)).toBe("cover"); // 3:2
    expect(stageFit({ width: 2560, height: 1920 }, STAGE)).toBe("cover"); // 4:3
  });

  it("panorâmica: contain — o cover cortaria 40% da largura e ampliaria a foto", () => {
    expect(stageFit({ width: 2095, height: 750 }, STAGE)).toBe("contain");
  });

  it("retrato num palco paisagem: contain", () => {
    expect(stageFit({ width: 1278, height: 1918 }, STAGE)).toBe("contain");
  });

  it("sem dimensões conhecidas (fotos da Engenharia): cover", () => {
    expect(stageFit({}, STAGE)).toBe("cover");
  });
});
