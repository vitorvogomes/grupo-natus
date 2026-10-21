import { afterEach, describe, expect, it, vi } from "vitest";
import { submitLead } from "./submitLead";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("submitLead", () => {
  it("envia JSON para /api/leads e retorna ok quando a resposta é 2xx", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    await expect(submitLead({ type: "contato", nome: "X" })).resolves.toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/leads",
      expect.objectContaining({ method: "POST", headers: { "content-type": "application/json" } }),
    );
  });

  it("qualquer resposta de erro vira só ok=false (sem detalhe do servidor)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    await expect(submitLead({ type: "contato" })).resolves.toEqual({ ok: false });
  });

  it("falha de rede também", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("net")));
    await expect(submitLead({ type: "contato" })).resolves.toEqual({ ok: false });
  });
});
