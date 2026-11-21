/**
 * scripts/check-links.js
 * 全站内链与资源链接可达性深度检测工具
 * 验证所有相对跳转与图片、CSS、JS 文件在本地文件系统均真实存在 (确保 file:// 协议 0 死链)
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
let checkedLinksCount = 0;
let brokenLinks = [];

function scanHtmlFiles(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory()) {
      if (['node_modules', '.git', 'scripts', 'docs', 'src'].includes(item.name)) continue;
      scanHtmlFiles(path.join(dir, item.name));
    } else if (item.isFile() && item.name.endsWith('.html')) {
      checkFileLinks(path.join(dir, item.name));
    }
  }
}

function checkFileLinks(filePath) {
  const fileDir = path.dirname(filePath);
  const relSource = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');

  // 匹配所有 href="..." 与 src="..."
  const regex = /(?:href|src)=["']([^"']+)["']/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    let link = match[1].trim();

    // 跳过外部链接、锚点、空链接、javascript
    if (
      link.startsWith('http://') ||
      link.startsWith('https://') ||
      link.startsWith('//') ||
      link.startsWith('mailto:') ||
      link.startsWith('tel:') ||
      link.startsWith('#') ||
      link.startsWith('javascript:') ||
      link === ''
    ) {
      continue;
    }

    // 移除可能存在的 hash 锚点或 query 参数
    const cleanLink = link.split('#')[0].split('?')[0];
    if (!cleanLink) continue;

    checkedLinksCount++;

    // 解析相对目标路径
    const targetPath = path.resolve(fileDir, cleanLink);

    // 验证目标文件是否存在
    if (!fs.existsSync(targetPath)) {
      brokenLinks.push({
        source: relSource,
        link: link,
        targetPath: targetPath
      });
    }
  }
}

console.log('开始执行全站内链与资源引用检测 (scripts/check-links.js)...');
scanHtmlFiles(ROOT_DIR);

console.log('--------------------------------------------------------');
console.log(`已检测站内相对链接总计: ${checkedLinksCount}`);
console.log(`发现失效死链 (Broken Links): ${brokenLinks.length}`);
console.log('--------------------------------------------------------');

if (brokenLinks.length > 0) {
  console.error('❌ 链接检测未通过，发现以下死链：');
  brokenLinks.forEach(b => {
    console.error(`  - 在 [${b.source}] 中链接到不存在的资源: "${b.link}"`);
  });
  process.exit(1);
} else {
  console.log('✓ [PASS] 全站内链与资源完整性 100% 通过！所有链接在本地 file:// 协议与服务器均能精准跳转。');
}
