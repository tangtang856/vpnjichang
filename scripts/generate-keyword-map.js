const fs = require('fs');
const { guides30 } = require('./data-guides-30.js');
const { blogs100 } = require('./data-blogs-100.js');

let csv = 'Keyword,Intent,Target URL,Page Type,Priority,Title,H1\n';

// P0
csv += '机场推荐,商业调查与选购,https://vpnjichang.wiki/,Homepage,P0,机场推荐 · 2026最新优质稳定性价比机场与梯子节点测评导航,2026 优质稳定机场推荐与科学翻墙节点导航\n';
csv += '梯子推荐,商业调查与选购,https://vpnjichang.wiki/,Homepage,P0,机场推荐 · 2026最新优质稳定性价比机场与梯子节点测评导航,2026 优质稳定机场推荐与科学翻墙节点导航\n';
csv += '性价比机场,商业调查,https://vpnjichang.wiki/recommend/budget.html,Recommend,P0,2026高性价比便宜机场推荐 · 低预算平价节点梯子精选,2026 高性价比低预算机场推荐与流量套餐测评\n';
csv += '机场节点,商业导航与技术,https://vpnjichang.wiki/recommend/index.html,Category,P0,精选机场节点推荐专题 · 专线与流媒体解锁节点汇总,2026 精选优质机场节点与高速网络代理推荐\n';
csv += 'vpn,信息与商业,https://vpnjichang.wiki/blog/airport-vs-vpn-difference.html,Article,P0,机场与传统VPN有什么区别？技术架构与安全性全面对比,机场与传统 VPN 究竟有什么区别？架构与安全性全面对比\n';
csv += 'vpn推荐,商业调查与选购,https://vpnjichang.wiki/ranking/overall.html,Ranking,P0,2026年度综合实力机场排行榜 · 梯子与VPN翻墙节点全面测评,2026 年度综合实力机场排行榜与翻墙节点综合测评\n';
csv += 'vpn机场,商业调查与技术,https://vpnjichang.wiki/blog/how-to-choose-vpn-airport.html,Article,P0,2026如何科学选择适合自己的优质VPN机场与梯子节点？,2026 如何科学选择适合自己的优质 VPN 机场？\n';
csv += 'vpn节点,信息与导航,https://vpnjichang.wiki/ranking/stable.html,Ranking,P0,2026高稳定性专线机场排行榜 · 防失联IPLC/IEPL高速节点榜单,2026 高稳定性专线机场排行榜与优质节点测评\n';

// P1 Guides (30)
guides30.forEach((g) => {
  const kw = g.platform + '客户端教程';
  const cleanTitle = g.title.replace(/"/g, '""');
  const cleanH1 = g.h1.replace(/"/g, '""');
  csv += `"${kw}",教程实操,https://vpnjichang.wiki/guides/${g.slug}.html,Guide,P1,"${cleanTitle}","${cleanH1}"\n`;
});

// P2 Blogs (100)
blogs100.forEach((b) => {
  const kw = b.category + '专题';
  const cleanTitle = b.title.replace(/"/g, '""');
  const cleanH1 = b.h1.replace(/"/g, '""');
  csv += `"${kw}",深度分析,https://vpnjichang.wiki/blog/${b.slug}.html,Article,P2,"${cleanTitle}","${cleanH1}"\n`;
});

fs.writeFileSync('./docs/keyword-map.csv', csv, 'utf-8');
console.log('Successfully generated docs/keyword-map.csv, total rows:', csv.split('\n').length);
