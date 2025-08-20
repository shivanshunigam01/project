import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    open: true, // auto-open in browser
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
    force: true, // force re-bundling once to avoid slow first load
  },
  build: {
    target: "esnext", // skip extra transpilation
    minify: false,    // dev builds are faster without minify
  },
});
