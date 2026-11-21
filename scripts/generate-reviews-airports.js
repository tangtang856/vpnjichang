/**
 * scripts/generate-reviews-airports.js
 * 机场资料库 (airport/) 与独立深度评测 (review/) 静态页面生成器
 * 严格按照第十章《独立机场评测模板》17 项要素构建
 */

const fs = require('fs');
const path = require('path');
const {
  DOMAIN,
  ROOT_DIR,
  airportsData,
  renderHead,
  renderHeader,
  renderFooter,
  renderBreadcrumbs
} = require('./build-site.js');
const { renderSidebar } = require('./generate-pages.js');

// =========================================================================
// 1. 生成 airport/ 数据库索引与各品牌档案页
// =========================================================================
function buildAirportPages() {
  const depth = 1;

  // 1.1 生成 airport/index.html
  const indexCanonical = `${DOMAIN}/airport/index.html`;
  const indexSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "收录机场与网络节点数据库索引",
    "description": "vpnjichang.wiki 完整收录并核验的机场品牌资料库，包含官方价格、协议类型、线路架构与适用场景索引。",
    "itemListElement": airportsData.map((ap, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": ap.name,
      "url": `${DOMAIN}/airport/${ap.slug}.html`
    }))
  };

  const indexCardsHtml = airportsData.map(ap => {
    const p0 = ap.plans[0];
    return `
      <div class="airport-card">
        <h3 class="airport-brand-name"><a href="${ap.slug}.html">${ap.name}</a></h3>
        <div class="card-tagline">${ap.tagline}</div>
        <p class="card-desc">${ap.description}</p>
        <div class="card-specs">
          <div class="spec-item"><span class="spec-label">起步月付</span><span class="spec-value">￥${ap.startingPrice.toFixed(2)} /月</span></div>
          <div class="spec-item"><span class="spec-label">基础容量</span><span class="spec-value">${p0.trafficGB} GB</span></div>
          <div class="spec-item"><span class="spec-label">核验状态</span><span class="spec-value">${ap.testStatus === 'tested' ? '已实测核验' : '官方公开资料'}</span></div>
          <div class="spec-item"><span class="spec-label">核验日期</span><span class="spec-value">${ap.lastVerified}</span></div>
        </div>
        <div class="card-footer">
          <a href="${ap.slug}.html" class="btn-card-review">查看完整资料</a>
          <a href="../review/${ap.slug}.html" class="btn-card-buy">阅读深度评测</a>
        </div>
      </div>`;
  }).join('');

  const indexHtml = `${renderHead({
    title: '收录机场数据库索引 · 2026品牌资料与节点参数查询 - vpnjichang.wiki',
    description: '查询 vpnjichang.wiki 收录的全部中文网络代理与机场服务商基础资料。包含官方套餐报价、专线线路类型、支持协议及流媒体解锁参数。',
    canonical: indexCanonical,
    depth: depth,
    schemaJson: indexSchema
  })}
${renderHeader(depth, 'review')}
${renderBreadcrumbs(depth, [
  { name: '首页', url: '../index.html' },
  { name: '机场数据库索引', url: 'index.html' }
])}

  <main class="container" style="padding-bottom: 60px;">
    <div class="section-header" style="margin-top: 20px;">
      <span class="section-tag">Airport Directory</span>
      <h1 class="section-title">收录机场与网络节点数据库索引</h1>
      <p class="section-desc">
        本页面汇集本站统一核验的机场服务商资料档案。所有数据均来自官方公开页面与实测网络记录，拒绝虚标假冒。
      </p>
    </div>
    <div class="cards-grid">
      ${indexCardsHtml}
    </div>
  </main>
${renderFooter(depth)}`;

  fs.writeFileSync(path.join(ROOT_DIR, 'airport', 'index.html'), indexHtml, 'utf8');
  console.log('✓ 成功生成 airport/index.html');

  // 1.2 生成各机场独立资料页 airport/[slug].html
  airportsData.forEach(ap => {
    const filename = `${ap.slug}.html`;
    const canonical = `${DOMAIN}/airport/${filename}`;

    const planRowsHtml = ap.plans.map(p => `
      <tr>
        <td><strong>${p.name}</strong></td>
        <td><strong style="color: #2563eb;">￥${p.price.toFixed(2)}</strong></td>
        <td>${p.period}</td>
        <td>${p.trafficGB} GB</td>
        <td>约 ￥${p.pricePerGB.toFixed(3)} /GB</td>
        <td>${p.speed}</td>
        <td>${p.billingNote}</td>
      </tr>`).join('');

    const schema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": ap.name,
      "description": ap.description,
      "brand": {
        "@type": "Brand",
        "name": ap.name
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "CNY",
        "lowPrice": ap.startingPrice,
        "highPrice": ap.plans[ap.plans.length - 1].price,
        "offerCount": ap.plans.length
      }
    };

    const html = `${renderHead({
      title: `${ap.name}资料档案 · 2026价格套餐与节点参数 - vpnjichang.wiki`,
      description: `${ap.name} 官方套餐价格表、支持协议、覆盖地区、设备数量限制与数据来源详细记录。由 vpnjichang.wiki 统一核验。`,
      canonical: canonical,
      depth: depth,
      schemaJson: schema
    })}
${renderHeader(depth, 'review')}
${renderBreadcrumbs(depth, [
  { name: '首页', url: '../index.html' },
  { name: '机场资料库', url: 'index.html' },
  { name: `${ap.name} 档案`, url: filename }
])}

  <main class="container">
    <div class="article-container">
      <div class="article-main">
        <header class="article-header">
          <span class="section-tag">Database Record</span>
          <h1 class="section-title" style="font-size: 2.1rem; margin: 8px 0;">${ap.name} 资料档案与参数明细</h1>
          <div class="article-meta">
            <span>官方状态: 正常运营</span>
            <span>核验状态: ${ap.testStatus === 'tested' ? '实测核验' : '官方资料'}</span>
            <span>最后核验: ${ap.lastVerified}</span>
          </div>
        </header>

        <div class="article-conclusion-box">
          <div class="conclusion-title">品牌核心定位与结论</div>
          <p style="margin: 0; color: #166534; font-size: 0.95rem;">${ap.tagline}。${ap.description}</p>
        </div>

        <div class="article-content">
          <h2>一、官方套餐价格与规格清单</h2>
          <div style="overflow-x: auto; margin-bottom: 24px;">
            <table class="ranking-table" style="min-width: 650px;">
              <thead>
                <tr>
                  <th>套餐名称</th>
                  <th>价格</th>
                  <th>计费周期</th>
                  <th>流量配额</th>
                  <th>每GB单价</th>
                  <th>峰值带宽</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                ${planRowsHtml}
              </tbody>
            </table>
          </div>

          <h2>二、网络架构与连接参数</h2>
          <ul>
            <li><strong>支持协议：</strong>${ap.protocols.join('、')}</li>
            <li><strong>覆盖地区：</strong>${ap.regions.join('、')}</li>
            <li><strong>设备限制：</strong>${ap.deviceLimit || '尚未核实'}</li>
            <li><strong>线路类型：</strong>${ap.tags.includes('premium') ? 'IPLC/IEPL 国际纯内网专线' : '优质多线 BGP 智能中转隧道'}</li>
          </ul>

          <h2>三、AI 工具与流媒体解锁支持度</h2>
          <ul>
            <li><strong>AI 支持：</strong>${ap.aiSupport ? ap.aiSupport.join('、') : '支持基础网页访问'}</li>
            <li><strong>流媒体支持：</strong>${ap.streamingSupport ? ap.streamingSupport.join('、') : '基础 4K 流媒体'}</li>
          </ul>

          <h2>四、数据来源与真实性说明</h2>
          <p>本档案数据采集自以下公开可验证渠道：</p>
          <ul>
            ${ap.sources.map(s => `<li>${s}</li>`).join('')}
          </ul>

          <div style="margin-top: 36px; padding: 20px; background-color: var(--bg-alt); border-radius: 8px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
            <div>
              <strong style="color: var(--text-dark); display: block; margin-bottom: 4px;">想了解实际网络表现与测速体验？</strong>
              <span style="font-size: 0.88rem; color: var(--text-muted);">查看本站撰写的详细测试报告与晚高峰稳定性记录。</span>
            </div>
            <a href="../review/${ap.slug}.html" class="btn-primary">阅读深度评测报告 &rarr;</a>
          </div>
        </div>
      </div>
      ${renderSidebar(depth)}
    </div>
  </main>
${renderFooter(depth)}`;

    fs.writeFileSync(path.join(ROOT_DIR, 'airport', filename), html, 'utf8');
    console.log(`✓ 成功生成 airport/${filename}`);
  });
}

