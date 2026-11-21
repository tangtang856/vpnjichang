/**
 * scripts/build.js
 * 全站构建入口引擎
 */

const { buildComparePage, buildTrustPages, buildRecommendPages, buildRankingPages } = require('./generate-pages.js');
const { buildAirportPages, buildReviewPages } = require('./generate-reviews-airports.js');
const { buildGuidesPages, buildBlogPages, buildGlossaryPages } = require('./generate-guides-blogs-glossary.js');
const { generateSitemapAndRobots } = require('./generate-sitemap-robots.js');

console.log('========================================================');
console.log('🚀 开始执行 vpnjichang.wiki 全站静态生成...');
console.log('========================================================');

// 1. 生成首页 (通过运行 generate-all.js 中的 buildHomePage)
require('./generate-all.js');

// 2. 生成横向对比工具
buildComparePage();

// 3. 生成法律合规与信任度页面
buildTrustPages();

// 4. 生成 6 大精选推荐专题
buildRecommendPages();

// 5. 生成 4 大排行榜
buildRankingPages();

// 6. 生成机场资料库
buildAirportPages();

// 7. 生成独立深度评测报告
buildReviewPages();

// 8. 生成客户端教程
buildGuidesPages();

// 9. 生成深度博客文章
buildBlogPages();

// 10. 生成专业术语百科
buildGlossaryPages();

// 11. 自动生成 Sitemap 与 Robots.txt
const allPages = generateSitemapAndRobots();

console.log('========================================================');
console.log(`🎉 全站生成成功！共生成 ${allPages.length} 个正式页面 + 404页面 + Sitemap + Robots。`);
console.log('========================================================');
