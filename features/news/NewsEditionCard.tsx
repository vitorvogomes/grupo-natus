import Image from "next/image";
import Link from "next/link";
import { editionName } from "@/content/news";
import type { NewsEdition } from "@/types/news";

/** Data por extenso, sem depender do fuso de quem renderiza ("9 de novembro de 2026"). */
function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}

/**
 * Uma edição no índice `/news`: a arte do e-mail, o título e o resumo, num
 * link só. `sizes` segue a grade da página: 3 colunas de até 384px no desktop,
 * 2 no tablet (gap de 32px, respiro de 24px) e 1 no celular.
 */
export function NewsEditionCard({ edition }: { edition: NewsEdition }) {
  const { banner } = edition;
  return (
    <Link
      href={`/news/${edition.slug}`}
      className="group block overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <div className="bg-news-ink">
        {/* Decorativa: a arte repete o título do card. */}
        <Image
          src={banner.src}
          alt=""
          width={banner.width}
          height={banner.height}
          sizes="(min-width: 1024px) 384px, (min-width: 768px) calc(50vw - 40px), calc(100vw - 32px)"
          className="block h-auto w-full"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-ink group-hover:text-brand-strong">
          {editionName(edition)}
        </h2>
        <p className="mt-2 text-ink-soft">{edition.description}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Publicada em <time dateTime={edition.publishedAt}>{formatDate(edition.publishedAt)}</time>
        </p>
      </div>
    </Link>
  );
}
