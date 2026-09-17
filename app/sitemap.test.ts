import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import { getAllDevelopments } from "@/content/developments";

describe("sitemap (FR14)", () => {
  it("inclui as rotas institucionais e todos os empreendimentos", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls.some((u) => u.endsWith("/empreendimentos"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/contato"))).toBe(true);
    for (const dev of getAllDevelopments()) {
      expect(urls.some((u) => u.endsWith(`/empreendimentos/${dev.slug}`))).toBe(
        true,
      );
    }
  });

  it("não inclui a página interna de theme-showcase", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls.some((u) => u.includes("theme-showcase"))).toBe(false);
  });
});
