import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const themeCss = readFileSync(
  join(process.cwd(), "styles", "theme.css"),
  "utf8",
);

describe("Design tokens Natus (@theme)", () => {
  it("declara um bloco @theme", () => {
    expect(themeCss).toMatch(/@theme\s*{/);
  });

  it("deriva as cores institucionais dos logos oficiais", () => {
    // Nude/rosé do wordmark NATUS e azul-marinho do acento do 'N'.
    expect(themeCss.toLowerCase()).toContain("#cca890");
    expect(themeCss.toLowerCase()).toContain("#243c54");
  });

  it("expõe cores semânticas da marca", () => {
    for (const token of [
      "--color-brand:",
      "--color-ink:",
      "--color-surface:",
      "--color-muted:",
    ]) {
      expect(themeCss).toContain(token);
    }
  });

  it("expõe tokens de status de empreendimento (lancamento/em_construcao/pronto)", () => {
    for (const token of [
      "--color-status-lancamento:",
      "--color-status-em-construcao:",
      "--color-status-pronto:",
    ]) {
      expect(themeCss).toContain(token);
    }
  });

  it("define os demais namespaces de token reutilizáveis", () => {
    // tipografia, spacing, radius, shadow, breakpoint, motion.
    expect(themeCss).toMatch(/--font-sans:/);
    expect(themeCss).toMatch(/--font-heading:/);
    expect(themeCss).toMatch(/--text-/);
    expect(themeCss).toMatch(/--spacing:/);
    expect(themeCss).toMatch(/--radius-/);
    expect(themeCss).toMatch(/--shadow-/);
    expect(themeCss).toMatch(/--breakpoint-/);
    expect(themeCss).toMatch(/--ease-/);
  });

  it("usa uma sans geométrica (Outfit) nos títulos, não mais uma serifa", () => {
    // Títulos e corpo são ambos sans: o contraste vem da família e do peso,
    // nunca de um fallback serifado que apareceria durante o swap.
    expect(themeCss).toMatch(/--font-heading:[\s\S]*?ui-sans-serif/);
    expect(themeCss).toMatch(/--font-heading:\s*\n?\s*var\(--font-outfit\)/);
    expect(themeCss.toLowerCase()).not.toContain("fraunces");
    expect(themeCss).not.toMatch(/--font-heading:[\s\S]*?ui-serif/);
  });
});
