import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { DevelopmentAmenities } from "./DevelopmentAmenities";
import type { DevelopmentAmenityGroup } from "@/types/development";

const groups: DevelopmentAmenityGroup[] = [
  {
    category: "Características",
    items: ["Apartamentos de 1 a 3 suítes", "Loja comercial de 268 m²"],
  },
  { category: "Área de lazer", items: ["Rooftop com piscina", "Área gourmet"] },
  { category: "Segurança", items: ["Portaria eletrônica 24h"] },
];

describe("DevelopmentAmenities", () => {
  it("mostra o título com o nome do empreendimento", () => {
    render(<DevelopmentAmenities name="Follow Savassi" groups={groups} />);
    expect(
      screen.getByRole("heading", { name: /o que o follow savassi oferece/i }),
    ).toBeInTheDocument();
  });

  it("lista uma categoria por grupo, na ordem do dado", () => {
    render(<DevelopmentAmenities name="Follow Savassi" groups={groups} />);
    const gatilhos = screen
      .getAllByRole("button")
      .map((b) => b.textContent?.trim());
    expect(gatilhos).toEqual([
      "Características",
      "Área de lazer",
      "Segurança",
    ]);
  });

  it("abre o primeiro grupo por padrão — a seção não começa vazia", () => {
    render(<DevelopmentAmenities name="Follow Savassi" groups={groups} />);
    expect(screen.getByText("Apartamentos de 1 a 3 suítes")).toBeVisible();
  });

  it("expande uma categoria fechada e mostra os itens", async () => {
    const user = userEvent.setup();
    render(<DevelopmentAmenities name="Follow Savassi" groups={groups} />);
    await user.click(screen.getByRole("button", { name: /área de lazer/i }));
    expect(screen.getByText("Rooftop com piscina")).toBeInTheDocument();
    expect(screen.getByText("Área gourmet")).toBeInTheDocument();
  });

  it("cada categoria conhecida ganha um ícone (nenhum emoji)", () => {
    const { container } = render(
      <DevelopmentAmenities name="X" groups={groups} />,
    );
    // Um ícone por gatilho + o chevron do Radix em cada um.
    expect(container.querySelectorAll("svg[aria-hidden]").length).toBe(
      groups.length * 2,
    );
    expect(container.textContent).not.toMatch(/\p{Extended_Pictographic}/u);
  });

  it("mostra a foto de apoio quando existe", () => {
    render(
      <DevelopmentAmenities
        name="X"
        groups={groups}
        image={{ src: "/brand/grupo-natus-principal.png", alt: "Piscina" }}
      />,
    );
    expect(screen.getByRole("img", { name: "Piscina" })).toBeInTheDocument();
  });

  it("sem foto, o accordion ocupa a seção inteira", () => {
    render(<DevelopmentAmenities name="X" groups={groups} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
