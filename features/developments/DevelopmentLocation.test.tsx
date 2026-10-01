import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DevelopmentLocation } from "./DevelopmentLocation";
import type { DevelopmentLocation as Location } from "@/types/development";

const completa: Location = {
  city: "Belo Horizonte",
  state: "MG",
  address: "Av. Getúlio Vargas, 1.676 — Savassi",
  lat: -19.9393436,
  lng: -43.9383469,
  note: "No encontro da Av. do Contorno com a Getúlio Vargas.",
};

const soCidade: Location = { city: "Itaboraí", state: "RJ" };

describe("DevelopmentLocation", () => {
  it("mostra título, texto do entorno e endereço", () => {
    render(<DevelopmentLocation name="Follow Savassi" location={completa} />);
    expect(
      screen.getByRole("heading", { name: "Localização" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Av. do Contorno/)).toBeInTheDocument();
    expect(screen.getByText(/Av. Getúlio Vargas, 1.676/)).toBeInTheDocument();
  });

  it("oferece rota no Google Maps e no Waze", () => {
    render(<DevelopmentLocation name="X" location={completa} />);
    expect(screen.getByRole("link", { name: /google maps/i })).toHaveAttribute(
      "href",
      expect.stringContaining("google.com/maps"),
    );
    expect(screen.getByRole("link", { name: /waze/i })).toHaveAttribute(
      "href",
      expect.stringContaining("waze.com/ul?ll=-19.9393436"),
    );
  });

  it("renderiza o mapa quando há coordenadas", () => {
    render(<DevelopmentLocation name="Follow Savassi" location={completa} />);
    expect(screen.getByTitle("Mapa de Follow Savassi")).toBeInTheDocument();
  });

  it("sem endereço, mantém cidade/UF e os links — só o mapa some", () => {
    render(<DevelopmentLocation name="Solar Manilha" location={soCidade} />);
    expect(screen.getByText(/Itaboraí — RJ/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /waze/i })).toBeInTheDocument();
    expect(screen.queryByTitle(/^Mapa de/)).not.toBeInTheDocument();
  });

  it("sem texto de entorno, não deixa parágrafo vazio", () => {
    render(<DevelopmentLocation name="X" location={soCidade} />);
    expect(screen.queryByText(/Contorno/)).not.toBeInTheDocument();
  });
});
