/// <reference types="vitest" />
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
  build: {
    target: "esnext",
  },
});
