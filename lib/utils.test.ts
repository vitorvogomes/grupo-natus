import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("junta classes separadas por espaço", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("descarta valores falsy", () => {
    expect(cn("a", false, null, undefined, "", "b")).toBe("a b");
  });

  it("aceita condicionais em objeto e array", () => {
    expect(cn(["a", { b: true, c: false }])).toBe("a b");
  });

  it("resolve conflito de utilitárias do Tailwind (a última vence)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("bg-brand", "bg-navy-600")).toBe("bg-navy-600");
  });

  it("retorna string vazia sem argumentos", () => {
    expect(cn()).toBe("");
  });
});
