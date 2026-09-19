"use client";

import type { ReactNode } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
  return (
    <AccordionPrimitive.Root
      type="multiple"
      className={cn(
        "divide-y divide-border rounded-lg border border-border",
        className,
      )}
    >
      {items.map((item) => (
        <AccordionPrimitive.Item key={item.id} value={item.id}>
          <AccordionPrimitive.Header asChild>
            <h3>
              <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-4 px-4 py-4 text-left font-medium text-ink transition-colors hover:text-brand-strong">
                {item.title}
                <ChevronDown
                  aria-hidden="true"
                  className="size-5 shrink-0 text-ink-soft transition-transform duration-200 group-data-[state=open]:rotate-180"
                />
              </AccordionPrimitive.Trigger>
            </h3>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="px-4 pb-4 text-ink-soft">
            {item.content}
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
