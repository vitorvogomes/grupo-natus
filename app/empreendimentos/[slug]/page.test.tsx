import { render, screen } from "@testing-library/react";
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

describe("Rota /empreendimentos/[slug] (FR3)", () => {
  it("generateStaticParams gera uma rota por empreendimento", () => {
    const params = generateStaticParams();
    expect(params).toHaveLength(getAllDevelopments().length);
    expect(params[0]).toHaveProperty("slug");
  });

  it("renderiza o empreendimento para um slug válido", async () => {
    const ui = await DevelopmentPage({
      params: Promise.resolve({ slug: "follow-savassi" }),
    });
    render(ui);
    expect(
      screen.getByRole("heading", { level: 1, name: "Follow Savassi" }),
    ).toBeInTheDocument();
  });

  it("mostra o progresso da obra quando há dado (Follow Savassi)", async () => {
    const ui = await DevelopmentPage({
      params: Promise.resolve({ slug: "follow-savassi" }),
    });
    render(ui);
    expect(
      screen.getByRole("progressbar", { name: /progresso geral/i }),
    ).toBeInTheDocument();
  });

  it("trata ausência de progresso sem quebrar (Gutierrez)", async () => {
    const ui = await DevelopmentPage({
      params: Promise.resolve({ slug: "gutierrez" }),
    });
    render(ui);
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.getByText(/obra em breve/i)).toBeInTheDocument();
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
    expect(meta.alternates?.canonical).toBe(
      "/empreendimentos/follow-savassi",
    );
    expect(meta.openGraph?.title).toBe("Follow Savassi");
  });

  it("generateMetadata retorna vazio para slug inexistente", async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: "__nao-existe__" }),
    });
    expect(meta).toEqual({});
  });
});
