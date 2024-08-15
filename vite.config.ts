/// <reference types="vitest" />
import { resolve } from "path";
import { defineConfig } from "vite";
// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    setupFiles: "src/setupTests.js",
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "./src"),
      },
      {
        find: "@drawer",
        replacement: resolve(__dirname, "./src/drawer"),
      },
    ],
  },
  build: {
    target: "esnext",
  },
});
