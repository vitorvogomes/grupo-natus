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
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90,
      },
    },
  },
});
