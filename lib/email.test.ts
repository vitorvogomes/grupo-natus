import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendEmail } from "./email";

const message = { subject: "Assunto", text: "Corpo", replyTo: "lead@example.com" };

beforeEach(() => {
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function configure() {
  vi.stubEnv("RESEND_API_KEY", "re_test");
  vi.stubEnv("LEADS_EMAIL_TO", "dev@example.com");
  vi.stubEnv("LEADS_EMAIL_FROM", "");
}

describe("lib/email (Resend, segredo por nome)", () => {
  it("sem configuração não envia e avisa no log (sem dados do lead)", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(await sendEmail(message)).toEqual({ delivered: false });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith(expect.not.stringContaining("lead@example.com"));
  });

  it("envia ao destino do .env, com reply-to do lead", async () => {
    configure();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchMock);
    expect(await sendEmail(message)).toEqual({ delivered: true });

    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers.Authorization).toBe("Bearer re_test");
    expect(JSON.parse(init.body)).toEqual({
      from: "Grupo Natus <onboarding@resend.dev>",
      to: ["dev@example.com"],
      subject: "Assunto",
      text: "Corpo",
      reply_to: "lead@example.com",
    });
  });

  it("resposta de erro do provedor = não entregue (com o status no log)", async () => {
    configure();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 403 }));
    expect(await sendEmail(message)).toEqual({ delivered: false });
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining("403"));
  });

  it("falha de rede não derruba a rota", async () => {
    configure();
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    expect(await sendEmail(message)).toEqual({ delivered: false });
  });
});
