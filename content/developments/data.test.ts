import { describe, expect, it } from "vitest";
import { developments } from "./data";
import {
  DEVELOPMENT_IMAGE_KINDS,
  DEVELOPMENT_STATUSES,
} from "@/types/development";

const COM_DESCRICAO = new Set([
  "follow-savassi",
  "residenziale-colonnello-figueiredo",
]);

describe("Seed dos empreendimentos", () => {
  it("cadastra os 12 empreendimentos ativos", () => {
    expect(developments).toHaveLength(12);
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

  it("marca descrição sem fonte confiável como TODO: CONTENT REQUIRED", () => {
    for (const dev of developments) {
      // Copy de marketing não é inventada: fica TODO até a empresa fornecer.
      // Dois já têm a sua: o Follow (enviada pelo cliente) e o Residenziale
      // (os três itens que antes viviam em `highlights`).
      if (!COM_DESCRICAO.has(dev.slug)) {
        expect(dev.description).toMatch(/TODO: CONTENT REQUIRED/);
      }
      // Resumo é sempre preenchido (factual ou placeholder rotulado).
      expect(dev.summary.length).toBeGreaterThan(0);
    }
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

  it("só marca MCMV onde o próprio material declara o programa", () => {
    const mcmv = developments.filter((d) => d.mcmv).map((d) => d.slug);
    expect(mcmv).toEqual([
      "solar-manilha",
      "sunset-ville-residence",
      "royal-ville-residence",
    ]);
    // Alto luxo e Savassi ficam de fora: exibir a marca federal neles sugeriria
    // um credenciamento que não existe.
    const fs = developments.find((d) => d.slug === "follow-savassi")!;
    expect(fs.mcmv).toBeUndefined();
  });

  it("inclui os empreendimentos-chave conhecidos", () => {
    const slugs = developments.map((d) => d.slug);
    expect(slugs).toContain("follow-savassi");
    expect(slugs).toContain("gutierrez");
    expect(slugs).toContain("viver-mais");
  });
});
