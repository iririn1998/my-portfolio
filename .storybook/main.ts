import type { StorybookConfig } from "@storybook/react-vite";
import type { PluginOption } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/react-vite",
  async viteFinal(config) {
    // Storybook ビルド時に @funstack/static (RSC) プラグインを除外する
    // vite.config.ts で読み込まれる funstackStatic は @vitejs/plugin-rsc に依存しており、
    // Storybook のビルドと競合するため、RSC 関連プラグインをすべて除外する
    const pluginNamesToExclude = new Set([
      "rsc",
      "vite-rsc-load-module-dev-proxy",
      "cjs-module-runner-transform",
    ]);
    const pluginPrefixesToExclude = ["rsc:", "vite:rsc", "vite-rsc", "@funstack/static"];

    const shouldExclude = (name: string): boolean => {
      if (pluginNamesToExclude.has(name)) return true;
      return pluginPrefixesToExclude.some((prefix) => name.startsWith(prefix));
    };

    const filterPlugins = (plugins: PluginOption[]): PluginOption[] => {
      return plugins
        .flatMap((plugin): PluginOption[] => {
          if (Array.isArray(plugin)) {
            return [filterPlugins(plugin)];
          }
          if (plugin && typeof plugin === "object" && "name" in plugin) {
            const name = String((plugin as unknown as Record<string, unknown>).name);
            if (shouldExclude(name)) return [];
          }
          return [plugin];
        })
        .filter((p) => !Array.isArray(p) || p.length > 0);
    };

    config.plugins = filterPlugins(config.plugins ?? []);
    return config;
  },
};
export default config;
