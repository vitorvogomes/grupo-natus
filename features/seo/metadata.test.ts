import { describe, expect, it } from "vitest";
import { getDevelopmentBySlug } from "@/content/developments";
import { DEFAULT_SHARE_IMAGE, developmentMetadata, pageMetadata } from "./metadata";

describe("pageMetadata", () => {
  it("monta canônica, Open Graph e Twitter com a imagem padrão", () => {
    const m = pageMetadata({ title: "Contato", description: "Fale com a gente.", path: "/contato" });
    expect(m.alternates).toEqual({ canonical: "/contato" });
    expect(m.openGraph).toMatchObject({
      type: "website",
      locale: "pt_BR",
      siteName: "Grupo Natus",
      url: "/contato",
      title: "Contato",
      description: "Fale com a gente.",
      images: [DEFAULT_SHARE_IMAGE],
    });
    expect(m.twitter).toMatchObject({ card: "summary_large_image", images: [DEFAULT_SHARE_IMAGE.url] });
  });
});

describe("developmentMetadata", () => {
  it("título com tipo e praça, descrição = resumo, capa como imagem", () => {
    const dev = getDevelopmentBySlug("solar-manilha")!;
    const m = developmentMetadata(dev);
    expect(m.title).toBe("Solar Manilha — Apartamentos em Manilha, Itaboraí/RJ");
    expect(m.description).toBe(dev.summary);
    expect(m.alternates).toEqual({ canonical: "/empreendimentos/solar-manilha" });
    expect(m.openGraph).toMatchObject({
      images: [{ url: "/empreendimentos/solar-manilha/acesso-principal.webp", width: 3000, height: 1674 }],
    });
  });

  it("sem bairro, só a cidade; breve lançamento diz o que é e usa a imagem padrão", () => {
    const dev = getDevelopmentBySlug("gutierrez")!;
    const m = developmentMetadata(dev);
    expect(m.title).toBe("Mirante Gutierrez — Breve lançamento em Belo Horizonte/MG");
    expect(m.description).not.toMatch(/TODO/);
    expect(m.openGraph).toMatchObject({ images: [DEFAULT_SHARE_IMAGE] });
  });
});
