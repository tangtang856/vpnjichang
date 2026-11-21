const https = require('https');
const fs = require('fs');
const path = require('path');

const targetAirports = [
  { slug: 'breezenet', name: '微风网络 Breezenet', aff: 'https://edp01.breezenetaff.com/#/?code=h4GlIXwC' },
  { slug: 'muguang', name: '暮光网络', aff: 'https://varnexa.twilightaff.com/#/?code=8EtJCnBT' },
  { slug: 'feimaoyun', name: '飞猫云', aff: 'https://flycat1.flycatvipaff.cc/#/?code=MlwqPqcx' },
  { slug: 'wuyou', name: '无忧', aff: 'https://wep01.worryfreeaff.com/#/?code=oGi9FQ0J' },
  { slug: 'lingmao', name: '灵猫', aff: 'https://vip02.civetaff.com/#/?code=SXY8qyrG' },
  { slug: 'flashleap', name: '闪跃 FlashLeap', aff: 'https://vip02.flashleapaff.com/#/?code=8ZIV6HQ3' },
  { slug: 'firefly', name: '萤火虫（Firefly）', aff: 'https://vip02.fireflyaff.com/#/?code=uTKLkAyC' },
  { slug: 'kuajiecloud', name: '跨界', aff: 'https://vip02.kuajieaff.com/#/?code=CpJKZicY' },
  { slug: 'yinxingren', name: '隐形人', aff: 'https://varnexa.invisibleaff.com/#/?code=5BkMj6bD' },
  { slug: 'feiv', name: '飞V', aff: 'https://varnexa.flyvaff.com/#/?code=Ks7qO8qe' },
  { slug: 'laddercloud', name: '梯子云 LadderCloud', aff: 'https://varnexa.ladderaff.com/#/?code=eC6eLAbq' },
  { slug: 'wavenet', name: '浪网 WaveNet', aff: 'https://varnexa.wavenetaff.com/#/?code=8fwQQBdy' },
  { slug: 'lingdongcloud', name: '灵动云', aff: 'https://varnexa.lingdongaff.com/#/?code=kd4yTgUr' },
  { slug: 'quanqiuyun', name: '全球云', aff: 'https://sswdh.gcvipaff.com/#/?code=9SF0oyg0' }
];

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', err => reject(err));
  });
}

async function run() {
  const results = [];
  const cacheDir = path.join(__dirname, 'crawl_cache');
  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir);

  for (const ap of targetAirports) {
    const cacheFile = path.join(cacheDir, `${ap.slug}.html`);
    let html = '';
    if (fs.existsSync(cacheFile)) {
      html = fs.readFileSync(cacheFile, 'utf8');
      console.log(`[Cached] ${ap.slug}`);
    } else {
      console.log(`[Fetching] ${ap.slug}...`);
      try {
        html = await fetchPage(`https://jiediantuijian.shop/airport/${ap.slug}/`);
        fs.writeFileSync(cacheFile, html, 'utf8');
      } catch (e) {
        console.error(`Failed to fetch ${ap.slug}:`, e.message);
      }
    }

    results.push({ ...ap, html });
  }

  console.log(`Crawl finished. Total pages: ${results.length}`);
}

run();
