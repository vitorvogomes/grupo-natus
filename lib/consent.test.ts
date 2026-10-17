import { afterEach, describe, expect, it } from "vitest";
import {
  CONSENT_COOKIE,
  CONSENT_MAX_AGE,
  parseConsent,
  readConsent,
  serializeConsent,
  writeConsent,
} from "./consent";

function clearCookie() {
  document.cookie = `${CONSENT_COOKIE}=; Max-Age=0; Path=/`;
}

describe("consentimento de cookies (LGPD)", () => {
  afterEach(clearCookie);

  it("sem cookie, ninguém decidiu ainda", () => {
    expect(parseConsent("")).toBeNull();
    expect(parseConsent("outro=1")).toBeNull();
  });

  it("lê a escolha gravada", () => {
    const value = encodeURIComponent(
      JSON.stringify({ v: 1, mapas: true, decididoEm: "2026-10-17T00:00:00.000Z" }),
    );
    expect(parseConsent(`a=1; ${CONSENT_COOKIE}=${value}`)).toEqual({
      v: 1,
      mapas: true,
      decididoEm: "2026-10-17T00:00:00.000Z",
    });
  });

  it("versão antiga, JSON quebrado ou forma inválida contam como não decidido", () => {
    const enc = (o: unknown) => `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(o))}`;
    expect(parseConsent(enc({ v: 0, mapas: true, decididoEm: "x" }))).toBeNull();
    expect(parseConsent(enc({ v: 1, mapas: "sim", decididoEm: "x" }))).toBeNull();
    expect(parseConsent(`${CONSENT_COOKIE}=%7Bquebrado`)).toBeNull();
  });

  it("serializa como cookie primário de ~6 meses, Lax, Secure só em https", () => {
    const c = { v: 1 as const, mapas: false, decididoEm: "2026-10-17T00:00:00.000Z" };
    const http = serializeConsent(c, false);
    expect(http).toContain(`${CONSENT_COOKIE}=`);
    expect(http).toContain(`Max-Age=${CONSENT_MAX_AGE}`);
    expect(http).toContain("Path=/");
    expect(http).toContain("SameSite=Lax");
    expect(http).not.toContain("Secure");
    expect(serializeConsent(c, true)).toContain("; Secure");
    expect(CONSENT_MAX_AGE).toBe(60 * 60 * 24 * 182);
  });

  it("grava e relê pelo document.cookie", () => {
    expect(readConsent()).toBeNull();
    const saved = writeConsent({ mapas: true }, new Date("2026-10-17T12:00:00Z"));
    expect(saved).toEqual({ v: 1, mapas: true, decididoEm: "2026-10-17T12:00:00.000Z" });
    expect(readConsent()).toEqual(saved);
  });
});
