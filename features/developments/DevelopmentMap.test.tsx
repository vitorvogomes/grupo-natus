import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DevelopmentMap } from "./DevelopmentMap";
import type { DevelopmentLocation } from "@/types/development";

const comCoordenadas: DevelopmentLocation = {
  city: "Belo Horizonte",
  state: "MG",
  address: "Av. Getúlio Vargas, 1.676",
  lat: -19.9393436,
  lng: -43.9383469,
};

afterEach(() => {
  vi.unstubAllEnvs();
  document.head.querySelectorAll("script[data-google-maps]").forEach((s) => {
    s.remove();
  });
});

describe("DevelopmentMap", () => {
  it("sem chave, usa o embed público do Google", () => {
    render(<DevelopmentMap name="Follow Savassi" location={comCoordenadas} />);
    const frame = screen.getByTitle("Mapa de Follow Savassi");
    expect(frame.tagName).toBe("IFRAME");
    expect(frame).toHaveAttribute(
      "src",
      expect.stringContaining("output=embed"),
    );
  });

  it("sem chave e só com cidade/UF, não renderiza mapa nenhum", () => {
    const { container } = render(
      <DevelopmentMap name="X" location={{ city: "Niterói", state: "RJ" }} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("não carrega a JS API quando falta o Map ID (marcador não renderizaria)", () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY", "chave-de-teste");
    render(<DevelopmentMap name="X" location={comCoordenadas} />);
    expect(screen.getByTitle("Mapa de X").tagName).toBe("IFRAME");
    expect(
      document.head.querySelector("script[data-google-maps]"),
    ).toBeNull();
  });

  it("com chave e Map ID, troca o iframe pelo mapa com marcador próprio", () => {
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY", "chave-de-teste");
    vi.stubEnv("NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID", "mapa-de-teste");
    render(<DevelopmentMap name="Follow Savassi" location={comCoordenadas} />);

    expect(screen.queryByTitle(/^Mapa de/)).not.toBeInstanceOf(
      HTMLIFrameElement,
    );
    expect(
      screen.getByRole("application", { name: "Mapa de Follow Savassi" }),
    ).toBeInTheDocument();

    const script = document.head.querySelector<HTMLScriptElement>(
      "script[data-google-maps]",
    );
    expect(script?.src).toContain("maps.googleapis.com");
    expect(script?.src).toContain("libraries=marker");
  });
});
