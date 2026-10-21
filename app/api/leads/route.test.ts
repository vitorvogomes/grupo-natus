import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { _resetRateLimit } from "@/lib/rateLimit";

const { handleGeneralLead, handleInterestLead } = vi.hoisted(() => ({
  handleGeneralLead: vi.fn(),
  handleInterestLead: vi.fn(),
}));
vi.mock("@/lib/leads/general", () => ({ handleGeneralLead }));
vi.mock("@/lib/leads/interest", () => ({ handleInterestLead }));

import { POST } from "./route";

function post(body: unknown, { ip = "1.1.1.1", headers = {} as Record<string, string> } = {}) {
  return POST(
    new Request("http://localhost/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": ip, host: "localhost", ...headers },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}

const contato = {
  type: "contato",
  nome: "Maria",
  email: "maria@example.com",
  telefone: "31988887777",
  mensagem: "Olá",
};
const interesse = {
  type: "interesse",
  nome: "Ana",
  email: "ana@example.com",
  telefone: "21977776666",
  slug: "solar-manilha",
};

beforeEach(() => {
  _resetRateLimit();
  handleGeneralLead.mockResolvedValue({ ok: true });
  handleInterestLead.mockResolvedValue({ ok: true });
});
afterEach(() => vi.clearAllMocks());

describe("POST /api/leads (FR11)", () => {
  it("contato válido segue para o registro, só com os campos do formulário", async () => {
    const res = await post({ ...contato, extra: "<script>" });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(handleGeneralLead.mock.calls[0]![0]).not.toHaveProperty("extra");
  });

  it("falhas respondem só o status, sem motivo no corpo", async () => {
    const res = await post({ ...contato, nome: "" });
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false });
  });

  it("recusa JSON inválido, outro content-type e corpo grande demais", async () => {
    expect((await post("not-json")).status).toBe(400);
    expect((await post(contato, { headers: { "content-type": "text/plain" } })).status).toBe(415);
    expect((await post({ ...contato, mensagem: "x".repeat(20_000) })).status).toBe(413);
    expect((await post(contato, { headers: { "content-length": "999999" } })).status).toBe(413);
    // O limite é em bytes: 9 mil "ç" são 18 KB, embora sejam menos de 16 mil caracteres.
    expect((await post({ ...contato, mensagem: "ç".repeat(9_000) })).status).toBe(413);
    expect(handleGeneralLead).not.toHaveBeenCalled();
  });

  it("recusa POST vindo de outro site; aceita a própria origem e chamadas sem Origin", async () => {
    expect((await post(contato, { headers: { origin: "https://golpe.example" } })).status).toBe(403);
    expect((await post(contato, { headers: { origin: "http://localhost" } })).status).toBe(200);
    expect((await post(contato, { headers: { origin: "lixo" } })).status).toBe(403);
  });

  it("atrás de proxy: aceita o domínio do site e o 1º x-forwarded-host, mesmo com Host interno", async () => {
    const internal = { host: "127.0.0.1:3000" };
    expect((await post(contato, { headers: { ...internal, origin: "https://www.natusgrupo.com.br" } })).status).toBe(200);
    expect(
      (await post(contato, { headers: { ...internal, origin: "https://preview.example", "x-forwarded-host": "preview.example, interno" } }))
        .status,
    ).toBe(200);
    expect((await post(contato, { headers: { ...internal, origin: "https://golpe.example" } })).status).toBe(403);
  });

  it("honeypot preenchido finge sucesso sem registrar nada", async () => {
    const res = await post({ ...contato, website: "bot" });
    expect(await res.json()).toEqual({ ok: true });
    expect(handleGeneralLead).not.toHaveBeenCalled();
  });

  it("recusa o que foge do contrato (tipo, contato)", async () => {
    expect((await post({ nome: "Maria", email: "m@ex.com" })).status).toBe(400);
    expect((await post({ ...contato, telefone: "123" })).status).toBe(400);
  });

  it("lead que não ficou registrado em lugar nenhum = 502", async () => {
    handleGeneralLead.mockResolvedValue({ ok: false });
    expect((await post(contato)).status).toBe(502);
    handleInterestLead.mockResolvedValue({ ok: false });
    expect((await post(interesse)).status).toBe(502);
  });

  it("interesse resolve o empreendimento no servidor", async () => {
    const res = await post({ ...interesse, empreendimento: "Outro nome" });
    expect(res.status).toBe(200);
    const [lead, dev] = handleInterestLead.mock.calls[0]!;
    expect(lead).not.toHaveProperty("empreendimento");
    expect(dev).toMatchObject({ slug: "solar-manilha", name: "Solar Manilha" });
    expect(handleGeneralLead).not.toHaveBeenCalled();
  });

  it("interesse com slug inexistente é recusado", async () => {
    expect((await post({ ...interesse, slug: "nao-existe" })).status).toBe(400);
    expect(handleInterestLead).not.toHaveBeenCalled();
  });

  it("breve lançamento também recebe interesse (mesmo fluxo: banco, CRM e e-mail)", async () => {
    expect((await post({ ...interesse, slug: "gutierrez" })).status).toBe(200);
    expect(handleInterestLead.mock.calls[0]![1]).toMatchObject({ slug: "gutierrez", status: "breve_lancamento" });
  });

  it("rate-limit por IP, preferindo o x-real-ip do host", async () => {
    let last: Response | undefined;
    for (let i = 0; i < 6; i++) last = await post(contato, { ip: "2.2.2.2" });
    expect(last?.status).toBe(429);
    // Trocar o x-forwarded-for não fura o limite quando o host informa o IP real.
    for (let i = 0; i < 5; i++) await post(contato, { ip: `9.9.9.${i}`, headers: { "x-real-ip": "3.3.3.3" } });
    expect((await post(contato, { ip: "8.8.8.8", headers: { "x-real-ip": "3.3.3.3" } })).status).toBe(429);
  });

  it("sem x-real-ip, usa o último x-forwarded-for (o que o proxy acrescentou), não o que o cliente forjou", async () => {
    for (let i = 0; i < 5; i++) await post(contato, { ip: `6.6.6.${i}, 4.4.4.4` });
    expect((await post(contato, { ip: "6.6.6.99, 4.4.4.4" })).status).toBe(429);
  });
});
