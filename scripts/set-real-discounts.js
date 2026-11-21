const fs = require('fs');
const path = require('path');

const realDiscounts = {
  breezenet: {
    coupon: 'weifeng90',
    hasCoupon: true,
    promoText: '专属优惠码 weifeng90 享立减折扣',
    note0: '¥8/月起，200GB超大流量，专属优惠码 weifeng90'
  },
  muguang: {
    coupon: '',
    hasCoupon: false,
    promoText: '官方直供特惠价，通过本站专属通道进入即享最新优惠，免输优惠码',
    note0: '¥20/月起，120GB/月专线节点，官方直供优惠'
  },
  feimaoyun: {
    coupon: 'flycat888',
    hasCoupon: true,
    promoText: '专属优惠码 flycat888 享立减折扣',
    note0: '年付折算约 ¥7/月起，150GB流量，优惠码 flycat888'
  },
  wuyou: {
    coupon: 'wuyou666',
    hasCoupon: true,
    promoText: '专属优惠码 wuyou666 享立减折扣',
    note0: '¥19/月起，100GB/月真实IPLC专线，优惠码 wuyou666'
  },
  lingmao: {
    coupon: '',
    hasCoupon: false,
    promoText: '官方直供特惠价，通过本站专属通道进入即享最新优惠，免输优惠码',
    note0: '¥25/月起，150GB/月真实IPLC专线，官方直供优惠'
  },
  flashleap: {
    coupon: 'shanyue',
    hasCoupon: true,
    promoText: '专属优惠码 shanyue 享立减折扣',
    note0: '¥24/月起，150GB/月 IPLC纯专线，优惠码 shanyue'
  },
  firefly: {
    coupon: 'firefly',
    hasCoupon: true,
    promoText: '专属优惠码 firefly 享立减折扣',
    note0: '年付折算约 ¥8/月，60GB/月，优惠码 firefly'
  },
  kuajiecloud: {
    coupon: '',
    hasCoupon: false,
    promoText: '官方直供特惠价，通过本站专属通道进入即享最新优惠，免输优惠码',
    note0: '¥20/月起，120GB/月全专线架构，官方直供优惠'
  },
  yinxingren: {
    coupon: 'yxr888',
    hasCoupon: true,
    promoText: '专属优惠码 yxr888 享立减折扣',
    note0: '¥24/月起，144GB/月 IEPL纯专线，优惠码 yxr888'
  },
  feiv: {
    coupon: '',
    hasCoupon: false,
    promoText: '官方直供底价，低至 ¥4.9/月起突破性特惠，免输优惠码',
    note0: '¥4.9/月起，突破性极低起步价，官方直供特惠'
  },
  laddercloud: {
    coupon: '',
    hasCoupon: false,
    promoText: '官方直供特惠价，通过本站专属通道进入即享最新优惠，免输优惠码',
    note0: '¥25/月起，125GB高速中转，官方直供优惠'
  },
  wavenet: {
    coupon: '',
    hasCoupon: false,
    promoText: '官方直供特惠价，通过本站专属通道进入即享最新优惠，免输优惠码',
    note0: '¥30/月起，150GB/月自研客户端优化线路，官方直供优惠'
  },
  lingdongcloud: {
    coupon: '',
    hasCoupon: false,
    promoText: '官方直供特惠价，通过本站专属通道进入即享最新优惠，免输优惠码',
    note0: '¥20/月起，100GB/月起均衡配置，官方直供优惠'
  },
  quanqiuyun: {
    coupon: 'tt88',
    hasCoupon: true,
    promoText: '专属优惠码 tt88 享立减折扣',
    note0: '约 ¥20/月起，120GB/月经典中转优化，优惠码 tt88'
  }
};

const jsonPath = path.resolve(__dirname, '../src/data/airports.json');
const airportsData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

airportsData.forEach(ap => {
  const conf = realDiscounts[ap.id];
  if (conf) {
    ap.coupon = conf.coupon;
    ap.promotionText = conf.promoText;
    if (ap.plans && ap.plans.length > 0) {
      ap.plans[0].billingNote = conf.note0;
    }
  }
});

// 1. 写回 airports.json
fs.writeFileSync(jsonPath, JSON.stringify(airportsData, null, 2), 'utf8');
console.log('✅ 已更新 src/data/airports.json');

// 2. 写回 public/js/airports-data.js
const publicJsPath = path.resolve(__dirname, '../public/js/airports-data.js');
fs.writeFileSync(publicJsPath, 'window.AIRPORTS_DATA = ' + JSON.stringify(airportsData, null, 2) + ';', 'utf8');
console.log('✅ 已更新 public/js/airports-data.js');

// 3. 写回 src/data/airports.ts
const tsPath = path.resolve(__dirname, '../src/data/airports.ts');
let tsContent = fs.readFileSync(tsPath, 'utf8');

const exportAirportsIdx = tsContent.indexOf('export const airportsData: Airport[] =');
const exportBenchmarksIdx = tsContent.indexOf('export const brandBenchmarks: Record<string, BrandBenchmark> =');

if (exportAirportsIdx !== -1 && exportBenchmarksIdx !== -1) {
  const prefix = tsContent.slice(0, exportAirportsIdx);
  const suffix = tsContent.slice(exportBenchmarksIdx);
  const newAirportsTs = `${prefix}export const airportsData: Airport[] = ${JSON.stringify(airportsData, null, 2)};\n\n${suffix}`;
  fs.writeFileSync(tsPath, newAirportsTs, 'utf8');
  console.log('✅ 已更新 src/data/airports.ts');
} else {
  console.error('❌ 未能在 airports.ts 中定位导出标记');
}
