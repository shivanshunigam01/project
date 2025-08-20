import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",   // listen on all interfaces
    port: 5173,        // fixed port
    strictPort: true,  // fail instead of switching to another port
    open: false        // disable auto-open (fixes xdg-open ENOENT error)
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
