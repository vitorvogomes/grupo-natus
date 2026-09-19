import { describe, expect, it } from "vitest";
import { NAV_LINKS, CONTACT } from "./site";

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
    expect(CONTACT.phoneDisplay).toContain("98337-4122");
    expect(CONTACT.email).toBe("administrativo@natusgrupo.com.br");
    expect(CONTACT.address).toMatch(/Savassi/);
    expect(CONTACT.hours).toMatch(/Seg/);
    expect(CONTACT.mapsUrl).toMatch(/^https:\/\/www\.google\.com\/maps/);
  });
});
