import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const scanDirs = ["app", "components", "features"];

function collectTsx(dir: string): string[] {
  let out: string[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out = out.concat(collectTsx(full));
    } else if (/\.tsx$/.test(entry) && !/\.(test|spec)\.tsx$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

// Cor crua = hex (#abc/#aabbcc) ou rgb()/hsl() literais fora dos tokens.
const RAW_COLOR = /#[0-9a-fA-F]{3,8}\b|\b(?:rgb|rgba|hsl|hsla)\(/;

describe("Convenção AD-7: estilo só via design tokens", () => {
  const files = scanDirs.flatMap((d) => collectTsx(join(root, d)));

  it("nenhum componente usa cor crua (hex/rgb/hsl) — deve derivar dos tokens", () => {
    const offenders: string[] = [];
    for (const file of files) {
      const content = readFileSync(file, "utf8");
      content.split("\n").forEach((line, i) => {
        if (RAW_COLOR.test(line)) {
          offenders.push(`${file}:${i + 1}  ${line.trim()}`);
        }
      });
    }
    expect(offenders, `Cores cruas encontradas:\n${offenders.join("\n")}`).toEqual(
      [],
    );
  });
});
