import { beforeEach, describe, expect, it } from "vitest";
import { checkRateLimit, _resetRateLimit } from "./rateLimit";

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
});
