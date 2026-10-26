/**
 * Otimização de imagens dos empreendimentos (Fase C).
 *
 * Lê os originais em `img/<pasta>/` (renders 4K, fotos, plantas) e gera versões
 * web em `public/empreendimentos/<slug>/`. next/image ainda gera as variantes
 * responsivas em runtime; aqui garantimos que a FONTE não pese dezenas de MB
 * (NFR1 / Core Web Vitals) sem gastar a definição que ela tem.
 *
 * O arquivo em public/ é a FONTE do next/image, não o que o visitante baixa:
 * o Next redimensiona e re-codifica (AVIF/WEBP) a cada largura pedida.
 * Medido nos renders do Solar v2 (2026-10-21): subir a fonte de q86 para
 * q92 rende ~0,5 dB na entrega; guardar quase sem perda (near-lossless)
 * rende 2–3 dB a mais, mas sem diferença visível na tela e com 4–5× o peso
 * (public/ iria de 36 para 162 MB). Fica q92.
 *
 * Duas faixas, escolhidas pelo tamanho do original (sem ajuste manual):
 *   - alta: lado maior ≥ o alvo do papel (renders 4K/5K) → reduz ao alvo, q92.
 *   - compacta: original menor que o alvo → tamanho nativo (nunca amplia).
 *     Fonte sem perda (PNG/TIFF) vai em q95: sem margem para reduzir, cada
 *     perda aparece. Fonte já comprimida (JPEG/WEBP pequenos) fica no q86:
 *     um q95 só guardaria os artefatos dela com 50–75% mais bytes.
 *     O relatório lista as compactas: é onde a fonte limita a nitidez.
 * `quality`/`sharpen` por imagem só como override.
 *
 * Ao fim, apaga o cache do otimizador do Next (.next/cache/images e
 * .next/dev/cache/images): ele guarda as variantes por URL e, como o nome do
 * arquivo não muda ao trocar a foto, continuaria servindo a imagem antiga.
 *
 * Uso:  node scripts/optimize-images.mjs [slug ...]
 *   sem argumento → processa todos os JOBS; com slugs → só aqueles.
 *   `manifest` → só regera o manifesto de dimensões (sempre regerado no fim).
 *
 * Mapeamento arquivo→saída é explícito (JOBS). `role: "hero"` usa lado maior
 * maior; webp já otimizado (<300 KB) é copiado sem re-encode (evita 2ª perda).
 */
