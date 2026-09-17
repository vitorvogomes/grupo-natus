import { afterEach, describe, expect, it, vi } from "vitest";
import { submitLead } from "./submitLead";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("submitLead", () => {
  it("retorna ok quando a resposta é 200", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) }),
    );
    await expect(submitLead({ type: "contato", nome: "X" })).resolves.toEqual({
      ok: true,
    });
  });

  it("retorna erro com mensagem quando a resposta falha", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: { message: "Rate limit" } }),
      }),
    );
    const r = await submitLead({ type: "contato" });
    expect(r.ok).toBe(false);
    expect(r.error).toBe("Rate limit");
  });

  it("trata erro de rede", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("net")));
    const r = await submitLead({ type: "contato" });
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/conex/i);
  });

  it("usa mensagem padrão quando a falha não traz erro estruturado", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => {
          throw new Error("no json");
        },
      }),
    );
    const r = await submitLead({ type: "contato" });
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/não foi possível/i);
  });
});
