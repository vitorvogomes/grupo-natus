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
      // Resumo sempre preenchido e factual: vira a descrição no Google.
      expect(dev.summary.length).toBeGreaterThan(0);
      expect(dev.summary).not.toMatch(/TODO/);
    }
  });

  it("breve lançamento não tem imagem própria (seção mínima com a foto padrão)", () => {
    for (const dev of developments.filter((d) => d.status === "breve_lancamento")) {
      expect(dev.images).toEqual([]);
    }
  });

  it("100% vendido só existe sobre 'pronto para morar' — e todos os prontos estão vendidos", () => {
    for (const dev of developments) {
      if (dev.salesBand === "vendido") expect(dev.status).toBe("pronto");
      if (dev.status === "pronto") expect(dev.salesBand).toBe("vendido");
    }
  });

  it("pré-lançamento só sobre lançamento; últimas unidades só em obra ou lançamento", () => {
    for (const dev of developments) {
      if (dev.salesBand === "pre_lancamento") expect(dev.status).toBe("lancamento");
      if (dev.salesBand === "ultimas_unidades") expect(["lancamento", "em_construcao"]).toContain(dev.status);
    }
  });

  it("faixas e status pedidos pelo cliente (v6): Solar em pré-lançamento, Follow em obra e nas últimas unidades", () => {
    const bySlug = (slug: string) => developments.find((d) => d.slug === slug)!;
    expect(bySlug("solar-manilha")).toMatchObject({ status: "lancamento", salesBand: "pre_lancamento" });
    expect(bySlug("follow-savassi")).toMatchObject({ status: "em_construcao", salesBand: "ultimas_unidades" });
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
    expect(pct("follow-savassi").overallPercentage).toBe(70);
    expect(
      Object.fromEntries(pct("follow-savassi").stages.map((s) => [s.name, s.percentage])),
    ).toEqual({
      Fundação: 100,
      Estrutura: 100,
      Alvenaria: 90,
      "Acabamento interno": 60,
      "Acabamento externo": 50,
    });
    expect(pct("golden-ville-residence")).toEqual({
      overallPercentage: 7,
      stages: [{ name: "Fundação", percentage: 70, order: 1 }],
    });
  });

  it("Solar Manilha não mostra estágio de obra (decisão do cliente)", () => {
    expect(developments.find((d) => d.slug === "solar-manilha")!.progress).toBeUndefined();
  });

  it("tipo de imóvel confirmado pelo cliente em todos os empreendimentos", () => {
    for (const dev of developments) expect(dev.propertyType, dev.slug).toBeDefined();
    for (const slug of ["viver-mais", "gutierrez", "sunset-ville-residence"]) {
      expect(developments.find((d) => d.slug === slug)!.propertyType).toBe("apartamento");
    }
  });

  it("endereços informados pelo cliente (Golden Ville e Solar Manilha)", () => {
    const loc = (slug: string) => developments.find((d) => d.slug === slug)!.location;
    expect(loc("golden-ville-residence").address).toMatch(/Frederico Malesherbes/);
    expect(loc("solar-manilha").address).toMatch(/Carlota Maria do Amor Divino/);
    expect(loc("solar-manilha").postalCode).toBe("24856-500");
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
    // Capa escolhida pelo cliente: o acesso principal. A implantação vem em
    // seguida porque ilustra o resumo (proporção próxima do bloco 4:3).
    expect(sm.images[0]).toMatchObject({
      src: "/empreendimentos/solar-manilha/acesso-principal.webp",
      kind: "imagens",
    });
    expect(sm.images[1]?.src).toBe("/empreendimentos/solar-manilha/implantacao.webp");
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

  it("o Gutierrez se chama Mirante Gutierrez; o slug (URL e chave no CRM) não muda", () => {
    expect(developments.find((d) => d.slug === "gutierrez")?.name).toBe("Mirante Gutierrez");
  });

  it("o ID do CV CRM, quando existe, é inteiro positivo e não se repete", () => {
    const ids = developments.flatMap((d) => (d.crmId === undefined ? [] : [d.crmId]));
    for (const id of ids) expect(Number.isInteger(id) && id > 0).toBe(true);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("liga os empreendimentos cadastrados no CV CRM (GET /v1/cadastros/empreendimentos, 2026-10-20)", () => {
    const crmIds = Object.fromEntries(developments.filter((d) => d.crmId).map((d) => [d.slug, d.crmId]));
    expect(crmIds).toEqual({ "golden-ville-residence": 2, "follow-savassi": 3, "solar-manilha": 4 });
  });

  it("inclui os empreendimentos-chave conhecidos", () => {
    const slugs = developments.map((d) => d.slug);
    expect(slugs).toContain("follow-savassi");
    expect(slugs).toContain("gutierrez");
    expect(slugs).toContain("viver-mais");
  });
});
