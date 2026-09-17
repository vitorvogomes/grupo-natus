import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DevelopmentHero } from "./DevelopmentHero";
import type { Development } from "@/types/development";

const base: Development = {
  slug: "follow-savassi",
  name: "Follow Savassi",
  status: "em_construcao",
  location: { city: "Belo Horizonte", state: "MG" },
  tagline: "2 e 3 quartos",
  summary: "s",
  description: "d",
  images: [
    { src: "/empreendimentos/follow-savassi/fachada-diurna.jpg", alt: "Fachada", kind: "hero" },
  ],
  features: [],
};

describe("DevelopmentHero", () => {
  it("mostra nome (h1), localização e tagline", () => {
    render(<DevelopmentHero development={base} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Follow Savassi" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Belo Horizonte\/MG/)).toBeInTheDocument();
    expect(screen.getByText("2 e 3 quartos")).toBeInTheDocument();
  });

  it("mostra a imagem de fundo com alt", () => {
    render(<DevelopmentHero development={base} />);
    expect(screen.getByRole("img", { name: "Fachada" })).toBeInTheDocument();
  });

  it("exibe 'assista ao vídeo' quando há vídeo", () => {
    render(
      <DevelopmentHero
        development={{ ...base, videoUrl: "https://youtu.be/x" }}
      />,
    );
    expect(
      screen.getByRole("link", { name: /assista ao vídeo/i }),
    ).toHaveAttribute("href", "https://youtu.be/x");
  });

  it("não quebra sem imagem nem vídeo", () => {
    render(
      <DevelopmentHero
        development={{ ...base, images: [], videoUrl: undefined, tagline: undefined }}
      />,
    );
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /assista ao vídeo/i })).toBeNull();
  });
});
