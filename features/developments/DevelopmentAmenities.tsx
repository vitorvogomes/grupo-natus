import {
  Building2,
  Check,
  Leaf,
  ShieldCheck,
  Sparkles,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import { Image } from "@/components/ui/Image";
import type {
  DevelopmentAmenityGroup,
  DevelopmentImage,
} from "@/types/development";

type DevelopmentAmenitiesProps = {
  name: string;
  /** Não-vazio por contrato: a página não renderiza a seção sem grupos. */
  groups: readonly DevelopmentAmenityGroup[];
  image?: DevelopmentImage;
};

/**
 * Ícone por categoria. O mapa vive aqui, e não no conteúdo, porque `content/`
 * é dado puro — guardar componente React lá acoplaria o seed ao React.
 * A chave é normalizada (sem acento, minúscula) para que "Área de lazer",
 * "Area de Lazer" e "ÁREA DE LAZER" caiam no mesmo ícone.
 */
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  caracteristicas: Building2,
  "area de lazer": Waves,
  lazer: Waves,
  comodidades: Sparkles,
  seguranca: ShieldCheck,
  sustentabilidade: Leaf,
};

function iconFor(category: string): LucideIcon {
  const key = category
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
  return CATEGORY_ICONS[key] ?? Check;
}

export function DevelopmentAmenities({
  name,
  groups,
  image,
}: DevelopmentAmenitiesProps) {
  const items: AccordionItem[] = groups.map((group) => {
    const Icon = iconFor(group.category);
    return {
      id: group.category,
      title: (
        <span className="inline-flex items-center gap-3">
          <Icon
            aria-hidden="true"
            className="size-5 shrink-0 text-brand-strong"
            strokeWidth={1.75}
          />
          {group.category}
        </span>
      ),
      content: (
        <ul className="flex flex-col gap-2 pl-8">
          {group.items.map((item) => (
            <li key={item} className="text-ink-soft">
              {item}
            </li>
          ))}
        </ul>
      ),
    };
  });

  return (
    <section>
      <h2 className="text-balance text-3xl font-semibold text-ink md:text-4xl">
        O que o {name} oferece
      </h2>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-start">
        {/* O primeiro grupo já vem aberto: um accordion inteiramente fechado
            esconde a seção atrás de um clique que ninguém pediu. */}
        <Accordion items={items} defaultOpen={[items[0]?.id ?? ""]} />

        {image ? (
          // O sticky fica no invólucro: `fill` exige pai relative/absolute/fixed,
          // e `position: sticky` no mesmo elemento quebrava o posicionamento.
          <div className="lg:sticky lg:top-32">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-muted">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
