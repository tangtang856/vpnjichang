# vpnjichang.wiki - 中文机场评测与科学翻墙节点导航

> 专业的中文机场推荐、节点评测与 Bing 自然搜索流量优化建站系统。

## 🌟 核心特性

- **纯静态秒开体验**：采用纯原生 HTML5 + 原生轻量 CSS 架构，零重型框架依赖，秒开级加载性能。
- **100% 相对路径规范**：全站所有 CSS、JS、图片及超链接均使用标准相对路径，不仅在线上完美运行，在本地双击（`file://` 协议）也能直接无缝浏览。
- **Bing Technical SEO**：针对 `机场推荐`、`机场节点`、`性价比机场`、`梯子推荐`、`vpn`、`vpn机场`、`vpn节点`、`vpn推荐` 八大核心关键词深度优化。
- **结构化机场数据库**：以 `src/data/airports.json` 为统一数据源，严禁虚构测速数据，缺失资料明确标注。
- **全维度横向对比工具**：内置纯原生 JS 交互对比系统，支持 2–4 家机场多参数动态横向对比。
- **自动化质检套件**：内置 SEO 审计、死链检测、内容深度验证，确保 0 死链、0 渲染异常。
- **IndexNow 原生支持**：提供一键推送工具，支持单 URL 与批量内容向 Bing 快速通知。

## 📁 页面目录结构

```text
/
├── index.html                   # 首页 (13大板块核心落地页)
├── compare.html                 # 机场全维度横向对比工具
├── about.html                   # 关于我们
├── contact.html                 # 联系我们与反馈
├── editorial-policy.html        # 编辑政策与评测标准
├── privacy-policy.html          # 隐私政策
├── disclaimer.html              # 免责声明与服务协议
├── 404.html                     # 404 错误页面
│
├── recommend/                   # 精选推荐专题
│   ├── index.html               # 推荐中心总索引
│   ├── budget.html              # 高性价比低预算
│   ├── premium.html             # 高端稳定专线
│   ├── beginner.html            # 新手入门与小白友好
│   ├── stable.html              # 长期稳定防失联
│   ├── ai.html                  # ChatGPT/Claude 专线
│   └── streaming.html           # 4K 流媒体解锁
│
├── ranking/                     # 排行榜系统
│   ├── index.html               # 榜单总索引
│   ├── overall.html             # 综合实力榜
│   ├── value.html               # 性价比排行榜
│   ├── budget.html              # 平价低预算榜
│   └── stable.html              # 高稳定性专线榜
│
├── airport/                     # 机场基础数据库档案
├── review/                      # 17项要素独立深度评测报告
├── guides/                      # 全平台客户端配置教程
├── blog/                        # 行业观察与技术分析文章
└── glossary/                    # 网络技术专业术语词典
```

## 🛠️ 本地开发与管理命令

```bash
# 执行全站静态页面构建与 Sitemap 生成
npm run build

# 执行自动化质检（SEO 审计 + 0死链检测 + 内容深度校验）
npm test

# 向 Bing 搜索引擎提交 IndexNow 推送
npm run indexnow
```

## 📄 部署与文档

- [Bing Webmaster 深度操作指南](docs/bing-webmaster-guide.md)
- [Cloudflare Pages 部署说明](docs/deployment-guide.md)
- [关键词映射表](docs/keyword-map.csv)
- [全站质检报告 (Final Audit)](docs/final-audit.md)
