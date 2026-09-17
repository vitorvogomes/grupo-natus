import { describe, expect, it } from "vitest";
import { cx } from "./cx";

describe("cx", () => {
  it("junta classes verdadeiras separadas por espaço", () => {
    expect(cx("a", "b", "c")).toBe("a b c");
  });

  it("ignora valores falsy (undefined/null/false/'')", () => {
    expect(cx("a", undefined, null, false, "", "b")).toBe("a b");
  });

  it("retorna string vazia sem argumentos válidos", () => {
    expect(cx(false, undefined)).toBe("");
  });
});
