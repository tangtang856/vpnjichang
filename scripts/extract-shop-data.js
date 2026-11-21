const fs = require('fs');
const content = fs.readFileSync('temp_shop.html', 'utf8');

const targetSlugs = [
  'breezenet',
  'muguang',
  'feimaoyun',
  'wuyou',
  'lingmao',
  'flashleap',
  'firefly',
  'kuajiecloud',
  'yinxingren',
  'feiv',
  'laddercloud',
  'wavenet',
  'lingdongcloud',
  'quanqiuyun'
];

targetSlugs.forEach(slug => {
  console.log('====================================================');
  console.log('SLUG: ' + slug);
  const regex = new RegExp(`href="\\/airport\\/${slug}\\/"`, 'g');
  let match;
  while ((match = regex.exec(content)) !== null) {
    const idx = match.index;
    const start = Math.max(0, idx - 400);
    const end = Math.min(content.length, idx + 1200);
    const snippet = content.substring(start, end);
    console.log(snippet.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
    console.log('---');
  }
});
