import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";
import { getAllDevelopments } from "@/content/developments";
import { getAllEditions } from "@/content/news";

describe("sitemap (FR14)", () => {
  it("inclui as rotas institucionais e todos os empreendimentos", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls.some((u) => u.endsWith("/empreendimentos"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/contato"))).toBe(true);
    expect(urls.some((u) => u.endsWith("/politica-de-privacidade"))).toBe(true);
    for (const dev of getAllDevelopments()) {
      expect(urls.some((u) => u.endsWith(`/empreendimentos/${dev.slug}`))).toBe(
        true,
      );
    }
  });

  it("inclui o índice da Natus News e cada edição, com a data de publicação", () => {
    const entries = sitemap();
    // O índice muda a cada edição nova: data da mais recente.
    expect(entries.find((e) => e.url === "https://www.natusgrupo.com.br/news")?.lastModified).toBe(
      getAllEditions()[0]!.publishedAt,
    );
    for (const edition of getAllEditions()) {
      const entry = entries.find((e) => e.url === `https://www.natusgrupo.com.br/news/${edition.slug}`);
      expect(entry, edition.slug).toBeDefined();
      expect(entry?.lastModified).toBe(edition.publishedAt);
    }
  });

  it("não inclui a página interna de theme-showcase", () => {
    const urls = sitemap().map((e) => e.url);
    expect(urls.some((u) => u.includes("theme-showcase"))).toBe(false);
  });
});
