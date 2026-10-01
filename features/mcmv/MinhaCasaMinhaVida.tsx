import { Landmark, PiggyBank, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Image } from "@/components/ui/Image";
import { Reveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const BENEFITS: readonly {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: PiggyBank,
    title: "Parcela que cabe no mês",
    description:
      "Prestações dimensionadas para o seu orçamento, com entrada facilitada.",
  },
  {
    icon: TrendingDown,
    title: "Juros reduzidos do programa",
    description:
      "As menores taxas do mercado para quem se enquadra no Minha Casa, Minha Vida.",
  },
  {
    icon: Landmark,
    title: "Seu FGTS vale mais",
    description:
      "Use o saldo do fundo na entrada ou para abater o financiamento.",
  },
];

/**
 * Seção do programa Minha Casa, Minha Vida.
 *
 * Vive em `features/mcmv/` e não em `features/home/` porque a Home deixou de
 * ser a única consumidora: a página do empreendimento a exibe nos que estão
 * de fato enquadrados (campo `mcmv`).
 *
 * Painel único: o conteúdo e a foto dividem uma só peça, encostados, em vez de
 * dois blocos soltos — e os benefícios vêm como uma faixa separada por fios,
 * não como três caixas. A marca do programa é federal: exibida no arquivo
 * oficial, sem recorte, recoloração ou distorção. Ver docs/CONTENT-GAPS.md
 * para a confirmação de direito de uso e de quais empreendimentos estão
 * enquadrados.
 */
export function MinhaCasaMinhaVida() {
  return (
    <section className="bg-navy-600 py-20 text-navy-50">
      <div className="mx-auto max-w-[var(--container-max)] px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-2xl bg-surface text-ink lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              <Image
                src="/home/minha-casa-minha-vida-logo.png"
                alt="Minha Casa Minha Vida"
                width={280}
                height={83}
                className="h-auto w-[200px] sm:w-[240px]"
              />
              {/* `text-balance` em vez de <br>: a quebra manual custava uma
                  linha extra abaixo de ~400px. */}
              <h2 className="mt-8 text-balance text-3xl font-semibold md:text-4xl">
                Seu sonho da casa própria, com o padrão Natus.
              </h2>
              <p className="mt-4 max-w-prose text-ink-soft">
                Com o programa Minha Casa, Minha Vida, o sonho de conquistar o
                seu próprio Natus fica mais próximo. Conte com subsídio do
                governo, uso do FGTS e a qualidade de construção que só a Natus
                entrega.
              </p>
              <a
                href={buildWhatsAppUrl({
                  message:
                    "Olá, gostaria de solicitar uma simulação do meu financiamento.",
                })}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-8 self-start",
                )}
              >
                Simule agora
              </a>
            </div>

            {/* Encostada no painel (sem respiro nem canto próprio): a foto é
                parte da peça, não um bloco ao lado dela. No mobile o painel
                vira bloco e ela fecha a seção, depois do CTA. */}
            <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[520px]">
              <Image
                src="/home/familia-mcmv.webp"
                alt="Família reunida no sofá da sala de casa"
                fill
                /* `sizes` descreve a largura RENDERIZADA, não a do box: com
                   object-cover num box mais alto que a proporção da foto
                   (637x520 contra 16:9), o browser desenha a imagem a ~930 px
                   e corta as laterais. Declarar a largura do box o faria baixar
                   a variante de 640 e ampliá-la 1,46x — era daí que vinha o
                   borrão. Reconferir este valor sempre que o painel mudar de
                   altura. */
                sizes="(max-width: 1024px) 130vw, 950px"
                quality={90}
                className="object-cover object-[center_40%]"
              />
            </div>
          </div>
        </Reveal>

        {/* Faixa dividida por fios: lê como uma régua de condições do programa,
            não como três cartões empilhados. */}
        <ul className="mt-14 grid divide-y divide-navy-400/60 border-y border-navy-400/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {BENEFITS.map(({ icon: Icon, title, description }, i) => (
            <Reveal
              key={title}
              as="li"
              delay={i * 0.09}
              className="flex gap-4 px-0 py-7 sm:px-7 sm:first:pl-0 sm:last:pr-0"
            >
              {/* Nude sólido sobre o navy: inverte o selo navy dos números em "Quem
                  somos" — mesma gramática, contraste suficiente nos dois fundos. */}
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-navy-700">
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </span>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-navy-100">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
