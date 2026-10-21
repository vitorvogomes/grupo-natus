import { beforeEach, describe, expect, it, vi } from "vitest";

const single = vi.fn();
const insert = vi.fn(() => ({ select: () => ({ single }) }));
const eq = vi.fn();
const update = vi.fn(() => ({ eq }));
const from = vi.fn(() => ({ insert, update }));
let client: { from: typeof from } | null = { from };

vi.mock("@/lib/supabase/server", () => ({ getSupabaseAdmin: () => client }));

import { markEmailSent, saveSiteContact, saveSiteLead, updateSiteLeadCrm } from "./store";

const row = {
  development_slug: "solar-manilha",
  crm_empreendimento_id: 7,
  nome: "Ana",
  email: "ana@example.com",
  telefone: "21977776666",
  utm: { utm_source: "facebook" },
  pagina: "/empreendimentos/solar-manilha",
};

beforeEach(() => {
  client = { from };
  vi.clearAllMocks();
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("site_leads / site_contacts", () => {
  it("grava o lead de empreendimento e devolve o id", async () => {
    single.mockResolvedValue({ data: { id: 12 }, error: null });
    expect(await saveSiteLead(row)).toEqual({ id: 12 });
    expect(from).toHaveBeenCalledWith("site_leads");
    expect(insert).toHaveBeenCalledWith(row);
  });

  it("grava o contato geral na tabela própria", async () => {
    single.mockResolvedValue({ data: { id: 3 }, error: null });
    const contato = { tipo: "contato" as const, nome: "Maria", email: "m@example.com", telefone: null, dados: { mensagem: "Olá" } };
    expect(await saveSiteContact(contato)).toEqual({ id: 3 });
    expect(from).toHaveBeenCalledWith("site_contacts");
  });

  it("erro do banco ou Supabase não configurado = null (quem chama tem plano B)", async () => {
    single.mockResolvedValue({ data: null, error: { code: "42501", message: "denied" } });
    expect(await saveSiteLead(row)).toBeNull();
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining("42501"));

    client = null;
    expect(await saveSiteLead(row)).toBeNull();
  });

  it("registra o resultado do CRM na linha", async () => {
    eq.mockResolvedValue({ error: null });
    await updateSiteLeadCrm(12, { status: "criado", leadId: "82" });
    expect(update).toHaveBeenCalledWith(
      expect.objectContaining({ crm_status: "criado", crm_lead_id: "82", crm_error: null }),
    );
    expect(eq).toHaveBeenCalledWith("id", 12);

    await updateSiteLeadCrm(12, { status: "erro", error: "HTTP 401" });
    expect(update).toHaveBeenLastCalledWith(
      expect.objectContaining({ crm_status: "erro", crm_lead_id: null, crm_error: "HTTP 401" }),
    );
  });

  it("marca o e-mail como enviado na tabela certa", async () => {
    eq.mockResolvedValue({ error: null });
    await markEmailSent("site_contacts", 3);
    expect(from).toHaveBeenCalledWith("site_contacts");
    expect(update).toHaveBeenCalledWith({ email_enviado: true });
  });

  it("falha ao atualizar só vai para o log", async () => {
    eq.mockResolvedValue({ error: { code: "XX000", message: "x" } });
    await expect(updateSiteLeadCrm(1, { status: "existente", leadId: null })).resolves.toBeUndefined();
    expect(console.error).toHaveBeenCalled();
    client = null;
    await expect(markEmailSent("site_leads", 1)).resolves.toBeUndefined();
  });
});
