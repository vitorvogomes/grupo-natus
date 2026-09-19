"use client";

import { useMemo, useState } from "react";
import { Image } from "@/components/ui/Image";
import { cn } from "@/lib/utils";
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

export function Gallery({ images }: GalleryProps) {
  const [category, setCategory] = useState<Category>("all");
  const [index, setIndex] = useState(0);

  const categories = useMemo<Category[]>(() => {
    const kinds = Array.from(
      new Set(images.map((img) => img.kind).filter(Boolean)),
    ) as DevelopmentImageKind[];
    return ["all", ...kinds];
  }, [images]);

  const filtered = useMemo(
    () =>
      category === "all"
        ? images
        : images.filter((img) => img.kind === category),
    [images, category],
  );

  if (images.length === 0) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-lg bg-surface-muted text-muted-foreground">
        Imagens em breve
      </div>
    );
  }

  const safeIndex = Math.min(index, filtered.length - 1);
  const main = filtered[safeIndex] ?? filtered[0]!;

  function selectCategory(next: Category) {
    setCategory(next);
    setIndex(0);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      setIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowLeft") {
      setIndex((i) => (i - 1 + filtered.length) % filtered.length);
    }
  }

  return (
    <div
      role="group"
      aria-label="Galeria de imagens"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-4 outline-none"
    >
      {categories.length > 1 ? (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => selectCategory(cat)}
              aria-pressed={category === cat}
              className={cn(
                "rounded-full px-3 py-1 text-sm",
                category === cat
                  ? "bg-ink text-white"
                  : "bg-surface-muted text-ink",
              )}
            >
              {cat === "all" ? "Todas" : CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      ) : null}

      <div
        data-testid="gallery-main"
        className="relative aspect-video overflow-hidden rounded-lg bg-surface-muted"
      >
        <Image
          src={main.src}
          alt={main.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
        />
      </div>

      <ul className="flex flex-wrap gap-2">
        {filtered.map((img, i) => (
          <li key={img.src}>
            <button
              type="button"
              aria-label={`Ver imagem: ${img.alt}`}
              aria-current={i === safeIndex}
              onClick={() => setIndex(i)}
              className={cn(
                "relative size-16 overflow-hidden rounded-md border",
                i === safeIndex ? "border-brand" : "border-border",
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
