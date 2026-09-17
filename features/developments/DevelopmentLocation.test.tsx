import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DevelopmentLocation } from "./DevelopmentLocation";

describe("DevelopmentLocation (FR7)", () => {
  it("mostra cidade/UF e endereço", () => {
    render(
      <DevelopmentLocation
        name="Follow Savassi"
        location={{
          city: "Belo Horizonte",
          state: "MG",
          address: "Av. Getúlio Vargas, 1621",
        }}
      />,
    );
    expect(screen.getByText(/Av. Getúlio Vargas, 1621/)).toBeInTheDocument();
    expect(screen.getByText(/Belo Horizonte\/MG/)).toBeInTheDocument();
  });

  it("renderiza o mapa embutido quando há coordenadas", () => {
    render(
      <DevelopmentLocation
        name="X"
        location={{ city: "BH", state: "MG", lat: -19.9, lng: -43.9 }}
      />,
    );
    expect(screen.getByTitle(/mapa de x/i)).toBeInTheDocument();
  });

  it("degrada para link quando só há cidade/UF (sem embed)", () => {
    render(
      <DevelopmentLocation name="Y" location={{ city: "Niterói", state: "RJ" }} />,
    );
    expect(screen.queryByTitle(/mapa de y/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /ver no google maps/i }),
    ).toBeInTheDocument();
  });
});
