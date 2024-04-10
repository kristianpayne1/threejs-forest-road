import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/threejs-forest-road/",
    plugins: [react(), glsl()],
    build: {
        chunkSizeWarningLimit: 3000,
    },
    assetsInclude: ["**/*.glb"],
});
