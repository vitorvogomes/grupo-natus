import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Link externo: abre em nova aba com rel de segurança. */
  external?: boolean;
};

export function TextLink({
  href,
  children,
  className,
  external = false,
}: TextLinkProps) {
  const classes = cx(
    "text-brand-strong underline-offset-4 transition-colors hover:text-ink hover:underline",
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
