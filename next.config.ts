import type { NextConfig } from "next";
import { toNextRedirects } from "./content/redirects";

/**
 * Cabeçalhos de segurança em todas as respostas. Sem CSP por ora: o Google
 * Maps (JS API + iframe) e os scripts inline do Next exigiriam uma política
 * com nonce — fica para quando entrar GA4/Pixel. HSTS sem includeSubDomains
 * para não afetar outros subdomínios da empresa.
 */
export const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Não anuncia "X-Powered-By: Next.js".
  poweredByHeader: false,
  images: {
    // AVIF primeiro: na tela, igual ao WEBP com cerca de metade dos bytes
    // (conferido nos renders do Solar v2). Navegador sem AVIF recebe WEBP.
    formats: ["image/avif", "image/webp"],
    // Padrão do Next + 2560: sem ele, quem precisa de 2100–2560 px (hero no
    // celular 3×, palco em tela 2×) saltava de 2048 direto para 3840.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    // 75 é o padrão do Next; 90 nas fotos grandes (hero, resumo, MCMV); 100
    // no palco da galeria e no lightbox. Em AVIF o Next escala ×50/80 (90 →
    // 56, 100 → 63). Qualquer `quality` fora desta lista é recusado.
    qualities: [75, 90, 100],
  },
  // URLs do WordPress antigo → páginas novas (content/redirects.ts).
  async redirects() {
    return toNextRedirects();
  },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
