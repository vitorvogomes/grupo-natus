import { afterEach, describe, expect, it, vi } from "vitest";
import { isEmailConfigured, sendLeadEmail } from "./email";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("lib/email (AD-4, secret por nome)", () => {
  it("isEmailConfigured é false sem env", () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("LEADS_EMAIL_TO", "");
    expect(isEmailConfigured()).toBe(false);
  });

  it("isEmailConfigured é true quando key e destino existem", () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("LEADS_EMAIL_TO", "leads@natus");
    expect(isEmailConfigured()).toBe(true);
  });

  it("não entrega quando não configurado (não perde silenciosamente: retorna delivered=false)", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("LEADS_EMAIL_TO", "");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const r = await sendLeadEmail({ type: "contato", nome: "X" });
    expect(r.delivered).toBe(false);
    expect(warn).toHaveBeenCalled();
  });

  it("entrega via provedor quando configurado", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("LEADS_EMAIL_TO", "leads@natus");
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({}) });
    vi.stubGlobal("fetch", fetchMock);
    const r = await sendLeadEmail({ type: "contato", nome: "X" });
    expect(r.delivered).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({ method: "POST" }),
    );
  });
});
