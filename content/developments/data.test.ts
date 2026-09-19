import { describe, expect, it } from "vitest";
import { developments } from "./data";
import { DEVELOPMENT_STATUSES } from "@/types/development";

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

  it("marca campos sem fonte confiável como TODO: CONTENT REQUIRED", () => {
    for (const dev of developments) {
      // Descrição (copy de marketing) não é inventada: TODO até a empresa fornecer.
      expect(dev.description).toMatch(/TODO: CONTENT REQUIRED/);
      // Resumo é sempre preenchido (factual ou placeholder rotulado).
      expect(dev.summary.length).toBeGreaterThan(0);
    }
  });

  it("Follow Savassi tem imagens reais atribuídas (Gate B)", () => {
    const fs = developments.find((d) => d.slug === "follow-savassi")!;
    expect(fs.images.length).toBeGreaterThanOrEqual(6);
    expect(fs.images[0]?.kind).toBe("hero");
  });

  it("inclui os empreendimentos-chave conhecidos", () => {
    const slugs = developments.map((d) => d.slug);
    expect(slugs).toContain("follow-savassi");
    expect(slugs).toContain("gutierrez");
    expect(slugs).toContain("viver-mais");
  });
});
