import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SOCIAL } from "@/lib/site";

/**
 * Ícones de marca em SVG inline, no traço do lucide (24×24, stroke 2): o
 * lucide removeu os ícones de marca, e três glifos não justificam um pacote.
 */
function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      {children}
    </svg>
  );
}

const PROFILES = [
  {
    label: "Instagram",
    href: SOCIAL.instagram,
    icon: (
      <Glyph>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </Glyph>
    ),
  },
  {
    label: "Facebook",
    href: SOCIAL.facebook,
    icon: (
      <Glyph>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </Glyph>
    ),
  },
  {
    label: "LinkedIn",
    href: SOCIAL.linkedin,
    icon: (
      <Glyph>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </Glyph>
    ),
  },
] as const;

/** Perfis oficiais do Grupo Natus (rodapé). */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex gap-2", className)}>
      {PROFILES.map((profile) => (
        <li key={profile.label}>
          <a
            href={profile.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${profile.label} do Grupo Natus`}
            className="inline-flex size-11 items-center justify-center rounded-full border border-navy-400/60 text-navy-100 transition-colors hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {profile.icon}
          </a>
        </li>
      ))}
    </ul>
  );
}
