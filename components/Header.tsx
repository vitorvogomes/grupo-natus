"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { buttonVariants } from "./ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Na Home o hero é uma imagem em tela cheia: o header só entra quando o
  // usuário começa a rolar. Nas demais rotas ele está sempre presente.
  const isHome = pathname === "/";
  const revealed = !isHome || scrolled || hovering;

  return (
    <>
      {/* Marca branca sobre o hero: a Home não pode abrir sem assinatura. Sai
          quando o header entra (rolagem ou hover), no mesmo lugar onde a logo
          dele aparece — a troca lê como uma só peça. Decorativa: o link real
          vive no header, que segue acessível por Tab mesmo oculto. */}
      {isHome ? (
        <div
          aria-hidden="true"
          data-testid="hero-brand"
          data-visible={revealed ? "false" : "true"}
          className={cn(
            "pointer-events-none fixed inset-x-0 top-0 z-30",
            "transition-opacity duration-200 ease-out",
            revealed ? "opacity-0" : "opacity-100",
          )}
        >
          <div className="mx-auto flex h-20 max-w-[var(--container-max)] items-center px-4 sm:px-6 lg:px-8">
            <Logo negative className="h-9 w-auto drop-shadow-md sm:h-10" />
          </div>
        </div>
      ) : null}

      {/* Na Home o alvo do hover é este invólucro: o header oculto não recebe
          ponteiro (`pointer-events-none`), então o evento cai no invólucro,
          que ocupa a mesma altura. Revelado, o header volta a receber o
          clique. Não empilhar nenhuma camada de captura por cima dele — ela
          engoliria os cliques do header revelado. */}
      <div
        onMouseEnter={isHome ? () => setHovering(true) : undefined}
        onMouseLeave={isHome ? () => setHovering(false) : undefined}
        className={cn(
          "top-0 z-40",
          // `fixed` na Home: `sticky` ocuparia espaço no fluxo e empurraria o
          // hero para baixo da dobra.
          isHome ? "fixed inset-x-0" : "sticky",
        )}
      >
        <header
          data-revealed={revealed ? "true" : "false"}
          className={cn(
            "border-b backdrop-blur",
            "transition-[background-color,box-shadow,border-color,transform,opacity] duration-200 ease-out",
            scrolled
              ? "border-border bg-surface/95 shadow-sm"
              : "border-transparent bg-surface/80",
            // Oculto é opacidade + transform (nunca `hidden`/`aria-hidden`), e
            // `focus-within` o traz de volta: Tab no topo da Home revela a navegação.
            revealed
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-full opacity-0 focus-within:pointer-events-auto focus-within:translate-y-0 focus-within:opacity-100",
          )}
        >
          <div
            className={cn(
              "mx-auto flex max-w-[var(--container-max)] items-center justify-between px-4 sm:px-6 lg:px-8",
              "transition-[height] duration-200 ease-out",
              scrolled ? "h-16" : "h-20",
            )}
          >
            <Link href="/" aria-label="Grupo Natus — página inicial">
              <Logo
                className={cn(
                  "w-auto origin-left transition-transform duration-200 ease-out",
                  scrolled ? "h-7" : "h-8",
                )}
              />
            </Link>

            <div className="flex items-center gap-6">
              <nav aria-label="Navegação principal" className="hidden lg:block">
                <ul className="flex items-center gap-8">
                  {NAV_LINKS.map((link) => {
                    const active = isActive(pathname, link.href);
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "text-sm transition-colors hover:text-brand-strong",
                            active
                              ? "font-semibold text-brand-strong"
                              : "font-medium text-ink",
                          )}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <a
                href={buildWhatsAppUrl({
                  message:
                    "Olá! Gostaria de falar com um consultor do Grupo Natus.",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "primary", size: "sm" }),
                  "hidden lg:inline-flex",
                )}
              >
                <MessageCircle aria-hidden="true" />
                Falar com consultor
              </a>

              <MobileNav />
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
