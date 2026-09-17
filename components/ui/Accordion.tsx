"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

export type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
};

type AccordionProps = {
  items: readonly AccordionItem[];
  className?: string;
};

export function Accordion({ items, className }: AccordionProps) {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <div className={cx("divide-y divide-border rounded-lg border border-border", className)}>
      {items.map((item) => {
        const isOpen = open[item.id] ?? false;
        const panelId = `accordion-panel-${item.id}`;
        const headerId = `accordion-header-${item.id}`;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() =>
                  setOpen((prev) => ({ ...prev, [item.id]: !isOpen }))
                }
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left font-medium text-ink"
              >
                {item.title}
                <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
              </button>
            </h3>
            {isOpen ? (
              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                className="px-4 pb-4 text-ink-soft"
              >
                {item.content}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
