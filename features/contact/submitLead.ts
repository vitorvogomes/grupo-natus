export type LeadPayload = Record<string, string> & { type: string };

export type SubmitResult = { ok: boolean; error?: string };

/** Envia um lead ao Route Handler (AD-4: escrita server-side). */
export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return {
        ok: false,
        error: data?.error?.message ?? "Não foi possível enviar. Tente novamente.",
      };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Erro de conexão. Verifique sua internet." };
  }
}
