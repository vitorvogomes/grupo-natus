import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd, organizationSchema } from "@/features/seo/jsonLd";
import { SITE_URL } from "@/lib/site";

// Inter (corpo) + Fraunces (títulos/display, serifa) — identidade tipográfica
// premium via next/font (self-hosted, font-display: swap, fallback com métricas).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
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
    <html lang="pt-BR" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col">
        <JsonLd data={organizationSchema()} />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <div id="conteudo" className="flex-1">
          {children}
        </div>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
