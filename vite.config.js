import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import ssr from "vite-plugin-ssr/plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ssr({
      prerender: {
        // Pre-render home page and about page at build time
        routes: ["/", "/about"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
  build: {
    // Generate source maps for better debugging
    sourcemap: true,
    // Customize output directory
    outDir: "dist",
    // Optimize dependencies during build
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  // Configure CSS processing
  css: {
    postcss: "./postcss.config.js",
    // Enable CSS modules for component-scoped styles
    modules: {
      scopeBehaviour: "local",
    },
  },
});
