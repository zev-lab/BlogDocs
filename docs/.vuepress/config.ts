import { defaultTheme } from "@vuepress/theme-default";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { viteBundler } from "@vuepress/bundler-vite";

import sidebar from "./configs/sidebar";

import { path } from "@vuepress/utils";

import navbar from "./configs/navbar";

let base: any = "/";

if (process.env.BASE) {
  base = process.env.BASE;
}

export default {
  // 站点配置
  lang: "zh-CN",
  title: "学无止境",
  description: "这是我的第一个 VuePress 站点",
  base: base,
  bundler: viteBundler(),
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components"),
    }),
  ],
  theme: defaultTheme({
    logo: "/logo1.svg",
    logoDark: "/logo2.svg",
    sidebarDepth: 2, // 侧边栏显示深度，默认为1，即显示一级标题
    sidebar: sidebar,
    navbar: navbar.zh,
    lastUpdatedText: "上次更新", // 根据 git commit 记录显示每个页面的最后编辑时间
    repo: "https://github.com/5312/BlogDocs.git", // 启用到 GitHub 仓库的链接，显示在页面右上角
    repoLabel: "GitHub", // repo 链接显示的名字
    docsDir: "/vuepress/docs", // 使用 GitHub 仓库中哪个目录下的文档
    docsBranch: "master", // 指向 GitHub 仓库的哪个分支
    editLink: false,
    //smoothScroll: true, // 在页面内进行跳转时，页面会平滑滚动
  }),
};
