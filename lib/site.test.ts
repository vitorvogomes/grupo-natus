import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { NAV_LINKS, CONTACT, HEADQUARTERS, LEGAL, SOCIAL, THEME_COLOR } from "./site";

describe("Configuração do site", () => {
  it("expõe os links principais de navegação na ordem esperada", () => {
    expect(NAV_LINKS.map((l) => l.label)).toEqual([
      "Empreendimentos",
      "Serviços de Engenharia",
      "Quem Somos",
      "Negocie seu Terreno",
      "Contato",
    ]);
  });

  it("cada link tem href absoluto interno", () => {
    for (const link of NAV_LINKS) {
      expect(link.href).toMatch(/^\/[a-z-]*$/);
    }
  });

  it("expõe os contatos institucionais", () => {
    expect(CONTACT.whatsapp).toMatch(/^55\d{10,11}$/);
    expect(CONTACT.whatsappDisplay).toContain("98466-3280");
    expect(CONTACT.phoneDisplay).toContain("98466-3280");
    expect(CONTACT.email).toBe("contato@natusgrupo.com.br");
    expect(CONTACT.address).toMatch(/Savassi/);
    expect(CONTACT.hours).toMatch(/Seg/);
    expect(CONTACT.mapsUrl).toMatch(/^https:\/\/www\.google\.com\/maps/);
  });

  it("dados legais e perfis oficiais informados pelo cliente", () => {
    expect(LEGAL.cnpj).toBe("24.353.357/0001-11");
    expect(SOCIAL).toEqual({
      instagram: "https://www.instagram.com/gruponatus/",
      facebook: "https://www.facebook.com/p/Grupo-Natus-100093927445460/",
      linkedin: "https://www.linkedin.com/company/grupo-natus/",
    });
  });

  it("a cor da barra do navegador é o token navy-700 do tema (AD-7)", () => {
    const css = readFileSync(join(process.cwd(), "styles/theme.css"), "utf8");
    expect(css).toContain(`--color-navy-700: ${THEME_COLOR};`);
  });

  it("a sede estruturada (JSON-LD) é a mesma do contato", () => {
    for (const part of Object.values(HEADQUARTERS)) expect(CONTACT.address).toContain(part);
  });
});
