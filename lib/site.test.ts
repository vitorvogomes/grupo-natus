import { describe, expect, it } from "vitest";
import { NAV_LINKS, CONTACT, LEGAL, SOCIAL } from "./site";

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
});
