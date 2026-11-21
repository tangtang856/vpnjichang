const fs = require('fs');
const path = require('path');

const targetSlugs = [
  'breezenet', 'muguang', 'feimaoyun', 'wuyou', 'lingmao', 'flashleap', 'firefly', 'kuajiecloud', 'yinxingren', 'feiv', 'laddercloud', 'wavenet', 'lingdongcloud', 'quanqiuyun'
];

targetSlugs.forEach(slug => {
  const filePath = path.join(__dirname, 'crawl_cache', `${slug}.html`);
  if (!fs.existsSync(filePath)) {
    console.log(`[Missing] ${slug}`);
    return;
  }
  const html = fs.readFileSync(filePath, 'utf8');

  // Look for the table under '官方在售套餐与流量资费详情'
  const planSection = html.split('官方在售套餐与流量资费详情')[1];
  if (planSection) {
    const tableMatch = planSection.match(/<table[\s\S]*?<\/table>/);
    if (tableMatch) {
      console.log(`=== PLANS FOR ${slug} ===`);
      const rows = tableMatch[0].match(/<tr[\s\S]*?<\/tr>/g) || [];
      rows.forEach(r => {
        const text = r.replace(/<[^>]+>/g, ' | ').replace(/\s+/g, ' ').trim();
        console.log('  ' + text);
      });
    } else {
      console.log(`[No table found in plan section for ${slug}]`);
    }
  } else {
    console.log(`[No plan section for ${slug}]`);
  }
});
