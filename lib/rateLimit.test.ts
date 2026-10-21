import { beforeEach, describe, expect, it } from "vitest";
import { checkRateLimit, _rateLimitSize, _resetRateLimit } from "./rateLimit";

beforeEach(() => _resetRateLimit());

describe("checkRateLimit", () => {
  it("permite até o limite e bloqueia depois", () => {
    const opts = { limit: 3, windowMs: 1000, now: 1000 };
    expect(checkRateLimit("ip", opts).allowed).toBe(true);
    expect(checkRateLimit("ip", opts).allowed).toBe(true);
    expect(checkRateLimit("ip", opts).allowed).toBe(true);
    expect(checkRateLimit("ip", opts).allowed).toBe(false);
  });

  it("reseta após a janela", () => {
    expect(checkRateLimit("ip", { limit: 1, windowMs: 1000, now: 1000 }).allowed).toBe(
      true,
    );
    expect(checkRateLimit("ip", { limit: 1, windowMs: 1000, now: 1500 }).allowed).toBe(
      false,
    );
    expect(checkRateLimit("ip", { limit: 1, windowMs: 1000, now: 2100 }).allowed).toBe(
      true,
    );
  });

  it("chaves diferentes são independentes", () => {
    const opts = { limit: 1, windowMs: 1000, now: 1000 };
    expect(checkRateLimit("a", opts).allowed).toBe(true);
    expect(checkRateLimit("b", opts).allowed).toBe(true);
  });

  it("não cresce sem fim: descarta janelas vencidas e, numa inundação, as mais antigas", () => {
    _resetRateLimit();
    for (let i = 0; i < 1_000; i++) checkRateLimit(`ip-${i}`, { now: 0, windowMs: 10 });
    expect(_rateLimitSize()).toBe(1_000);
    checkRateLimit("novo", { now: 100, windowMs: 10 });
    expect(_rateLimitSize()).toBe(1);

    for (let i = 0; i < 1_500; i++) checkRateLimit(`flood-${i}`, { now: 200, windowMs: 1_000 });
    expect(_rateLimitSize()).toBeLessThanOrEqual(1_000);
  });

  it("numa inundação de chaves novas, quem está bloqueado continua bloqueado", () => {
    const opts = { limit: 2, windowMs: 60_000, now: 0 };
    checkRateLimit("abusivo", opts);
    checkRateLimit("abusivo", opts);
    expect(checkRateLimit("abusivo", opts).allowed).toBe(false);
    for (let i = 0; i < 1_500; i++) checkRateLimit(`flood-${i}`, opts);
    expect(checkRateLimit("abusivo", opts).allowed).toBe(false);
    expect(_rateLimitSize()).toBeLessThanOrEqual(1_000);
  });
});
