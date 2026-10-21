import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  JsonLd,
  breadcrumbSchema,
  developmentSchema,
  organizationSchema,
  websiteSchema,
} from "./jsonLd";
import { SOCIAL } from "@/lib/site";
import type { Development } from "@/types/development";

const dev: Development = {
  slug: "follow-savassi",
  name: "Follow Savassi",
  status: "em_construcao",
  location: { city: "Belo Horizonte", state: "MG" },
  summary: "Resumo",
  description: "Descrição",
  images: [],
  features: [],
};

describe("JSON-LD (FR14)", () => {
  it("organizationSchema identifica o Grupo Natus", () => {
    const s = organizationSchema();
    expect(s["@type"]).toBe("Organization");
    expect(s.name).toBe("Grupo Natus");
    expect(s.url).toMatch(/^https:\/\//);
  });

  it("organizationSchema liga os perfis oficiais (sameAs); CNPJ só com a razão social", () => {
    const s = organizationSchema();
    expect(s.sameAs).toEqual(Object.values(SOCIAL));
    expect(s).not.toHaveProperty("taxID");
  });

  it("developmentSchema deriva do empreendimento", () => {
    const s = developmentSchema(dev);
    expect(s.name).toBe("Follow Savassi");
    expect(s.address.addressLocality).toBe("Belo Horizonte");
    expect(s.address).not.toHaveProperty("postalCode");
  });

  it("developmentSchema inclui rua e CEP quando há", () => {
    const s = developmentSchema({
      ...dev,
      location: { ...dev.location, address: "R. X, 1", postalCode: "24856-500" },
    });
    expect(s.address).toMatchObject({ streetAddress: "R. X, 1", postalCode: "24856-500" });
  });

  it("organizationSchema traz logo, sede e contato (desambiguação da marca)", () => {
    const s = organizationSchema();
    expect(s.logo).toBe("https://www.natusgrupo.com.br/brand/grupo-natus-principal.png");
    expect(s.address).toMatchObject({
      "@type": "PostalAddress",
      streetAddress: "Av. Getúlio Vargas, 1621",
      addressLocality: "Belo Horizonte",
      addressRegion: "MG",
      addressCountry: "BR",
    });
    expect(s.telephone).toBe("+5531984663280");
    expect(s.contactPoint).toMatchObject({ "@type": "ContactPoint", contactType: "sales" });
  });

  it("websiteSchema nomeia o site", () => {
    expect(websiteSchema()).toMatchObject({ "@type": "WebSite", name: "Grupo Natus", inLanguage: "pt-BR" });
  });

  it("apartamento vira ApartmentComplex, com geo e capa absoluta", () => {
    const s = developmentSchema({
      ...dev,
      propertyType: "apartamento",
      location: { ...dev.location, lat: -19.9, lng: -43.9 },
      images: [{ src: "/empreendimentos/x/capa.webp", alt: "Capa", kind: "imagens" }],
    });
    expect(s["@type"]).toBe("ApartmentComplex");
    expect(s.geo).toEqual({ "@type": "GeoCoordinates", latitude: -19.9, longitude: -43.9 });
    expect(s.image).toBe("https://www.natusgrupo.com.br/empreendimentos/x/capa.webp");
  });

  it("sem tipo apartamento fica Residence, sem geo nem imagem inventados", () => {
    const s = developmentSchema({ ...dev, propertyType: "casa" });
    expect(s["@type"]).toBe("Residence");
    expect(s).not.toHaveProperty("geo");
    expect(s).not.toHaveProperty("image");
  });

  it("breadcrumbSchema: Início › Empreendimentos › nome", () => {
    const s = breadcrumbSchema(dev);
    expect(s.itemListElement.map((i) => i.name)).toEqual(["Início", "Empreendimentos", "Follow Savassi"]);
    expect(s.itemListElement[2]).toMatchObject({
      position: 3,
      item: "https://www.natusgrupo.com.br/empreendimentos/follow-savassi",
    });
  });

  it("JsonLd escapa '<' (um texto nunca fecha o <script>)", () => {
    const { container } = render(<JsonLd data={{ name: "</script><b>x" }} />);
    expect(container.querySelector("b")).toBeNull();
    expect(container.querySelector("script")?.innerHTML).toContain("\\u003c/script>");
  });

  it("JsonLd renderiza um <script> ld+json", () => {
    const { container } = render(<JsonLd data={organizationSchema()} />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).not.toBeNull();
    expect(script?.innerHTML).toContain("Grupo Natus");
  });
});
