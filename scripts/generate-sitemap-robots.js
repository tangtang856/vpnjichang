/**
 * scripts/generate-sitemap-robots.js
 * 自动扫描全站生成 sitemap.xml 与 robots.txt
 */

const fs = require('fs');
const path = require('path');
const { DOMAIN, ROOT_DIR } = require('./build-site.js');

function generateSitemapAndRobots() {
  console.log('开始生成 sitemap.xml 与 robots.txt...');

  const pages = [];
  const today = '2026-03-15';

  function scanDir(dir, relPath = '') {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      if (item.isDirectory()) {
        if (['node_modules', '.git', 'scripts', 'docs', 'src'].includes(item.name)) continue;
        scanDir(path.join(dir, item.name), path.join(relPath, item.name));
      } else if (item.isFile() && item.name.endsWith('.html')) {
        // 排除 404.html
        if (item.name === '404.html') continue;

        let urlPath = path.join(relPath, item.name).replace(/\\/g, '/');
        let fullUrl = `${DOMAIN}/${urlPath}`;
        if (urlPath === 'index.html') {
          fullUrl = `${DOMAIN}/`;
        }

        // 计算优先级和更新频率
        let priority = '0.7';
        let changefreq = 'weekly';
        if (urlPath === 'index.html') {
          priority = '1.0';
          changefreq = 'daily';
        } else if (urlPath.startsWith('ranking/') || urlPath.startsWith('recommend/')) {
          priority = '0.9';
          changefreq = 'weekly';
        } else if (urlPath.startsWith('review/') || urlPath === 'compare.html') {
          priority = '0.85';
          changefreq = 'weekly';
        } else if (urlPath.startsWith('guides/') || urlPath.startsWith('blog/')) {
          priority = '0.8';
          changefreq = 'monthly';
        } else if (urlPath.startsWith('glossary/')) {
          priority = '0.6';
          changefreq = 'monthly';
        } else {
          priority = '0.5';
          changefreq = 'yearly';
        }

        pages.push({
          url: fullUrl,
          lastmod: today,
          changefreq,
          priority
        });
      }
    }
  }

  scanDir(ROOT_DIR);

  // 排序：首页在最前，之后按 URL 字母序
  pages.sort((a, b) => {
    if (a.url === `${DOMAIN}/`) return -1;
    if (b.url === `${DOMAIN}/`) return 1;
    return a.url.localeCompare(b.url);
  });

  // 构建 sitemap.xml
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  pages.forEach(p => {
    xml += `  <url>
    <loc>${p.url}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>
`;
  });

  xml += `</urlset>`;

  fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), xml, 'utf8');
  console.log(`✓ 成功生成 sitemap.xml (共收录 ${pages.length} 个正式页面)`);

  // 构建 robots.txt
  const robots = `# robots.txt for vpnjichang.wiki
User-agent: *
Allow: /
Allow: /css/
Allow: /js/
Allow: /images/

# 阻断不存在的草稿或内部临时文件夹
Disallow: /src/
Disallow: /scripts/
Disallow: /404.html

Sitemap: ${DOMAIN}/sitemap.xml
`;

  fs.writeFileSync(path.join(ROOT_DIR, 'robots.txt'), robots, 'utf8');
  console.log('✓ 成功生成 robots.txt');

  return pages;
}

module.exports = { generateSitemapAndRobots };
