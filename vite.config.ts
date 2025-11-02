import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { viteMockServe } from "vite-plugin-mock";
// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/variable.scss" as *;',
        },
      },
    },
    plugins: [
      vue(),
      vueDevTools(),
      viteMockServe({
        mockPath: "mock",
        localEnabled: command === "serve",
      }),
    ],
  };
});
