import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { getEditionBySlug } from "@/content/news";
import { NewsEditionArticle } from "./NewsEditionArticle";

const edition = getEditionBySlug("edicao-0")!;

function renderEdition() {
  return render(<NewsEditionArticle edition={edition} />);
}

describe("NewsEditionArticle — a edição da Natus News como página", () => {
  it("tem um h1 em texto (o título da arte do banner é imagem)", () => {
    renderEdition();
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Natus News · Edição 0 — novembro de 2026");
    expect(screen.getByRole("img", { name: edition.banner.alt })).toBeInTheDocument();
  });

  it("mantém a ordem dos blocos do e-mail", () => {
    const { container } = renderEdition();
    const text = container.textContent ?? "";
    const marks = [
      "Boas-vindas à primeira edição",
      "10 anos",
      "RADAR NATUS",
      "NATUS NO MÊS",
      "INVISTA COM A NATUS",
      "GRUPO NATUS",
    ].map((mark) => text.indexOf(mark));
    expect(marks.every((i) => i >= 0)).toBe(true);
    expect([...marks].sort((a, b) => a - b)).toEqual(marks);
  });

  it("reproduz o negrito da abertura", () => {
    renderEdition();
    const strong = screen.getByText("Natus News", { selector: "strong" });
    expect(strong.closest("p")).toHaveTextContent(
      "Boas-vindas à primeira edição da Natus News, a newsletter mensal do Grupo Natus.",
    );
  });

  it("mostra os números do grupo como pares valor/rótulo", () => {
    renderEdition();
    for (const { value, label } of edition.stats) {
      const term = screen.getByText(label);
      expect(term.tagName).toBe("DT");
      expect(term.parentElement).toHaveTextContent(value);
    }
  });

  it("Radar: cada notícia com a fonte e o link externo em nova aba", () => {
    renderEdition();
    const radar = screen.getByRole("region", { name: "O que movimentou o mercado" });
    const links = within(radar).getAllByRole("link", { name: /ler a notícia/i });
    expect(links.map((a) => a.getAttribute("href"))).toEqual(edition.radar.items.map((i) => i.url));
    for (const link of links) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
    for (const item of edition.radar.items) {
      expect(within(radar).getByText(item.headline).tagName).toBe("STRONG");
    }
    expect(within(radar).getAllByText(/^Fonte: /)).toHaveLength(edition.radar.items.length);
  });

  it("Natus no mês: foto, rótulo e link interno para cada empreendimento", () => {
    renderEdition();
    const updates = screen.getByRole("region", { name: "Como estão os nossos empreendimentos" });
    for (const item of edition.updates.items) {
      expect(within(updates).getByRole("img", { name: item.image.alt })).toBeInTheDocument();
      expect(within(updates).getByText(item.eyebrow)).toBeInTheDocument();
    }
    const links = within(updates).getAllByRole("link", { name: /ver o empreendimento/i });
    expect(links.map((a) => a.getAttribute("href"))).toEqual([
      "/empreendimentos/golden-ville-residence",
      "/empreendimentos/follow-savassi",
      "/empreendimentos/solar-manilha",
    ]);
    for (const link of links) expect(link).not.toHaveAttribute("target");
  });

  it("convite: o botão leva ao cadastro (Google Forms) em nova aba", () => {
    renderEdition();
    const cta = screen.getByRole("link", { name: /quero receber as oportunidades/i });
    expect(cta).toHaveAttribute("href", "https://forms.gle/xgUsDXcV7P4LKzmc9");
    expect(cta).toHaveAttribute("target", "_blank");
    expect(cta).toHaveAttribute("rel", "noopener noreferrer");
    expect(
      screen.getByRole("heading", { level: 2, name: edition.invite.title }),
    ).toBeInTheDocument();
  });

  it("mantém o aviso legal e tira os links que só fazem sentido no e-mail", () => {
    const { container } = renderEdition();
    expect(screen.getByText(/não constitui oferta pública de valores mobiliários/)).toBeInTheDocument();
    expect(container).not.toHaveTextContent(/ver no navegador/i);
    expect(container).not.toHaveTextContent(/não quero mais receber/i);
    expect(container.innerHTML).not.toMatch(/activehosted|%[A-Z_]+%/);
  });
});
