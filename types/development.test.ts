import { describe, expect, it } from "vitest";
import {
  DEVELOPMENT_IMAGE_KINDS,
  DEVELOPMENT_STATUSES,
  IMAGE_KIND_LABELS,
  STATUS_META,
} from "./development";

describe("DevelopmentStatus", () => {
  it("lista os três status na ordem do funil", () => {
    expect(DEVELOPMENT_STATUSES).toEqual([
      "lancamento",
      "em_construcao",
      "pronto",
    ]);
  });

  it("cada status tem rótulo humano", () => {
    expect(STATUS_META.lancamento.label).toBe("Lançamento");
    expect(STATUS_META.em_construcao.label).toBe("Em construção");
    expect(STATUS_META.pronto.label).toBe("Pronto para morar");
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
