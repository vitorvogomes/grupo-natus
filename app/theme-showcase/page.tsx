import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Image } from "@/components/ui/Image";
import { TextLink } from "@/components/ui/TextLink";
import { ShowcaseInteractive } from "@/components/showcase/ShowcaseInteractive";
import { Logo } from "@/components/Logo";
import { DEVELOPMENT_STATUSES } from "@/types/development";

export const metadata: Metadata = {
  title: "Theme Showcase",
  description: "Design system do Grupo Natus — tokens, componentes e estados.",
  robots: { index: false, follow: false },
};

const SCALES = [
  { name: "nude", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: "navy", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: "stone", steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] },
] as const;

const SEMANTIC = [
  "brand",
  "brand-strong",
  "ink",
  "ink-soft",
  "surface-muted",
  "muted",
  "border",
] as const;

const TYPE_SIZES = [
  "text-xs",
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
  "text-2xl",
  "text-3xl",
  "text-4xl",
  "text-5xl",
] as const;

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border py-12">
      <h2 className="mb-6 text-2xl font-semibold text-ink">{title}</h2>
      {children}
    </section>
  );
}

export default function ThemeShowcasePage() {
  return (
    <main className="mx-auto max-w-[var(--container-max)] px-4 py-10 sm:px-6 lg:px-8">
      <header className="pb-6">
        <h1 className="text-4xl font-bold text-ink">Theme Showcase</h1>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Design system do Grupo Natus — tokens de marca, componentes e seus
          estados. Página de validação do <strong>Gate A</strong>.
        </p>
      </header>

      <Section id="logo" title="Logo">
        <div className="flex flex-wrap items-center gap-8">
          <div className="rounded-lg border border-border p-6">
            <Logo className="h-10 w-auto" />
            <p className="mt-2 text-xs text-muted-foreground">Principal (fundo claro)</p>
          </div>
          <div className="rounded-lg bg-navy-600 p-6">
            <Logo negative className="h-10 w-auto" />
            <p className="mt-2 text-xs text-navy-100">Negativa (fundo escuro)</p>
          </div>
        </div>
      </Section>

      <Section id="cores" title="Cores">
        <div className="flex flex-col gap-6">
          {SCALES.map((scale) => (
            <div key={scale.name}>
              <h3 className="mb-2 font-medium capitalize text-ink">
                {scale.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {scale.steps.map((step) => (
                  <div key={step} className="text-center">
                    <div
                      className="size-14 rounded-md border border-border"
                      style={{
                        backgroundColor: `var(--color-${scale.name}-${step})`,
                      }}
                    />
                    <span className="text-xs text-muted-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div>
            <h3 className="mb-2 font-medium text-ink">Semânticas</h3>
            <div className="flex flex-wrap gap-2">
              {SEMANTIC.map((token) => (
                <div key={token} className="text-center">
                  <div
                    className="size-14 rounded-md border border-border"
                    style={{ backgroundColor: `var(--color-${token})` }}
                  />
                  <span className="text-xs text-muted-foreground">{token}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 font-medium text-ink">Status de empreendimento</h3>
            <div className="flex flex-wrap gap-2">
              {DEVELOPMENT_STATUSES.map((status) => (
                <Badge key={status} status={status} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section id="tipografia" title="Tipografia">
        <div className="flex flex-col gap-2">
          {TYPE_SIZES.map((size) => (
            <p
              key={size}
              className="text-ink"
              style={{ fontSize: `var(--${size})` }}
            >
              Grupo Natus — {size}
            </p>
          ))}
        </div>
      </Section>

      <Section id="botoes" title="Botões">
        <div className="flex flex-col gap-4">
          {(["primary", "secondary", "ghost"] as const).map((variant) => (
            <div key={variant} className="flex flex-wrap items-center gap-4">
              <Button variant={variant} size="sm">
                {variant} sm
              </Button>
              <Button variant={variant} size="md">
                {variant} md
              </Button>
              <Button variant={variant} size="lg">
                {variant} lg
              </Button>
              <Button variant={variant} disabled>
                disabled
              </Button>
            </div>
          ))}
        </div>
      </Section>

      <Section id="links" title="Links">
        <div className="flex flex-wrap gap-6">
          <TextLink href="/empreendimentos">Link interno</TextLink>
          <TextLink href="https://wa.me/5531984663280" external>
            Link externo
          </TextLink>
        </div>
      </Section>

      <Section id="badges" title="Badges">
        <div className="flex flex-wrap gap-3">
          <Badge>Neutra</Badge>
          {DEVELOPMENT_STATUSES.map((status) => (
            <Badge key={status} status={status} />
          ))}
        </div>
      </Section>

      <Section id="cards" title="Cards & Development card">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-ink">Card simples</h3>
            <p className="mt-2 text-ink-soft">
              Superfície com borda, raio e sombra derivados de tokens.
            </p>
          </Card>
          <Card as="article" className="overflow-hidden">
            <Image
              src="/brand/grupo-natus-principal.png"
              alt="Exemplo de empreendimento"
              width={1246}
              height={251}
              className="h-40 w-full bg-surface-muted object-contain p-6"
            />
            <div className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-ink">
                  Empreendimento exemplo
                </h3>
                <Badge status="em_construcao" />
              </div>
              <p className="text-sm text-muted-foreground">Belo Horizonte/MG</p>
              <Button className="mt-4 w-full">Ver empreendimento</Button>
            </div>
          </Card>
        </div>
      </Section>

      <Section id="progresso" title="Progresso da obra (prévia — Epic 4)">
        <div className="max-w-md">
          <div className="mb-1 flex justify-between text-sm text-ink">
            <span>Fundação</span>
            <span>65%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-surface-muted">
            <div className="h-full w-[65%] rounded-full bg-status-em-construcao" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Componente real (ProgressBar/Timeline) chega na Epic 4.
          </p>
        </div>
      </Section>

      <Section id="formularios" title="Formulários (prévia — Epic 5)">
        <div className="grid max-w-md gap-4">
          <label className="flex flex-col gap-1 text-sm text-ink">
            Nome
            <input
              className="rounded-md border border-border px-3 py-2"
              placeholder="Seu nome"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-ink">
            Mensagem
            <textarea
              className="rounded-md border border-border px-3 py-2"
              rows={3}
              placeholder="Sua mensagem"
            />
          </label>
          <p className="text-xs text-muted-foreground">
            Primitivos acessíveis reais (Input/Select/Textarea) chegam na Epic 5.
          </p>
        </div>
      </Section>

      <Section id="galeria" title="Galeria & tratamento de imagem">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {["principal", "negativa", "preta"].map((variant) => (
            <div
              key={variant}
              className="overflow-hidden rounded-lg border border-border bg-surface-muted"
            >
              <Image
                src={`/brand/grupo-natus-${variant}.png`}
                alt={`Marca Grupo Natus — ${variant}`}
                width={1246}
                height={251}
                className="h-28 w-full object-contain p-4"
              />
            </div>
          ))}
        </div>
      </Section>

      <Section id="mapa" title="Mapa (localização)">
        <div className="flex h-48 max-w-xl items-center justify-center rounded-lg border border-dashed border-border bg-surface-muted text-muted-foreground">
          Embed do Google Maps por empreendimento (Epic 3).
        </div>
      </Section>

      <Section id="interativos" title="Interativos (Accordion & Modal)">
        <ShowcaseInteractive />
      </Section>

      <Section id="motion" title="Princípios de motion">
        <ul className="max-w-2xl list-disc space-y-2 pl-6 text-ink-soft">
          <li>Reforça hierarquia e storytelling, nunca decorativo.</li>
          <li>
            Transições curtas com easing de marca (<code>--ease-brand</code>);
            durações via tokens.
          </li>
          <li>Respeita <code>prefers-reduced-motion</code>.</li>
          <li>Sem parallax indiscriminado; protege Core Web Vitals.</li>
        </ul>
      </Section>

      <Section id="cta" title="Chamada para ação">
        <Card className="flex flex-col items-start gap-4 bg-navy-600 p-8 text-navy-50 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">
              Encontre seu próximo imóvel
            </h3>
            <p className="text-navy-100">Fale com o time do Grupo Natus.</p>
          </div>
          <Button>Falar no WhatsApp</Button>
        </Card>
      </Section>
    </main>
  );
}
