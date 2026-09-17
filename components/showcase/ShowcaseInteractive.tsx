"use client";

import { useState } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

const FAQ = [
  {
    id: "1",
    title: "O que é um empreendimento?",
    content: "A unidade central do site: cada projeto imobiliário do Grupo Natus.",
  },
  {
    id: "2",
    title: "Como acompanho a obra?",
    content: "Pela seção de evolução da obra na página de cada empreendimento.",
  },
];

/** Demos interativas do design system (Accordion e Modal). */
export function ShowcaseInteractive() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-6">
      <Accordion items={FAQ} />
      <div>
        <Button onClick={() => setOpen(true)}>Abrir modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Exemplo de modal">
          <p className="text-ink-soft">
            Conteúdo de exemplo. Fecha no ✕, no Escape ou clicando fora.
          </p>
        </Modal>
      </div>
    </div>
  );
}
