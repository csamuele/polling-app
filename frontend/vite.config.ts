import react from "@vitejs/plugin-react-swc"
import path from "path"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "src/components"),
            "@assets": path.resolve(__dirname, "src/assets"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@lib": path.resolve(__dirname, "src/lib"),
            "@hooks": path.resolve(__dirname, "src/hooks"),
        },
    },
    server: {
        port: 3000,
        host: "0.0.0.0",
    },
})
