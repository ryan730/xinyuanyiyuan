import { defineStore } from "pinia";
import { ElComponentSizeType, languageType, settingsStoreType } from "@/types";
import { Local, setHtmlCssVarBySettings } from "@/utils";

export const createSettings = (): settingsStoreType => {
  return {
    themesState: {
      primary: "#40A9FF",
      success: "#67C23A",
      warning: "#E6A23C",
      danger: "#F56C6C",
      info: "#909399",
    },
    fixed: {
      // loginTitle: "乐嘟宠物测试",
      // logoTitle: "乐嘟宠物测试",
      loginTitle: "",
      logoTitle: "",
    },
    config: {
      ElComponentSize: "default",
      hasTagsView: true,
      hasGlobalSettings: true,
      hasSidebarLogo: true,
      hasBreadcrumb: true,
      hasZiTi: true,
      hasSearch: true,
      hasClipboard: true,
      hasLanguage: true,
      isCollapsed: false,
      language: "zh-cn",
    },
  };
};

const loadState = (): settingsStoreType => {
  const themesState = Local.get("themes") || ({} as settingsStoreType["themesState"]);
  const config = (Local.get("config") || {}) as settingsStoreType["config"];
  const settings = createSettings();
  settings.themesState = { ...settings.themesState, ...themesState };
  settings.config = { ...settings.config, ...config };
  setHtmlCssVarBySettings(settings.themesState);
  return settings;
};

export const settingsStore = defineStore("settingsStore", {
  state: loadState,
  actions: {
    // 设置布局配置
    setThemes(themes: Partial<settingsStoreType["themesState"]>) {
      Object.assign(this.themesState, themes);
      Local.set("themes", this.themesState);
    },
    setConfig(config: Partial<settingsStoreType["config"]>) {
      Object.assign(this.config, config);
      Local.set("config", this.config);
    },
    setElementZiTiSize(size: ElComponentSizeType) {
      this.config.ElComponentSize = size;
      Local.set("config", this.config);
    },
    // 设置是否折叠菜单
    setIsCollapsed(isCollapsed: boolean) {
      this.config.isCollapsed = isCollapsed;
      Local.set("config", this.config);
    },
    // 设置语言
    setLanguage(language: languageType) {
      this.config.language = language;
      Local.set("config", this.config);
    },
  },
});
