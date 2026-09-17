import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { JsonLd, organizationSchema, developmentSchema } from "./jsonLd";
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

  it("developmentSchema deriva do empreendimento", () => {
    const s = developmentSchema(dev);
    expect(s.name).toBe("Follow Savassi");
    expect(s.address.addressLocality).toBe("Belo Horizonte");
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
