import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DevelopmentCta } from "./DevelopmentCta";
import type { Development } from "@/types/development";

const base: Development = {
  slug: "follow-savassi",
  name: "Follow Savassi",
  status: "em_construcao",
  location: { city: "BH", state: "MG" },
  summary: "s",
  description: "d",
  images: [],
  features: [],
};

describe("DevelopmentCta (FR6 contextual)", () => {
  it("gera link de WhatsApp com o nome do empreendimento na mensagem", () => {
    render(<DevelopmentCta development={base} />);
    const link = screen.getByRole("link", { name: /whatsapp/i });
    expect(link.getAttribute("href")).toContain("https://wa.me/");
    expect(decodeURIComponent(link.getAttribute("href") ?? "")).toContain(
      "Follow Savassi",
    );
  });

  it("usa a mensagem contextual customizada quando informada", () => {
    render(
      <DevelopmentCta
        development={{
          ...base,
          contact: { whatsappMessage: "Quero o Follow Savassi na planta" },
        }}
      />,
    );
    const link = screen.getByRole("link", { name: /whatsapp/i });
    expect(decodeURIComponent(link.getAttribute("href") ?? "")).toContain(
      "Quero o Follow Savassi na planta",
    );
  });
});
