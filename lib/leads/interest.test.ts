import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Development } from "@/types/development";

const { pending, saveSiteLead, updateSiteLeadCrm, markEmailSent, syncLeadToCrm, sendEmail } = vi.hoisted(() => ({
  pending: [] as Promise<unknown>[],
  saveSiteLead: vi.fn(),
  updateSiteLeadCrm: vi.fn(),
  markEmailSent: vi.fn(),
  syncLeadToCrm: vi.fn(),
  sendEmail: vi.fn(),
}));
vi.mock("next/server", () => ({ after: (fn: () => Promise<unknown>) => pending.push(fn()) }));
vi.mock("./store", () => ({ saveSiteLead, updateSiteLeadCrm, markEmailSent }));
vi.mock("@/lib/crm/cvcrm", () => ({ syncLeadToCrm }));
vi.mock("@/lib/email", () => ({ sendEmail }));

import { handleInterestLead } from "./interest";

const dev = { slug: "solar-manilha", name: "Solar Manilha", crmId: 7 } as Development;
const lead = {
  type: "interesse" as const,
  nome: "Ana",
  telefone: "21977776666",
  email: "ana@example.com",
  slug: "solar-manilha",
  utm_source: "facebook",
  pagina: "/empreendimentos/solar-manilha",
};

beforeEach(() => {
  vi.clearAllMocks();
  pending.length = 0;
  syncLeadToCrm.mockResolvedValue({ status: "criado", leadId: "82" });
  sendEmail.mockResolvedValue({ delivered: true });
});

describe("handleInterestLead", () => {
  it("grava no Supabase e responde já; CRM e e-mail rodam depois da resposta", async () => {
    saveSiteLead.mockResolvedValue({ id: 12 });
    expect(await handleInterestLead(lead, dev)).toEqual({ ok: true });
    expect(saveSiteLead).toHaveBeenCalledWith({
      development_slug: "solar-manilha",
      crm_empreendimento_id: 7,
      nome: "Ana",
      email: "ana@example.com",
      telefone: "21977776666",
      utm: { utm_source: "facebook" },
      pagina: "/empreendimentos/solar-manilha",
    });

    await Promise.all(pending);
    expect(syncLeadToCrm).toHaveBeenCalledWith(
      { nome: "Ana", email: "ana@example.com", telefone: "21977776666" },
      7,
    );
    expect(updateSiteLeadCrm).toHaveBeenCalledWith(12, { status: "criado", leadId: "82" });
    expect(sendEmail).toHaveBeenCalledWith(
      expect.objectContaining({ subject: "[Site] Interesse — Solar Manilha" }),
    );
    expect(markEmailSent).toHaveBeenCalledWith("site_leads", 12);
  });

  it("e-mail que não sai (limite diário) não marca a linha nem muda a resposta", async () => {
    saveSiteLead.mockResolvedValue({ id: 12 });
    sendEmail.mockResolvedValue({ delivered: false });
    expect(await handleInterestLead(lead, dev)).toEqual({ ok: true });
    await Promise.all(pending);
    expect(markEmailSent).not.toHaveBeenCalled();
  });

  it("sem UTM, a coluna fica nula", async () => {
    saveSiteLead.mockResolvedValue({ id: 1 });
    await handleInterestLead({ ...lead, utm_source: undefined }, dev);
    expect(saveSiteLead).toHaveBeenCalledWith(expect.objectContaining({ utm: null }));
  });

  it("banco fora: e-mail e CRM saem antes da resposta, e basta um deles registrar o lead", async () => {
    saveSiteLead.mockResolvedValue(null);
    expect(await handleInterestLead(lead, dev)).toEqual({ ok: true });
    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(syncLeadToCrm).toHaveBeenCalledTimes(1);
    expect(pending).toHaveLength(0);
    expect(updateSiteLeadCrm).not.toHaveBeenCalled();

    // Sem e-mail, o lead no CRM ainda é registro: o visitante não vê erro.
    sendEmail.mockResolvedValue({ delivered: false });
    expect(await handleInterestLead(lead, dev)).toEqual({ ok: true });

    syncLeadToCrm.mockResolvedValue({ status: "erro", error: "HTTP 500" });
    expect(await handleInterestLead(lead, dev)).toEqual({ ok: false });
  });
});
