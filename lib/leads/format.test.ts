import { describe, expect, it } from "vitest";
import { formatLeadEmail } from "./format";

describe("formatLeadEmail", () => {
  it("contato: assunto com o nome, rótulos em português na ordem do formulário", () => {
    const m = formatLeadEmail({
      type: "contato",
      nome: "Maria",
      email: "maria@example.com",
      telefone: "31988887777",
      assunto: "compra",
      mensagem: "Olá",
    });
    expect(m.subject).toBe("[Site] Contato — Maria");
    expect(m.replyTo).toBe("maria@example.com");
    expect(m.text).toBe(
      ["Nome: Maria", "E-mail: maria@example.com", "Telefone: 31988887777", "Assunto: compra", "Mensagem: Olá"].join("\n"),
    );
  });

  it("terreno: assunto com a localização; omite o que não veio; sem reply-to sem e-mail", () => {
    const m = formatLeadEmail({ type: "terreno", nome: "João", telefone: "31988887777", localizacao: "Nova Lima" });
    expect(m.subject).toBe("[Site] Terreno — Nova Lima");
    expect(m.replyTo).toBeUndefined();
    expect(m.text).not.toContain("Área");
  });

  it("interesse: empreendimento resolvido no servidor e UTM no fim", () => {
    const m = formatLeadEmail(
      {
        type: "interesse",
        nome: "Ana",
        telefone: "21977776666",
        email: "ana@example.com",
        slug: "solar-manilha",
        utm_source: "facebook",
        pagina: "/empreendimentos/solar-manilha",
      },
      { empreendimento: "Solar Manilha" },
    );
    expect(m.subject).toBe("[Site] Interesse — Solar Manilha");
    expect(m.text).toContain("Empreendimento: Solar Manilha");
    expect(m.text).toContain("Origem (utm_source): facebook");
    expect(m.text).toContain("Página: /empreendimentos/solar-manilha");
    expect(m.text).not.toContain("slug");
  });
});
