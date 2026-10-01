import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DevelopmentCta, contextualMessage } from "./DevelopmentCta";
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

describe("DevelopmentCta (FR6/FR9)", () => {
  it("usa o título e o subtítulo pedidos pelo cliente", () => {
    render(<DevelopmentCta development={base} />);
    expect(
      screen.getByRole("heading", { name: "Quer saber mais?" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/consultor da Natus/i)).toBeInTheDocument();
  });

  it("traz o formulário de interesse na mesma faixa", () => {
    render(<DevelopmentCta development={base} />);
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Quero saber mais!" }),
    ).toBeInTheDocument();
  });

  it("oferece o WhatsApp com mensagem contextual", () => {
    render(<DevelopmentCta development={base} />);
    const link = screen.getByRole("link", { name: /whatsapp/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("https://wa.me/"));
    expect(decodeURIComponent(link.getAttribute("href")!)).toContain(
      "Follow Savassi",
    );
  });

  it("respeita a mensagem de WhatsApp cadastrada no empreendimento", () => {
    expect(
      contextualMessage({
        ...base,
        contact: { whatsappMessage: "Mensagem própria" },
      }),
    ).toBe("Mensagem própria");
  });
});
