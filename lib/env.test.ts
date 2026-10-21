import { afterEach, describe, expect, it, vi } from "vitest";
import { crmEnv, emailEnv, supabaseEnv } from "./env";

afterEach(() => vi.unstubAllEnvs());

describe("lib/env (segredos lidos por nome, só no servidor)", () => {
  it("e-mail exige a chave e o destino; o remetente tem padrão", () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("LEADS_EMAIL_TO", "dev@example.com");
    expect(emailEnv()).toBeNull();

    vi.stubEnv("RESEND_API_KEY", "re_x");
    vi.stubEnv("LEADS_EMAIL_FROM", "");
    expect(emailEnv()).toEqual({
      apiKey: "re_x",
      to: ["dev@example.com"],
      // Sem domínio verificado, o Resend só aceita o remetente de teste dele.
      from: "Grupo Natus <onboarding@resend.dev>",
    });
  });

  it("aceita vários destinos separados por vírgula e um remetente próprio", () => {
    vi.stubEnv("RESEND_API_KEY", "re_x");
    vi.stubEnv("LEADS_EMAIL_TO", "a@example.com, b@example.com");
    vi.stubEnv("LEADS_EMAIL_FROM", "Site <onboarding@resend.dev>");
    expect(emailEnv()).toMatchObject({
      to: ["a@example.com", "b@example.com"],
      from: "Site <onboarding@resend.dev>",
    });
  });

  it("destino inválido conta como não configurado", () => {
    vi.stubEnv("RESEND_API_KEY", "re_x");
    vi.stubEnv("LEADS_EMAIL_TO", "não-é-email");
    expect(emailEnv()).toBeNull();
  });

  it("Supabase exige URL https e chave secreta", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://abc.supabase.co");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "");
    expect(supabaseEnv()).toBeNull();
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "sb_secret_x");
    expect(supabaseEnv()).toEqual({ url: "https://abc.supabase.co", secretKey: "sb_secret_x" });
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "nada");
    expect(supabaseEnv()).toBeNull();
  });

  it("CV CRM monta a base pelo subdomínio e exige e-mail e token", () => {
    vi.stubEnv("CVCRM_SUBDOMAIN", "natus");
    vi.stubEnv("CVCRM_EMAIL", "api@example.com");
    vi.stubEnv("CVCRM_TOKEN", "");
    expect(crmEnv()).toBeNull();
    vi.stubEnv("CVCRM_TOKEN", "tok");
    expect(crmEnv()).toEqual({
      baseUrl: "https://natus.cvcrm.com.br/api",
      email: "api@example.com",
      token: "tok",
    });
  });

  it("subdomínio com caracteres estranhos é recusado (não vira outra URL)", () => {
    vi.stubEnv("CVCRM_SUBDOMAIN", "evil.com/x");
    vi.stubEnv("CVCRM_EMAIL", "api@example.com");
    vi.stubEnv("CVCRM_TOKEN", "tok");
    expect(crmEnv()).toBeNull();
  });
});
