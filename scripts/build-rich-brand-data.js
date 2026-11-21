const fs = require('fs');
const path = require('path');

const cacheDir = path.resolve(__dirname, 'crawl_cache');
const files = fs.readdirSync(cacheDir);

const richBrands = {};

files.forEach(file => {
  const slug = file.replace('.html', '');
  const html = fs.readFileSync(path.join(cacheDir, file), 'utf8');

  // Overall Score
  const scoreMatch = html.match(/综合评分<\/span>\s*<span[^>]*font-extrabold[^>]*>([\d\.]+)/) ||
                     html.match(/综合评分\s*<\/div>\s*<div[^>]*>([\d\.]+)/);
  const overallScore = scoreMatch ? parseFloat(scoreMatch[1]) : 9.3;

  // Radar Scores
  const radarScores = {};
  const scoreMatches = html.matchAll(/(晚高峰稳定性|带宽下行速率|性价比与单价|流媒体与AI解锁|工单售后时效)\s*<\/span>\s*<span[^>]*>([\d\.]+)/g);
  for (const m of scoreMatches) {
    radarScores[m[1]] = parseFloat(m[2]);
  }

  // Nodes Table
  const nodes = [];
  const trMatches = html.matchAll(/<tr class="hover:bg-slate-50\/60 transition">([\s\S]*?)<\/tr>/g);
  for (const tr of trMatches) {
    const rowHtml = tr[1];
    const tds = [...rowHtml.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
    if (tds.length >= 8) {
      nodes.push({
        region: tds[0],
        datacenter: tds[1],
        ping: tds[2],
        jitter: tds[3],
        loss: tds[4],
        download: tds[5],
        youtube4k: tds[6],
        scenario: tds[7]
      });
    }
  }

  // Plans Table
  const plans = [];
  const allPlanRows = html.matchAll(/<tbody class="divide-y divide-slate-100">([\s\S]*?)<\/tbody>/g);
  for (const match of allPlanRows) {
    const tbody = match[1];
    const rows = tbody.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g);
    for (const r of rows) {
      const tds = [...r[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(m => m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
      if (tds.length >= 7) {
        plans.push({
          name: tds[0],
          period: tds[1],
          price: tds[2],
          traffic: tds[3],
          bandwidth: tds[4],
          devices: tds[5],
          note: tds[6]
        });
      }
    }
  }

  // Pros & Cons Extraction
  const pros = [];
  const prosBlockMatch = html.match(/核心优势点：[\s\S]*?<\/ul>/);
  if (prosBlockMatch) {
    const pMatches = prosBlockMatch[0].matchAll(/<li[^>]*>[\s\S]*?<span>([^<]+)<\/span>\s*<\/li>/g);
    for (const pm of pMatches) {
      const t = pm[1].trim();
      if (t && !pros.includes(t)) pros.push(t);
    }
  }

  const cons = [];
  const consBlockMatch = html.match(/注意事项与不足：[\s\S]*?<\/ul>/);
  if (consBlockMatch) {
    const cMatches = consBlockMatch[0].matchAll(/<li[^>]*>[\s\S]*?<span>([^<]+)<\/span>\s*<\/li>/g);
    for (const cm of cMatches) {
      const t = cm[1].trim();
      if (t && !cons.includes(t)) cons.push(t);
    }
  }

  // Architecture & Protocols
  const archMatch = html.match(/线路架构\s*<\/div>\s*<div[^>]*>([^<]+)/);
  const protoMatch = html.match(/支持加密协议\s*<\/div>\s*<div[^>]*>([^<]+)/);
  const regionMatch = html.match(/核心节点覆盖\s*<\/div>\s*<div[^>]*>([^<]+)/);
  const deviceMatch = html.match(/设备并发限制\s*<\/div>\s*<div[^>]*>([^<]+)/);
  const aiMatch = html.match(/AI支持：\s*([^<\n]+)/);
  const streamMatch = html.match(/流媒体：\s*([^<\n]+)/);

  // FAQs
  const faqs = [];
  const schemaMatch = html.match(/\{"@context":"https:\/\/schema\.org","@type":"FAQPage"[\s\S]*?\}\]}/);
  if (schemaMatch) {
    try {
      const faqObj = JSON.parse(schemaMatch[0]);
      if (faqObj.mainEntity && Array.isArray(faqObj.mainEntity)) {
        faqObj.mainEntity.forEach(item => {
          faqs.push({
            q: item.name,
            a: item.acceptedAnswer ? item.acceptedAnswer.text : ''
          });
        });
      }
    } catch (e) {}
  }

  richBrands[slug] = {
    slug,
    overallScore,
    radarScores,
    architecture: archMatch ? archMatch[1].trim() : 'IPLC/IEPL 国际专线',
    protocols: protoMatch ? protoMatch[1].trim() : 'Shadowsocks, VLESS',
    regions: regionMatch ? regionMatch[1].trim() : '香港、台湾、日本、新加坡、美国、欧洲',
    deviceLimit: deviceMatch ? deviceMatch[1].trim() : '4-6台设备',
    aiSupport: aiMatch ? aiMatch[1].trim() : 'ChatGPT Plus、Claude 3.5 Sonnet、Perplexity',
    streamingSupport: streamMatch ? streamMatch[1].trim() : 'Netflix 4K、Disney+、YouTube Premium',
    nodes,
    plans,
    pros,
    cons,
    faqs
  };
});

fs.writeFileSync('src/data/rich-brand-data.json', JSON.stringify(richBrands, null, 2), 'utf8');
console.log('Parsed brand details successfully.');
console.log('Sample breezenet pros:', richBrands['breezenet'].pros);
console.log('Sample breezenet cons:', richBrands['breezenet'].cons);
