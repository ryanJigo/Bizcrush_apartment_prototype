import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  publicDir: false,
  server: {
    port: 5173,
    strictPort: false,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
