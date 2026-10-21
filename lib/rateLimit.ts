type Entry = { count: number; resetAt: number; limit: number };

// Store em memória (best-effort, por instância). Para o volume esperado
// (~100 visitas/dia de anúncio) basta; se o host rodar várias instâncias e o
// spam aparecer, trocar por store compartilhado ou por um desafio (Turnstile).
const store = new Map<string, Entry>();

/** Acima disso, descarta as janelas vencidas — o mapa não cresce sem fim. */
const MAX_KEYS = 1_000;

function prune(now: number) {
  for (const [key, entry] of store) if (now > entry.resetAt) store.delete(key);
  // Inundação de chaves novas: sai primeiro o mais antigo que não está
  // bloqueado — senão a inundação zeraria o contador de quem estourou o limite.
  for (const [key, entry] of store) {
    if (store.size < MAX_KEYS) break;
    if (entry.count < entry.limit) store.delete(key);
  }
  for (const key of store.keys()) {
    if (store.size < MAX_KEYS) break;
    store.delete(key);
  }
}

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
    if (store.size >= MAX_KEYS) prune(now);
    store.set(key, { count: 1, resetAt: now + windowMs, limit });
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

/** Apenas para testes. */
export function _rateLimitSize(): number {
  return store.size;
}
