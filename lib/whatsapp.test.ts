import { afterEach, describe, expect, it, vi } from "vitest";
import { buildWhatsAppUrl, whatsappNumber } from "./whatsapp";
import { CONTACT } from "./site";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("lib/whatsapp (abstração única — AD-3)", () => {
  it("usa o número do env quando definido", () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "5511999998888");
    expect(whatsappNumber()).toBe("5511999998888");
  });

  it("cai para o contato institucional quando o env está ausente", () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "");
    expect(whatsappNumber()).toBe(CONTACT.whatsapp);
  });

  it("monta uma URL wa.me sem mensagem", () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "5531984663280");
    expect(buildWhatsAppUrl()).toBe("https://wa.me/5531984663280");
  });

  it("inclui a mensagem contextual codificada", () => {
    const url = buildWhatsAppUrl({
      phone: "5531984663280",
      message: "Olá! Tenho interesse no Follow Savassi.",
    });
    expect(url).toBe(
      "https://wa.me/5531984663280?text=" +
        encodeURIComponent("Olá! Tenho interesse no Follow Savassi."),
    );
  });

  it("remove caracteres não numéricos do telefone", () => {
    expect(buildWhatsAppUrl({ phone: "+55 (31) 98466-3280" })).toBe(
      "https://wa.me/5531984663280",
    );
  });
});
