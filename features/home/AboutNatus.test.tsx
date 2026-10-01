import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutNatus } from "./AboutNatus";

describe("Seção sobre o Grupo Natus", () => {
  it("apresenta a empresa com a copy institucional", () => {
    render(<AboutNatus />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByText(/nascemos em 2016/i)).toBeInTheDocument();
    expect(
      screen.getByText(/é assim que a essência do novo morar sai do papel/i),
    ).toBeInTheDocument();
  });

  it("cita as empresas do grupo", () => {
    render(<AboutNatus />);
    expect(screen.getByText(/ALIATTO/)).toBeInTheDocument();
    expect(screen.getByText(/OASI/)).toBeInTheDocument();
  });

  it("mostra os números reais da operação", () => {
    render(<AboutNatus />);
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("100 mil")).toBeInTheDocument();
    expect(screen.getByText("+1.500")).toBeInTheDocument();
    // Nenhum número ficou pendente de conteúdo.
    expect(screen.queryByText(/TODO: CONTENT REQUIRED/)).toBeNull();
  });

  it("leva à página de história da empresa", () => {
    render(<AboutNatus />);
    expect(
      screen.getByRole("link", { name: /conheça a nossa história/i }),
    ).toHaveAttribute("href", "/quem-somos");
  });
});
