type Entry = { count: number; resetAt: number };

// Store em memória (best-effort). TODO: mover para store compartilhado se
// houver múltiplas instâncias/serverless — ver Gate C.
const store = new Map<string, Entry>();

type RateLimitOptions = {
  limit?: number;
  windowMs?: number;
  now?: number;
};

export function checkRateLimit(
  key: string,
  options: RateLimitOptions = {},
): { allowed: boolean; remaining: number } {
  const { limit = 5, windowMs = 60_000, now = Date.now() } = options;
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }
  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }
  entry.count += 1;
  return { allowed: true, remaining: limit - entry.count };
}

/** Apenas para testes. */
export function _resetRateLimit(): void {
  store.clear();
}
