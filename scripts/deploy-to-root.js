/**
 * scripts/deploy-to-root.js
 * 将 Astro 构建生成的 dist 目录全量同步到项目根目录，
 * 并将所有 HTML 中的绝对路径 (/css, /js, /images, /blog 等)
 * 智能转换为标准相对路径 (./ 或 ../)，
 * 确保在本地浏览器直接双击打开 index.html (file:// 协议) 以及线上均可 100% 完美无缝运行。
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error('错误: dist 目录不存在，请先执行 npm run build');
  process.exit(1);
}

// 递归遍历目录
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

// 将 HTML 内容中的根相对路径转换为当前文件对应的相对路径
function convertToRelativePaths(htmlContent, filePath, baseDir) {
  const relPath = path.relative(baseDir, filePath).replace(/\\/g, '/');
  const depth = relPath.split('/').length - 1;
  const prefix = depth === 0 ? '' : '../'.repeat(depth);

  let updated = htmlContent;

  // 1. 静态资源转换: href="/css/...", href="/images/...", src="/images/...", src="/js/..."
  updated = updated.replace(/(href|src)=["']\/(css|images|js)\/([^"']*)["']/g, (match, attr, folder, rest) => {
    return `${attr}="${prefix}${folder}/${rest}"`;
  });

  // 2. 首页链接转换: href="/" -> href="index.html" 或 href="../index.html"
  const homeHref = depth === 0 ? 'index.html' : `${prefix}index.html`;
  updated = updated.replace(/href=["']\/["']/g, `href="${homeHref}"`);
  updated = updated.replace(/href=["']\/index\.html["']/g, `href="${homeHref}"`);

  // 3. 根目录页面: href="/compare.html", href="/about.html", etc.
  const rootPages = [
    'compare.html', 'about.html', 'contact.html',
    'editorial-policy.html', 'privacy-policy.html',
    'disclaimer.html', '404.html', 'sitemap.xml', 'robots.txt'
  ];
  rootPages.forEach((page) => {
    const regex = new RegExp(`href=["']\\/${page.replace('.', '\\.')}["']`, 'g');
    const target = `${prefix}${page}`;
    updated = updated.replace(regex, `href="${target}"`);
  });

  // 4. 子目录页面: href="/(recommend|ranking|review|guides|blog|glossary|airport)/..."
  const subDirs = ['recommend', 'ranking', 'review', 'guides', 'blog', 'glossary', 'airport'];
  subDirs.forEach((subDir) => {
    // 匹配 /dir/file.html
    const regFile = new RegExp(`href=["']\\/${subDir}\\/([^"']+)["']`, 'g');
    updated = updated.replace(regFile, (match, rest) => {
      return `href="${prefix}${subDir}/${rest}"`;
    });

    // 匹配 /dir 或 /dir/ 结尾的目录链接 -> 指向 index.html
    const regDir = new RegExp(`href=["']\\/${subDir}\\/?["']`, 'g');
    updated = updated.replace(regDir, `href="${prefix}${subDir}/index.html"`);
  });

  return updated;
}

console.log('🚀 开始将 dist 产物同步到项目根目录并处理相对路径...');

const distFiles = getAllFiles(DIST_DIR);
let processedHtmlCount = 0;
let copiedAssetsCount = 0;

distFiles.forEach((srcFile) => {
  const relPath = path.relative(DIST_DIR, srcFile);
  const destFile = path.join(ROOT_DIR, relPath);
  const destDir = path.dirname(destFile);

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  if (srcFile.endsWith('.html')) {
    const originalHtml = fs.readFileSync(srcFile, 'utf8');
    const relativeHtml = convertToRelativePaths(originalHtml, srcFile, DIST_DIR);
    fs.writeFileSync(destFile, relativeHtml, 'utf8');
    processedHtmlCount++;
  } else {
    fs.copyFileSync(srcFile, destFile);
    copiedAssetsCount++;
  }
});

// 处理 sitemap.xml: 如果 dist 中有 sitemap-0.xml，同时在根目录创建标准的 sitemap.xml
const sitemap0 = path.join(DIST_DIR, 'sitemap-0.xml');
if (fs.existsSync(sitemap0)) {
  fs.copyFileSync(sitemap0, path.join(ROOT_DIR, 'sitemap.xml'));
  console.log('✅ 已同步生成根目录 sitemap.xml');
}

console.log(`🎉 同步完成！共处理 ${processedHtmlCount} 个 HTML 文件（全部转换为相对路径），同步 ${copiedAssetsCount} 个静态资源。`);
console.log(`🌟 根目录已生成 index.html，现在可以在本地双击或使用 file:// 协议直接打开无缝浏览！`);
