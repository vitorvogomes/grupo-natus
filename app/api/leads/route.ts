import { checkRateLimit } from "@/lib/rateLimit";
import { SITE_URL } from "@/lib/site";
import { handleGeneralLead } from "@/lib/leads/general";
import { handleInterestLead } from "@/lib/leads/interest";
import { parseLead } from "@/lib/leads/schema";
import { getDevelopmentBySlug } from "@/content/developments";

/** Maior formulário (mensagem de 5.000 caracteres) cabe com folga. */
const MAX_BODY_BYTES = 16 * 1024;

/**
 * Falha sem motivo no corpo: o status basta para o navegador, e o visitante vê
 * uma mensagem genérica (features/contact/submitLead.ts). Nada sobre limite,
 * validação ou provedores sai daqui.
 */
const fail = (status: number) => Response.json({ ok: false }, { status });

/**
 * Só aceita POST do próprio site. Navegadores sempre mandam `Origin` em POST
 * cross-site; sem ele (curl, servidor) passa e cai nas demais barreiras.
 * Atrás de proxy o `Host` pode ser interno: valem o domínio do site, o 1º
 * `x-forwarded-host` e o `Host`.
 */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const allowed = [
    new URL(SITE_URL).host,
    request.headers.get("x-forwarded-host")?.split(",")[0]?.trim(),
    request.headers.get("host"),
  ];
  try {
    return allowed.includes(new URL(origin).host);
  } catch {
    return false;
  }
}

/**
 * IP do visitante como o host o informa. `x-real-ip` primeiro (a hospedagem
 * o sobrescreve); senão o ÚLTIMO do `x-forwarded-for`, que é o que o proxy
 * acrescentou — os anteriores vêm do cliente e podem ser forjados.
 * Requisito de hospedagem: o proxy sobrescreve `x-real-ip` (docs/CONTENT-GAPS.md).
 */
function clientIp(request: Request): string {
  return (
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim() ||
    "unknown"
  );
}

/**
 * Entrada única dos formulários (AD-4: escrita só no servidor). Todo lead é
 * gravado no Supabase; o e-mail para o marketing é aviso.
 * Contato e Terreno → `site_contacts` (lib/leads/general). Interesse (página
 * do empreendimento) → `site_leads` + CV CRM (lib/leads/interest).
 */
export async function POST(request: Request) {
  if (!isSameOrigin(request)) return fail(403);
  if (!request.headers.get("content-type")?.includes("application/json")) return fail(415);
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) return fail(413);

  const raw = await request.text().catch(() => "");
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) return fail(413);
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail(400);
  }
  if (!body || typeof body !== "object") return fail(400);

  // Anti-spam 1: honeypot. Bot preencheu campo oculto → finge sucesso.
  if ((body as Record<string, unknown>).website) return Response.json({ ok: true });

  // Anti-spam 2: rate-limit por IP.
  if (!checkRateLimit(`leads:${clientIp(request)}`).allowed) return fail(429);

  // Validação server-side: só passa o que o formulário tem.
  const parsed = parseLead(body);
  if (!parsed.ok) return fail(400);
  const { lead } = parsed;

  if (lead.type === "interesse") {
    // Nome e ID no CRM vêm do dado, nunca do navegador.
    const development = getDevelopmentBySlug(lead.slug);
    if (!development || development.status === "breve_lancamento") return fail(400);
    const { ok } = await handleInterestLead(lead, development);
    return ok ? Response.json({ ok: true }) : fail(502);
  }

  const { ok } = await handleGeneralLead(lead);
  return ok ? Response.json({ ok: true }) : fail(502);
}
