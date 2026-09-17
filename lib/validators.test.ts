import { describe, expect, it } from "vitest";
import { isEmail, isPhone, isRequired } from "./validators";

describe("validators", () => {
  it("isRequired", () => {
    expect(isRequired("x")).toBe(true);
    expect(isRequired("  ")).toBe(false);
    expect(isRequired("")).toBe(false);
  });

  it("isEmail", () => {
    expect(isEmail("a@b.com")).toBe(true);
    expect(isEmail("a@b")).toBe(false);
    expect(isEmail("nope")).toBe(false);
  });

  it("isPhone (aceita formatos BR com 10-11 dígitos)", () => {
    expect(isPhone("(31) 98466-3280")).toBe(true);
    expect(isPhone("3198466328")).toBe(true);
    expect(isPhone("123")).toBe(false);
  });
});
