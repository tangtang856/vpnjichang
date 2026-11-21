/**
 * scripts/build-site.js
 * 纯 HTML + 原生 CSS 静态站点生成引擎
 * 严格执行相对路径与 Bing SEO 规范
 */

const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://vpnjichang.wiki';
const ROOT_DIR = path.resolve(__dirname, '..');
const airportsData = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'src/data/airports.json'), 'utf8'));

// 通用页面头信息生成函数
function renderHead({ title, description, canonical, depth, schemaJson, keywords }) {
  const relCss = depth === 0 ? 'css/style.css' : '../css/style.css';
  const relFav = depth === 0 ? 'images/favicon.svg' : '../images/favicon.svg';

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  ${keywords ? `<meta name="keywords" content="${keywords}">\n  ` : ''}<link rel="canonical" href="${canonical}">
  <meta name="robots" content="index, follow">
  
  <!-- Open Graph / 社交卡片 -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="vpnjichang.wiki - 中文机场评测导航">
  <meta property="og:locale" content="zh_CN">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  
  <link rel="icon" type="image/svg+xml" href="${relFav}">
  <link rel="stylesheet" href="${relCss}">
  
  ${schemaJson ? `<script type="application/ld+json">\n${JSON.stringify(schemaJson, null, 2)}\n  </script>` : ''}
</head>
<body>`;
}

// 通用导航栏
function renderHeader(depth, activeNav = '') {
  const p = depth === 0 ? '' : '../';
  return `  <header class="site-header">
    <div class="container header-inner">
      <a href="${p}index.html" class="logo" title="vpnjichang.wiki - 机场推荐导航">
        <span class="logo-badge">VPN</span>
        <span>JICHANG<small style="font-weight:400; color:#64748b; font-size: 0.85rem;">.wiki</small></span>
      </a>
      <ul class="nav-menu">
        <li class="nav-item"><a href="${p}index.html" class="${activeNav === 'home' ? 'active' : ''}">首页</a></li>
        <li class="nav-item"><a href="${p}recommend/index.html" class="${activeNav === 'recommend' ? 'active' : ''}">机场推荐</a></li>
        <li class="nav-item"><a href="${p}ranking/index.html" class="${activeNav === 'ranking' ? 'active' : ''}">机场排行</a></li>
        <li class="nav-item"><a href="${p}review/index.html" class="${activeNav === 'review' ? 'active' : ''}">机场评测</a></li>
        <li class="nav-item"><a href="${p}compare.html" class="${activeNav === 'compare' ? 'active' : ''}">机场对比</a></li>
        <li class="nav-item"><a href="${p}guides/index.html" class="${activeNav === 'guides' ? 'active' : ''}">使用教程</a></li>
        <li class="nav-item"><a href="${p}blog/index.html" class="${activeNav === 'blog' ? 'active' : ''}">博客文章</a></li>
        <li class="nav-item"><a href="${p}glossary/index.html" class="${activeNav === 'glossary' ? 'active' : ''}">知识百科</a></li>
      </ul>
      <div class="header-actions">
        <a href="${p}compare.html" class="btn-nav-compare">⚡ 横向对比</a>
        <button class="mobile-toggle" aria-label="切换移动端导航菜单" aria-expanded="false">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>
    </div>
  </header>`;
}

// 通用页脚
function renderFooter(depth) {
  const p = depth === 0 ? '' : '../';
  return `  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo" style="margin-bottom: 8px;">
            <span class="logo-badge">VPN</span>
            <span>JICHANG<small style="font-weight:400; color:#64748b; font-size: 0.85rem;">.wiki</small></span>
          </div>
          <p>vpnjichang.wiki 专注于客观、独立、可复核的中文网络代理（机场）、梯子节点与 VPN 服务评测。我们坚持真实数据，拒绝虚假刷单与无脑吹捧，帮助用户找到最适合的高性价比稳定科学翻墙工具。</p>
        </div>
        <div class="footer-col">
          <h5>核心专题导航</h5>
          <ul>
            <li><a href="${p}recommend/budget.html">性价比低预算机场</a></li>
            <li><a href="${p}recommend/premium.html">高端稳定专线机场</a></li>
            <li><a href="${p}recommend/beginner.html">新手入门机场精选</a></li>
            <li><a href="${p}recommend/ai.html">ChatGPT / Claude 专线</a></li>
            <li><a href="${p}ranking/overall.html">综合实力排行榜</a></li>
            <li><a href="${p}compare.html">机场横向对比工具</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>教程与百科</h5>
          <ul>
            <li><a href="${p}guides/windows.html">Windows 客户端教程</a></li>
            <li><a href="${p}guides/android.html">Android 客户端配置</a></li>
            <li><a href="${p}guides/ios.html">iOS 小火箭使用指南</a></li>
            <li><a href="${p}guides/macos.html">macOS 电脑翻墙指南</a></li>
            <li><a href="${p}glossary/iplc-iepl.html">什么是 IPLC/IEPL 专线</a></li>
            <li><a href="${p}blog/airport-vs-vpn-difference.html">机场与传统 VPN 区别</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>合规与信誉</h5>
          <ul>
            <li><a href="${p}about.html">关于我们</a></li>
            <li><a href="${p}editorial-policy.html">编辑政策与评测标准</a></li>
            <li><a href="${p}contact.html">联系与反馈</a></li>
            <li><a href="${p}privacy-policy.html">隐私政策</a></li>
            <li><a href="${p}disclaimer.html">免责声明与服务协议</a></li>
            <li><a href="${p}sitemap.xml">站点地图 (XML Sitemap)</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div>&copy; 2026 vpnjichang.wiki. All rights reserved. 遵循中立客观的评测准则。</div>
        <div>
          <a href="${p}editorial-policy.html">评测标准</a>
          <a href="${p}disclaimer.html">免责声明</a>
          <a href="${p}sitemap.xml">XML 网站地图</a>
        </div>
      </div>
    </div>
  </footer>
  <script src="${p}js/main.js"></script>
</body>
</html>`;
}

// 通用面包屑
function renderBreadcrumbs(depth, items) {
  const p = depth === 0 ? '' : '../';
  let html = `<nav class="breadcrumbs" aria-label="面包屑导航"><div class="container"><ol itemscope itemtype="https://schema.org/BreadcrumbList">`;
  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    html += `<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">`;
    if (isLast) {
      html += `<span itemprop="name" aria-current="page">${item.name}</span><meta itemprop="position" content="${index + 1}" />`;
    } else {
      html += `<a href="${item.url}" itemprop="item"><span itemprop="name">${item.name}</span></a><meta itemprop="position" content="${index + 1}" />`;
    }
    html += `</li>`;
  });
  html += `</ol></div></nav>`;
  return html;
}

console.log('Static site builder core loaded.');
module.exports = {
  DOMAIN,
  ROOT_DIR,
  airportsData,
  renderHead,
  renderHeader,
  renderFooter,
  renderBreadcrumbs
};
