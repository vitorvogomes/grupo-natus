import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd, organizationSchema } from "@/features/seo/jsonLd";
import { SITE_URL } from "@/lib/site";
import { getDevelopmentsGroupedByStatus } from "@/content/developments";

// Inter (corpo) + Outfit (títulos/display, sans geométrica) — a geometria
// circular da Outfit ecoa o logotipo NATUS. Ambas variáveis: um arquivo por
// família via next/font (self-hosted, font-display: swap, fallback métrico).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Grupo Natus",
    template: "%s | Grupo Natus",
  },
  description:
    "Grupo Natus — empreendimentos imobiliários e engenharia. Conheça nossos empreendimentos.",
  openGraph: {
    siteName: "Grupo Natus",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // `data-scroll-behavior="smooth"` declara ao router que o scroll suave do
    // globals.css é intencional (sem isso o Next avisa a cada navegação).
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${outfit.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <JsonLd data={organizationSchema()} />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <Header empreendimentosMenu={getDevelopmentsGroupedByStatus()} />
        <div id="conteudo" className="flex-1">
          {children}
        </div>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
