import { isEmail, isPhone, isRequired } from "@/lib/validators";
import { checkRateLimit } from "@/lib/rateLimit";
import { sendLeadEmail, type Lead } from "@/lib/email";

function errorResponse(code: string, message: string, status: number) {
  return Response.json({ error: { code, message } }, { status });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<
    string,
    string
  > | null;

  if (!body || typeof body !== "object") {
    return errorResponse("invalid_body", "Requisição inválida.", 400);
  }

  // Anti-spam 1: honeypot. Bot preencheu campo oculto → finge sucesso.
  if (body.website) {
    return Response.json({ ok: true });
  }

  // Anti-spam 2: rate-limit por IP.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(`leads:${ip}`).allowed) {
    return errorResponse(
      "rate_limited",
      "Muitas tentativas. Tente novamente em instantes.",
      429,
    );
  }

  // Validação server-side (não confiar só no client).
  if (!isRequired(body.type ?? "")) {
    return errorResponse("invalid", "Tipo de lead ausente.", 400);
  }
  if (!isRequired(body.nome ?? "")) {
    return errorResponse("invalid", "Informe seu nome.", 400);
  }
  const hasContact = isEmail(body.email ?? "") || isPhone(body.telefone ?? "");
  if (!hasContact) {
    return errorResponse(
      "invalid",
      "Informe um e-mail ou telefone válido.",
      400,
    );
  }

  const { delivered } = await sendLeadEmail(body as Lead);
  return Response.json({ ok: true, delivered });
}
