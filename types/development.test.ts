import { describe, expect, it } from "vitest";
import {
  DEVELOPMENT_STATUSES,
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
