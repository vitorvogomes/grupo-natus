import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**", "_bmad/**", "_bmad-output/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      // Na Vitest 5, todo arquivo do `include` é medido por padrão (mesmo sem
      // teste): um source novo sem teste derruba a cobertura e trava o gate.
      // Só medimos o código de aplicação sob TDD.
      include: [
        "app/**/*.{ts,tsx}",
        "components/**/*.{ts,tsx}",
        "features/**/*.{ts,tsx}",
        "lib/**/*.{ts,tsx}",
        "content/**/*.{ts,tsx}",
        "types/**/*.{ts,tsx}",
      ],
      exclude: [
        "**/*.test.{ts,tsx}",
        "**/*.spec.{ts,tsx}",
        "**/*.d.ts",
        // Layout raiz renderiza <html>/<body>: coberto por E2E, não unit.
        "app/layout.tsx",
      ],
      // Piso de 85% (decisão 2026-09-18, ver docs/adr/0001-coverage-85.md):
      // sweet spot deliberado ao adotar shadcn/Radix — branches de portal/
      // pointer têm baixo ROI de cobertura em jsdom. 85% é piso, não teto.
      thresholds: {
        lines: 85,
        functions: 85,
        branches: 85,
        statements: 85,
      },
    },
  },
});
