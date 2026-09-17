import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";
import { _resetRateLimit } from "@/lib/rateLimit";

function post(body: unknown, ip = "1.1.1.1") {
  return POST(
    new Request("http://localhost/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": ip },
      body: JSON.stringify(body),
    }),
  );
}

beforeEach(() => {
  _resetRateLimit();
  vi.stubEnv("RESEND_API_KEY", "");
  vi.stubEnv("LEADS_EMAIL_TO", "");
  vi.spyOn(console, "warn").mockImplementation(() => {});
});
afterEach(() => vi.restoreAllMocks());

describe("POST /api/leads (FR11)", () => {
  it("rejeita corpo inválido", async () => {
    const res = await POST(
      new Request("http://localhost/api/leads", {
        method: "POST",
        body: "not-json",
        headers: { "x-forwarded-for": "9.9.9.9" },
      }),
    );
    expect(res.status).toBe(400);
  });

  it("honeypot preenchido finge sucesso sem validar", async () => {
    const res = await post({ type: "contato", website: "bot" });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  it("rejeita sem tipo de lead", async () => {
    const res = await post({ nome: "Maria", email: "m@ex.com" });
    expect(res.status).toBe(400);
  });

  it("valida nome obrigatório", async () => {
    const res = await post({ type: "contato", nome: "" });
    expect(res.status).toBe(400);
  });

  it("rejeita sem contato válido (email/telefone)", async () => {
    const res = await post({ type: "contato", nome: "Maria", telefone: "123" });
    expect(res.status).toBe(400);
  });

  it("aceita um lead válido", async () => {
    const res = await post({
      type: "contato",
      nome: "Maria",
      email: "maria@ex.com",
      mensagem: "Olá",
    });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.ok).toBe(true);
    expect(data.delivered).toBe(false); // e-mail não configurado neste ambiente
  });

  it("aplica rate-limit após várias tentativas", async () => {
    const payload = { type: "contato", nome: "M", telefone: "31984663280" };
    let last: Response | undefined;
    for (let i = 0; i < 6; i++) last = await post(payload, "2.2.2.2");
    expect(last?.status).toBe(429);
  });
});
