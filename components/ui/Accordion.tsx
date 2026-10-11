"use client";

import type { ReactNode } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  id: string;
  /** ReactNode (e não string) para admitir ícone + rótulo no gatilho. */
  title: ReactNode;
  content: ReactNode;
};

type AccordionProps = {
  items: readonly AccordionItem[];
  className?: string;
  /** Ids abertos na primeira renderização (segue não-controlado depois). */
  defaultOpen?: readonly string[];
  /**
   * `multiple` (padrão): cada item abre e fecha sozinho. `single`: abrir um
   * fecha o anterior — e o aberto ainda pode ser recolhido (`collapsible`).
   * Em `single`, só o primeiro id de `defaultOpen` vale.
   */
  type?: "single" | "multiple";
};

export function Accordion({
  items,
  className,
  defaultOpen,
  type = "multiple",
}: AccordionProps) {
  const rootClassName = cn(
    "divide-y divide-border rounded-lg border border-border",
    className,
  );
  const content = items.map((item) => (
    <AccordionPrimitive.Item key={item.id} value={item.id}>
      <AccordionPrimitive.Header asChild>
        <h3>
          <AccordionPrimitive.Trigger className="group w-full px-4 py-4 text-left font-medium text-ink transition-colors hover:text-brand-strong focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring">
            <span className="flex w-full items-center justify-between gap-4">
              {/* `title` vem de fora como ReactNode. Sozinho dentro deste
                      span ele é filho único; irmão do chevron, viraria item de
                      um array de children e o React cobraria uma `key` de quem
                      só passou uma prop. */}
              <span>{item.title}</span>
              <ChevronDown
                aria-hidden="true"
                className="size-5 shrink-0 text-ink-soft transition-transform duration-200 group-data-[state=open]:rotate-180"
              />
            </span>
          </AccordionPrimitive.Trigger>
        </h3>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="px-4 pb-4 text-ink-soft">
        {item.content}
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  ));

  // Root é uma união discriminada no Radix: o `type` precisa ser literal em
  // cada ramo para o `defaultValue` (string vs string[]) tipar.
  return type === "single" ? (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      defaultValue={defaultOpen?.[0]}
      className={rootClassName}
    >
      {content}
    </AccordionPrimitive.Root>
  ) : (
    <AccordionPrimitive.Root
      type="multiple"
      defaultValue={defaultOpen ? [...defaultOpen] : undefined}
      className={rootClassName}
    >
      {content}
    </AccordionPrimitive.Root>
  );
}
