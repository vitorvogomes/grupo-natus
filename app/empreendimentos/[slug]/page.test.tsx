import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));

import DevelopmentPage, {
  generateMetadata,
  generateStaticParams,
} from "./page";
import { getAllDevelopments } from "@/content/developments";

async function abrir(slug: string) {
  render(await DevelopmentPage({ params: Promise.resolve({ slug }) }));
}

function navDoEmpreendimento() {
  return screen.getByRole("navigation", { name: /seções do empreendimento/i });
}

describe("Rota /empreendimentos/[slug] (FR3)", () => {
  it("generateStaticParams gera uma rota por empreendimento", () => {
    const params = generateStaticParams();
    expect(params).toHaveLength(getAllDevelopments().length);
    expect(params[0]).toHaveProperty("slug");
  });

  it("dispara 404 para slug inexistente", async () => {
    await expect(
      DevelopmentPage({ params: Promise.resolve({ slug: "__nao-existe__" }) }),
    ).rejects.toThrow(/NEXT_NOT_FOUND/);
  });

  it("generateMetadata deriva title/description/canonical do empreendimento (FR14)", async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: "follow-savassi" }),
    });
    expect(meta.title).toBe("Follow Savassi");
    expect(meta.alternates?.canonical).toBe("/empreendimentos/follow-savassi");
    expect(meta.openGraph?.title).toBe("Follow Savassi");
  });

  it("generateMetadata retorna vazio para slug inexistente", async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: "__nao-existe__" }),
    });
    expect(meta).toEqual({});
  });
});

function rotulosDaNav() {
  return within(navDoEmpreendimento())
    .getAllByRole("link")
    .map((a) => [a.textContent, a.getAttribute("href")]);
}

