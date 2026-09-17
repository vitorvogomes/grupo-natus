import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DevelopmentDetails } from "./DevelopmentDetails";
import type { Development } from "@/types/development";

const base: Development = {
  slug: "x",
  name: "X",
  status: "em_construcao",
  location: { city: "BH", state: "MG" },
  summary: "Resumo do empreendimento",
  description: "Descrição completa do empreendimento",
  images: [],
  features: [
    { label: "Quartos", value: "2 e 3" },
    { label: "Lazer" },
  ],
};

describe("DevelopmentDetails (FR4)", () => {
  it("mostra o badge de status", () => {
    render(<DevelopmentDetails development={base} />);
    expect(screen.getByText("Em construção")).toBeInTheDocument();
  });

  it("mostra descrição e características", () => {
    render(<DevelopmentDetails development={base} />);
    expect(
      screen.getByText("Descrição completa do empreendimento"),
    ).toBeInTheDocument();
    expect(screen.getByText(/Quartos/)).toBeInTheDocument();
    expect(screen.getByText(/2 e 3/)).toBeInTheDocument();
    expect(screen.getByText(/Lazer/)).toBeInTheDocument();
  });

  it("trata ausência de características sem quebrar", () => {
    render(<DevelopmentDetails development={{ ...base, features: [] }} />);
    expect(screen.getByText(/características em breve/i)).toBeInTheDocument();
  });
});
