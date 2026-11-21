/**
 * scripts/audit-seo.js
 * 全站 SEO 核心指标深度审计工具
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DOMAIN = 'https://vpnjichang.wiki';

let totalPages = 0;
let errors = [];
let warnings = [];
const titles = new Map();
const descriptions = new Map();
const canonMap = new Map();

function scanHtmlFiles(dir, relPath = '') {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory()) {
      if (['node_modules', '.git', 'scripts', 'docs', 'src'].includes(item.name)) continue;
      scanHtmlFiles(path.join(dir, item.name), path.join(relPath, item.name));
    } else if (item.isFile() && item.name.endsWith('.html')) {
      auditHtmlFile(path.join(dir, item.name), path.join(relPath, item.name).replace(/\\/g, '/'));
    }
  }
}

function auditHtmlFile(filePath, relUrl) {
  totalPages++;
  const content = fs.readFileSync(filePath, 'utf8');

  // 1. 检查 Title
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    errors.push(`[${relUrl}] 缺少 <title> 标签`);
  } else {
    const title = titleMatch[1].trim();
    if (titles.has(title)) {
      errors.push(`[${relUrl}] 与 [${titles.get(title)}] 重复 Title: "${title}"`);
    } else {
      titles.set(title, relUrl);
    }
  }

  // 2. 检查 Meta Description
  const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  if (!descMatch || !descMatch[1].trim()) {
    errors.push(`[${relUrl}] 缺少 <meta name="description">`);
  } else {
    const desc = descMatch[1].trim();
    if (descriptions.has(desc) && relUrl !== '404.html') {
      errors.push(`[${relUrl}] 与 [${descriptions.get(desc)}] 重复 Description`);
    } else {
      descriptions.set(desc, relUrl);
    }
  }

  // 3. 检查 Canonical URL
  const canonMatch = content.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
  if (!canonMatch || !canonMatch[1].trim()) {
    errors.push(`[${relUrl}] 缺少 Canonical URL`);
  } else {
    const canon = canonMatch[1].trim();
    if (!canon.startsWith(DOMAIN)) {
      errors.push(`[${relUrl}] Canonical URL 未使用正式域名: ${canon}`);
    }
  }

  // 4. 检查 H1 (必须唯一存在且仅有 1 个)
  const h1Matches = content.match(/<h1[^>]*>.*?<\/h1>/gis);
  if (!h1Matches || h1Matches.length === 0) {
    errors.push(`[${relUrl}] 页面缺少 <h1> 标签`);
  } else if (h1Matches.length > 1) {
    errors.push(`[${relUrl}] 页面存在多个 <h1> 标签 (当前有 ${h1Matches.length} 个)`);
  }

  // 5. 检查未替换变量 (例如 {{ 或 undefined 或 NaN)
  if (content.includes('{{') || content.includes('}}')) {
    errors.push(`[${relUrl}] 发现未替换的模板变量 {{ ... }}`);
  }
  if (content.includes('>undefined<') || content.includes('"undefined"') || content.includes('>NaN<')) {
    errors.push(`[${relUrl}] 发现渲染异常字段 undefined 或 NaN`);
  }

  // 6. 检查严禁以 / 开头的绝对路径（必须严格相对路径）
  // 匹配 href="/..." 或 src="/..."（排除外部协议如 http://, https://, //, mailto:, # 等）
  const rootRelMatch = content.match(/(href|src)=["']\/([^"'/][^"']*)["']/g);
  if (rootRelMatch) {
    errors.push(`[${relUrl}] 违背相对路径要求，发现根绝对路径: ${rootRelMatch.slice(0, 3).join(', ')}`);
  }

  // 7. 检查 Schema 结构化数据
  const schemaMatch = content.match(/<script type="application\/ld\+json">(.*?)<\/script>/is);
  if (schemaMatch && schemaMatch[1]) {
    try {
      JSON.parse(schemaMatch[1]);
    } catch (e) {
      errors.push(`[${relUrl}] Schema JSON-LD 语法解析错误: ${e.message}`);
    }
  } else if (relUrl !== '404.html') {
    warnings.push(`[${relUrl}] 未检测到 Schema JSON-LD 结构化数据`);
  }
}

console.log('开始执行全站 SEO 审计 (scripts/audit-seo.js)...');
scanHtmlFiles(ROOT_DIR);

console.log('--------------------------------------------------------');
console.log(`已审计 HTML 页面总数: ${totalPages}`);
console.log(`发现错误 (Errors): ${errors.length}`);
console.log(`发现警告 (Warnings): ${warnings.length}`);
console.log('--------------------------------------------------------');

if (errors.length > 0) {
  console.error('❌ SEO 审计未通过，存在以下问题：');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
} else {
  console.log('✓ [PASS] 全站 SEO 审计 100% 通过！所有页面 Title、Description、H1、Canonical 及相对路径均符合规范。');
}
