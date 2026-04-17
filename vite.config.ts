import path from "path";
import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createSvg } from "./src/icons/index";

// https://vitejs.dev/config/
export default ({ mode }: { mode: any }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [vue(), vueJsx(), createSvg(path.resolve(__dirname, "./src/icons/svg/"))],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },

    server: {
      proxy: {
        "/api": {
          // target:"http://8npk2n.natappfree.cc", //跨域地址
          target: env.VITE_BASE_URL,
          changeOrigin: true, //支持跨域
          rewrite: (path) => path.replace(/^\/api/, ""), //重写路径,替换/api
        },
      },
    },
  });
};
