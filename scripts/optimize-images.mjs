/**
 * Otimização de imagens dos empreendimentos (Fase C).
 *
 * Lê os renders originais em `img/<pasta>/` (4K, 6–70 MB) e gera versões web
 * enxutas em `public/empreendimentos/<slug>/` — resize + WEBP ~80%.
 * next/image ainda gera as variantes responsivas em runtime; aqui apenas
 * garantimos que a FONTE não pese dezenas de MB (NFR1 / Core Web Vitals).
 *
 * Uso:  node scripts/optimize-images.mjs [slug]
 *   sem argumento → processa todos os JOBS; com slug → só aquele.
 *
 * Mapeamento arquivo→saída é explícito (JOBS) para não depender da ordem do FS
 * e para manter nomes de arquivo estáveis/limpos. TIFs gigantes ficam de fora.
 */
import { mkdir, stat } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const OUT_ROOT = join(ROOT, "public", "empreendimentos");

// Larguras-alvo por papel: hero/fachada maior; galeria um pouco menor.
const WIDTH = { hero: 2400, gallery: 1920 };
const QUALITY = 80;

/** @type {Record<string, { srcDir: string; images: {src:string; out:string; role?: "hero"|"gallery"}[] }>} */
const JOBS = {
  "follow-savassi": {
    srcDir: "img/Follow Savassi - Belo Horizonte MG",
    images: [
      { src: "0065-OASIS_FACHADA DIURNA _POS PRODUÇÃO.jpg", out: "fachada-diurna", role: "hero" },
      { src: "0065-OASIS_FACHADA NOTURNA CAM 01_4K_POS PRODUÇÃO.jpg", out: "fachada-noturna", role: "hero" },
      { src: "0065-OASIS_VOO DO PASSARO_RV 04.jpg", out: "voo-do-passaro", role: "hero" },
      { src: "0065-ROOFTOP_AREA DA PISCINA_4K_POS.jpg", out: "rooftop-piscina" },
      { src: "0065-ROOFTOP_GOURMET_POS.jpg", out: "rooftop-gourmet" },
      { src: "0065-OASIS_INTERIORES_ACADEMIA_POS.jpg", out: "academia" },
      { src: "0065-OASIS_INTERIORES_HALL_POS.jpg", out: "hall" },
      { src: "0065-OASIS_APARTAMENTO 1001 4k_POS.jpg", out: "apartamento-1001" },
    ],
  },
};

const KB = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function run() {
  const only = process.argv[2];
  const slugs = only ? [only] : Object.keys(JOBS);

  for (const slug of slugs) {
    const job = JOBS[slug];
    if (!job) {
      console.error(`✗ slug desconhecido: ${slug}`);
      process.exitCode = 1;
      continue;
    }
    const outDir = join(OUT_ROOT, slug);
    await mkdir(outDir, { recursive: true });
    console.log(`\n▸ ${slug} (${job.images.length} imagens)`);

    for (const img of job.images) {
      const srcPath = join(ROOT, job.srcDir, img.src);
      const outPath = join(outDir, `${img.out}.webp`);
      const width = WIDTH[img.role === "hero" ? "hero" : "gallery"];
      const before = (await stat(srcPath)).size;

      await sharp(srcPath)
        .rotate() // respeita orientação EXIF
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outPath);

      const after = (await stat(outPath)).size;
      const saved = Math.round((1 - after / before) * 100);
      console.log(`  ${img.out}.webp  ${KB(before)} → ${KB(after)}  (-${saved}%)`);
    }
  }
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
