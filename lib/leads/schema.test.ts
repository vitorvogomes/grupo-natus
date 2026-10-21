import { describe, expect, it } from "vitest";
import { FIELD_MAX, parseLead } from "./schema";

const contato = {
  type: "contato",
  nome: " Maria ",
  email: "maria@example.com",
  telefone: "(31) 98888-7777",
  assunto: "compra",
  mensagem: "Quero saber mais.",
};

describe("parseLead (contrato do servidor)", () => {
  it("aceita o contato e apara os campos", () => {
    const r = parseLead(contato);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.lead).toMatchObject({ type: "contato", nome: "Maria" });
  });

  it("descarta chaves que o formulário não tem", () => {
    const r = parseLead({ ...contato, admin: "true", empreendimento: "X" });
    expect(r.ok && Object.keys(r.lead)).not.toContain("admin");
    expect(r.ok && Object.keys(r.lead)).not.toContain("empreendimento");
  });

  it("recusa tipo desconhecido, nome vazio e contato inválido", () => {
    expect(parseLead({ ...contato, type: "spam" }).ok).toBe(false);
    expect(parseLead({ ...contato, nome: "  " }).ok).toBe(false);
    expect(parseLead({ ...contato, email: "x" }).ok).toBe(false);
    expect(parseLead({ ...contato, telefone: "123" }).ok).toBe(false);
    expect(parseLead(null).ok).toBe(false);
  });

  it("terreno: e-mail opcional (vazio vira ausente), localização obrigatória", () => {
    const base = { type: "terreno", nome: "João", telefone: "31988887777", localizacao: "Nova Lima" };
    const r = parseLead({ ...base, email: "", area: "" });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.lead).not.toHaveProperty("email");
      expect(r.lead).not.toHaveProperty("area");
    }
    expect(parseLead({ ...base, localizacao: "" }).ok).toBe(false);
  });

  it("interesse: slug e UTM do anúncio", () => {
    const r = parseLead({
      type: "interesse",
      nome: "Ana",
      telefone: "21977776666",
      email: "ana@example.com",
      slug: "solar-manilha",
      utm_source: "facebook",
      utm_campaign: "solar",
      pagina: "/empreendimentos/solar-manilha",
    });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.lead).toMatchObject({ slug: "solar-manilha", utm_source: "facebook" });
  });

  it("campo de uma linha recusa quebra de linha; a mensagem aceita", () => {
    expect(parseLead({ ...contato, nome: "Maria\nBcc: x@y.com" }).ok).toBe(false);
    expect(parseLead({ ...contato, telefone: "31988887777\r\n" }).ok).toBe(true); // trim
    expect(parseLead({ ...contato, telefone: "3198888\n7777" }).ok).toBe(false);
    expect(parseLead({ ...contato, mensagem: "Linha 1\nLinha 2" }).ok).toBe(true);
    expect(parseLead({ ...contato, mensagem: "x\u0000y" }).ok).toBe(false);
  });

  it("limita o tamanho dos textos (os mesmos limites do formulário)", () => {
    expect(parseLead({ ...contato, mensagem: "x".repeat(FIELD_MAX.mensagem + 1) }).ok).toBe(false);
    expect(parseLead({ ...contato, nome: "x".repeat(FIELD_MAX.nome + 1) }).ok).toBe(false);
  });

  it("terreno: a área aceita uma descrição curta", () => {
    const area = "aproximadamente 1.200 m², terreno de esquina com dois lotes";
    const r = parseLead({ type: "terreno", nome: "Ana", telefone: "31988887777", localizacao: "BH", area });
    expect(r.ok).toBe(true);
  });

  it("UTM e página malformadas são saneadas, nunca derrubam o lead do anúncio", () => {
    const r = parseLead({
      type: "interesse",
      nome: "Ana",
      telefone: "21977776666",
      email: "ana@example.com",
      slug: "solar-manilha",
      utm_content: "Promo\nOutubro",
      utm_term: "x".repeat(500),
      utm_medium: 42,
      pagina: "/empreendimentos/solar-manilha\u0000",
    });
    expect(r.ok).toBe(true);
    if (r.ok && r.lead.type === "interesse") {
      expect(r.lead.utm_content).toBe("Promo Outubro");
      expect(r.lead.utm_term).toHaveLength(200);
      expect(r.lead).not.toHaveProperty("utm_medium");
      expect(r.lead.pagina).toBe("/empreendimentos/solar-manilha");
    }
  });
});
