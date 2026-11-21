const fs = require('fs');
const path = require('path');

const couponMap = {
  breezenet: {
    coupon: 'weifeng90',
    discountDesc: '专属 9 折优惠码'
  },
  muguang: {
    coupon: 'mm88',
    discountDesc: '新人首单 8 折优惠码'
  },
  feimaoyun: {
    coupon: 'flycat888',
    discountDesc: '官方专属立减优惠码'
  },
  wuyou: {
    coupon: 'wuyou666',
    discountDesc: '官方立减优惠码'
  },
  lingmao: {
    coupon: 'lmao888',
    discountDesc: '专属折扣优惠码'
  },
  flashleap: {
    coupon: 'shanyue',
    discountDesc: '官方专属立减优惠码'
  },
  firefly: {
    coupon: 'firefly',
    discountDesc: '官方通用立减优惠码'
  },
  kuajiecloud: {
    coupon: 'kuajie',
    discountDesc: '官方通用立减优惠码'
  },
  yinxingren: {
    coupon: 'yxr888',
    discountDesc: '专属 8 折立减优惠码'
  },
  feiv: {
    coupon: 'fly20',
    discountDesc: '官方专属 8 折优惠码'
  },
  laddercloud: {
    coupon: 'tiziyun',
    discountDesc: '官方专属立减优惠码'
  },
  wavenet: {
    coupon: 'lw888',
    discountDesc: '新人首单 8 折优惠码'
  },
  lingdongcloud: {
    coupon: 'ld888',
    discountDesc: '官方专属 8 折优惠码'
  },
  quanqiuyun: {
    coupon: 'tt88',
    discountDesc: '官方专属立减优惠码'
  }
};

// 1. 更新 airports.json
const jsonPath = path.resolve(__dirname, '../src/data/airports.json');
const airportsData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

airportsData.forEach(ap => {
  if (couponMap[ap.id]) {
    ap.coupon = couponMap[ap.id].coupon;
    // 确保套餐计费说明中包含优惠信息
    if (ap.plans && ap.plans.length > 0) {
      if (!ap.plans[0].billingNote.includes(ap.coupon)) {
        ap.plans[0].billingNote += `，专属优惠码 ${ap.coupon}`;
      }
    }
  }
});

fs.writeFileSync(jsonPath, JSON.stringify(airportsData, null, 2), 'utf8');
console.log('✅ 已更新 src/data/airports.json');

// 2. 更新 public/js/airports-data.js
const publicJsPath = path.resolve(__dirname, '../public/js/airports-data.js');
fs.writeFileSync(publicJsPath, 'window.AIRPORTS_DATA = ' + JSON.stringify(airportsData, null, 2) + ';', 'utf8');
console.log('✅ 已更新 public/js/airports-data.js');

// 3. 更新 src/data/airports.ts
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
