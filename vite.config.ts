import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: "prompt",
  manifest: {
    short_name: "Dev Keep",
    name: "Access your developer notes 📒 easily",
    icons: [
      {
        src: "https://cdn-icons-png.flaticon.com/512/2965/2965358.png",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/png",
      },
    ],
    start_url: "/",
    display: "standalone",
    theme_color: "#f5c434",
    background_color: "#ffffff",
    orientation: "portrait",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});
