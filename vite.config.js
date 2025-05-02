import { defineConfig } from "vite";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
  ],
  build: {
    outDir: "lighttag-pr/js",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        content: resolve(__dirname, "src/content.tsx"),
        options: resolve(__dirname, "src/options.ts"),
        popup: resolve(__dirname, "src/popup.ts"),
      },
      output: {
        entryFileNames: "[name].js",
        format: "es",
      },
    },
  },
});
