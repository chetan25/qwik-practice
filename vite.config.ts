import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { qwikReact } from "@builder.io/qwik-react/vite";
import path from "path";
export default defineConfig(() => {
    return {
        plugins: [qwikCity(), qwikVite(), tsconfigPaths(), qwikReact()],
        // resolve: {
        //     alias: {
        //         "react": path.resolve(__dirname, "./node_modules/react"),
        //         "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
        //     },
        // },
        dev: {
            headers: {
                "Cache-Control": "public, max-age=0",
            },
        },
        preview: {
            headers: {
                "Cache-Control": "public, max-age=600",
            },
        },
        optimizeDeps: {
            include: ["@auth/core"],
        }
    };
});
