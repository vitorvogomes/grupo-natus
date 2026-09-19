"use client";

import Link from "next/link";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StatusNavGroup } from "@/content/developments";

type EmpreendimentosMenuProps = {
  groups: StatusNavGroup[];
  active: boolean;
};

/** Mega-menu "Empreendimentos" por status (Radix NavigationMenu). */
export function EmpreendimentosMenu({ groups, active }: EmpreendimentosMenuProps) {
  return (
    <NavigationMenu.Root
      aria-label="Empreendimentos por status"
      className="relative"
    >
      <NavigationMenu.List className="flex">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            className={cn(
              "group inline-flex items-center gap-1 text-sm transition-colors hover:text-brand-strong",
              active ? "font-semibold text-brand-strong" : "font-medium text-ink",
            )}
          >
            Empreendimentos
            <ChevronDown
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
            />
          </NavigationMenu.Trigger>

          <NavigationMenu.Content className="absolute left-0 top-full z-50 mt-3 w-[34rem] max-w-[90vw]">
            <div className="rounded-lg border border-border bg-surface p-6 shadow-lg">
              <div className="grid grid-cols-3 gap-6">
                {groups.map((group) => (
                  <div key={group.status}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {group.label}
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {group.items.map((item) => (
                        <li key={item.slug}>
                          <NavigationMenu.Link asChild>
                            <Link
                              href={`/empreendimentos/${item.slug}`}
                              className="text-sm text-ink transition-colors hover:text-brand-strong"
                            >
                              {item.name}
                            </Link>
                          </NavigationMenu.Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-5 border-t border-border pt-4">
                <NavigationMenu.Link asChild>
                  <Link
                    href="/empreendimentos"
                    className="text-sm font-medium text-brand-strong hover:text-ink"
                  >
                    Ver todos os empreendimentos →
                  </Link>
                </NavigationMenu.Link>
              </div>
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
