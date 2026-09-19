/**
 * Otimização de imagens dos empreendimentos (Fase C).
 *
 * Lê os originais em `img/<pasta>/` (renders 4K, fotos, plantas) e gera versões
 * web enxutas em `public/empreendimentos/<slug>/` — resize + WEBP q86.
 * next/image ainda gera as variantes responsivas em runtime; aqui garantimos
 * que a FONTE não pese dezenas de MB (NFR1 / Core Web Vitals).
 *
 * Uso:  node scripts/optimize-images.mjs [slug ...]
 *   sem argumento → processa todos os JOBS; com slugs → só aqueles.
 *
 * Mapeamento arquivo→saída é explícito (JOBS). `role: "hero"` usa lado maior
 * maior; webp já otimizado (<300 KB) é copiado sem re-encode (evita 2ª perda).
 */
import { mkdir, stat, copyFile } from "node:fs/promises";
import { extname, join } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const OUT_ROOT = join(ROOT, "public", "empreendimentos");

const MAX_SIDE = { hero: 3000, gallery: 2560 };
const QUALITY = 86;
const PASSTHROUGH_MAX = 300 * 1024; // webp já pequeno: copia sem re-encode

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
      { src: "0065-OASIS_INTERIORES_AP 1003_4K_POS.jpg", out: "apartamento-1003" },
      { src: "0065-OASIS_INTERIORES_APARTAMNETO 303_POS.jpg", out: "apartamento-303" },
      { src: "0065-OASIS_INTERIORES_SUITE 702_POS.jpg", out: "suite-702" },
      { src: "0065-ROOFTOP_AREA DO TERRAÇO_4K.jpg", out: "rooftop-terraco" },
    ],
  },

  "torres-da-lagoa": {
    srcDir: "img/Torres da Lagoa - Lagoa Santa MG",
    images: [
      { src: "Externa-FachadaBloco.webp", out: "fachada", role: "hero" },
      { src: "Externa-Piscina.webp", out: "piscina" },
      { src: "Externa-EspacoGourmet.webp", out: "espaco-gourmet" },
      { src: "Externa-Guarita.webp", out: "guarita" },
      { src: "Interna-Sala.webp", out: "sala" },
      { src: "Interna-Cozinha.webp", out: "cozinha" },
      { src: "Interna-Quarto01.webp", out: "quarto" },
      { src: "Interna-VarandaGourmet.webp", out: "varanda-gourmet" },
      { src: "Planta-Tipo_SemCota_R01-1.webp", out: "planta-tipo" },
    ],
  },

  "viver-mais": {
    srcDir: "img/Viver Mais - Itaborai RJ",
    images: [
      { src: "pic-imovei-itaborai-1.jpeg", out: "lazer", role: "hero" },
      { src: "pic-imovei-itaborai-2.jpeg", out: "perspectiva-2" },
      { src: "pic-imovei-itaborai-3.jpeg", out: "perspectiva-3" },
      { src: "pic-imovei-itaborai-4.jpeg", out: "perspectiva-4" },
      { src: "pic-imovei-itaborai-5.jpeg", out: "perspectiva-5" },
      { src: "pic-imovei-itaborai-6.jpeg", out: "perspectiva-6" },
      { src: "Viver_Mais_01.jpg", out: "obra-1" },
      { src: "Viver_Mais_02.jpg", out: "obra-2" },
      { src: "pic-vivermais-estrutura-1.jpg", out: "obra-estrutura-1" },
      { src: "pic-obra-viver-mais-2.jpeg", out: "obra-3" },
    ],
  },

  "residencial-denver": {
    srcDir: "img/Residencial Denver - Belo Horizonte MG",
    images: [
      { src: "pic-gal-denver-1.webp", out: "perspectiva-1", role: "hero" },
      { src: "pic-gal-denver-2.jpg", out: "perspectiva-2" },
      { src: "pic-gal-denver-3.webp", out: "perspectiva-3" },
      { src: "pic-gal-denver-4.jpg", out: "perspectiva-4" },
      { src: "pic-gal-denver-5.jpg", out: "perspectiva-5" },
      { src: "pic-gal-denver-6.jpg", out: "perspectiva-6" },
    ],
  },

  gutierrez: {
    srcDir: "img/Gutierrez - Belo Horizonte MG",
    images: [
      { src: "2023-137-MAQUETE V02 2.jpg.jpeg", out: "maquete-1", role: "hero" },
      { src: "2023-137-MAQUETE V02 3.jpg.jpeg", out: "maquete-2" },
      { src: "2023-137-MAQUETE V02 4.jpg.jpeg", out: "maquete-3" },
      { src: "2023-137-MAQUETE V02 5.jpg.jpeg", out: "maquete-4" },
      { src: "2023-137-MAQUETE V02 6.jpg.jpeg", out: "maquete-5" },
      { src: "2023-137-MAQUETE V02 7.jpg.jpeg", out: "maquete-6" },
    ],
  },

  "golden-ville-residence": {
    srcDir: "img/Residencial Golden Ville - Sao Goncalo RJ",
    images: [
      { src: "EXTERNA/Fachada1_ALTA_R04.jpg", out: "fachada", role: "hero" },
      { src: "EXTERNA/Piscina_ALTA_R00.png", out: "piscina" },
      { src: "EXTERNA/Academia1_ALTA_R03.jpg", out: "academia" },
      { src: "EXTERNA/SalãoDeFestas1_ALTA_R00.png", out: "salao-de-festas" },
      { src: "EXTERNA/Churrasqueira1_ALTA_R00.png", out: "churrasqueira" },
      { src: "APTOS/AptoPonta_Sala1_ALTA_R00.png", out: "sala" },
      { src: "APTOS/AptoPonta_Quarto01_ALTA_R01.jpg", out: "quarto" },
      { src: "APTOS/Apto Ponta_Cozinha_ALTA_R00.png", out: "cozinha" },
      { src: "PLANTAS HUMANIZADAS/Planta Humanizada_Tipo01_Sem Cota_R00.jpg", out: "planta-tipo" },
      { src: "PLANTAS HUMANIZADAS/Térreo Humanizado_R00.jpg", out: "planta-terreo" },
    ],
  },

  "residenziale-colonnello-figueiredo": {
    srcDir: "img/Residenziale Colonnello Figueiredo - Nova Lima MG",
    images: [
      { src: "REZIDENZIALE-COLONNELLO-FIGUEREDO_FACHADA-5.jpg", out: "fachada", role: "hero" },
      { src: "Colonnello_Figueiredo_1.jpg", out: "fachada-rua" },
      { src: "COBERTURA-REZIDENZIALE-COLONNELLO-FIGUEREDO_FACHADA-11.jpg", out: "cobertura-fachada" },
      { src: "REZIDENZIALE-COLONNELLO-FIGUEREDO_COBERTURA-1-.jpg", out: "cobertura" },
      { src: "REZIDENZIALE-COLONNELLO-FIGUEREDO_SALA-DE-ESTAR-5.jpg", out: "sala-de-estar" },
      { src: "REZIDENZIALE-COLONNELLO-FIGUEREDO_SALA-DE-ESTAR-4.png", out: "sala-de-estar-2" },
      { src: "PLANTA-3-QUARTOS.jpg", out: "planta-3-quartos" },
      { src: "PLANTA-DOIS-QUARTOS.jpeg", out: "planta-2-quartos" },
    ],
  },
};

const KB = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function run() {
  const requested = process.argv.slice(2);
  const slugs = requested.length ? requested : Object.keys(JOBS);

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
      const before = (await stat(srcPath)).size;

      if (extname(img.src).toLowerCase() === ".webp" && before <= PASSTHROUGH_MAX) {
        await copyFile(srcPath, outPath);
        console.log(`  ${img.out}.webp  ${KB(before)}  (copiado — já otimizado)`);
        continue;
      }

      const maxSide = MAX_SIDE[img.role === "hero" ? "hero" : "gallery"];
      await sharp(srcPath)
        .rotate()
        .resize({ width: maxSide, height: maxSide, fit: "inside", withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6 })
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
