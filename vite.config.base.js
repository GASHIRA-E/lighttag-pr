import { resolve } from "node:path";
import react from "@vitejs/plugin-react";

export const generateViteConfig = (inputKey, inputPath) => ({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "lighttag-pr/js",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        [inputKey]: resolve(__dirname, inputPath),
      },
      output: {
        entryFileNames: "[name].js",
        format: "iife", // ESモジュールではなくIIFE形式に変更
        inlineDynamicImports: true, // 動的インポートをインライン化
      },
    },
  },
});
