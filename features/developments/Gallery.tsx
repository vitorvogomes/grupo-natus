"use client";

import { useMemo, useState } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { Image } from "@/components/ui/Image";
import { cn } from "@/lib/utils";
import { GalleryLightbox } from "./GalleryLightbox";
import type {
  DevelopmentImage,
  DevelopmentImageKind,
} from "@/types/development";

type GalleryProps = {
  images: readonly DevelopmentImage[];
};

const CATEGORY_LABELS: Record<DevelopmentImageKind, string> = {
  hero: "Destaque",
  gallery: "Galeria",
  plant: "Plantas",
  render: "Renders",
};

type Category = "all" | DevelopmentImageKind;

const tabTriggerClass = cn(
  "rounded-full px-3 py-1 text-sm transition-colors",
  "data-[state=inactive]:bg-surface-muted data-[state=inactive]:text-ink",
  "data-[state=active]:bg-ink data-[state=active]:text-white",
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
);

type GridProps = {
  list: readonly DevelopmentImage[];
  all: readonly DevelopmentImage[];
  onOpen: (index: number) => void;
};

function ImageGrid({ list, all, onOpen }: GridProps) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {list.map((img) => (
        <li key={img.src}>
          <button
            type="button"
            aria-label={`Ampliar imagem: ${img.alt}`}
            onClick={() => onOpen(all.indexOf(img))}
            className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            />
          </button>
        </li>
      ))}
    </ul>
  );
}

export function Gallery({ images }: GalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const categories = useMemo<Category[]>(() => {
    const kinds = Array.from(
      new Set(images.map((img) => img.kind).filter(Boolean)),
    ) as DevelopmentImageKind[];
    return ["all", ...kinds];
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-lg bg-surface-muted text-muted-foreground">
        Imagens em breve
      </div>
    );
  }

  return (
    <div>
      {categories.length > 1 ? (
        <TabsPrimitive.Root defaultValue="all">
          <TabsPrimitive.List
            aria-label="Categorias de imagens"
            className="mb-4 flex flex-wrap gap-2"
          >
            {categories.map((cat) => (
              <TabsPrimitive.Trigger
                key={cat}
                value={cat}
                className={tabTriggerClass}
              >
                {cat === "all" ? "Todas" : CATEGORY_LABELS[cat]}
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>
          {categories.map((cat) => (
            <TabsPrimitive.Content key={cat} value={cat}>
              <ImageGrid
                list={
                  cat === "all"
                    ? images
                    : images.filter((img) => img.kind === cat)
                }
                all={images}
                onOpen={setLightbox}
              />
            </TabsPrimitive.Content>
          ))}
        </TabsPrimitive.Root>
      ) : (
        <ImageGrid list={images} all={images} onOpen={setLightbox} />
      )}

      <GalleryLightbox
        images={images}
        index={lightbox}
        onOpenChange={(open) => {
          if (!open) setLightbox(null);
        }}
        onIndexChange={setLightbox}
      />
    </div>
  );
}
