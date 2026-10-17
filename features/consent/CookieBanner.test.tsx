import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { ConsentProvider } from "./ConsentProvider";
import { CookieBanner } from "./CookieBanner";
import { CookiePreferencesButton } from "./CookiePreferencesButton";
import { CONSENT_COOKIE, readConsent, writeConsent } from "@/lib/consent";

function renderBanner() {
  return render(
    <ConsentProvider>
      <CookieBanner />
      <CookiePreferencesButton />
    </ConsentProvider>,
  );
}

const banner = () => screen.queryByRole("region", { name: /cookies/i });

describe("CookieBanner", () => {
  afterEach(() => {
    document.cookie = `${CONSENT_COOKIE}=; Max-Age=0; Path=/`;
  });

  it("na primeira visita, pede a escolha com link para a política", () => {
    renderBanner();
    const region = banner()!;
    expect(region).toBeInTheDocument();
    expect(within(region).getByRole("link", { name: /política de privacidade/i })).toHaveAttribute(
      "href",
      "/politica-de-privacidade",
    );
    expect(within(region).getByRole("button", { name: /aceitar todos/i })).toBeInTheDocument();
    expect(within(region).getByRole("button", { name: /só necessários/i })).toBeInTheDocument();
  });

  it("'Só necessários' grava a recusa e some", async () => {
    const user = userEvent.setup();
    renderBanner();
    await user.click(screen.getByRole("button", { name: /só necessários/i }));
    expect(readConsent()?.mapas).toBe(false);
    expect(banner()).not.toBeInTheDocument();
  });

  it("'Aceitar todos' libera os mapas", async () => {
    const user = userEvent.setup();
    renderBanner();
    await user.click(screen.getByRole("button", { name: /aceitar todos/i }));
    expect(readConsent()?.mapas).toBe(true);
    expect(banner()).not.toBeInTheDocument();
  });

  it("com a escolha já feita, não aparece", () => {
    writeConsent({ mapas: false });
    renderBanner();
    expect(banner()).not.toBeInTheDocument();
  });

  it("preferências: necessários sempre ligados; mapas é opcional e fica salvo", async () => {
    const user = userEvent.setup();
    renderBanner();
    await user.click(within(banner()!).getByRole("button", { name: /preferências/i }));
    const dialog = screen.getByRole("dialog", { name: /preferências de cookies/i });
    expect(within(dialog).getByRole("checkbox", { name: /necessários/i })).toBeDisabled();
    const mapas = within(dialog).getByRole("checkbox", { name: /mapas/i });
    expect(mapas).not.toBeChecked();
    await user.click(mapas);
    await user.click(within(dialog).getByRole("button", { name: /salvar/i }));
    expect(readConsent()?.mapas).toBe(true);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(banner()).not.toBeInTheDocument();
  });

  it("fechar as preferências sem salvar devolve o foco ao botão do aviso", async () => {
    const user = userEvent.setup();
    renderBanner();
    const abrir = within(banner()!).getByRole("button", { name: /^preferências$/i });
    await user.click(abrir);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(banner()).toBeInTheDocument();
    // O Radix devolve o foco num setTimeout após desmontar o diálogo.
    await waitFor(() =>
      expect(within(banner()!).getByRole("button", { name: /^preferências$/i })).toHaveFocus(),
    );
  });

  it("o botão do rodapé reabre as preferências com a escolha atual", async () => {
    const user = userEvent.setup();
    writeConsent({ mapas: true });
    renderBanner();
    await user.click(screen.getByRole("button", { name: /preferências de cookies/i }));
    const dialog = screen.getByRole("dialog", { name: /preferências de cookies/i });
    const mapas = within(dialog).getByRole("checkbox", { name: /mapas/i });
    expect(mapas).toBeChecked();
    await user.click(mapas);
    await user.click(within(dialog).getByRole("button", { name: /salvar/i }));
    expect(readConsent()?.mapas).toBe(false);
  });
});
