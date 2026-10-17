"use client";

import { cn } from "@/lib/utils";
import { useConsent } from "./ConsentProvider";

/** Reabre o painel de cookies (rodapé). A LGPD pede revogação tão fácil quanto o aceite. */
export function CookiePreferencesButton({ className }: { className?: string }) {
  const { openPreferences } = useConsent();
  return (
    <button type="button" onClick={openPreferences} className={cn(className)}>
      Preferências de cookies
    </button>
  );
}
