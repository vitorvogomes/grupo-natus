import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ConsentProvider, useConsent } from "./ConsentProvider";
import { CONSENT_COOKIE, reloadPage, writeConsent } from "@/lib/consent";

vi.mock("@/lib/consent", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/consent")>()),
  reloadPage: vi.fn(),
}));

function Revogar() {
  const { mapas, save } = useConsent();
  return (
    <button type="button" onClick={() => save({ mapas: false })}>
      {mapas ? "mapas ligados" : "mapas desligados"}
    </button>
  );
}

afterEach(() => {
  document.cookie = `${CONSENT_COOKIE}=; Max-Age=0; Path=/`;
  document.head.querySelectorAll("script[data-google-maps]").forEach((s) => s.remove());
  vi.mocked(reloadPage).mockClear();
});

describe("ConsentProvider — revogar os mapas", () => {
  it("com a JS API do Google já carregada, recarrega a página para descarregá-la", async () => {
    const user = userEvent.setup();
    writeConsent({ mapas: true });
    const script = document.createElement("script");
    script.dataset.googleMaps = "true";
    document.head.appendChild(script);

    render(
      <ConsentProvider>
        <Revogar />
      </ConsentProvider>,
    );
    await user.click(screen.getByRole("button", { name: "mapas ligados" }));
    expect(reloadPage).toHaveBeenCalledOnce();
  });

  it("só com o embed (sem script), desmontar basta: nada de reload", async () => {
    const user = userEvent.setup();
    writeConsent({ mapas: true });
    render(
      <ConsentProvider>
        <Revogar />
      </ConsentProvider>,
    );
    await user.click(screen.getByRole("button", { name: "mapas ligados" }));
    expect(reloadPage).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "mapas desligados" })).toBeInTheDocument();
  });
});
