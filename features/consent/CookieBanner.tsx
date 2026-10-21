"use client";

import { useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";
import { useConsent } from "./ConsentProvider";

const POLICY_HREF = "/politica-de-privacidade";

function Preferences() {
  const { consent, save, closePreferences, preferencesOpen } = useConsent();
  // O rascunho nasce da escolha atual a cada abertura (o Modal desmonta o
  // conteúdo fechado, então o estado não sobrevive entre aberturas).
  const [mapas, setMapas] = useState(consent?.mapas ?? false);

  return (
    <Modal open={preferencesOpen} onClose={closePreferences} title="Preferências de cookies">
      <div className="flex flex-col gap-4 text-sm text-ink-soft">
        <p>
          Escolha o que o site pode carregar. Você pode mudar isso a qualquer
          momento pelo link no rodapé.{" "}
          <Link href={POLICY_HREF} className="font-medium text-brand-strong underline underline-offset-2">
            Política de Privacidade
          </Link>
        </p>
        <ul className="divide-y divide-border rounded-lg border border-border">
          <li className="flex items-start gap-3 p-4">
            <input
              id="cookies-necessarios"
              type="checkbox"
              checked
              disabled
              className="mt-0.5 size-4 accent-brand-strong"
            />
            <label htmlFor="cookies-necessarios">
              <span className="block font-medium text-ink">Necessários</span>
              Guardam esta escolha. Sempre ativos.
            </label>
          </li>
          <li className="flex items-start gap-3 p-4">
            <input
              id="cookies-mapas"
              type="checkbox"
              checked={mapas}
              onChange={(event) => setMapas(event.target.checked)}
              className="mt-0.5 size-4 accent-brand-strong"
            />
            <label htmlFor="cookies-mapas">
              <span className="block font-medium text-ink">Mapas (Google Maps)</span>
              Mostra a localização dos empreendimentos. O Google pode gravar
              cookies próprios.
            </label>
          </li>
        </ul>
        <div className="flex flex-wrap justify-end gap-3">
          <Button variant="secondary" size="sm" onClick={() => save({ mapas: true })}>
            Aceitar todos
          </Button>
          <Button size="sm" onClick={() => save({ mapas })}>
            Salvar preferências
          </Button>
        </div>
      </div>
    </Modal>
  );
}

/**
 * Aviso de cookies: aparece até a pessoa escolher. Não é modal — o site
 * continua navegável; só o que depende de terceiros fica bloqueado.
 */
export function CookieBanner() {
  const { ready, consent, save, preferencesOpen, openPreferences } = useConsent();
  // O aviso fica montado com as preferências abertas: é o botão dele que as
  // abriu, e o Radix devolve o foco a ele ao fechar (WCAG 2.4.3).
  const visible = ready && !consent;

  return (
    <>
      {visible ? (
        <section
          aria-labelledby="cookie-banner-title"
          className={cn(
            // No celular fica acima do botão do WhatsApp; do sm em diante,
            // à esquerda, deixando o canto dele livre.
            "fixed inset-x-4 bottom-24 z-40 rounded-xl border border-border bg-surface p-5 shadow-xl",
            "sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-md",
          )}
        >
          <h2
            id="cookie-banner-title"
            className="flex items-center gap-2 font-semibold text-ink"
          >
            <Cookie aria-hidden="true" className="size-5 text-brand-strong" />
            Sobre cookies
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            Usamos só o necessário para o site funcionar. O mapa dos
            empreendimentos vem do Google, que pode gravar cookies: ele só
            carrega com a sua permissão.{" "}
            <Link
              href={POLICY_HREF}
              className="font-medium text-brand-strong underline underline-offset-2"
            >
              Política de Privacidade
            </Link>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" onClick={() => save({ mapas: true })}>
              Aceitar todos
            </Button>
            <Button variant="secondary" size="sm" onClick={() => save({ mapas: false })}>
              Só necessários
            </Button>
            <Button variant="ghost" size="sm" onClick={openPreferences}>
              Preferências
            </Button>
          </div>
        </section>
      ) : null}
      {preferencesOpen ? <Preferences /> : null}
    </>
  );
}
