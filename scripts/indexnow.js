/**
 * scripts/indexnow.js
 * Bing & 搜索引擎 IndexNow 协议自动推送工具
 *
 * 使用方法:
 *   node scripts/indexnow.js                    # 提交关键更新 URL
 *   node scripts/indexnow.js --url <URL>        # 提交单个 URL
 *   node scripts/indexnow.js --all              # 提交全站 sitemap URL (请勿频繁滥用)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const HOST = 'vpnjichang.wiki';
const KEY = 'c0f9947814b64177b96b270744747db9';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// 解析命令行参数
const args = process.argv.slice(2);
let targetUrls = [];

if (args.includes('--url')) {
  const urlIdx = args.indexOf('--url') + 1;
  if (args[urlIdx]) {
    targetUrls = [args[urlIdx]];
  } else {
    console.error('错误: 请在 --url 后提供具体的页面完整 URL');
    process.exit(1);
  }
} else if (args.includes('--all')) {
  // 从 sitemap 读取全部 URL
  let sitemapPath = path.resolve(__dirname, '../dist/sitemap-0.xml');
  if (!fs.existsSync(sitemapPath)) {
    sitemapPath = path.resolve(__dirname, '../sitemap.xml');
  }
  if (fs.existsSync(sitemapPath)) {
    const content = fs.readFileSync(sitemapPath, 'utf8');
    const matches = content.match(/<loc>(.*?)<\/loc>/g);
    if (matches) {
      targetUrls = matches.map(m => m.replace(/<\/?loc>/g, '').trim());
    }
  }
  console.log(`[警告] 您正在使用 --all 参数提交全量 ${targetUrls.length} 个 URL。根据 IndexNow 规范，请仅在网站初次上线或大规模改版时使用。`);
} else {
  // 默认提交近期核心主攻页面 (推荐方式，避免配额滥用)
  targetUrls = [
    `https://${HOST}/`,
    `https://${HOST}/recommend/index.html`,
    `https://${HOST}/recommend/budget.html`,
    `https://${HOST}/recommend/premium.html`,
    `https://${HOST}/ranking/overall.html`,
    `https://${HOST}/ranking/value.html`,
    `https://${HOST}/compare.html`
  ];
  console.log(`[提示] 未指定参数，默认提交 ${targetUrls.length} 个核心主攻落地页。如需提交特定 URL 请使用 --url <URL>`);
}

if (targetUrls.length === 0) {
  console.log('未检测到需要提交的 URL，操作取消。');
  process.exit(0);
}

// 构造推送 Payload
const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: targetUrls
});

console.log(`准备向 Bing IndexNow 接口提交 ${targetUrls.length} 个 URL...`);

// 发起 HTTPS POST 请求
function submitToIndexNow(payloadData, retryCount = 1) {
  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payloadData)
    }
  };

  const req = https.request(options, res => {
    let responseBody = '';
    res.on('data', chunk => { responseBody += chunk; });
    res.on('end', () => {
      console.log(`[HTTP 状态码]: ${res.statusCode} ${res.statusMessage}`);
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log('✓ [IndexNow 提交成功]: 请求已成功送达 api.indexnow.org');
        console.log('注意：IndexNow 提交仅代表通知搜索引擎已更新，不代表 Bing 已即时收录或排名更新。');
      } else if (res.statusCode === 400) {
        console.error('❌ [400 格式错误]: 请检查 JSON 格式或 host 与 URL 域名是否一致。');
      } else if (res.statusCode === 403) {
        console.error('❌ [403 密钥无效]: key 不匹配或 keyLocation 文件无法公开访问。');
      } else if (res.statusCode === 422) {
        console.error('❌ [422 URL未匹配]: 提交的 URL 不属于指定的 host 域。');
      } else if (res.statusCode === 429) {
        console.error('❌ [429 频率超限]: 提交过于频繁，已被限流。');
      } else {
        console.log(`响应内容: ${responseBody || '无返回消息体'}`);
      }
    });
  });

  req.on('error', err => {
    console.error(`请求发生异常: ${err.message}`);
    if (retryCount > 0) {
      console.log(`正在进行失败重试 (剩余重试次数: ${retryCount})...`);
      setTimeout(() => submitToIndexNow(payloadData, retryCount - 1), 2000);
    }
  });

  req.write(payloadData);
  req.end();
}

submitToIndexNow(payload);
