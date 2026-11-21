# Bing Webmaster Tools (必应网站管理员工具) 深度实操指南
域名：`vpnjichang.wiki`

---

## 一、为什么优先重视 Bing 搜索引擎？

1. **庞大且高质量的搜索流量**：随着 Windows 11、Microsoft Edge 浏览器的全球普及以及 Copilot 深度整合，Bing 在桌面端与高净值专业用户群体中的自然搜索占比持续攀升。
2. **对优质新站友好**：相较于 Google 的较长沙盒期，Bing 配合 **IndexNow** 协议能对新上线或更新的原创技术内容实现极速发现与索引。
3. **商业意图转化率高**：搜索“机场推荐”、“梯子推荐”、“vpn机场节点”等交易与选型类关键词的用户，大多具备明确的购买与配置需求。

---

## 二、第一步：网站验证与所有权绑定

登录 [Bing Webmaster Tools](https://www.bing.com/webmasters)（推荐使用微软账号或 Google Search Console 账号直接授权导入）：

### 方法 1：从 Google Search Console 一键导入（最推荐）
如果您的域名已经在 GSC 完成验证，点击“Import（导入）”，Bing 会自动同步所有权、Sitemap 及基本配置。

### 方法 2：放置 HTML 验证文件
1. 在 Bing 后台选择“手动添加网站”并输入 `https://vpnjichang.wiki`。
2. 下载 Bing 提供的验证文件（如 `BingSiteAuth.xml`）。
3. 将该文件直接放置在项目根目录 `c:\Users\USER\Desktop\博客\vpnjichang.wiki\` 下，推送至 GitHub 后通过 Cloudflare Pages 自动部署生效。
4. 返回后台点击“Verify（验证）”。

### 方法 3：DNS TXT 记录验证
在域名的 Cloudflare DNS 管理面板中添加一条 TXT 记录，值为 Bing 后台给出的验证字符串。

---

## 三、第二步：提交 XML 站点地图 (Sitemap)

1. 进入 Bing Webmaster Tools 左侧导航栏的 **Sitemaps（站点地图）**。
2. 点击右上角的 **Submit sitemap（提交站点地图）**。
3. 输入完整地图地址：
   ```text
   https://vpnjichang.wiki/sitemap.xml
   ```
4. 提交后状态通常会显示为 `Processing（处理中）`，通常在 24–48 小时内完成初次完整遍历。
5. **定期检查指标**：
   - **Discovered URLs（已发现 URL 数量）**：应与实际提交的 50+ 个页面一致。
   - **URLs in Index（已索引 URL 数量）**：观察随时间的稳步上升曲线。

---

## 四、第三步：IndexNow 自动化推送配置

本项目已经内置完整的 IndexNow 支持：
- 验证密钥文件位于根目录：`c0f9947814b64177b96b270744747db9.txt`
- 对应线上公开访问地址：`https://vpnjichang.wiki/c0f9947814b64177b96b270744747db9.txt`

### 本地与上线后推送命令：
```bash
# 提交核心更新页面（推荐，用于日常更新）
npm run indexnow

# 提交指定单个页面
node scripts/indexnow.js --url https://vpnjichang.wiki/recommend/budget.html

# 提交全站 sitemap 全部链接（仅限初次上线或全站重构）
node scripts/indexnow.js --all
```

> **注意：**
> - IndexNow 成功返回 HTTP 200/202 仅代表搜索引擎已接收到内容更新通知，并不等于该页面已即刻被 Bing 编入索引库。
> - 搜索引擎仍会根据页面原创质量、无死链、权威度进行调度抓取。

---

## 五、第四步：URL Inspection（网址检查与实时抓取）

当您发布了新的重点深度评测或更新了重要套餐价格后：
1. 在 Bing Webmaster Tools 顶部搜索框粘贴目标页面的完整 URL（如 `https://vpnjichang.wiki/ranking/overall.html`）。
2. 点击 **Inspect（检查）**。
3. 查看当前收录状态。若尚未收录，点击 **Request Indexing（请求编入索引）**。
4. 点击 **Live URL Test（实时 URL 测试）**，重点检查：
   - HTTP 状态码是否为 200 OK。
   - 抓取到的 HTML 中是否完整包含 Title、Description 与 H1。
   - 移动端适配是否正常。
   - Schema 结构化数据是否无错误识别。

---

## 六、第五步：Search Performance（搜索表现与关键词优化）

上线 2–4 周后，进入 **Search Performance（搜索表现）** 报表：
- **Impressions（展示量）**：页面在搜索结果中出现的总次数。
- **Clicks（点击量）**：用户点击进入网站的次数。
- **Average CTR（平均点击率）**：点击量 / 展示量。
- **Average Position（平均排名）**：主攻关键词在 Bing 的平均排位。

### 监控重点关键词表现：
- `机场推荐`
- `机场节点`
- `性价比机场`
- `梯子推荐`
- `vpn`
- `vpn机场`
- `vpn节点`
- `vpn推荐`

如果发现某关键词展示量大但点击率低，应适当优化该落地页的 `<title>` 与 `<meta name="description">`，增强吸引力与点击号召力。

---

## 七、第六步：Crawl Issues（抓取异常排查）

定期检查左侧 **Crawl Control（抓取控制）** 与 **Site Health（网站健康）**：
- **4xx Client Errors**：排查是否存在失效内链或拼写错误的 URL。
- **5xx Server Errors**：检查 Cloudflare Pages 状态。由于本项目为纯静态 HTML，5xx 发生率为 0。
- **Robots.txt 阻断诊断**：确保 `css/` 与 `js/` 均处于 `Allow` 状态，未被误拦截。
- **Duplicate Titles / Descriptions**：利用本站提供的 `npm run audit` 自动化验收脚本提前杜绝此类问题。

---

## 八、上线后需要人工完成的事项清单

1. 在 GitHub 远程仓库设置与权限确认。
2. 登录 Cloudflare 控制台，连接 GitHub 仓库 `vpnjichang.wiki`，完成自动化构建绑定（Build command: `npm run build`，Output directory: `.` 根目录）。
3. 在 Cloudflare DNS 为 `vpnjichang.wiki` 配置 CNAME 指向 Pages。
4. 登录 Bing Webmaster Tools 完成站点所有权验证并提交 `https://vpnjichang.wiki/sitemap.xml`。
5. 执行一次 `npm run indexnow` 通知搜索引擎新站上线。
