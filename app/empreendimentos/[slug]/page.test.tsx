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

describe("Layout completo — em construção com material (Follow Savassi)", () => {
  it("monta a página inteira, na ordem pedida", async () => {
    await abrir("follow-savassi");
    expect(
      screen.getByRole("heading", { level: 1, name: "Follow Savassi" }),
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

  it("mostra o mapa e as rotas, agora que há endereço", async () => {
    await abrir("follow-savassi");
    expect(screen.getByTitle("Mapa de Follow Savassi")).toBeInTheDocument();
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

describe("Layout reduzido — pronto para morar (Torres da Lagoa)", () => {
  it("tem galeria e localização, mas nenhuma seção de obra", async () => {
    await abrir("torres-da-lagoa");
    expect(screen.getByRole("heading", { name: "Galeria" })).toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.queryByText(/estágio de obra/i)).not.toBeInTheDocument();
  });

  it("a sub-nav não oferece âncora para seção que não existe", async () => {
    await abrir("torres-da-lagoa");
    const nav = navDoEmpreendimento();
    expect(
      within(nav).queryByRole("link", { name: /estágio de obra/i }),
    ).toBeNull();
    expect(
      within(nav).queryByRole("link", { name: /o que oferece/i }),
    ).toBeNull();
    expect(
      within(nav).getByRole("link", { name: "Imagens" }),
    ).toHaveAttribute("href", "#imagens");
  });
});

describe("Layout enxuto — lançamento sem material (Solar Manilha)", () => {
  it("troca as seções vazias por um painel com o que se sabe", async () => {
    await abrir("solar-manilha");
    expect(screen.getByText(/368 un. MCMV/)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /quero ser avisado/i }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Galeria" })).toBeNull();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it("nunca mostra placeholder TODO na tela", async () => {
    await abrir("solar-manilha");
    expect(screen.queryByText(/TODO: CONTENT REQUIRED/)).toBeNull();
  });

  it("exibe a seção Minha Casa Minha Vida por ser enquadrado", async () => {
    await abrir("solar-manilha");
    expect(
      screen.getByRole("img", { name: /minha casa minha vida/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /simule agora/i }),
    ).toBeInTheDocument();
  });
});
