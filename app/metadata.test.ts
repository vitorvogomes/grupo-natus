import type { Metadata } from "next";
import { describe, expect, it } from "vitest";
import { getAllDevelopments } from "@/content/developments";
import { metadata as home } from "./page";
import { metadata as catalogo } from "./empreendimentos/page";
import { metadata as engenharia } from "./engenharia/page";
import { metadata as quemSomos } from "./quem-somos/page";
import { metadata as contato } from "./contato/page";
import { metadata as terreno } from "./negocie-seu-terreno/page";
import { metadata as privacidade } from "./politica-de-privacidade/page";
import { generateMetadata } from "./empreendimentos/[slug]/page";

function titleOf(m: Metadata): string {
  const t = m.title;
  if (typeof t === "string") return t;
  if (t && "absolute" in t) return t.absolute;
  throw new Error("página sem título");
}

async function allPages() {
  const devs = await Promise.all(
    getAllDevelopments().map(async (d) => [
      `/empreendimentos/${d.slug}`,
      await generateMetadata({ params: Promise.resolve({ slug: d.slug }) }),
    ] as const),
  );
  return [
    ["/", home],
    ["/empreendimentos", catalogo],
    ["/engenharia", engenharia],
    ["/quem-somos", quemSomos],
    ["/contato", contato],
    ["/negocie-seu-terreno", terreno],
    ["/politica-de-privacidade", privacidade],
    ...devs,
  ] as const;
}

describe("Metadados de todas as rotas (docs/seo.md §2)", () => {
  it("toda página tem canônica própria, igual ao caminho", async () => {
    for (const [path, m] of await allPages()) {
      expect(m.alternates?.canonical, path).toBe(path);
      expect(m.openGraph?.url, path).toBe(path);
    }
  });

  it("títulos e descrições são únicos e nunca publicam TODO", async () => {
    const pages = await allPages();
    const titles = pages.map(([, m]) => titleOf(m));
    const descriptions = pages.map(([, m]) => String(m.description));
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    for (const text of [...titles, ...descriptions]) expect(text).not.toMatch(/TODO/);
  });

  it("descrições num tamanho que o Google mostra (até ~160 caracteres, sem ficar curta demais)", async () => {
    for (const [path, m] of await allPages()) {
      const length = String(m.description).length;
      expect(length, path).toBeGreaterThanOrEqual(50);
      expect(length, path).toBeLessThanOrEqual(200);
    }
  });
});
