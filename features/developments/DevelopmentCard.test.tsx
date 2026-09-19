import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DevelopmentCard } from "./DevelopmentCard";
import type { Development } from "@/types/development";

const base: Development = {
  slug: "follow-savassi",
  name: "Follow Savassi",
  status: "em_construcao",
  location: { city: "Belo Horizonte", state: "MG" },
  summary: "s",
  description: "d",
  images: [],
  features: [{ label: "Tipologia", value: "2 e 3 quartos" }],
};

describe("DevelopmentCard", () => {
  it("mostra nome, localização e badge de status", () => {
    render(<DevelopmentCard development={base} />);
    expect(
      screen.getByRole("heading", { name: "Follow Savassi" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Belo Horizonte\/MG/)).toBeInTheDocument();
    expect(screen.getByText("Em construção")).toBeInTheDocument();
  });

  it("mostra características-chave", () => {
    render(<DevelopmentCard development={base} />);
    expect(screen.getByText(/2 e 3 quartos/)).toBeInTheDocument();
  });

  it("mostra feature apenas com label (sem valor)", () => {
    render(
      <DevelopmentCard
        development={{ ...base, features: [{ label: "Área de lazer" }] }}
      />,
    );
    expect(screen.getByText("Área de lazer")).toBeInTheDocument();
  });

  it("tem CTA/link para a página do empreendimento", () => {
    render(<DevelopmentCard development={base} />);
    const link = screen.getByRole("link", { name: /ver empreendimento/i });
    expect(link).toHaveAttribute("href", "/empreendimentos/follow-savassi");
  });

  it("renderiza a imagem principal quando existe", () => {
    render(
      <DevelopmentCard
        development={{
          ...base,
          images: [{ src: "/brand/grupo-natus-principal.png", alt: "Foto", kind: "externa" }],
        }}
      />,
    );
    expect(screen.getByRole("img", { name: "Foto" })).toBeInTheDocument();
  });

  it("mostra placeholder rotulado quando não há imagem", () => {
    render(<DevelopmentCard development={base} />);
    expect(screen.getByText(/imagem em breve/i)).toBeInTheDocument();
  });
});
