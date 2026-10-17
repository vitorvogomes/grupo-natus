"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { MapPinned } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useConsent } from "./ConsentProvider";

type MapConsentGateProps = {
  children: ReactNode;
  /** Mesmo tamanho do mapa, para a página não pular ao liberar. */
  className?: string;
  /** Fundo do painel: navy (faixa da Localização) ou claro (Contato). */
  tone?: "dark" | "light";
};

/**
 * Todo mapa do Google passa por aqui (LGPD): embed e JS API gravam cookies do
 * Google, então sem consentimento nem o iframe nem o script são criados. No
 * lugar, um painel do mesmo tamanho libera a categoria num clique.
 */
export function MapConsentGate({ children, className, tone = "dark" }: MapConsentGateProps) {
  const { ready, mapas, save } = useConsent();
  if (mapas) return <>{children}</>;

  const dark = tone === "dark";
  return (
    <div
      // A classe do mapa vem antes: o `block` dela não pode vencer o `flex`.
      className={cn(
        className,
        "flex flex-col items-center justify-center gap-4 px-6 text-center",
        dark ? "bg-navy-700 text-navy-100" : "bg-surface-muted text-ink-soft",
      )}
    >
      {/* Até o cookie ser lido, o painel fica vazio: quem já aceitou não vê o
          convite piscar antes do mapa. */}
      {ready ? (
        <>
          <MapPinned
            aria-hidden="true"
            className={cn("size-8", dark ? "text-brand" : "text-brand-strong")}
            strokeWidth={1.75}
          />
          <p className="max-w-sm text-sm">
            O mapa é carregado do Google, que pode gravar cookies.{" "}
            <Link
              href="/politica-de-privacidade"
              className={cn(
                "font-medium underline underline-offset-2",
                dark ? "text-white" : "text-brand-strong",
              )}
            >
              Política de Privacidade
            </Link>
          </p>
          <Button size="sm" onClick={() => save({ mapas: true })}>
            Carregar mapa
          </Button>
        </>
      ) : null}
    </div>
  );
}
