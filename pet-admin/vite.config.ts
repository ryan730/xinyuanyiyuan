import { defineConfig, loadEnv } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";

export default defineConfig(({ mode }) => {
  const config = loadEnv(mode, "./");
  const { VITE_IGNORE_I18N_WARNING, VITE_PORT, VITE_AUTO_OPEN } = config;
  // 解决警告You are running the esm-bundler build of vue-i18n.
  const extraAlias: { "vue-i18n"?: string } = {};
  if (mode === "development" && !!VITE_IGNORE_I18N_WARNING) extraAlias["vue-i18n"] = "vue-i18n/dist/vue-i18n.cjs.js";
  return {
    base: "/pet-admin/",
    plugins: [
      vue(),
      WindiCSS(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/svg")], // 与本地储存地址一致
        // 指定symbolId格式
        symbolId: "icon-[name]",
      }),
    ],
    server: {
      host: "0.0.0.0",
      port: VITE_PORT as unknown as number,
      open: VITE_AUTO_OPEN,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        api: path.resolve(__dirname, "src/apis"),
        request: path.resolve(__dirname, "src/utils/request"),
        i18n: path.resolve(__dirname, "src/i18n"),
        store: path.resolve(__dirname, "src/store"),
        types: path.resolve(__dirname, "src/types"),
        views: path.resolve(__dirname, "src/views"),
        components: path.resolve(__dirname, "src/components"),
        utils: path.resolve(__dirname, "src/utils"),
        interface: path.resolve(__dirname, "src/interface"),
        ...extraAlias,
      },
    },
    build: {
      outDir: 'dist/pet-admin', //指定输出路径（相对于 项目根目录). 建议使用系统默认
      // assetsDir:'', // 指定生成静态资源的存放路径（相对于 build.outDir）
    }
  };
});