describe("Lançamento — página completa (Follow Savassi)", () => {
  it("monta a página inteira, na ordem pedida", async () => {
    await abrir("follow-savassi");
    expect(
      screen.getByRole("heading", { level: 1, name: "Follow Savassi" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "MG, Savassi - Belo Horizonte" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Galeria" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /o que o follow savassi oferece/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Localização" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("progressbar", { name: /total construído/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Quer saber mais?" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /explore nossos empreendimentos/i }),
    ).toBeInTheDocument();
  });

  it("sub-nav: Imagens · Empreendimento (o que oferece) · Localização · Obra · Consultor", async () => {
    await abrir("follow-savassi");
    expect(rotulosDaNav()).toEqual([
      ["Imagens", "#imagens"],
      ["Empreendimento", "#o-que-oferece"],
      ["Localização", "#localizacao"],
      ["Estágio de Obra", "#estagio-de-obra"],
      ["Falar com Consultor", "#falar-com-consultor"],
    ]);
  });

  it("o estágio de obra mostra as 5 etapas, na ordem oficial", async () => {
    await abrir("follow-savassi");
    const etapas = screen
      .getAllByRole("progressbar")
      .map((el) => el.getAttribute("aria-label"));
    expect(etapas).toEqual([
      "Total Construído",
      "Fundação",
      "Estrutura",
      "Alvenaria",
      "Acabamento interno",
      "Acabamento externo",
    ]);
    // Percentuais do cliente: sem o rótulo de "ilustrativos".
    expect(screen.queryByText(/ilustrativos/i)).toBeNull();
  });

  it("mostra as rotas; o mapa espera o consentimento de cookies", async () => {
    await abrir("follow-savassi");
    // Fora do ConsentProvider ninguém consentiu: o Google não carrega.
    expect(screen.queryByTitle("Mapa de Follow Savassi")).toBeNull();
    expect(screen.getByRole("link", { name: /waze/i })).toBeInTheDocument();
  });

  it("não exibe a seção Minha Casa Minha Vida (não é enquadrado)", async () => {
    await abrir("follow-savassi");
    expect(screen.queryByRole("img", { name: /minha casa minha vida/i })).toBeNull();
  });

  it("o carrossel de saída não repete o empreendimento aberto", async () => {
    await abrir("follow-savassi");
    const carrossel = screen.getByRole("region", {
      name: /outros empreendimentos/i,
    });
    expect(
      within(carrossel).queryByRole("heading", { name: "Follow Savassi" }),
    ).toBeNull();
    expect(
      within(carrossel).getAllByRole("link", { name: /ver empreendimento/i }),
    ).toHaveLength(getAllDevelopments().length - 1);
  });
});

describe("Lançamento MCMV — página completa (Solar Manilha)", () => {
  it("tem galeria, diferenciais e a seção do programa — sem estágio de obra (decisão do cliente)", async () => {
    await abrir("solar-manilha");
    expect(screen.getByRole("heading", { name: "Galeria" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /o que o solar manilha oferece/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /estágio de obra/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /simule agora/i }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/TODO: CONTENT REQUIRED/)).toBeNull();
  });
});

describe("Imagem do 'O que oferece'", () => {
  it("usa a imagem escolhida no dado (Solar: vista do apartamento tipo)", async () => {
    await abrir("solar-manilha");
    const oferece = document.getElementById("o-que-oferece")!;
    expect(
      within(oferece).getByRole("img", { name: /apartamento tipo — vista para o condomínio/i }),
    ).toBeInTheDocument();
  });

  it("sem escolha no dado, cai na terceira imagem (Follow)", async () => {
    await abrir("follow-savassi");
    const oferece = document.getElementById("o-que-oferece")!;
    expect(
      within(oferece).getByRole("img", { name: "Vista aérea do Follow Savassi" }),
    ).toBeInTheDocument();
  });
});

describe("Em construção — página reduzida (Golden Ville)", () => {
  it("mostra só a fundação no estágio de obra", async () => {
    await abrir("golden-ville-residence");
    const etapas = screen
      .getAllByRole("progressbar")
      .map((el) => el.getAttribute("aria-label"));
    expect(etapas).toEqual(["Total Construído", "Fundação"]);
  });

  it("sem diferenciais, 'Empreendimento' na sub-nav leva ao resumo", async () => {
    await abrir("golden-ville-residence");
    expect(rotulosDaNav()[0]).toEqual(["Empreendimento", "#empreendimento"]);
    expect(rotulosDaNav().map(([label]) => label)).toContain("Estágio de Obra");
  });
});

describe("Pronto para morar — página reduzida (Torres da Lagoa)", () => {
  it("tem galeria e localização, mas nenhuma seção de obra", async () => {
    await abrir("torres-da-lagoa");
    expect(screen.getByRole("heading", { name: "Galeria" })).toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.queryByText(/estágio de obra/i)).not.toBeInTheDocument();
  });

  it("exibe o MCMV; o 100% vendido fica só nos cards", async () => {
    await abrir("torres-da-lagoa");
    const resumo = document.getElementById("empreendimento")!;
    expect(within(resumo).queryByText(/100% vendido/i)).toBeNull();
    expect(
      screen.getByRole("link", { name: /simule agora/i }),
    ).toBeInTheDocument();
  });

  it("a sub-nav não oferece âncora para seção que não existe", async () => {
    await abrir("torres-da-lagoa");
    expect(rotulosDaNav()).toEqual([
      ["Empreendimento", "#empreendimento"],
      ["Imagens", "#imagens"],
      ["Localização", "#localizacao"],
      ["Falar com Consultor", "#falar-com-consultor"],
    ]);
  });
});

describe("Breve lançamento — seção mínima (Gutierrez, Sunset Ville)", () => {
  it("troca as seções por um painel com o que se sabe", async () => {
    await abrir("gutierrez");
    expect(screen.getByText(/20 un. alto luxo/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /quero ser avisado/i }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Galeria" })).toBeNull();
    expect(screen.queryByRole("heading", { name: "Localização" })).toBeNull();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("navigation", { name: /seções do empreendimento/i }),
    ).toBeNull();
  });

  it("nunca mostra placeholder TODO na tela", async () => {
    await abrir("gutierrez");
    expect(screen.queryByText(/TODO: CONTENT REQUIRED/)).toBeNull();
  });

  it("exibe a seção Minha Casa Minha Vida quando enquadrado", async () => {
    await abrir("sunset-ville-residence");
    expect(
      screen.getByRole("link", { name: /simule agora/i }),
    ).toBeInTheDocument();
  });
});

describe("Portfólio", () => {
  it("Vista do Lago saiu do portfólio (404)", async () => {
    await expect(
      DevelopmentPage({ params: Promise.resolve({ slug: "vista-do-lago" }) }),
    ).rejects.toThrow(/NEXT_NOT_FOUND/);
  });
});
