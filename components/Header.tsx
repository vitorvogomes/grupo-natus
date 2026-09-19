"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { EmpreendimentosMenu } from "./EmpreendimentosMenu";
import { buttonVariants } from "./ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { StatusNavGroup } from "@/content/developments";

type HeaderProps = {
  /** Empreendimentos agrupados por status para o mega-menu (vazio = link simples). */
  empreendimentosMenu?: StatusNavGroup[];
};

function isActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ empreendimentosMenu = [] }: HeaderProps = {}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur",
        "transition-[background-color,box-shadow,border-color] duration-200 ease-out",
        scrolled
          ? "border-border bg-surface/95 shadow-sm"
          : "border-transparent bg-surface/80",
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
                if (
                  link.href === "/empreendimentos" &&
                  empreendimentosMenu.length > 0
                ) {
                  return (
                    <li key={link.href}>
                      <EmpreendimentosMenu
                        groups={empreendimentosMenu}
                        active={active}
                      />
                    </li>
                  );
                }
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
  );
}
