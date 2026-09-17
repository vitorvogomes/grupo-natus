import { describe, expect, it } from "vitest";
import robots from "./robots";

describe("robots (FR14)", () => {
  it("permite indexação e aponta o sitemap", () => {
    const r = robots();
    expect(r.sitemap).toMatch(/sitemap\.xml$/);
    const rules = Array.isArray(r.rules) ? r.rules[0] : r.rules;
    expect(rules?.allow).toBe("/");
  });

  it("bloqueia a página interna de theme-showcase", () => {
    const r = robots();
    const rules = Array.isArray(r.rules) ? r.rules[0] : r.rules;
    const disallow = rules?.disallow;
    const list = Array.isArray(disallow) ? disallow : [disallow];
    expect(list).toContain("/theme-showcase");
  });
});
