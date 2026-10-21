import { describe, expect, it } from "vitest";
import nextConfig, { SECURITY_HEADERS } from "./next.config";
import { LEGACY_REDIRECTS } from "./content/redirects";

describe("next.config", () => {
  it("aplica os cabeçalhos de segurança em todas as rotas e esconde o X-Powered-By", async () => {
    const rules = await nextConfig.headers!();
    expect(rules).toEqual([{ source: "/:path*", headers: SECURITY_HEADERS }]);
    const keys = SECURITY_HEADERS.map((h) => h.key);
    expect(keys).toEqual(
      expect.arrayContaining(["X-Content-Type-Options", "Referrer-Policy", "X-Frame-Options", "Strict-Transport-Security"]),
    );
    expect(nextConfig.poweredByHeader).toBe(false);
  });

  it("entrega AVIF com WEBP de reserva", () => {
    expect(nextConfig.images?.formats).toEqual(["image/avif", "image/webp"]);
    expect(nextConfig.images?.deviceSizes).toContain(2560);
  });

  it("os redirects vêm só da tabela do site antigo, com destino interno (sem open redirect)", async () => {
    const redirects = await nextConfig.redirects!();
    expect(redirects).toHaveLength(LEGACY_REDIRECTS.length);
    for (const r of redirects) {
      expect(r.destination).toMatch(/^\/(?!\/)/);
      expect(r.source).not.toMatch(/[:*(]/); // sem parâmetro: nada da URL vira destino
    }
  });
});