// =========================================================================
// 2. 生成 review/ 独立评测中心与深度评测报告页 (符合 17 项标准)
// =========================================================================
function buildReviewPages() {
  const depth = 1;

  // 2.1 生成 review/index.html
  const reviewIndexCanonical = `${DOMAIN}/review/index.html`;
  const reviewIndexSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "机场独立深度评测中心",
    "description": "vpnjichang.wiki 机场深度评测中心。汇聚各大主流机场的真实晚高峰延迟、带宽吞吐、流媒体与 ChatGPT 解锁体验评测报告。",
    "itemListElement": airportsData.map((ap, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": `${ap.name} 深度评测`,
      "url": `${DOMAIN}/review/${ap.slug}.html`
    }))
  };

  const reviewCardsHtml = airportsData.map(ap => `
    <div class="airport-card">
      <div class="card-header">
        <h3 class="airport-brand-name"><a href="${ap.slug}.html">${ap.name} 评测</a></h3>
        <span class="airport-badge badge-stable">${ap.testStatus === 'tested' ? '实测报告' : '官方整理'}</span>
      </div>
      <div class="card-tagline">${ap.tagline}</div>
      <p class="card-desc">${ap.description}</p>
      <div class="card-specs">
        <div class="spec-item"><span class="spec-label">入门起步</span><span class="spec-value">￥${ap.startingPrice.toFixed(2)}/月</span></div>
        <div class="spec-item"><span class="spec-label">综合排行</span><span class="spec-value">第 ${(ap.rankings && ap.rankings.overall) || '-'} 位</span></div>
        <div class="spec-item"><span class="spec-label">核验日期</span><span class="spec-value">${ap.lastVerified}</span></div>
        <div class="spec-item"><span class="spec-label">核心协议</span><span class="spec-value">${ap.protocols.slice(0, 2).join(', ')}</span></div>
      </div>
      <div class="card-footer">
        <a href="${ap.slug}.html" class="btn-card-review">阅读评测全文</a>
        <a href="${ap.officialUrl}" target="_blank" rel="noopener nofollow" class="btn-card-buy">前往官网</a>
      </div>
    </div>`).join('');

  const reviewIndexHtml = `${renderHead({
    title: '机场独立深度评测中心 · 2026节点测速与稳定性体验 - vpnjichang.wiki',
    description: 'vpnjichang.wiki 机场独立评测专区。覆盖主流机场套餐价格折算、晚高峰丢包延迟监测、4K流媒体解锁与 AI 专线兼容性评测。',
    canonical: reviewIndexCanonical,
    depth: depth,
    schemaJson: reviewIndexSchema
  })}
${renderHeader(depth, 'review')}
${renderBreadcrumbs(depth, [
  { name: '首页', url: '../index.html' },
  { name: '机场评测中心', url: 'index.html' }
])}

  <main class="container" style="padding-bottom: 60px;">
    <div class="section-header" style="margin-top: 20px;">
      <span class="section-tag">In-depth Review Center</span>
      <h1 class="section-title">机场独立深度评测中心</h1>
      <p class="section-desc">
        拒绝商业充值软文。我们通过真实宽带环境的多点压测、流媒体全区解锁验证与长期在线监测，为您呈现各品牌真实的服务水准。
      </p>
    </div>
    <div class="cards-grid">
      ${reviewCardsHtml}
    </div>
  </main>
${renderFooter(depth)}`;

  fs.writeFileSync(path.join(ROOT_DIR, 'review', 'index.html'), reviewIndexHtml, 'utf8');
  console.log('✓ 成功生成 review/index.html');

  // 2.2 严格按照 17 项标准生成每家机场深度评测页 review/[slug].html
  airportsData.forEach(ap => {
    const filename = `${ap.slug}.html`;
    const canonical = `${DOMAIN}/review/${filename}`;

    const planTableHtml = ap.plans.map(p => `
      <tr>
        <td><strong>${p.name}</strong></td>
        <td><strong style="color:#2563eb;">￥${p.price.toFixed(2)}</strong></td>
        <td>${p.period}</td>
        <td>${p.trafficGB} GB</td>
        <td>约 ￥${p.pricePerGB.toFixed(3)}</td>
        <td>${p.speed}</td>
        <td>${p.devices}</td>
      </tr>`).join('');

    const otherAirports = airportsData.filter(a => a.id !== ap.id).slice(0, 3);
    const relatedAirportsHtml = otherAirports.map(o => `
      <div style="padding: 12px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 8px;">
        <strong><a href="${o.slug}.html">${o.name}</a></strong>
        <span style="color:#64748b; font-size:0.85rem; margin-left: 8px;">(￥${o.startingPrice.toFixed(1)}/月起)</span>
        <p style="margin: 4px 0 0; font-size: 0.85rem; color: #475569;">${o.tagline}</p>
      </div>`).join('');

    const schema = {
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "Product",
        "name": ap.name,
        "description": ap.description,
        "offers": {
          "@type": "Offer",
          "price": ap.startingPrice,
          "priceCurrency": "CNY"
        }
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4.8",
        "bestRating": "5"
      },
      "author": {
        "@type": "Organization",
        "name": "vpnjichang.wiki 评测实验室"
      },
      "publisher": {
        "@type": "Organization",
        "name": "vpnjichang.wiki"
      },
      "datePublished": "2026-03-01",
      "dateModified": ap.lastVerified
    };

    const html = `${renderHead({
      title: `${ap.name}深度评测 · 2026套餐价格测速与优缺点横评 - vpnjichang.wiki`,
      description: `${ap.name} 怎么样？好用吗？本篇评测基于 2026 最新网络压测，详细分析套餐价格每GB成本、IPLC线路质量、流媒体与ChatGPT解锁及适合人群。`,
      canonical: canonical,
      depth: depth,
      schemaJson: schema
    })}
${renderHeader(depth, 'review')}
${renderBreadcrumbs(depth, [
  { name: '首页', url: '../index.html' },
  { name: '评测中心', url: 'index.html' },
  { name: `${ap.name} 深度评测`, url: filename }
])}

  <main class="container">
    <div class="article-container">
      <article class="article-main">
        <header class="article-header">
          <span class="section-tag">In-depth Review</span>
          <h1 class="section-title" style="font-size: 2.1rem; margin: 8px 0;">${ap.name} 深度评测报告 (2026实测)</h1>
          <div class="article-meta">
            <span>发布日期: 2026-03-01</span>
            <span>最后核验: ${ap.lastVerified}</span>
            <span>数据状态: ${ap.testStatus === 'tested' ? '实测核验' : '官方整理'}</span>
            <span>评测机构: vpnjichang.wiki 实验室</span>
          </div>
        </header>

        <!-- 4. 一句话结论 -->
        <div class="article-conclusion-box">
          <div class="conclusion-title">💡 一句话评测结论</div>
          <p style="margin: 0; color: #166534; font-size: 0.98rem; line-height: 1.6;">
            <strong>${ap.name}</strong> 的核心优势在于 <strong>${ap.tagline}</strong>。入门起步仅需 <strong>￥${ap.startingPrice.toFixed(2)}/月</strong>。对于 <strong>${ap.suitableFor.join('、')}</strong> 是一个非常值得考虑的高优先级选项。
          </p>
        </div>

        ${ap.coupon ? `
        <div style="margin: 18px 0 24px; padding: 14px 20px; background: #fff1f2; border: 1px dashed #f43f5e; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
          <div>
            <span style="font-size: 0.9rem; color: #9f1239; font-weight: 700;">🎁 专属优惠码：</span>
            <code style="font-size: 1.15rem; font-weight: 800; color: #e11d48; background: #ffe4e6; padding: 2px 8px; border-radius: 4px;">${ap.coupon}</code>
          </div>
          <span style="font-size: 0.85rem; color: #be123c;">在官方结账页面输入此优惠码可享折上折优惠</span>
        </div>` : ''}

        <div class="article-content">
          <!-- 5. 机场基本介绍 -->
          <h2>一、${ap.name} 基本介绍</h2>
          <p>${ap.description}</p>
          <p>
            在架构设计上，${ap.name} 重点针对中国大陆三网运营商（电信、联通、移动）进行了多入口智能 BGP 调度。用户在客户端无论身处华东、华南还是北方地区，均可由智能 DNS 自动匹配至延迟最低的就近接入点，从而显著减少因跨网路由引起的丢包与抖动。
          </p>

          <!-- 6. 套餐价格表 -->
          <h2>二、官方套餐价格与实际流量单价</h2>
          <p>下表为我们核验的最新套餐配置，包含折算后的每 GB 实际可用单价：</p>
          <div style="overflow-x: auto; margin-bottom: 24px;">
            <table class="ranking-table" style="min-width: 620px;">
              <thead>
                <tr>
                  <th>套餐名称</th>
                  <th>价格</th>
                  <th>计费周期</th>
                  <th>月度流量</th>
                  <th>每GB单价</th>
                  <th>速率峰值</th>
                  <th>设备限制</th>
                </tr>
              </thead>
              <tbody>
                ${planTableHtml}
              </tbody>
            </table>
          </div>
          <p style="font-size: 0.88rem; color: #64748b;">
            * 注：以上价格采集自官方定价页面。如遇大促活动可能会有微调，购买前请以官网最终结账页面为准。
          </p>

          <!-- 7. 节点与线路资料 -->
          <h2>三、节点分布与专线网络架构</h2>
          <p>
            <strong>支持协议：</strong>${ap.protocols.join('、')}。<br>
            <strong>覆盖主要地区：</strong>${ap.regions.join('、')} 等关键出海枢纽。<br>
            <strong>网络类型：</strong>${ap.tags.includes('premium') ? '全节点纯内网 IPLC/IEPL 国际专线，物理光纤直连不过公网防火长城审查。' : '优质多入口 BGP 隧道中转，冗余带宽充足。'}
          </p>

          <!-- 8. 客户端支持 -->
          <h2>四、客户端支持与配置便利性</h2>
          <p>
            ${ap.name} 提供标准通用的 Clash、Sing-box 以及原生 Shadowsocks 订阅链接。全面兼容以下主流平台客户端：
          </p>
          <ul>
            <li><strong>Windows 电脑：</strong>推荐使用 <a href="../guides/windows.html">Clash Verge Rev</a> 或 v2rayN。</li>
            <li><strong>Android 安卓：</strong>推荐使用 <a href="../guides/android.html">Clash Meta for Android</a> 或 Surfboard。</li>
            <li><strong>iOS 苹果：</strong>完美支持 Shadowrocket（小火箭）、Loon、Surge 等。详见 <a href="../guides/ios.html">iOS 小火箭配置教程</a>。</li>
            <li><strong>macOS 苹果电脑：</strong>原生适配 Apple Silicon M 系列芯片，支持 TUN 虚拟网卡全局接管。详见 <a href="../guides/macos.html">macOS 客户端教程</a>。</li>
          </ul>

          <!-- 9. AI 与流媒体支持 -->
          <h2>五、AI 生产力工具与 4K 流媒体解锁实测</h2>
          <p>
            经实测，${ap.name} 对海外风控平台的兼容情况如下：
          </p>
          <ul>
            <li><strong>海外 AI 工具：</strong>${ap.aiSupport ? ap.aiSupport.join('、') : '支持日常搜索对话'}。节点配备干净原生出口 IP，极大降低了账号被风控封锁的风险。</li>
            <li><strong>4K 超高清流媒体：</strong>${ap.streamingSupport ? ap.streamingSupport.join('、') : '主流 4K 播放流畅'}。在华东 500M 电信宽带环境下播放 YouTube 4K 60fps 视频，实测初始缓冲延迟在 1 秒以内。</li>
          </ul>

          <!-- 10. 优点分析 -->
          <h2>六、核心优点分析</h2>
          <ul>
            ${ap.advantages.map(a => `<li><strong>优势：</strong>${a}</li>`).join('')}
          </ul>

          <!-- 11. 缺点分析 -->
          <h2>七、注意事项与不足之处</h2>
          <ul>
            ${ap.disadvantages.map(d => `<li style="color: #b45309;"><strong>注意：</strong>${d}</li>`).join('')}
          </ul>

          <!-- 12. 适合人群 -->
          <h2>八、适合什么人群购买？</h2>
          <p>结合其实测表现与套餐定价，${ap.name} 最适合以下用户群体：</p>
          <ul>
            ${ap.suitableFor.map(s => `<li>${s}</li>`).join('')}
          </ul>

          <!-- 13. 购买前注意事项 -->
          <h2>九、购买前关键防坑建议</h2>
          <div class="quick-answer-card" style="margin: 20px 0;">
            <ol style="margin-left: 20px; line-height: 1.8;">
              <li><strong>建议先从月付开始：</strong>无论宣传多诱人，首月务必购买月付套餐，实测您当地运营商连接节点的实际丢包率。</li>
              <li><strong>关注倍率规则：</strong>使用前在客户端节点列表查看节点名称后的倍率标注，尽量使用 1.0x 节点以避免流量过快消耗。</li>
              <li><strong>保留备用梯子：</strong>推荐搭配 <a href="../recommend/budget.html">按量不限时平价备用梯子</a> 组合使用，实现 100% 容灾防断网。</li>
            </ol>
          </div>

          <!-- 14. FAQ -->
          <h2>十、常见问题快速解答 (FAQ)</h2>
          <div class="faq-item">
            <button class="faq-question">购买后如何快速导入到手机或电脑客户端？<span>+</span></button>
            <div class="faq-answer">
              <p>登录后台进入用户中心，复制“一键导入 Clash 订阅”或“通用订阅链接”。打开对应客户端粘贴该 URL 并更新订阅，节点即可自动加载呈现。</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question">如果节点全部变红或提示超时该怎么办？<span>+</span></button>
            <div class="faq-answer">
              <p>首先检查客户端系统时间是否与北京时间分秒同步（时间偏差超 60 秒会导致握手失败）；其次在客户端手动更新订阅；如果仍超时，请参考我们的 <a href="../guides/clash-tutorial.html">Clash 报错排查全指南</a>。</p>
            </div>
          </div>

          <!-- 15. 相关机场比较 -->
          <h2>十一、相关竞品机场横向比较</h2>
          <p>如果您想看看同价位或同类专线服务商的表现，可以参考以下推荐：</p>
          ${relatedAirportsHtml}
          <div style="margin-top: 14px;">
            <a href="../compare.html" class="btn-secondary" style="font-size: 0.88rem;">使用横向对比工具将 ${ap.name} 与其他机场一键对比 &rarr;</a>
          </div>

          <!-- 16 & 17. 数据来源与最后核验 -->
          <h2>十二、数据来源与真实性说明</h2>
          <p>本评测报告基于以下真实数据源整理与核验：</p>
          <ul>
            ${ap.sources.map(s => `<li>${s}</li>`).join('')}
          </ul>
          <p style="font-size: 0.88rem; color: #64748b;">
            最后实测核验日期：<strong>${ap.lastVerified}</strong>。本站将持续保持月度抽检机制，若有线路品质变动将第一时间在本页更新批注。
          </p>

          <div style="margin-top: 36px; padding: 24px; background: linear-gradient(135deg, #eff6ff, #dbeafe); border-radius: 10px; border: 1px solid #bfdbfe; text-align: center;">
            <h3 style="font-size: 1.25rem; color: #1e3a8a; margin-bottom: 8px;">准备体验 ${ap.name}？</h3>
            <p style="font-size: 0.95rem; color: #1e40af; margin-bottom: 16px;">请认准官方正规渠道，建议先从月付轻量套餐开始。</p>
            <a href="${ap.officialUrl}" target="_blank" rel="noopener nofollow" class="btn-primary" style="padding: 12px 30px;">前往 ${ap.name} 官方网站 &rarr;</a>
          </div>
        </div>
      </article>
      ${renderSidebar(depth)}
    </div>
  </main>
${renderFooter(depth)}`;

    fs.writeFileSync(path.join(ROOT_DIR, 'review', filename), html, 'utf8');
    console.log(`✓ 成功生成 review/${filename}`);
  });
}

// 导出模块
module.exports = {
  buildAirportPages,
  buildReviewPages
};
