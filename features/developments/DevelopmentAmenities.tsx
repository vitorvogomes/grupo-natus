import { Accordion, type AccordionItem } from "@/components/ui/Accordion";
import type { Development } from "@/types/development";

type DevelopmentAmenitiesProps = {
  development: Development;
};

export function DevelopmentAmenities({
  development,
}: DevelopmentAmenitiesProps) {
  const amenities = development.amenities ?? [];

  const items: AccordionItem[] = amenities.map((group) => ({
    id: group.category,
    title: group.category,
    content: (
      <ul className="grid list-disc gap-2 pl-5 sm:grid-cols-2">
        {group.items.map((item) => (
          <li key={item} className="text-ink-soft">
            {item}
          </li>
        ))}
      </ul>
    ),
  }));

  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-ink">
        O que o {development.name} oferece
      </h2>

      {items.length > 0 ? (
        <Accordion items={items} />
      ) : (
        <p className="text-muted">
          Diferenciais e comodidades em breve. (TODO: CONTENT REQUIRED)
        </p>
      )}

      {development.presentationUrl ? (
        <a
          href={development.presentationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-md border border-ink px-5 py-2.5 font-medium text-ink transition-colors hover:bg-ink hover:text-white"
        >
          Download da apresentação
          <span aria-hidden="true">↓</span>
        </a>
      ) : null}
    </section>
  );
}
