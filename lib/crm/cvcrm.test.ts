import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { syncLeadToCrm, toCrmPhone } from "./cvcrm";

const contact = { nome: "Ana", email: "ana@example.com", telefone: "(21) 97777-6666" };

function json(status: number, body: unknown) {
  return { ok: status >= 200 && status < 300, status, json: async () => body };
}

/** Resposta real do CV CRM quando a busca não acha ninguém. */
const notFound = () => json(400, { error: "Lead não encontrado", code: 400 });
/** Lead como a API devolve (telefone em E.164 sem símbolos). */
const crmLead = (idlead: number, fields: { email?: string; telefone?: string }) => ({ idlead, ...fields });

beforeEach(() => {
  vi.stubEnv("CVCRM_SUBDOMAIN", "natus");
  vi.stubEnv("CVCRM_EMAIL", "api@example.com");
  vi.stubEnv("CVCRM_TOKEN", "tok");
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("toCrmPhone", () => {
  it("formata no padrão da busca do CV CRM, com ou sem o 55", () => {
    expect(toCrmPhone("(21) 97777-6666")).toBe("+55(21) 97777-6666");
    expect(toCrmPhone("5531988887777")).toBe("+55(31) 98888-7777");
    expect(toCrmPhone("3133334444")).toBe("+55(31) 3333-4444");
    expect(toCrmPhone("123")).toBeNull();
  });
});

describe("syncLeadToCrm (só cria quando não existe)", () => {
  it("lead já existe pelo e-mail: não cria nada", async () => {
    const fetchMock = vi.fn().mockResolvedValue(json(200, { total: 1, leads: [crmLead(42, { email: "ANA@example.com" })] }));
    vi.stubGlobal("fetch", fetchMock);
    expect(await syncLeadToCrm(contact, 7)).toEqual({ status: "existente", leadId: "42" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe("https://natus.cvcrm.com.br/api/v1/comercial/leads?email=ana%40example.com");
    expect(init.headers).toMatchObject({ email: "api@example.com", token: "tok" });
  });

  it("não acha por e-mail (o CV CRM responde 400) e acha pelo telefone", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(notFound())
      .mockResolvedValueOnce(json(200, { total: 1, leads: [crmLead(9, { telefone: "+5521977776666" })] }));
    vi.stubGlobal("fetch", fetchMock);
    expect(await syncLeadToCrm(contact, 7)).toEqual({ status: "existente", leadId: "9" });
    expect(fetchMock.mock.calls[1]![0]).toContain("telefone=%2B55(21)%2097777-6666");
  });

  it("não existe: cria com o empreendimento e origem WebSite, sem permitir alteração", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(notFound())
      .mockResolvedValueOnce(json(200, { total: 0, leads: [] }))
      .mockResolvedValueOnce(json(200, { sucesso: true, id: "82" }));
    vi.stubGlobal("fetch", fetchMock);
    expect(await syncLeadToCrm(contact, 7)).toEqual({ status: "criado", leadId: "82" });

    const [url, init] = fetchMock.mock.calls[2]!;
    expect(url).toBe("https://natus.cvcrm.com.br/api/v1/comercial/leads");
    expect(init.method).toBe("POST");
    const body = JSON.parse(init.body);
    expect(body).toEqual({
      nome: "Ana",
      email: "ana@example.com",
      telefone: "21977776666",
      origem: "SI",
      idempreendimento: 7,
    });
    expect(body).not.toHaveProperty("permitir_alteracao");
  });

  it("sem ID do empreendimento, cria o lead assim mesmo", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(notFound())
      .mockResolvedValueOnce(notFound())
      .mockResolvedValueOnce(json(200, { sucesso: true, id: 5 }));
    vi.stubGlobal("fetch", fetchMock);
    expect(await syncLeadToCrm(contact)).toEqual({ status: "criado", leadId: "5" });
    expect(JSON.parse(fetchMock.mock.calls[2]![1].body)).not.toHaveProperty("idempreendimento");
  });

  it("filtro ignorado pela API (devolve a lista geral): lead de outra pessoa não conta como existente", async () => {
    // Medido em 2026-10-20: `telefone=lixo` responde 200 com os 6.212 leads.
    const unrelated = json(200, { total: 6212, leads: [crmLead(1, { email: "outra@example.com", telefone: "+5531911112222" })] });
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(unrelated)
      .mockResolvedValueOnce(unrelated)
      .mockResolvedValueOnce(json(200, { sucesso: true, id: 10 }));
    vi.stubGlobal("fetch", fetchMock);
    expect(await syncLeadToCrm(contact, 7)).toEqual({ status: "criado", leadId: "10" });
  });

  it("400 que não é 'não encontrado' é erro: não cria às cegas", async () => {
    const fetchMock = vi.fn().mockResolvedValue(json(400, { error: "Parâmetro inválido", code: 400 }));
    vi.stubGlobal("fetch", fetchMock);
    expect(await syncLeadToCrm(contact, 7)).toEqual({ status: "erro", error: "busca por e-mail: HTTP 400" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("cadastro recusado por duplicidade (corrida) conta como existente", async () => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValueOnce(notFound())
        .mockResolvedValueOnce(notFound())
        .mockResolvedValueOnce(json(400, { error: "Já existe um lead com este e-mail", code: 400 })),
    );
    expect(await syncLeadToCrm(contact, 7)).toEqual({ status: "existente", leadId: null });
  });

  it("erro de autenticação, limite ou rede vira 'erro' com motivo curto", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(json(401, {})));
    expect(await syncLeadToCrm(contact, 7)).toEqual({ status: "erro", error: "busca por e-mail: HTTP 401" });

    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    expect(await syncLeadToCrm(contact, 7)).toEqual({ status: "erro", error: "offline" });

    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValueOnce(notFound())
        .mockResolvedValueOnce(notFound())
        .mockResolvedValueOnce(json(400, { error: "idempreendimento inválido" })),
    );
    expect(await syncLeadToCrm(contact, 7)).toEqual({ status: "erro", error: "cadastro: HTTP 400" });
  });

  it("sem credenciais não chama a API", async () => {
    vi.stubEnv("CVCRM_TOKEN", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(await syncLeadToCrm(contact, 7)).toEqual({ status: "erro", error: "CV CRM não configurado" });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
