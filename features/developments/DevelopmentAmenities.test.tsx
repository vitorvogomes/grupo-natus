import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { DevelopmentAmenities } from "./DevelopmentAmenities";
import type { Development } from "@/types/development";

const base: Development = {
  slug: "x",
  name: "Follow Savassi",
  status: "em_construcao",
  location: { city: "BH", state: "MG" },
  summary: "s",
  description: "d",
  images: [],
  features: [],
  amenities: [
    { category: "Área de lazer", items: ["Rooftop com piscina", "Espaço gourmet"] },
    { category: "Segurança", items: ["Portaria 24h"] },
  ],
};

describe("DevelopmentAmenities", () => {
  it("mostra o título com o nome do empreendimento", () => {
    render(<DevelopmentAmenities development={base} />);
    expect(
      screen.getByRole("heading", { name: /o que o follow savassi oferece/i }),
    ).toBeInTheDocument();
  });

  it("expande uma categoria e mostra os itens", async () => {
    const user = userEvent.setup();
    render(<DevelopmentAmenities development={base} />);
    await user.click(screen.getByRole("button", { name: /área de lazer/i }));
    expect(screen.getByText("Rooftop com piscina")).toBeInTheDocument();
    expect(screen.getByText("Espaço gourmet")).toBeInTheDocument();
  });

  it("mostra botão de download quando há apresentação", () => {
    render(
      <DevelopmentAmenities
        development={{ ...base, presentationUrl: "/x.pdf" }}
      />,
    );
    expect(
      screen.getByRole("link", { name: /download da apresentação/i }),
    ).toHaveAttribute("href", "/x.pdf");
  });

  it("mostra placeholder TODO quando não há diferenciais", () => {
    render(<DevelopmentAmenities development={{ ...base, amenities: [] }} />);
    expect(screen.getByText(/em breve/i)).toBeInTheDocument();
  });
});
