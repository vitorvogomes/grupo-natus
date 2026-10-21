/**
 * Confere os redirects do site antigo contra um servidor rodando.
 *
 *   npm run build && npm start        # num terminal
 *   npm run check:redirects            # noutro (ou: node scripts/check-redirects.mjs https://…)
 *
 * Para cada URL antiga, com e sem barra final: segue os redirects (até 3),
 * exige que todos sejam permanentes (301/308), que terminem no destino da
 * tabela e que o destino responda 200.
 */
import { LEGACY_REDIRECTS } from "../content/redirects.ts";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
let failures = 0;

async function follow(path) {
  const hops = [];
  let url = new URL(path, base);
  for (let i = 0; i < 4; i++) {
    const res = await fetch(url, { redirect: "manual" });
    if (res.status < 300 || res.status >= 400) return { hops, final: url, status: res.status };
    hops.push(res.status);
    url = new URL(res.headers.get("location"), url);
  }
  return { hops, final: url, status: "loop" };
}

for (const { from, to } of LEGACY_REDIRECTS) {
  for (const path of [from, `${from}/`]) {
    const { hops, final, status } = await follow(path);
    const permanent = hops.length > 0 && hops.every((s) => s === 301 || s === 308);
    const ok = permanent && final.pathname === new URL(to, base).pathname && status === 200;
    if (!ok) failures++;
    console.log(`${ok ? "✓" : "✗"} ${path} → ${final.pathname} (${hops.join("→") || "sem redirect"}, ${status})`);
  }
}

console.log(failures ? `\n${failures} falha(s).` : `\nTodos os ${LEGACY_REDIRECTS.length * 2} caminhos ok.`);
process.exitCode = failures ? 1 : 0;
