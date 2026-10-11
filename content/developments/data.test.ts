import { describe, expect, it } from "vitest";
import { developments } from "./data";
import {
  DEVELOPMENT_IMAGE_KINDS,
  DEVELOPMENT_STATUSES,
} from "@/types/development";


describe("Seed dos empreendimentos", () => {
  it("cadastra os 11 empreendimentos do portfólio (Vista do Lago saiu)", () => {
    expect(developments).toHaveLength(11);
    expect(developments.map((d) => d.slug)).not.toContain("vista-do-lago");
  });

  it("cada empreendimento tem nome, slug kebab-case, cidade/UF e status válido", () => {
    for (const dev of developments) {
      expect(dev.name.length).toBeGreaterThan(0);
      expect(dev.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(dev.location.city.length).toBeGreaterThan(0);
      expect(dev.location.state).toMatch(/^[A-Z]{2}$/);
      expect(DEVELOPMENT_STATUSES).toContain(dev.status);
    }
  });

  it("só o breve lançamento fica sem descrição (TODO rotulado, nunca inventado)", () => {
    for (const dev of developments) {
      if (dev.status === "breve_lancamento") {
        expect(dev.description).toMatch(/TODO: CONTENT REQUIRED/);
      } else {
        expect(dev.description).not.toMatch(/TODO/);
      }
      // Resumo é sempre preenchido (factual ou placeholder rotulado).
      expect(dev.summary.length).toBeGreaterThan(0);
    }
  });

  it("breve lançamento não tem imagem própria (seção mínima com a foto padrão)", () => {
    for (const dev of developments.filter((d) => d.status === "breve_lancamento")) {
      expect(dev.images).toEqual([]);
    }
  });

  it("100% vendido só existe sobre 'pronto para morar' — e todos os prontos estão vendidos", () => {
    for (const dev of developments) {
      if (dev.soldOut) expect(dev.status).toBe("pronto");
      if (dev.status === "pronto") expect(dev.soldOut).toBe(true);
    }
  });

  it("todo empreendimento com página completa ou reduzida tem coordenadas para o mapa", () => {
    for (const dev of developments.filter((d) => d.status !== "breve_lancamento")) {
      expect(dev.location.lat).toBeTypeOf("number");
      expect(dev.location.lng).toBeTypeOf("number");
      expect(dev.location.googleMapsUrl).toMatch(/^https:\/\//);
    }
  });

  it("progresso de obra só em lançamento/em construção", () => {
    for (const dev of developments) {
      if (!dev.progress) continue;
      expect(["lancamento", "em_construcao"]).toContain(dev.status);
    }
  });

  it("usa os percentuais informados pelo cliente", () => {
    const pct = (slug: string) => developments.find((d) => d.slug === slug)!.progress!;
    for (const slug of ["follow-savassi", "solar-manilha"]) {
      expect(pct(slug).overallPercentage).toBe(70);
      expect(Object.fromEntries(pct(slug).stages.map((s) => [s.name, s.percentage]))).toEqual({
        Fundação: 99,
        Estrutura: 100,
        Alvenaria: 90,
        "Acabamento interno": 60,
        "Acabamento externo": 50,
      });
    }
    expect(pct("golden-ville-residence")).toEqual({
      overallPercentage: 7,
      stages: [{ name: "Fundação", percentage: 70, order: 1 }],
    });
  });

  it("só classifica imagens nas três categorias da galeria", () => {
    for (const dev of developments) {
      for (const img of dev.images) {
        expect(DEVELOPMENT_IMAGE_KINDS).toContain(img.kind);
      }
    }
  });

  it("a primeira imagem de cada empreendimento serve de capa (nunca obra/planta)", () => {
    // pickHeroImage cai em images[0] quando não acha "imagens": abrir a página
    // com uma planta técnica ou um canteiro seria a pior capa possível.
    for (const dev of developments) {
      if (dev.images.length > 0) {
        expect(dev.images[0]?.kind).toBe("imagens");
      }
    }
  });

  it("Follow Savassi tem o conteúdo real do cliente (Gate B)", () => {
    const fs = developments.find((d) => d.slug === "follow-savassi")!;
    expect(fs.images.length).toBeGreaterThanOrEqual(6);
    expect(fs.description).toMatch(/Estela Netto/);
    expect(fs.location.address).toMatch(/Getúlio Vargas/);
    expect(fs.location.lat).toBeCloseTo(-19.9393, 3);
    expect(fs.location.lng).toBeCloseTo(-43.9383, 3);
    expect(fs.amenities?.map((a) => a.category)).toEqual([
      "Características",
      "Área de lazer",
      "Comodidades",
      "Segurança",
    ]);
  });

  it("só marca MCMV onde o cliente declara o programa", () => {
    const mcmv = developments.filter((d) => d.mcmv).map((d) => d.slug);
    expect(mcmv.sort()).toEqual(
      [
        "golden-ville-residence",
        "royal-ville-residence",
        "solar-manilha",
        "sunset-ville-residence",
        "torres-da-lagoa",
        "viver-mais",
      ].sort(),
    );
    // Alto luxo e Savassi ficam de fora: exibir a marca federal neles sugeriria
    // um credenciamento que não existe.
    const fs = developments.find((d) => d.slug === "follow-savassi")!;
    expect(fs.mcmv).toBeUndefined();
  });

  it("Solar Manilha tem a página completa do lançamento", () => {
    const sm = developments.find((d) => d.slug === "solar-manilha")!;
    expect(sm.status).toBe("lancamento");
    expect(sm.location.neighborhood).toBe("Manilha");
    expect(sm.images.length).toBeGreaterThan(20);
    expect(sm.images.some((i) => i.kind === "planta")).toBe(true);
    // Capa escolhida pelo cliente: a implantação (render aéreo, não planta).
    expect(sm.images[0]).toMatchObject({
      src: "/empreendimentos/solar-manilha/implantacao.webp",
      kind: "imagens",
    });
    expect(sm.amenities?.map((a) => a.category)).toEqual([
      "Características",
      "Área de lazer",
      "Comodidades",
      "Segurança",
    ]);
  });

  it("a imagem do 'O que oferece', quando escolhida, é uma das imagens do empreendimento", () => {
    for (const dev of developments.filter((d) => d.amenitiesImage)) {
      expect(dev.images.map((i) => i.src)).toContain(dev.amenitiesImage);
    }
  });

  it("toda imagem do seed tem dimensões do manifesto (rode o optimize:images ao trocar imagens)", () => {
    for (const dev of developments) {
      for (const img of dev.images) {
        expect(img.width, img.src).toBeGreaterThan(0);
        expect(img.height, img.src).toBeGreaterThan(0);
      }
    }
  });

  it("inclui os empreendimentos-chave conhecidos", () => {
    const slugs = developments.map((d) => d.slug);
    expect(slugs).toContain("follow-savassi");
    expect(slugs).toContain("gutierrez");
    expect(slugs).toContain("viver-mais");
  });
});
