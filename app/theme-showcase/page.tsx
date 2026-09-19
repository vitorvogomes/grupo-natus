import type { Metadata } from "next";
import {
  BedDouble,
  Check,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Play,
  ZoomIn,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Image } from "@/components/ui/Image";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { TextLink } from "@/components/ui/TextLink";
import { ProgressTimeline } from "@/features/developments/ProgressTimeline";
import { ShowcaseInteractive } from "@/components/showcase/ShowcaseInteractive";
import { Logo } from "@/components/Logo";
import {
  DEVELOPMENT_STATUSES,
  type ConstructionProgress,
} from "@/types/development";

const ICONS = [
  { Icon: MapPin, name: "MapPin" },
  { Icon: BedDouble, name: "BedDouble" },
  { Icon: Check, name: "Check" },
  { Icon: Phone, name: "Phone" },
  { Icon: Mail, name: "Mail" },
  { Icon: MessageCircle, name: "MessageCircle" },
  { Icon: ZoomIn, name: "ZoomIn" },
  { Icon: ChevronDown, name: "ChevronDown" },
  { Icon: Clock, name: "Clock" },
  { Icon: Play, name: "Play" },
] as const;

const SHOWCASE_PROGRESS: ConstructionProgress = {
  overallPercentage: 62,
  updatedAt: "2026-08-01T00:00:00.000Z",
  isPreview: true,
  stages: [
    { name: "Terraplanagem", percentage: 100, order: 1 },
    { name: "Infraestrutura", percentage: 100, order: 2 },
    { name: "Fundações", percentage: 100, order: 3 },
    { name: "Estrutura", percentage: 70, order: 4 },
    { name: "Instalações", percentage: 35, order: 5 },
    { name: "Revestimento", percentage: 10, order: 6 },
    { name: "Acabamentos", percentage: 0, order: 7 },
  ],
};

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
        <div className="flex flex-col gap-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border p-6">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Títulos — Fraunces (serifa)
              </p>
              <p className="mt-2 font-heading text-4xl font-semibold text-ink">
                Grupo Natus
              </p>
              <p className="font-heading text-lg text-ink-soft">
                Incorporação & engenharia
              </p>
            </div>
            <div className="rounded-lg border border-border p-6">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Corpo — Inter (sans)
              </p>
              <p className="mt-2 text-base text-ink">
                Texto de leitura, rótulos e interface. Legível em qualquer
                tamanho, com bom contraste sobre as superfícies claras da marca.
              </p>
            </div>
          </div>
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
        </div>
      </Section>

      <Section id="icones" title="Ícones (lucide)">
        <p className="mb-4 max-w-2xl text-sm text-ink-soft">
          Biblioteca única de ícones (lucide-react), importada por nome
          (tree-shaking). Sem emojis/glifos em nenhuma superfície.
        </p>
        <div className="flex flex-wrap gap-3">
          {ICONS.map(({ Icon, name }) => (
            <div
              key={name}
              className="flex w-24 flex-col items-center gap-2 rounded-lg border border-border p-3 text-center"
            >
              <Icon aria-hidden="true" className="size-6 text-brand-strong" />
              <span className="text-xs text-muted-foreground">{name}</span>
            </div>
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
          {/* Variante para superfícies escuras (hero navy). */}
          <div className="flex flex-wrap items-center gap-4 rounded-lg bg-navy-600 p-4">
            <Button variant="outlineInverse" size="sm">
              outlineInverse sm
            </Button>
            <Button variant="outlineInverse" size="md">
              outlineInverse md
            </Button>
            <Button variant="outlineInverse" size="lg">
              outlineInverse lg
            </Button>
          </div>
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

      <Section id="progresso" title="Progresso da obra">
        <div className="max-w-2xl">
          <ProgressTimeline progress={SHOWCASE_PROGRESS} />
          <p className="mt-4 text-xs text-muted-foreground">
            Componente real (Radix Progress, somente leitura). Percentuais aqui
            são ilustrativos — dados reais por empreendimento.
          </p>
        </div>
      </Section>

      <Section id="formularios" title="Formulários">
        <div className="grid max-w-md gap-4">
          <Input
            id="showcase-nome"
            label="Nome"
            placeholder="Seu nome"
            required
          />
          <Select
            id="showcase-assunto"
            label="Assunto"
            placeholder="Selecione"
            options={[
              { value: "compra", label: "Quero comprar" },
              { value: "terreno", label: "Negociar meu terreno" },
            ]}
          />
          <Textarea
            id="showcase-mensagem"
            label="Mensagem"
            rows={3}
            placeholder="Sua mensagem"
          />
          <Input
            id="showcase-email-erro"
            label="Email"
            defaultValue="invalido"
            error="Email inválido."
          />
          <p className="text-xs text-muted-foreground">
            Primitivos acessíveis reais (Input/Select/Textarea) — validação via
            react-hook-form + zod no LeadForm. Filtros do catálogo usam Radix
            Select.
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
