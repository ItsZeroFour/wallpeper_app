import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from "vite-plugin-pwa";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import viteCompression from "vite-plugin-compression";
import path from "path";
// import purgecss from "vite-plugin-purgecss";

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    svgr({
      // exportAsDefault: true,
      svgrOptions: {
        icon: false,
      },
      include: "**/*.svg?react",
      exclude: "**/*.svg",
    }),
    visualizer(),
    VitePWA({ registerType: "autoUpdate" }),
    ViteImageOptimizer({
      webp: {
        quality: 75,
        lossless: false,
      },
      jpeg: {
        quality: 80,
      },
      png: {
        quality: 0.7,
      },
    }),
    viteCompression({ algorithm: "brotliCompress" }),
    // purgecss({
    //   content: [
    //     "./src/**/*.html",
    //     "./src/**/*.jsx",
    //     "./src/**/*.tsx",
    //     "./src/**/*.js",
    //     "./src/**/*.ts",
    //   ],
    //   safelist: ["html", "body", /^bg-/, /^text-/],
    // }),
  ],
  server: {
    hmr: {
      overlay: true,
    },
  },
  build: {
    minify: "esbuild",
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
});
