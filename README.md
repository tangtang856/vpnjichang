# vpnjichang.wiki - 中文机场评测与科学翻墙节点导航 (Astro 5.x 现代架构版)

> 专业的中文机场推荐、节点评测与 Bing 自然搜索流量优化建站系统。基于现代 **Astro 5.x + TypeScript + Markdown Content Collections** 静态驱动，零冗余代码，极速秒开。

## 🌟 核心特性与架构亮点

- **现代 Astro 5.x 组件化架构**：告别传统繁琐的 HTML 字符串拼接与大量重复冗余模板。全站基于 Astro 模块化组件（`BaseLayout`, `Header`, `Footer`, `AirportCard`, `SpeedtestTable`, `PlanTable` 等），维护优雅高效。
- **Astro Content Collections**：100 篇深度行业文章与 30 篇全平台配置教程全部采用 Markdown + YAML Frontmatter 结构化存储于 `src/content/`，支持类型安全的 Schema 校验与自动化分页。
- **纯静态 HTML 生成 (SSG)**：构建时预渲染全部静态页面，无重型客户端运行时 JS 负担，首屏速度达到 Google Lighthouse 95+ 分。
- **14 大机场真实数据与 AFF 链接**：统一由 `src/data/airports.ts` 集中管理，包含真实起步价格、流量折算、节点线路、实测延迟/下行/丢包率及专属优惠码。
- **独立品牌定制 TDK 系统**：所有 14 个品牌均配置专属专业 TDK，标题统一遵循：`{品牌名}如何？2026最新套餐价格表、流量配额、节点线路与实测测速评测 - vpnjichang.wiki`，深度契合用户搜索意图。
- **Bing SEO 专项优化**：针对 `机场推荐`、`机场节点`、`性价比机场`、`梯子推荐`、`vpn`、`vpn机场`、`vpn节点`、`vpn推荐` 八大主攻关键词部署完整 H1 规范、OpenGraph、Twitter Card、BreadcrumbList 与 Review 结构化数据 (Schema.org)。
- **IndexNow 自动推送支持**：内置 `npm run indexnow`，新内容或更新可秒级向 Bing 发起推送收录。
- **双重一键部署支持**：支持 Cloudflare Pages（零配置连接仓库即部署）与 GitHub Actions 自动构建部署。

---

## 📁 现代化项目源码结构

```text
vpnjichang.wiki/
├── .github/workflows/deploy.yml   # GitHub Actions 自动化 CI/CD 部署工作流
├── astro.config.mjs               # Astro 配置文件 (Sitemap, Static SSG)
├── package.json                   # 依赖与脚本定义
├── public/                        # 静态资源 (CSS, JS, 图像, robots.txt, IndexNow 密钥)
│   ├── css/style.css
│   ├── images/
│   ├── js/airports-data.js
│   ├── robots.txt
│   └── c0f9947814b64177b96b270744747db9.txt
├── src/
│   ├── components/                # 可复用 Astro 组件
│   │   ├── AirportCard.astro      # 机场推荐卡片
│   │   ├── Breadcrumbs.astro      # 面包屑导航与 JSON-LD 结构化数据
│   │   ├── Footer.astro           # 网站通用页脚
│   │   ├── Header.astro           # 网站通用顶部导航
│   │   ├── PlanTable.astro        # 套餐价格与流量折算表格
│   │   ├── Sidebar.astro          # 文章侧边栏 (最新推荐与目录)
│   │   └── SpeedtestTable.astro   # 晚高峰节点实测测速表格
│   ├── content/                   # 内容集合 (Content Collections)
│   │   ├── blog/                  # 100 篇深度科普与行业评测文章 (.md)
│   │   └── guides/                # 30 篇全平台客户端使用教程 (.md)
│   ├── content.config.ts          # Content Collections 类型与校验定义
│   ├── data/                      # 核心数据源 (Single Source of Truth)
│   │   ├── airports.ts            # 14 家机场基础数据、套餐、测速与 AFF 链接
│   │   └── topics.ts              # 推荐专题、排行榜与专业词汇元数据
│   ├── layouts/
│   │   └── BaseLayout.astro       # 全站基础布局组件 (SEO Head, TDK, JSON-LD)
│   └── pages/                     # 页面路由
│       ├── index.astro            # 网站首页 (13大板块核心落地页)
│       ├── compare.astro          # 2~4家机场横向对比工具
│       ├── about.astro            # 关于我们
│       ├── contact.astro          # 联系方式与反馈
│       ├── editorial-policy.astro # 编辑政策与客观评测标准
│       ├── privacy-policy.astro   # 隐私政策
│       ├── disclaimer.astro       # 免责声明与第三方服务协议
│       ├── 404.astro              # 404 页面
│       ├── airport/               # 机场档案路由 ([slug].astro, index.astro)
│       ├── blog/                  # 博客文章路由 ([slug].astro, index.astro)
│       ├── glossary/              # 术语百科路由 ([slug].astro, index.astro)
│       ├── guides/                # 使用教程路由 ([slug].astro, index.astro)
│       ├── ranking/               # 排行榜路由 ([slug].astro, index.astro)
│       ├── recommend/             # 场景推荐路由 ([slug].astro, index.astro)
│       └── review/                # 独立评测路由 ([slug].astro, index.astro)
└── scripts/
    └── indexnow.js                # Bing 搜索引擎 IndexNow 推送工具
```

---

## 🛠️ 本地开发与构建运维

### 1. 启动本地开发热重载服务器
```bash
npm run dev
# 或 npx astro dev
```
本地访问 `http://localhost:4321`，享受毫秒级热更新。

### 2. 构建生产静态页面
```bash
npm run build
```
执行后仅需约 3 秒，将在 `dist/` 目录生成全部 189 个静态 HTML 页面及 `sitemap-index.xml`。

### 3. 本地预览生产构建产物
```bash
npm run preview
```

### 4. 向 Bing 提交 IndexNow 推送
```bash
# 提交主要核心着陆页
npm run indexnow

# 提交全站所有已生成页面
node scripts/indexnow.js --all
```

---

## ☁️ 部署方式

### 方式一：Cloudflare Pages 部署（强烈推荐，全球 Anycast CDN）
1. 登录 Cloudflare 控制台，进入 **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**。
2. 选择本 GitHub 仓库 `tangtang856/vpnjichang.wiki`。
3. 构建预设选择 **Astro**：
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. 点击 **Save and Deploy**，即可在几十秒内完成全球部署。
5. 在 Custom Domains 绑定正式域名 `vpnjichang.wiki`。

### 方式二：GitHub Pages 部署
仓库已预设 `.github/workflows/deploy.yml` 工作流。在 GitHub 仓库 **Settings -> Pages -> Source** 选择 **GitHub Actions**，每次提交代码至 `main` 分支将自动触发构建并部署。
