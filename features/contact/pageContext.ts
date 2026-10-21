import { UTM_KEYS } from "@/lib/leads/schema";

/**
 * Página e UTM do anúncio, lidas da URL no momento do envio. Nada é guardado
 * no navegador (sem cookie, sem storage), então não depende de consentimento.
 */
export function readPageContext(location: Pick<Location, "pathname" | "search">): Record<string, string> {
  const params = new URLSearchParams(location.search);
  const context: Record<string, string> = { pagina: location.pathname.slice(0, 300) };
  for (const key of UTM_KEYS) {
    const value = params.get(key)?.trim();
    if (value) context[key] = value.slice(0, 200);
  }
  return context;
}
