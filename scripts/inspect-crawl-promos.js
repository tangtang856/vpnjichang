const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, 'crawl_cache');
fs.readdirSync(dir).filter(f => f.endsWith('.html')).forEach(f => {
  const text = fs.readFileSync(path.join(dir, f), 'utf8');
  console.log(`\n=================== ${f} ===================`);

  // 1. 查找优惠码相关展示块
  const couponMatches = text.match(/优惠[码券][^<>\n\r]{0,100}/gi) || [];
  const uniqueCoupons = Array.from(new Set(couponMatches.map(m => m.trim())));
  console.log('优惠匹配:', uniqueCoupons);

  // 2. 查找 FAQ 中关于优惠券的问答
  const faqRegex = /"name":\s*"([^"]*优惠[^"]*)"[\s\S]*?"text":\s*"([^"]*)"/g;
  let match;
  while ((match = faqRegex.exec(text)) !== null) {
    console.log(`FAQ 问: ${match[1]}`);
    console.log(`FAQ 答: ${match[2]}`);
  }
});
