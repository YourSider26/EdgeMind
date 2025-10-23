import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [sveltekit()],
    server: {
        host: true, // 允许外部访问
        port: 5173,
        strictPort: true,
        allowedHosts: ["dev-gk.gaodun.com"] // 允许的主机名
    }
})
