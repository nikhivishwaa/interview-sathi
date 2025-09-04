import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/

export default defineConfig({
  optimizeDeps: {
    force: true,
  },
  server: {
    host: true, // This will expose the server to the local network
    historyApiFallback: true,
    watch: {
      usePolling: true, // Important for Docker
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
