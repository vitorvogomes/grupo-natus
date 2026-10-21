import { afterEach, describe, expect, it, vi } from "vitest";
import { getSupabaseAdmin } from "./server";

afterEach(() => vi.unstubAllEnvs());

describe("getSupabaseAdmin", () => {
  it("sem URL ou chave secreta, não há cliente", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "");
    expect(getSupabaseAdmin()).toBeNull();
  });

  it("com as duas, cria um cliente de servidor (sem sessão persistida)", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://abc.supabase.co");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "sb_secret_test");
    const client = getSupabaseAdmin();
    expect(client).not.toBeNull();
    expect(typeof client?.from).toBe("function");
  });

  it("reaproveita o cliente enquanto as variáveis não mudam", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://abc.supabase.co");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "sb_secret_test");
    const first = getSupabaseAdmin();
    expect(getSupabaseAdmin()).toBe(first);
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "sb_secret_outra");
    expect(getSupabaseAdmin()).not.toBe(first);
  });
});
