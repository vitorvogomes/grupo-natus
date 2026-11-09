import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { newsTitle } from "@/content/news";
import type { NewsEdition, NewsRichText } from "@/types/news";

/**
 * Uma edição da Natus News como página do site. O design é o do e-mail
 * (cores `--color-news-*`, tamanhos, ordem dos blocos e texto); a adaptação é
 * só de layout: cada bloco vira uma faixa de largura total, e o conteúdo fica
 * na medida do e-mail (600px com 40px de respiro = 520px de texto), que também
 * é a largura nativa das fotos. Tipografia do site (Outfit/Inter) no lugar do
 * Arial, que no e-mail é limitação do cliente de correio.
 */

/** A coluna do e-mail: 600px, com 40px de respiro no desktop. */
const column = "mx-auto w-full max-w-[37.5rem] px-5 sm:px-10";

/** Rótulo em caixa alta (o "RADAR NATUS" do e-mail). */
const eyebrow = "text-xs font-bold tracking-[3px]";

/** Link de texto dourado do e-mail ("Ler a notícia →"). */
const goldLink =
  "font-bold text-news-gold underline underline-offset-2 hover:text-news-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

// As listas da edição são estáticas (nunca reordenam) e o conteúdo pode se
// repetir (duas notas do mesmo empreendimento, a mesma fonte): a posição é a
// identidade de cada item, por isso as `key` são o índice.

function RichText({ segments }: { segments: NewsRichText }) {
  return segments.map((segment, i) =>
    typeof segment === "string" ? segment : <strong key={i}>{segment.strong}</strong>,
  );
}

function NewTabHint() {
  return <span className="sr-only"> (abre em nova aba)</span>;
}

function SectionHeading({ id, eyebrowText, children }: { id: string; eyebrowText: string; children: ReactNode }) {
  return (
    <>
      <p className={`mb-1.5 text-news-gold ${eyebrow}`}>{eyebrowText}</p>
      <h2 id={id} className="text-2xl leading-[30px] font-bold text-news-ink">
        {children}
      </h2>
    </>
  );
}

export function NewsEditionArticle({ edition }: { edition: NewsEdition }) {
  const { banner, radar, updates, invite, closing } = edition;

  return (
    <article className="text-news-text">
      {/* Cabeçalho: a arte do e-mail, sobre a mesma cor da borda dela. */}
      <header className="bg-news-ink">
        <h1 className="sr-only">{newsTitle(edition)}</h1>
        <Image
          src={banner.src}
          alt={banner.alt}
          width={banner.width}
          height={banner.height}
          preload
          quality={90}
          sizes={`(min-width: ${banner.width}px) ${banner.width}px, 100vw`}
          className="mx-auto block h-auto w-full"
          style={{ maxWidth: banner.width }}
        />
      </header>

      {/* Abertura */}
      <div className={`${column} pt-9 pb-2 text-base leading-[26px]`}>
        {edition.intro.map((paragraph, i) => (
          <p key={i} className="mt-4 first:mt-0">
            <RichText segments={paragraph} />
          </p>
        ))}
      </div>

      {/* Números do grupo: 3 colunas, empilhados no celular. */}
      <dl className="mx-auto grid w-full max-w-[37.5rem] px-5 pt-5 pb-6 text-center sm:grid-cols-3 sm:px-10">
        {edition.stats.map(({ value, label }, i) => (
          <div key={i} className="flex flex-col-reverse py-2.5">
            <dt className="pt-1 text-[13px] leading-[18px] text-news-muted">{label}</dt>
            <dd className="font-heading text-[26px] leading-[30px] font-bold text-news-ink">{value}</dd>
          </div>
        ))}
      </dl>

      {/* Radar Natus */}
      <section aria-labelledby="news-radar" className="bg-news-cream">
        <Reveal className={`${column} pt-9 pb-9`}>
          <div className="pb-2">
            <SectionHeading id="news-radar" eyebrowText={radar.eyebrow}>
              {radar.title}
            </SectionHeading>
          </div>
          <ul className="mt-5 text-[15px] leading-[23px]">
            {radar.items.map((item, i) => (
              <li key={i} className="border-t border-news-rule py-4 last:border-b">
                <strong className="text-news-ink">{item.headline}</strong> {item.text}
                <p className="pt-1.5 text-xs text-news-source">
                  Fonte: {item.source} ·{" "}
                  <a href={item.url} {...external} className={goldLink}>
                    Ler a notícia &rarr;
                    <NewTabHint />
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Natus no mês */}
      <section aria-labelledby="news-updates" className={`${column} pt-9 pb-9`}>
        <SectionHeading id="news-updates" eyebrowText={updates.eyebrow}>
          {updates.title}
        </SectionHeading>
        <ul className="mt-6 flex flex-col gap-9">
          {updates.items.map((item, i) => (
            <Reveal as="li" key={i}>
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                sizes="(min-width: 640px) 520px, calc(100vw - 40px)"
                className="block h-auto w-full"
              />
              <p className="mt-4 mb-1 text-xs font-bold tracking-[2px] text-news-gold">{item.eyebrow}</p>
              <p className="text-base leading-[26px]">
                <strong>{item.headline}</strong> {item.text}
              </p>
              <Link
                href={`/empreendimentos/${item.developmentSlug}`}
                className={`mt-2 inline-block text-xs ${goldLink}`}
              >
                Ver o empreendimento &rarr;
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Convite */}
      <section aria-labelledby="news-invite" className="bg-news-ink">
        <Reveal className={`${column} py-11 text-center`}>
          <p className={`mb-2.5 text-news-gold-soft ${eyebrow}`}>{invite.eyebrow}</p>
          <h2 id="news-invite" className="mb-4 text-[26px] leading-[34px] font-normal text-white">
            {invite.title}
          </h2>
          <p className="mb-7 text-base leading-[26px] text-news-invite-text">{invite.text}</p>
          <a
            href={invite.cta.href}
            {...external}
            className="inline-block rounded-sm bg-news-gold-soft px-9 py-4 text-[15px] font-bold tracking-[1px] text-news-ink transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-news-gold-soft"
          >
            {invite.cta.label}
            <NewTabHint />
          </a>
        </Reveal>
      </section>

      {/* Fecho da edição (o descadastro do e-mail não se aplica aqui). */}
      <footer className="bg-news-footer">
        <div className={`${column} py-7 text-center text-xs leading-[18px] text-news-footer-text`}>
          <p className="mb-2 text-[13px] font-bold tracking-[3px] text-white">{closing.signature}</p>
          {closing.lines.map((line, i) => (
            <p key={i} className="mb-2 last:mb-0">
              {line}
            </p>
          ))}
        </div>
      </footer>
    </article>
  );
}