import { mkdir, stat, copyFile, readdir, rm, writeFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const OUT_ROOT = join(ROOT, "public", "empreendimentos");

const MAX_SIDE = { hero: 3000, gallery: 2560 };
const QUALITY = 92; // faixa alta
const COMPACT_QUALITY = 95; // faixa compacta, fonte sem perda
const COMPACT_LOSSY_QUALITY = 86; // faixa compacta, fonte já comprimida
const LOSSLESS_SOURCES = new Set([".png", ".tif", ".tiff"]);
const PASSTHROUGH_MAX = 300 * 1024; // webp já pequeno: copia sem re-encode

/**
 * `quality` por imagem sobrescreve a da faixa; `sharpen` é opcional.
 * @type {Record<string, { srcDir: string; images: {src:string; out:string; role?: "hero"|"gallery"; quality?: number; sharpen?: boolean}[] }>}
 */
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

  "solar-manilha": {
    srcDir: "img/Solar Manilha - Itaborai RJ",
    // Remessa v2 (Humanizadas - v2, 5504 px): as 13 cenas refeitas com gente
    // caem na faixa alta. O resto (1448–2111 px) segue na compacta.
    images: [
      { src: "Humanizadas - v2/solar 7.png", out: "acesso-principal", role: "hero" },
      { src: "Imagem Aérea.png", out: "vista-aerea", role: "hero" },
      { src: "Humanizadas - v2/solar6.png", out: "portaria" },
      { src: "Humanizadas - v2/solar8.png", out: "quadras" },
      { src: "Humanizadas - v2/solar 9.png", out: "espaco-criancas" },
      { src: "Humanizadas - v2/Solar 15.png", out: "salao-de-festas" },
      { src: "Humanizadas - v2/solar 10.png", out: "salao-de-festas-interno" },
      { src: "Humanizadas - v2/solar 11.png", out: "piscinas" },
      { src: "Imagens Externas - Condominio/08 - Quiosque e Academia Aberta.png", out: "quiosque-academia" },
      { src: "Humanizadas - v2/solar 3.png", out: "academia-aberta" },
      { src: "Humanizadas - v2/Solar 16.png", out: "quiosques-piscina" },
      { src: "Imagens Externas - Condominio/11 - Bicicletário.png", out: "bicicletario" },
      { src: "Imagens Externas - Condominio/12 - Redário.png", out: "redario" },
      { src: "Humanizadas - v2/solar 2.png", out: "redario-2" },
      { src: "Humanizadas - v2/solar 1.png", out: "pet-place" },
      { src: "Humanizadas - v2/solar5.png", out: "sala-de-estar" },
      { src: "Imagens Internas/02.png", out: "sala-de-jantar" },
      { src: "Imagens Internas/03.png", out: "cozinha-jantar" },
      { src: "Humanizadas - v2/solar 4.png", out: "cozinha-garden" },
      { src: "Imagens Internas/05.png", out: "area-de-servico-garden" },
      { src: "Imagens Internas/06.png", out: "garden" },
      { src: "Imagens Internas/07.png", out: "quarto-casal" },
      { src: "Imagens Internas/08.png", out: "quarto-casal-2" },
      { src: "Imagens Internas/09.png", out: "quarto" },
      { src: "Imagens Internas/10.png", out: "home-office" },
      { src: "Imagens Internas/Apto tipo 01.png", out: "apto-tipo-jantar" },
      { src: "Imagens Internas/apto tipo 02.png", out: "apto-tipo-cozinha" },
      // Imagem do "O que oferece": vista em recorte grande, então vai com
      // qualidade máxima e nitidez leve (fonte de 1536 px).
      { src: "Imagens Internas/apto tipo 03.png", out: "apto-tipo-vista", quality: 98, sharpen: true },
      { src: "Imagens Internas/apto tipo 04.png", out: "apto-tipo-quarto-casal" },
      { src: "Imagens Internas/Apto tipo 05.png", out: "apto-tipo-quarto" },
      { src: "Imagens Internas/Apto tipo 06.png", out: "apto-tipo-banheiro" },
      { src: "Plantas Humanizadas/Planta_Apartamento Tipo.png", out: "planta-apartamento-tipo" },
      { src: "Plantas Humanizadas/Planta_Garden.jpg", out: "planta-garden" },
      { src: "Implantação 2D.png", out: "implantacao", role: "hero" },
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

// Assets avulsos (não ligados a um empreendimento). Rode com o slug "singles".
const SINGLES = [
  {
    // Foto padrão do breve lançamento (card, hero e painel mínimo).
    name: "placeholder (breve lançamento)",
    src: "img/breve-lancamento.png",
    out: "public/empreendimentos/breve-lancamento.webp",
    maxSide: 1600,
  },
  {
    // Fachada noturna do Follow Savassi. É um render retrato (3071x3840) num
    // hero em paisagem, então o object-cover mostra só uma faixa: o
    // `object-position` do Hero a fixa na entrada (madeira + lobby + jardim),
    // que é onde o prédio lê como lugar. Centralizada mostraria só parede.
    name: "home hero",
    src: "img/Follow Savassi - Belo Horizonte MG/0065-OASIS_FACHADA NOTURNA CAM 02_4K.jpg",
    out: "public/home/hero.webp",
    maxSide: 3000,
    // Limite na largura (hero largo na tela): pelo lado maior, o retrato
    // ficaria com 2399 px, abaixo dos 2880 de uma tela 2×.
    fitWidth: true,
  },
  {
    // 2560 (e não 2000): o painel da Home renderiza esta foto a ~930 CSS px,
    // o que pede uma variante de 1920 em telas 2x — que deve vir de um
    // original maior, não de uma ampliação.
    name: "home: família (seção Minha Casa Minha Vida)",
    src: "img/home/familia-mcmv.jpg",
    out: "public/home/familia-mcmv.webp",
    maxSide: 2560,
  },
];

// Marca federal do Minha Casa Minha Vida: line-art plano com alfa. O PNG de
// origem (46 KB) é menor que qualquer webp lossless (74 KB) e o next/image
// converte na entrega — servimos o PNG direto, como os logos de public/brand/.

// Imagens institucionais (Quem Somos + Engenharia). Rode com o slug "institucional".
const INSTITUTIONAL = [
  // Quem Somos
  {
    name: "quem-somos: parede da recepção (Grupo Natus / ALIATTO | OASI)",
    src: "img/Quem Somos/Quem somos.webp",
    out: "public/quem-somos/hero.webp",
    maxSide: 2560,
  },
  {
    name: "quem-somos: selo ISO 9001:2015",
    src: "img/Quem Somos/certificado.png",
    out: "public/quem-somos/iso-9001.webp",
    maxSide: 1000,
  },
  {
    // Marca do programa federal: plana com alfa → lossless, como os lockups.
    name: "quem-somos: selo PBQP-H",
    src: "img/Quem Somos/logo-PBQPH.png",
    out: "public/quem-somos/pbqp-h.webp",
    maxSide: 600,
    lossless: true,
  },
  // Engenharia — Residência de alto padrão (Alphaville)
  {
    name: "engenharia: residencial (deck/gourmet)",
    src: "img/Servico - Casa Alto Luxo/pic-gal-casa-alphaville-2.webp",
    out: "public/engenharia/residencial-1.webp",
    maxSide: 2560,
  },
  {
    name: "engenharia: residencial (piscina/mata)",
    src: "img/Servico - Casa Alto Luxo/pic-gal-casa-alphaville-5.jpeg",
    out: "public/engenharia/residencial-2.webp",
    maxSide: 2560,
  },
  {
    name: "engenharia: residencial (fachada entardecer)",
    src: "img/Servico - Casa Alto Luxo/pic-gal-casa-alphaville-3.jpeg",
    out: "public/engenharia/residencial-3.webp",
    maxSide: 2560,
  },
  {
    name: "engenharia: residencial (fachada/garagem)",
    src: "img/Servico - Casa Alto Luxo/pic-gal-casa-alphaville-6.jpeg",
    out: "public/engenharia/residencial-4.webp",
    maxSide: 2560,
  },
  {
    name: "engenharia: residencial (varanda gourmet)",
    src: "img/Servico - Casa Alto Luxo/pic-gal-casa-alphaville-1.jpeg",
    out: "public/engenharia/residencial-5.webp",
    maxSide: 2560,
  },
  {
    name: "engenharia: residencial (cozinha integrada)",
    src: "img/Servico - Casa Alto Luxo/pic-gal-casa-alphaville-4.jpeg",
    out: "public/engenharia/residencial-6.webp",
    maxSide: 2560,
  },
  {
    name: "engenharia: residencial (área gourmet interna)",
    src: "img/Servico - Casa Alto Luxo/pic-gal-casa-alphaville-7.jpeg",
    out: "public/engenharia/residencial-7.webp",
    maxSide: 2560,
  },
  // Engenharia — Loteamento / condomínio (Avenida)
  {
    name: "engenharia: loteamento (masterplan)",
    src: "img/Servico - Avenida Condominio/projeto-copiar.webp",
    out: "public/engenharia/loteamento-1.webp",
    maxSide: 2560,
  },
  {
    name: "engenharia: loteamento (infraestrutura viária)",
    src: "img/Servico - Avenida Condominio/pic-rua-castella.webp",
    out: "public/engenharia/loteamento-2.webp",
    maxSide: 2560,
  },
  // Engenharia — Galpão comercial
  {
    name: "engenharia: comercial (galpão frente)",
    src: "img/Servico - Galpão Comercial/1.jpg",
    out: "public/engenharia/comercial-1.webp",
    maxSide: 2560,
  },
  {
    name: "engenharia: comercial (galpão lateral)",
    src: "img/Servico - Galpão Comercial/2.jpg",
    out: "public/engenharia/comercial-2.webp",
    maxSide: 2560,
  },
  {
    name: "engenharia: comercial (interior do galpão)",
    src: "img/Servico - Galpão Comercial/IMG-20230801-WA0062.jpg",
    out: "public/engenharia/comercial-3.webp",
    maxSide: 2560,
  },
];

const KB = (bytes) => `${Math.round(bytes / 1024)} KB`;

/**
 * Marcador do Grupo Natus para o mapa (seção Localização do empreendimento).
 *
 * O "N" é o símbolo oficial (img/LOGOS/Favicon) e entra sem recorte,
 * recoloração ou distorção — a moldura navy com ponteira é só o invólucro de
 * marcador, do mesmo jeito que um pin de mapa emoldura qualquer logotipo.
 * `trim()` remove a margem transparente do arquivo de origem para que o
 * símbolo fique opticamente centrado, e não centrado pela caixa.
 *
 * Sai em 2x (204x252) e é declarado a 102x126 CSS no componente.
 */
async function buildMapPin() {
  console.log("\n▸ brand: pin do mapa");
  const SIZE = 192; // lado do quadrado arredondado
  const PAD = 6; // folga para o contorno branco não ser cortado
  const TAIL = 44; // altura da ponteira
  const RADIUS = 52;
  const W = SIZE + PAD * 2;
  const H = SIZE + TAIL + PAD * 2;

  const shape = `M ${RADIUS},0
    H ${SIZE - RADIUS} A ${RADIUS},${RADIUS} 0 0 1 ${SIZE},${RADIUS}
    V ${SIZE - RADIUS} A ${RADIUS},${RADIUS} 0 0 1 ${SIZE - RADIUS},${SIZE}
    H ${SIZE / 2 + 20} L ${SIZE / 2},${SIZE + TAIL} L ${SIZE / 2 - 20},${SIZE}
    H ${RADIUS} A ${RADIUS},${RADIUS} 0 0 1 0,${SIZE - RADIUS}
    V ${RADIUS} A ${RADIUS},${RADIUS} 0 0 1 ${RADIUS},0 Z`;

  // navy-600 (#243c54) com contorno branco: o pin precisa ler tanto sobre o
  // cinza do mapa quanto sobre o verde dos parques e o azul da água.
  const frame = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <g transform="translate(${PAD},${PAD})">
        <path d="${shape}" fill="#243c54" stroke="#ffffff" stroke-width="10"
              stroke-linejoin="round" paint-order="stroke" />
      </g>
    </svg>`,
  );

  try {
    const MARK = 104;
    const mark = await sharp(join(ROOT, "img/LOGOS/Favicon/favicon-natus-beige.png"))
      .trim()
      .resize({ width: MARK, height: MARK, fit: "inside" })
      .toBuffer();
    const { height: markH = MARK, width: markW = MARK } =
      await sharp(mark).metadata();

    const outPath = join(ROOT, "public/brand/pin-natus.png");
    await mkdir(join(outPath, ".."), { recursive: true });
    await sharp(frame)
      .composite([
        {
          input: mark,
          left: Math.round(PAD + (SIZE - markW) / 2),
          top: Math.round(PAD + (SIZE - markH) / 2),
        },
      ])
      .png({ compressionLevel: 9 })
      .toFile(outPath);
    const after = (await stat(outPath)).size;
    console.log(`  public/brand/pin-natus.png  ${W}x${H}  ${KB(after)}`);
  } catch (err) {
    console.warn(`  ⚠ pulando o pin do mapa: ${err.message}`);
    process.exitCode = 1;
  }
}

/**
 * Favicon do site a partir do símbolo oficial, sempre sobre o navy. O Next
 * serve app/icon.png e app/favicon.ico como <link rel="icon">, e o Google
 * escolhe qualquer um dos dois para o resultado de busca: os dois saem do
 * mesmo desenho, ou a busca mostra ícones diferentes entre as páginas.
 */
async function buildFavicon() {
  console.log("\n▸ brand: favicon");
  try {
    const mark = (size) =>
      sharp(join(ROOT, "img/LOGOS/Favicon/favicon-natus-beige.png"))
        .resize({ width: size, height: size, fit: "contain", background: { r: 36, g: 60, b: 84, alpha: 1 } })
        .flatten({ background: "#243c54" })
        .png({ compressionLevel: 9 });

    const outPath = join(ROOT, "app/icon.png");
    await mark(192).toFile(outPath);
    console.log(`  app/icon.png  192x192  ${KB((await stat(outPath)).size)}`);

    // ICO com PNGs embutidos (16/32/48; o Google pede múltiplo de 48).
    const sizes = [16, 32, 48];
    const pngs = await Promise.all(sizes.map((s) => mark(s).toBuffer()));
    const header = Buffer.alloc(6 + 16 * sizes.length);
    header.writeUInt16LE(1, 2);
    header.writeUInt16LE(sizes.length, 4);
    let offset = header.length;
    sizes.forEach((s, i) => {
      const entry = 6 + 16 * i;
      header.writeUInt8(s, entry);
      header.writeUInt8(s, entry + 1);
      header.writeUInt16LE(1, entry + 4);
      header.writeUInt16LE(32, entry + 6);
      header.writeUInt32LE(pngs[i].length, entry + 8);
      header.writeUInt32LE(offset, entry + 12);
      offset += pngs[i].length;
    });
    const icoPath = join(ROOT, "app/favicon.ico");
    await writeFile(icoPath, Buffer.concat([header, ...pngs]));
    console.log(`  app/favicon.ico  16/32/48  ${KB((await stat(icoPath)).size)}`);
  } catch (err) {
    console.warn(`  ⚠ pulando o favicon: ${err.message}`);
    process.exitCode = 1;
  }
}

/**
 * Imagens de compartilhamento e de atalho:
 * - public/brand/og-grupo-natus.jpg (1200×630): Open Graph/Twitter padrão das
 *   páginas sem imagem própria — logo negativa sobre o navy institucional.
 *   JPEG porque nem todo leitor de link (LinkedIn, e-mail) aceita WEBP.
 * - app/apple-icon.png (180×180): o Next serve como <link rel="apple-touch-icon">.
 */
async function buildSocialImages() {
  console.log("\n▸ brand: compartilhamento e apple-icon");
  try {
    const W = 1200;
    const H = 630;
    const logo = await sharp(join(ROOT, "public/brand/grupo-natus-negativa.png"))
      .resize({ width: 720 })
      .toBuffer();
    const meta = await sharp(logo).metadata();
    const ogPath = join(ROOT, "public/brand/og-grupo-natus.jpg");
    await sharp({ create: { width: W, height: H, channels: 3, background: "#1d3145" } })
      .composite([{ input: logo, left: Math.round((W - meta.width) / 2), top: Math.round((H - meta.height) / 2) }])
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(ogPath);
    console.log(`  public/brand/og-grupo-natus.jpg  ${W}x${H}  ${KB((await stat(ogPath)).size)}`);

    const applePath = join(ROOT, "app/apple-icon.png");
    const mark = await sharp(join(ROOT, "img/LOGOS/Favicon/favicon-natus-beige.png"))
      .resize({ width: 132, height: 132, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();
    await sharp({ create: { width: 180, height: 180, channels: 3, background: "#243c54" } })
      .composite([{ input: mark, left: 24, top: 24 }])
      .png({ compressionLevel: 9 })
      .toFile(applePath);
    console.log(`  app/apple-icon.png  180x180  ${KB((await stat(applePath)).size)}`);
  } catch (err) {
    console.warn(`  ⚠ pulando as imagens de compartilhamento: ${err.message}`);
    process.exitCode = 1;
  }
}

/** Processa uma lista de assets avulsos (src/out/maxSide explícitos). */
async function optimizeFlat(label, list) {
  console.log(`\n▸ ${label} (${list.length})`);
  for (const item of list) {
    // Um source ausente não pode abortar o lote inteiro (o loop é sequencial).
    try {
      const outPath = join(ROOT, item.out);
      await mkdir(join(outPath, ".."), { recursive: true });
      const before = (await stat(join(ROOT, item.src))).size;
      await sharp(join(ROOT, item.src))
        .rotate()
        .resize(
          item.fitWidth
            ? { width: item.maxSide, withoutEnlargement: true }
            : { width: item.maxSide, height: item.maxSide, fit: "inside", withoutEnlargement: true },
        )
        .webp(item.lossless ? { lossless: true, effort: 6 } : { quality: QUALITY, effort: 6, smartSubsample: true })
        .toFile(outPath);
      const after = (await stat(outPath)).size;
      console.log(`  ${item.out}  ${KB(before)} → ${KB(after)}`);
    } catch (err) {
      console.warn(`  ⚠ pulando "${item.name}" (${item.src}): ${err.message}`);
      process.exitCode = 1;
    }
  }
}

/**
 * Manifesto de dimensões das imagens dos empreendimentos
 * (`content/developments/image-dimensions.json`). O seed anexa largura e
 * altura a cada imagem, e o `sizes` do next/image é calculado a partir da
 * proporção (ver features/developments/coverSizes.ts). Regerado ao fim de
 * toda execução; um teste de conteúdo acusa imagem do seed fora dele.
 */
async function writeDimensionsManifest() {
  const manifest = {};
  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.name.endsWith(".webp")) {
        const { width, height } = await sharp(full).metadata();
        manifest[`/${relative(join(ROOT, "public"), full)}`] = [width, height];
      }
    }
  }
  await walk(OUT_ROOT);
  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  const out = join(ROOT, "content", "developments", "image-dimensions.json");
  await writeFile(out, `${JSON.stringify(sorted, null, 2)}\n`);
  console.log(`\n▸ manifesto: ${Object.keys(sorted).length} imagens → ${relative(ROOT, out)}`);
}

/** Imagens que ficaram na faixa compacta (fonte abaixo do alvo). */
const compact = [];

async function run() {
  const requested = process.argv.slice(2);
  const KEYWORDS = new Set(["singles", "institucional", "brand", "manifest"]);

  if (!requested.length || requested.includes("singles")) {
    await optimizeFlat("singles", SINGLES);
  }
  if (!requested.length || requested.includes("institucional")) {
    await optimizeFlat("institucional", INSTITUTIONAL);
  }
  if (!requested.length || requested.includes("brand")) {
    await buildMapPin();
    await buildFavicon();
    await buildSocialImages();
  }

  const slugs = requested.length
    ? requested.filter((s) => !KEYWORDS.has(s))
    : Object.keys(JOBS);

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
      // Mesmo guard do optimizeFlat: sem ele, um único asset ausente rejeita
      // para fora do run() e leva junto todos os slugs seguintes — e este é o
      // caminho percorrido quando o script roda sem argumentos.
      try {
        const srcPath = join(ROOT, job.srcDir, img.src);
        const outPath = join(outDir, `${img.out}.webp`);
        const before = (await stat(srcPath)).size;

        if (extname(img.src).toLowerCase() === ".webp" && before <= PASSTHROUGH_MAX) {
          await copyFile(srcPath, outPath);
          console.log(`  ${img.out}.webp  ${KB(before)}  (copiado — já otimizado)`);
          continue;
        }

        const maxSide = MAX_SIDE[img.role === "hero" ? "hero" : "gallery"];
        const { width = 0, height = 0 } = await sharp(srcPath).metadata();
        // O hero é largo na tela: o que limita a nitidez é a LARGURA. Um render
        // em retrato (Follow, 3999×5000) reduzido pelo lado maior ficaria com
        // 2399 px de largura — abaixo dos 2880 de um hero em tela 2×.
        const hero = img.role === "hero";
        const high = (hero ? width : Math.max(width, height)) >= maxSide;
        const lossless = LOSSLESS_SOURCES.has(extname(img.src).toLowerCase());
        const quality =
          img.quality ?? (high ? QUALITY : lossless ? COMPACT_QUALITY : COMPACT_LOSSY_QUALITY);
        if (!high) compact.push(`${slug}/${img.out}  ${width}x${height}  q${quality}`);

        let pipeline = sharp(srcPath).rotate();
        if (high) {
          pipeline = pipeline.resize(
            hero ? { width: maxSide } : { width: maxSide, height: maxSide, fit: "inside" },
          );
        }
        // Nitidez leve (sigma baixo) só onde pedido: em render pequeno exibido
        // grande, devolve a definição das bordas sem criar halo.
        if (img.sharpen) pipeline = pipeline.sharpen({ sigma: 0.6 });
        await pipeline
          .webp({ quality, effort: 6, smartSubsample: true })
          .toFile(outPath);

        const after = (await stat(outPath)).size;
        const saved = Math.round((1 - after / before) * 100);
        console.log(`  ${img.out}.webp  ${KB(before)} → ${KB(after)}  (-${saved}%)`);
      } catch (err) {
        console.warn(`  ⚠ pulando ${slug}/${img.out} (${img.src}): ${err.message}`);
        process.exitCode = 1;
      }
    }
  }

  if (compact.length) {
    console.log(`\n▸ faixa compacta (${compact.length}): original abaixo do alvo, servido no tamanho nativo`);
    for (const line of compact) console.log(`  ${line}`);
  }

  await writeDimensionsManifest();
  await clearNextImageCache();
}

/** O cache do next/image é por URL: trocar a foto sem apagá-lo serve a antiga. */
async function clearNextImageCache() {
  for (const dir of [".next/cache/images", ".next/dev/cache/images"]) {
    await rm(join(ROOT, dir), { recursive: true, force: true });
  }
  console.log("▸ cache de imagens do Next apagado (o dev/start regenera as variantes)");
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
