import { beforeEach, describe, expect, it, vi } from "vitest";

const { pending, saveSiteContact, markEmailSent, sendEmail } = vi.hoisted(() => ({
  pending: [] as Promise<unknown>[],
  saveSiteContact: vi.fn(),
  markEmailSent: vi.fn(),
  sendEmail: vi.fn(),
}));
vi.mock("next/server", () => ({ after: (fn: () => Promise<unknown>) => pending.push(fn()) }));
vi.mock("./store", () => ({ saveSiteContact, markEmailSent }));
vi.mock("@/lib/email", () => ({ sendEmail }));

import { handleGeneralLead } from "./general";

const terreno = {
  type: "terreno" as const,
  nome: "João",
  telefone: "31988887777",
  localizacao: "Nova Lima",
  area: "1.200 m²",
};

beforeEach(() => {
  vi.clearAllMocks();
  pending.length = 0;
  sendEmail.mockResolvedValue({ delivered: true });
});

describe("handleGeneralLead (Contato e Terreno)", () => {
  it("grava a linha (campos do formulário em `dados`) e avisa por e-mail depois da resposta", async () => {
    saveSiteContact.mockResolvedValue({ id: 5 });
    expect(await handleGeneralLead(terreno)).toEqual({ ok: true });
    expect(saveSiteContact).toHaveBeenCalledWith({
      tipo: "terreno",
      nome: "João",
      email: null,
      telefone: "31988887777",
      dados: { localizacao: "Nova Lima", area: "1.200 m²" },
    });
    await Promise.all(pending);
    expect(sendEmail).toHaveBeenCalledWith(expect.objectContaining({ subject: "[Site] Terreno — Nova Lima" }));
    expect(markEmailSent).toHaveBeenCalledWith("site_contacts", 5);
  });

  it("limite do e-mail estourado: o lead já está salvo, a resposta segue ok", async () => {
    saveSiteContact.mockResolvedValue({ id: 5 });
    sendEmail.mockResolvedValue({ delivered: false });
    expect(await handleGeneralLead(terreno)).toEqual({ ok: true });
    await Promise.all(pending);
    expect(markEmailSent).not.toHaveBeenCalled();
  });

  it("sem banco, o e-mail é o registro e decide a resposta", async () => {
    saveSiteContact.mockResolvedValue(null);
    expect(await handleGeneralLead(terreno)).toEqual({ ok: true });
    sendEmail.mockResolvedValue({ delivered: false });
    expect(await handleGeneralLead(terreno)).toEqual({ ok: false });
  });
});
