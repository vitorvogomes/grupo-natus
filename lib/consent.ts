/**
 * Consentimento de cookies (LGPD). A escolha vive num cookie primário — e não
 * no localStorage — para que o servidor possa lê-la quando houver motivo.
 *
 * Categorias: só as que o site usa de fato. Hoje, além dos necessários (o
 * próprio cookie de consentimento), só "mapas": o Google Maps grava cookies
 * do Google. Análise e marketing entram junto com as ferramentas (GA4,
 * Pixel), nunca como um interruptor de algo que não existe.
 */
export const CONSENT_COOKIE = "natus_consent";
export const CONSENT_VERSION = 1;
/** ~6 meses: a escolha é pedida de novo depois disso. */
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 182;

export type Consent = {
  v: typeof CONSENT_VERSION;
  mapas: boolean;
  decididoEm: string;
};

export type ConsentChoice = Pick<Consent, "mapas">;

/** Lê a escolha de um header/`document.cookie`. Inválida = não decidido. */
export function parseConsent(cookies: string): Consent | null {
  const entry = cookies
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`));
  if (!entry) return null;
  try {
    const data: unknown = JSON.parse(
      decodeURIComponent(entry.slice(CONSENT_COOKIE.length + 1)),
    );
    if (
      typeof data === "object" &&
      data !== null &&
      "v" in data &&
      data.v === CONSENT_VERSION &&
      "mapas" in data &&
      typeof data.mapas === "boolean" &&
      "decididoEm" in data &&
      typeof data.decididoEm === "string"
    ) {
      return { v: CONSENT_VERSION, mapas: data.mapas, decididoEm: data.decididoEm };
    }
  } catch {
    // Cookie corrompido: pede a escolha de novo.
  }
  return null;
}

export function serializeConsent(consent: Consent, secure: boolean): string {
  const value = encodeURIComponent(JSON.stringify(consent));
  return [
    `${CONSENT_COOKIE}=${value}`,
    `Max-Age=${CONSENT_MAX_AGE}`,
    "Path=/",
    "SameSite=Lax",
    ...(secure ? ["Secure"] : []),
  ].join("; ");
}

export function readConsent(): Consent | null {
  return parseConsent(document.cookie);
}

export function writeConsent(choice: ConsentChoice, now: Date = new Date()): Consent {
  const consent: Consent = {
    v: CONSENT_VERSION,
    mapas: choice.mapas,
    decididoEm: now.toISOString(),
  };
  document.cookie = serializeConsent(consent, window.location.protocol === "https:");
  return consent;
}

/**
 * A JS API do Google Maps já está na página? Desmontar o mapa não descarrega
 * o script: ao revogar, só recarregar a página tira o código do Google.
 */
export function googleMapsLoaded(doc: Document = document): boolean {
  return doc.querySelector("script[data-google-maps]") !== null;
}

/** Recarrega a página (isolado para os testes, que não navegam). */
export function reloadPage(): void {
  window.location.reload();
}
