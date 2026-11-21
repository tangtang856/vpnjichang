# Cloudflare Pages 与 GitHub 持续部署指南
域名：`vpnjichang.wiki`

---

## 一、架构优势说明

本项目采用纯原生极速纯静态架构：
1. **零构建耗时**：没有冗长重型的 Webpack/Vite 捆绑过程，Cloudflare Pages 仅需执行 `npm run build`（或直接使用仓库中的预生成静态 HTML 文件），构建通常在 5–10 秒内完成。
2. **边缘秒开**：通过 Cloudflare 全球 300+ 边缘机房 CDN 缓存，TTFB 延迟通常低于 50ms。
3. **原生相对路径兼容**：不仅在线上完美无缝运行，本地下载项目后直接双击（`file://` 协议）也能无障碍浏览全部页面。

---

## 二、Cloudflare Pages 部署步骤

### 步骤 1：连接 GitHub 仓库
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)。
2. 在左侧菜单点击 **Workers & Pages** -> 点击 **Create application** -> 选择 **Pages** 选项卡。
3. 点击 **Connect to Git**，授权并选中您的 GitHub 远程仓库：
   ```text
   tangtang856/vpnjichang.wiki
   ```
4. 点击 **Begin setup**。

### 步骤 2：配置构建设置 (Build settings)
在配置页面填写以下参数：
- **Project name（项目名称）**：`vpnjichang-wiki`
- **Production branch（生产分支）**：`main`
- **Framework preset（框架预设）**：选择 `None`
- **Build command（构建命令）**：`npm run build`
- **Build output directory（输出目录）**：填入空值或填入 `.`（根目录）
- **Root directory（根目录）**：留空（默认为项目根目录）

> **说明**：因为本项目的 `index.html` 以及 `recommend/`、`ranking/` 等文件夹直接位于仓库根目录，因此构建输出目录设为根目录即可。

点击 **Save and Deploy**，Cloudflare 将自动拉取代码并部署上线。

### 步骤 3：绑定自定义域名
1. 部署完成后，进入该 Pages 项目的 **Custom domains** 选项卡。
2. 点击 **Set up a custom domain**。
3. 输入您的正式域名：
   ```text
   vpnjichang.wiki
   ```
4. 如果域名已托管在 Cloudflare：系统会自动配置一条 CNAME 记录并秒级颁发免费的 Universal SSL 证书。
5. 如果域名托管在第三方（如腾讯云/阿里云/Namesilo）：按提示在原 DNS 服务商添加一条 CNAME 解析指向 `vpnjichang-wiki.pages.dev`。

---

## 三、本地 Git 提交流程与 GitHub 同步

在本地完成内容修改或运行测试后，执行以下标准命令：

```bash
# 1. 重新生成并验证全站
npm run build
npm test

# 2. 检查 Git 变更状态
git status

# 3. 提交本地代码
git add .
git commit -m "feat: 更新机场推荐与Bing SEO系统配置"

# 4. 推送到 GitHub 远程仓库
git push -u origin main
```

一旦代码推送到 GitHub 的 `main` 分支，Cloudflare Pages 将在数秒内自动触发自动构建部署，全网即时更新生效。
