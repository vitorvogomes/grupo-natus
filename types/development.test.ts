import { describe, expect, it } from "vitest";
import {
  DEVELOPMENT_IMAGE_KINDS,
  DEVELOPMENT_STATUSES,
  IMAGE_KIND_LABELS,
  STATUS_META,
} from "./development";

describe("DevelopmentStatus", () => {
  it("lista os quatro status na ordem de prioridade do portfólio", () => {
    expect(DEVELOPMENT_STATUSES).toEqual([
      "lancamento",
      "em_construcao",
      "pronto",
      "breve_lancamento",
    ]);
  });

  it("cada status tem rótulo humano", () => {
    expect(STATUS_META.lancamento.label).toBe("Lançamento");
    expect(STATUS_META.em_construcao.label).toBe("Em construção");
    expect(STATUS_META.pronto.label).toBe("Pronto para morar");
    expect(STATUS_META.breve_lancamento.label).toBe("Breve lançamento");
  });
});

describe("DevelopmentImageKind", () => {
  it("tem as três categorias da galeria, na ordem de exibição", () => {
    expect(DEVELOPMENT_IMAGE_KINDS).toEqual(["imagens", "planta", "obra"]);
  });

  it("cada categoria tem rótulo de aba", () => {
    expect(IMAGE_KIND_LABELS.imagens).toBe("Imagens");
    expect(IMAGE_KIND_LABELS.planta).toBe("Plantas");
    expect(IMAGE_KIND_LABELS.obra).toBe("Obra");
  });
});
