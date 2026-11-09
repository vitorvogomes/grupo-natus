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

  it("expõe o verde de status e a cor da faixa comercial do card", () => {
    // Os selos de status são todos neutros desde a revisão v3; sobram o verde
    // (botão do WhatsApp) e o azul das faixas (`SalesBand`).
    for (const token of [
      "--color-status-pronto:",
      "--color-band:",
    ]) {
      expect(themeCss).toContain(token);
    }
  });

  it("guarda a paleta da Natus News com as cores exatas do e-mail original", () => {
    // O cliente pediu a página fiel ao design da newsletter; a cor fica nos
    // tokens (AD-7), não espalhada nos componentes.
    const palette: Record<string, string> = {
      "--color-news-ink": "#15171b",
      "--color-news-text": "#22252b",
      "--color-news-muted": "#6b6b6b",
      "--color-news-source": "#8a8a8a",
      "--color-news-gold": "#9a8358",
      "--color-news-gold-soft": "#d8c49b",
      "--color-news-cream": "#f4f3ef",
      "--color-news-rule": "#ddd6c6",
      "--color-news-invite-text": "#c9c9c9",
      "--color-news-footer": "#0e0f12",
      "--color-news-footer-text": "#9a9a9a",
    };
    for (const [token, hex] of Object.entries(palette)) {
      expect(themeCss.toLowerCase()).toMatch(new RegExp(`${token}:\\s*${hex};`));
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
