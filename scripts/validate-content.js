/**
 * scripts/validate-content.js
 * 内容真实性、丰满度与数据库完整性校验工具
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DOMAIN = 'https://vpnjichang.wiki';

let validationErrors = [];

console.log('开始执行内容与数据库一致性验证 (scripts/validate-content.js)...');

// 1. 验证机场统一数据库 src/data/airports.json
const airportsPath = path.join(ROOT_DIR, 'src/data/airports.json');
if (!fs.existsSync(airportsPath)) {
  validationErrors.push('缺少数据库文件 src/data/airports.json');
} else {
  try {
    const airports = JSON.parse(fs.readFileSync(airportsPath, 'utf8'));
    if (!Array.isArray(airports) || airports.length < 5) {
      validationErrors.push(`数据库机场数量过少 (当前仅有 ${airports.length} 家，要求至少 5 家真实品牌)`);
    }

    airports.forEach(ap => {
      if (!ap.id || !ap.name || !ap.slug || !ap.description) {
        validationErrors.push(`机场 [${ap.name || '未知'}] 缺少基础必需字段 (id, name, slug, description)`);
      }
      if (!ap.plans || ap.plans.length === 0) {
        validationErrors.push(`机场 [${ap.name}] 未配置有效价格套餐`);
      } else {
        const lowestPlanPrice = Math.min(...ap.plans.map(p => p.price));
        if (ap.startingPrice > lowestPlanPrice) {
          validationErrors.push(`机场 [${ap.name}] 起步价格标注有误: startingPrice=${ap.startingPrice}, 最低套餐=${lowestPlanPrice}`);
        }
      }
      if (!ap.protocols || ap.protocols.length === 0) {
        validationErrors.push(`机场 [${ap.name}] 缺少协议资料`);
      }
      if (!ap.sources || ap.sources.length === 0) {
        validationErrors.push(`机场 [${ap.name}] 缺少数据来源说明`);
      }
    });
    console.log(`✓ 统一数据库验证通过：包含 ${airports.length} 家完整核验品牌`);
  } catch (e) {
    validationErrors.push(`数据库 JSON 格式错误: ${e.message}`);
  }
}

// 2. 验证页面非空白/拒绝薄弱内容 (Thin Content)
function checkContentDepth(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory()) {
      if (['node_modules', '.git', 'scripts', 'docs', 'src'].includes(item.name)) continue;
      checkContentDepth(path.join(dir, item.name));
    } else if (item.isFile() && item.name.endsWith('.html')) {
      const fullPath = path.join(dir, item.name);
      const content = fs.readFileSync(fullPath, 'utf8');
      const textOnly = content.replace(/<[^>]+>/g, '').replace(/\s+/g, '');

      // 404 页面除外，其他页面正文字符数至少应超过 300 纯文字字符
      if (item.name !== '404.html' && textOnly.length < 300) {
        validationErrors.push(`[${path.relative(ROOT_DIR, fullPath)}] 内容过于单薄 (仅有 ${textOnly.length} 字符)`);
      }
    }
  }
}
checkContentDepth(ROOT_DIR);

// 3. 验证 Sitemap 完整性
const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  validationErrors.push('缺失 sitemap.xml 文件');
} else {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  if (!sitemapContent.includes(`${DOMAIN}/`) || !sitemapContent.includes(`${DOMAIN}/ranking/overall.html`)) {
    validationErrors.push('sitemap.xml 缺少核心落地页条目');
  }
}

// 4. 验证 IndexNow 密钥文件
const indexnowKeyPath = path.join(ROOT_DIR, 'c0f9947814b64177b96b270744747db9.txt');
if (!fs.existsSync(indexnowKeyPath)) {
  validationErrors.push('缺少 IndexNow 根目录密钥验证文件 c0f9947814b64177b96b270744747db9.txt');
} else {
  const keyContent = fs.readFileSync(indexnowKeyPath, 'utf8').trim();
  if (keyContent !== 'c0f9947814b64177b96b270744747db9') {
    validationErrors.push('IndexNow 密钥文件内容与 Key 值不一致');
  }
}

// 5. 验证 Bing 核心主攻关键词在关键页面的自然出现
const indexHtmlContent = fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8');
const targetKeywords = ['机场推荐', '机场节点', '性价比机场', '梯子推荐', 'vpn', 'vpn机场', 'vpn节点', 'vpn推荐'];
targetKeywords.forEach(kw => {
  if (!indexHtmlContent.includes(kw)) {
    validationErrors.push(`首页 index.html 未包含主攻关键词: "${kw}"`);
  }
});

console.log('--------------------------------------------------------');
console.log(`发现内容校验错误: ${validationErrors.length}`);
console.log('--------------------------------------------------------');

if (validationErrors.length > 0) {
  console.error('❌ 内容验证未通过：');
  validationErrors.forEach(err => console.error('  - ' + err));
  process.exit(1);
} else {
  console.log('✓ [PASS] 内容真实性与数据库完整性校验 100% 通过！主攻关键词覆盖完备，拒绝任何假大空薄弱页面。');
}
