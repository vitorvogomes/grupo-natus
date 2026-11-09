import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

import NewsEditionPage, { generateMetadata, generateStaticParams } from "./page";
import { getAllEditions } from "@/content/news";

const params = (slug: string) => ({ params: Promise.resolve({ slug }) });

function jsonLd(container: HTMLElement) {
  return [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
    JSON.parse(s.innerHTML),
  );
}

describe("Rota /news/[slug]", () => {
  it("generateStaticParams gera uma rota por edição", () => {
    expect(generateStaticParams()).toEqual(getAllEditions().map((e) => ({ slug: e.slug })));
  });

  it("dispara 404 para edição inexistente", async () => {
    await expect(NewsEditionPage(params("__nao-existe__"))).rejects.toThrow(/NEXT_NOT_FOUND/);
  });

  it("generateMetadata: canônica e artigo da edição; slug desconhecido não gera nada", async () => {
    const meta = await generateMetadata(params("edicao-0"));
    expect(meta.alternates).toEqual({ canonical: "/news/edicao-0" });
    expect(meta.openGraph).toMatchObject({ type: "article" });
    expect(await generateMetadata(params("__nao-existe__"))).toEqual({});
  });

  it("renderiza a edição com o JSON-LD de artigo e o breadcrumb", async () => {
    const { container } = render(await NewsEditionPage(params("edicao-0")));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Edição 0");
    const [article, breadcrumb] = jsonLd(container);
    expect(article["@type"]).toBe("Article");
    expect(breadcrumb["@type"]).toBe("BreadcrumbList");
    expect(breadcrumb.itemListElement.map((i: { name: string }) => i.name)).toEqual([
      "Início",
      "Natus News",
      "Edição 0",
    ]);
  });
});
