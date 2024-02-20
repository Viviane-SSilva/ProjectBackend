import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [["src/test/**", "prisma"]],
    dir: "src",
  },
  resolve: {
    alias: [{ find: "@/", replacement: resolve(__dirname, "src") }]
  },
});
