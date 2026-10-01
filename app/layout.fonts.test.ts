import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Lê o layout como TEXTO (não importa o módulo): avaliar `next/font` no jsdom
 * exige o loader do Next. O objetivo aqui é travar o contrato tipográfico —
 * quais famílias carregamos e com que peso de rede.
 */
const layoutSource = readFileSync(
  join(process.cwd(), "app", "layout.tsx"),
  "utf8",
);

describe("Tipografia carregada no layout raiz", () => {
  it("usa Inter no corpo e Outfit nos títulos", () => {
    expect(layoutSource).toMatch(/import\s*{[^}]*\bInter\b[^}]*}\s*from\s*"next\/font\/google"/);
    expect(layoutSource).toMatch(/import\s*{[^}]*\bOutfit\b[^}]*}\s*from\s*"next\/font\/google"/);
  });

  it("não carrega mais a serifa Fraunces", () => {
    expect(layoutSource).not.toMatch(/fraunces/i);
  });

  it("expõe as duas famílias como CSS vars no <html>", () => {
    expect(layoutSource).toContain("--font-inter");
    expect(layoutSource).toContain("--font-outfit");
    expect(layoutSource).toMatch(/className=\{`\$\{inter\.variable\} \$\{outfit\.variable\}`\}/);
  });

  it("carrega as fontes como variáveis, sem lista de pesos nem itálico", () => {
    // `weight`/`style` explícitos geram um arquivo por combinação (eram 8 com a
    // Fraunces, metade deles itálicos que o site nunca usou). Sem eles, o
    // next/font serve um único arquivo variável por família.
    expect(layoutSource).not.toMatch(/weight:\s*\[/);
    expect(layoutSource).not.toMatch(/style:\s*\[/);
  });

  it("mantém subsets latinos e display swap nas duas famílias", () => {
    expect(layoutSource.match(/subsets:\s*\["latin"\]/g)).toHaveLength(2);
    expect(layoutSource.match(/display:\s*"swap"/g)).toHaveLength(2);
  });
});
