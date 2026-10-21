"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { ReactNode } from "react";
import {
  googleMapsLoaded,
  parseConsent,
  reloadPage,
  writeConsent,
  type Consent,
  type ConsentChoice,
} from "@/lib/consent";

type ConsentContextValue = {
  /** O cookie já foi lido (só acontece no cliente, depois do mount). */
  ready: boolean;
  consent: Consent | null;
  /** Mapas do Google liberados. Falso enquanto não houver escolha. */
  mapas: boolean;
  save: (choice: ConsentChoice) => void;
  preferencesOpen: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
};

const noop = () => {};

/**
 * Fora do provider (testes de componente isolado), tudo de terceiros fica
 * bloqueado — o mesmo estado de quem ainda não escolheu.
 */
const ConsentContext = createContext<ConsentContextValue>({
  ready: false,
  consent: null,
  mapas: false,
  save: noop,
  preferencesOpen: false,
  openPreferences: noop,
  closePreferences: noop,
});

/**
 * `document.cookie` como store externo. O servidor (e a hidratação) leem
 * `null` = "ainda não lido", então o HTML sai sempre como "não decidido" e o
 * cliente troca para a escolha real logo depois, sem divergir na hidratação.
 */
const listeners = new Set<() => void>();
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
const getCookies = () => document.cookie;
const getServerCookies = () => null;

export function ConsentProvider({ children }: { children: ReactNode }) {
  const cookies = useSyncExternalStore(subscribe, getCookies, getServerCookies);
  const consent = useMemo(
    () => (cookies === null ? null : parseConsent(cookies)),
    [cookies],
  );
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const value: ConsentContextValue = {
    ready: cookies !== null,
    consent,
    mapas: consent?.mapas ?? false,
    save: (choice) => {
      const revokedMaps = Boolean(consent?.mapas) && !choice.mapas;
      writeConsent(choice);
      // O script da JS API não descarrega: revogar com ele na página exige
      // recarregar, senão o código do Google segue rodando até o reload.
      if (revokedMaps && googleMapsLoaded()) {
        reloadPage();
        return;
      }
      for (const listener of listeners) listener();
      setPreferencesOpen(false);
    },
    preferencesOpen,
    openPreferences: () => setPreferencesOpen(true),
    closePreferences: () => setPreferencesOpen(false),
  };

  return <ConsentContext value={value}>{children}</ConsentContext>;
}

/** Toda integração de terceiros (mapas hoje; GA4/Pixel depois) passa por aqui. */
export function useConsent(): ConsentContextValue {
  return useContext(ConsentContext);
}
