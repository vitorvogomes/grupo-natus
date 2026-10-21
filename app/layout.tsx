import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ConsentProvider } from "@/features/consent/ConsentProvider";
import { CookieBanner } from "@/features/consent/CookieBanner";
import { JsonLd, organizationSchema } from "@/features/seo/jsonLd";
import { SITE_URL, THEME_COLOR } from "@/lib/site";
import { DEFAULT_SHARE_IMAGE, HOME_DESCRIPTION, HOME_TITLE, SITE_NAME } from "@/features/seo/metadata";

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
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: HOME_DESCRIPTION,
  // Padrão para rotas sem metadados próprios; as páginas usam pageMetadata().
  openGraph: {
    siteName: SITE_NAME,
    locale: "pt_BR",
    type: "website",
    images: [DEFAULT_SHARE_IMAGE],
  },
  twitter: { card: "summary_large_image" },
};

// Cor da barra do navegador no celular: o navy institucional.
export const viewport: Viewport = {
  themeColor: THEME_COLOR,
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
        <ConsentProvider>
          <Header />
          <div id="conteudo" className="flex-1">
            {children}
          </div>
          <Footer />
          <WhatsAppButton />
          <CookieBanner />
        </ConsentProvider>
      </body>
    </html>
  );
}
