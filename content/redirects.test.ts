import { describe, expect, it } from "vitest";
import { getAllDevelopments } from "@/content/developments";
import { STATIC_ROUTES } from "@/lib/site";
import { LEGACY_REDIRECTS, toNextRedirects } from "./redirects";

const existing = new Set([
  ...STATIC_ROUTES,
  ...getAllDevelopments().map((d) => `/empreendimentos/${d.slug}`),
]);

describe("Redirects do site antigo (docs/seo.md §3)", () => {
  it("todo destino é uma página que existe", () => {
    for (const { from, to } of LEGACY_REDIRECTS) expect(existing.has(to), `${from} → ${to}`).toBe(true);
  });

  it("sem cadeias: nenhum destino é outra origem", () => {
    const sources = new Set(LEGACY_REDIRECTS.map((r) => r.from));
    for (const { to } of LEGACY_REDIRECTS) expect(sources.has(to), to).toBe(false);
  });

  it("origens únicas, sem barra final e sem colidir com rota nova", () => {
    const sources = LEGACY_REDIRECTS.map((r) => r.from);
    expect(new Set(sources).size).toBe(sources.length);
    for (const from of sources) {
      expect(from).toMatch(/^\/[^?#]*[^/]$/);
      expect(existing.has(from), from).toBe(false);
    }
  });

  it("cobre os empreendimentos do WordPress que existem no site novo", () => {
    expect(LEGACY_REDIRECTS).toContainEqual({
      from: "/portfolio-item/follow-savassi",
      to: "/empreendimentos/follow-savassi",
    });
  });

  it("vira redirect permanente (308) no formato do Next", () => {
    expect(toNextRedirects()[0]).toEqual({
      source: "/portfolio-item/follow-savassi",
      destination: "/empreendimentos/follow-savassi",
      permanent: true,
    });
    expect(toNextRedirects()).toHaveLength(LEGACY_REDIRECTS.length);
  });
});
