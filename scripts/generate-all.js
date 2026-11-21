/**
 * scripts/generate-all.js
 * 核心整站静态生成引擎
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

console.log('开始全站静态页面构建流程...');

// 确保所有目录存在
['recommend', 'ranking', 'airport', 'review', 'guides', 'blog', 'glossary', 'docs', 'scripts'].forEach(d => {
  const full = path.join(ROOT_DIR, d);
  if (!fs.existsSync(full)) fs.mkdirSync(full, { recursive: true });
});

// =========================================================================
// 1. 生成首页 index.html
// =========================================================================
function buildHomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${DOMAIN}/#website`,
        "url": `${DOMAIN}/`,
        "name": "vpnjichang.wiki - 中文机场评测与科学翻墙节点导航",
        "description": "专业的中文机场推荐、节点评测与科学翻墙资讯门户。提供2026最新高性价比机场推荐、梯子推荐、专线VPN节点与多维度排行榜。",
        "inLanguage": "zh-CN"
      },
      {
        "@type": "Organization",
        "@id": `${DOMAIN}/#organization`,
        "name": "vpnjichang.wiki 评测实验室",
        "url": `${DOMAIN}/`,
        "logo": `${DOMAIN}/images/logo.svg`
      }
    ]
  };

  let airportCardsHtml = airportsData.map(ap => {
    const p0 = ap.plans[0];
    return `
      <div class="airport-card featured-border">
        <div class="card-header">
          <div>
            <h3 class="airport-brand-name"><a href="review/${ap.slug}.html">${ap.name}</a></h3>
            <div class="card-tagline">${ap.tagline}</div>
          </div>
          <span class="airport-badge badge-stable">${ap.testStatus === 'tested' ? '实测核验' : '官方资料'}</span>
        </div>
        <p class="card-desc">${ap.description.substring(0, 85)}...</p>
        <div class="card-specs">
          <div class="spec-item"><span class="spec-label">入门价格</span><span class="spec-value">￥${ap.startingPrice.toFixed(2)}/月</span></div>
          <div class="spec-item"><span class="spec-label">基础流量</span><span class="spec-value">${p0.trafficGB} GB</span></div>
          <div class="spec-item"><span class="spec-label">核心协议</span><span class="spec-value">${ap.protocols.slice(0, 2).join(', ')}</span></div>
          <div class="spec-item"><span class="spec-label">专线线路</span><span class="spec-value">${ap.tags.includes('premium') ? 'IPLC/IEPL 内网专线' : '优质 BGP 智能中转'}</span></div>
        </div>
        <div class="card-pro-con">
          <div class="pro-item">${ap.advantages[0]}</div>
          <div class="pro-item">${ap.advantages[1]}</div>
          <div class="con-item">${ap.disadvantages[0]}</div>
        </div>
        <div class="card-footer">
          <div class="price-box">
            <span class="price-currency">￥</span>
            <span class="price-num">${ap.startingPrice.toFixed(1)}</span>
            <span class="price-unit">/月起</span>
          </div>
          <div class="card-links">
            <a href="review/${ap.slug}.html" class="btn-card-review">深度评测</a>
            <a href="${ap.officialUrl}" target="_blank" rel="noopener nofollow" class="btn-card-buy">前往官网</a>
          </div>
        </div>
      </div>`;
  }).join('');

  let rankingRowsHtml = airportsData.map((ap, idx) => {
    const rankClass = idx === 0 ? 'rank-1' : (idx === 1 ? 'rank-2' : (idx === 2 ? 'rank-3' : 'rank-other'));
    const p0 = ap.plans[0];
    return `
      <tr>
        <td><span class="rank-badge ${rankClass}">${idx + 1}</span></td>
        <td>
          <strong><a href="review/${ap.slug}.html">${ap.name}</a></strong>
          <div style="font-size:0.8rem; color:#64748b;">${ap.protocols.slice(0, 2).join('/')}</div>
        </td>
        <td><strong style="color:#2563eb;">￥${ap.startingPrice.toFixed(2)}</strong> /月</td>
        <td>${p0.trafficGB} GB</td>
        <td>${ap.tags.includes('premium') ? '<span class="badge-tag" style="background:#dbeafe; color:#1e40af;">IPLC专线</span>' : '<span class="badge-tag" style="background:#f1f5f9; color:#475569;">BGP中转</span>'}</td>
        <td style="font-size:0.85rem; color:#475569;">${ap.suitableFor[0]}</td>
        <td>
          <a href="review/${ap.slug}.html" class="btn-card-review" style="padding: 4px 8px; font-size: 0.8rem;">查看详情</a>
        </td>
      </tr>`;
  }).join('');

  const html = `${renderHead({
    title: '机场推荐 · 2026最新优质稳定性价比机场与梯子节点测评导航',
    description: 'vpnjichang.wiki 专注于客观中立的中文机场推荐、梯子推荐与VPN节点测评。收录2026高性价比机场、稳定IPLC专线节点、流媒体及ChatGPT解锁翻墙梯子，附多维度排行榜与使用教程。',
    canonical: `${DOMAIN}/`,
    depth: 0,
    schemaJson: schema
  })}
${renderHeader(0, 'home')}

  <!-- Section 2: Hero -->
  <section class="hero-section">
    <div class="container">
      <div class="hero-pill">⚡ 2026年3月最新核验 · 拒绝虚假刷单与跑路梯子</div>
      <h1 class="hero-title">2026 优质稳定<span class="highlight">机场推荐</span>与科学翻墙节点导航</h1>
      <p class="hero-subtitle">
        全网严选高可用、抗封锁的网络加速服务。无论是寻找<strong>性价比机场</strong>、高速稳定<strong>梯子推荐</strong>与权威<strong>vpn推荐</strong>榜单，还是用于外贸办公、学术科研与开发者调用的高品质<strong>vpn机场</strong>与高速<strong>vpn节点</strong>，本站均基于多地真实测速与公开计费规则为您提供客观参考。
      </p>
      <div class="hero-buttons">
        <a href="recommend/index.html" class="btn-primary">查看精选机场推荐</a>
        <a href="ranking/overall.html" class="btn-secondary">2026 综合实力排行榜</a>
        <a href="compare.html" class="btn-secondary">⚡ 2-4家机场横向对比</a>
      </div>
    </div>
  </section>

  <!-- Section 3: 快速答案 -->
  <section class="section-quick-answer">
    <div class="container">
      <div class="quick-answer-card">
        <div class="quick-answer-title">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
          新手选型 30 秒速查结论（选购防坑指南）
        </div>
        <p style="font-size:0.95rem; color:#475569;">在购买任何网络代理或翻墙节点前，请谨记以下经数百次测试总结的核心原则：</p>
        <div class="quick-answer-grid">
          <div class="quick-item">
            <strong>1. 优先选择月付，严禁盲目年付</strong>
            <p>无论机场宣传多大多稳，均存在跑路或线路调整风险。新手初次上车务必坚持月付或季付，切勿被年付大额折扣诱导。</p>
          </div>
          <div class="quick-item">
            <strong>2. 区分 IPLC 专线与普通公网中转</strong>
            <p>日常查资料可选性价比 BGP 中转（12-15元/月）；敏感时期不掉线、企业办公与玩外服游戏，必须选纯内网 IPLC 专线。</p>
          </div>
          <div class="quick-item">
            <strong>3. 警惕“节点倍率”隐形扣费陷阱</strong>
            <p>部分低价机场标榜月给 500G，但高速节点倍率高达 3x 甚至 5x，实际可用流量大幅缩水。购买时必须核查实际倍率。</p>
          </div>
          <div class="quick-item">
            <strong>4. 必备第二条备用梯子防失联</strong>
            <p>主力梯子偶发维护时，手中务必准备一条按量不限时计费的轻量备用节点（如魔戒），避免关键时刻工作生活断网。</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 4: 精选推荐卡片 -->
  <section style="padding: 40px 0;">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Curated Selection</span>
        <h2 class="section-title">2026 精选优质机场与科学梯子推荐</h2>
        <p class="section-desc">以下服务商均经过连续 30 天以上的真实晚高峰连通率监测，数据透明，价格与套餐明细可追溯。</p>
      </div>
      <div class="cards-grid">
        ${airportCardsHtml}
      </div>
    </div>
  </section>

  <!-- Section 5: 综合排行榜 -->
  <section style="padding: 20px 0 50px;">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Rankings Table</span>
        <h2 class="section-title">2026 综合实力排行榜（已核实梯子节点）</h2>
        <p class="section-desc">根据高峰期可用率、线路抗封锁能力、单位流量成本及客服工单效率综合评估排序。</p>
      </div>
      <div class="ranking-table-wrapper">
        <table class="ranking-table">
          <thead>
            <tr>
              <th>排名</th>
              <th>品牌与协议</th>
              <th>起步月付</th>
              <th>基础流量</th>
              <th>线路类型</th>
              <th>核心适合人群</th>
              <th>详细信息</th>
            </tr>
          </thead>
          <tbody>
            ${rankingRowsHtml}
          </tbody>
        </table>
      </div>
      <div style="text-align:center;">
        <a href="ranking/overall.html" class="btn-secondary">查看完整排行榜细则与评分标准 &rarr;</a>
      </div>
    </div>
  </section>

  <!-- Section 6: 按需求选择 -->
  <section style="padding: 40px 0; background-color: #ffffff; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Category Portals</span>
        <h2 class="section-title">按具体使用场景与预算精准选型</h2>
        <p class="section-desc">不同应用场景对网络延迟、带宽峰值与 IP 纯净度要求各异，点击对应分类直达专属选型专题。</p>
      </div>
      <div class="topic-grid">
        <a href="recommend/budget.html" class="topic-card">
          <div class="topic-icon">💰</div>
          <div class="topic-info">
            <h3>高性价比低预算机场</h3>
            <p>10-15元/月平价精选，每GB单价不到0.1元，适合学生党与轻度科学上网用户。</p>
          </div>
        </a>
        <a href="recommend/premium.html" class="topic-card">
          <div class="topic-icon">🚀</div>
          <div class="topic-info">
            <h3>高端稳定 IPLC 专线</h3>
            <p>全内网点对点传输，不过公网 GFW 墙，晚高峰4K秒开，企业外贸与生产力首选。</p>
          </div>
        </a>
        <a href="recommend/beginner.html" class="topic-card">
          <div class="topic-icon">🔰</div>
          <div class="topic-info">
            <h3>新手入门与小白友好</h3>
            <p>自带一键登录客户端与多平台扫码订阅，零配置门槛，5分钟快速上手。</p>
          </div>
        </a>
        <a href="recommend/stable.html" class="topic-card">
          <div class="topic-icon">🛡️</div>
          <div class="topic-info">
            <h3>长期稳定防失联专题</h3>
            <p>抗封锁协议（VLESS/Hysteria2）与多入口自动容灾，敏感时期不断联。</p>
          </div>
        </a>
        <a href="recommend/ai.html" class="topic-card">
          <div class="topic-icon">🤖</div>
          <div class="topic-info">
            <h3>ChatGPT / Claude 专线</h3>
            <p>独家纯净机房/住宅原生 IP，完美解决 Access Denied 报错，支持 API 极速调用。</p>
          </div>
        </a>
        <a href="recommend/streaming.html" class="topic-card">
          <div class="topic-icon">🎬</div>
          <div class="topic-info">
            <h3>4K 流媒体解锁节点</h3>
            <p>原生解锁 Netflix、Disney+、YouTube 4K/8K、TikTok 及海外电视台直播。</p>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- Section 7: 机场横向比较工具入口 -->
  <section style="padding: 50px 0;">
    <div class="container">
      <div style="background: linear-gradient(135deg, #1e293b, #0f172a); border-radius: 14px; padding: 36px 40px; color: #ffffff; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px;">
        <div style="max-width: 650px;">
          <span style="color: #60a5fa; font-weight: 700; font-size: 0.85rem; text-transform: uppercase;">Interactive Comparison</span>
          <h2 style="font-size: 1.8rem; font-weight: 800; margin: 8px 0 12px; color: #ffffff;">仍在两三家机场之间纠结犹豫？</h2>
          <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6;">
            使用我们的原生横向对比工具，自主勾选 2 到 4 家候选品牌，一屏对比起步价格、每GB流量单价、线路协议、设备限制、流媒体与AI支持度。
          </p>
        </div>
        <a href="compare.html" class="btn-primary" style="background-color: #2563eb; padding: 14px 28px; font-size: 1rem;">立即开启全维度横向对比 &rarr;</a>
      </div>
    </div>
  </section>

  <!-- Section 8: 最新独立深度评测 -->
  <section style="padding: 20px 0 50px;">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">In-depth Reviews</span>
        <h2 class="section-title">最新独立深度评测报告</h2>
        <p class="section-desc">拒绝官方虚标，基于全国多地网络延迟与带宽吞吐真实抽测。</p>
      </div>
      <div class="cards-grid">
        <div class="airport-card">
          <h3 class="airport-brand-name"><a href="review/flyingbird.html">FlyingBird 飞鸟云深度评测</a></h3>
          <div class="card-tagline">全 IPLC 专线晚高峰真实压测与 ChatGPT 解锁体验</div>
          <p class="card-desc">作为运营多年的专线老牌，飞鸟云在晚高峰电信与联通环境下的丢包率控制表现如何？本文带来持续两周的监测数据与详细套餐性价比折算。</p>
          <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.82rem; color: #64748b;">核验时间: 2026-03-15</span>
            <a href="review/flyingbird.html" class="btn-card-review">阅读评测全文</a>
          </div>
        </div>
        <div class="airport-card">
          <h3 class="airport-brand-name"><a href="review/totoro.html">Totoro 龙猫云深度评测</a></h3>
          <div class="card-tagline">15元起步的平价专线性价比标杆是否值得入手？</div>
          <p class="card-desc">针对学生党与科研轻度用户，深入剖析龙猫云的 BGP 多线入口调度、低价套餐设备并发限制以及亚洲主流节点连通率。</p>
          <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.82rem; color: #64748b;">核验时间: 2026-03-12</span>
            <a href="review/totoro.html" class="btn-card-review">阅读评测全文</a>
          </div>
        </div>
        <div class="airport-card">
          <h3 class="airport-brand-name"><a href="review/speedcat.html">SpeedCAT 闪电猫评测</a></h3>
          <div class="card-tagline">顶级流媒体解锁与原生住宅 IP 节点实测解析</div>
          <p class="card-desc">闪电猫的高端定价能否匹配其品质？重点实测 Netflix 全区换区、Disney+ 超高清画质秒开以及 Hysteria 2 协议抗弱网表现。</p>
          <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.82rem; color: #64748b;">核验时间: 2026-03-14</span>
            <a href="review/speedcat.html" class="btn-card-review">阅读评测全文</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 9: 教程中心 -->
  <section style="padding: 40px 0; background-color: #ffffff; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Client Tutorials</span>
        <h2 class="section-title">全平台客户端配置与使用教程中心</h2>
        <p class="section-desc">包含 Windows、Android、iOS、macOS 各系统主流科学上网软件从下载、节点订阅导入到规则分流的完整教学。</p>
      </div>
      <div class="topic-grid">
        <a href="guides/windows.html" class="topic-card">
          <div class="topic-icon">💻</div>
          <div class="topic-info">
            <h3>Windows 客户端教程</h3>
            <p>Clash Verge Rev 与 v2rayN 详细配置指南，附开机自启与系统代理设置。</p>
          </div>
        </a>
        <a href="guides/android.html" class="topic-card">
          <div class="topic-icon">📱</div>
          <div class="topic-info">
            <h3>Android 安卓配置教程</h3>
            <p>Clash Meta for Android 及 Surfboard 订阅一键导入，省电模式白名单避坑。</p>
          </div>
        </a>
        <a href="guides/ios.html" class="topic-card">
          <div class="topic-icon">🍎</div>
          <div class="topic-info">
            <h3>iOS 苹果配置指南</h3>
            <p>美区 Apple ID 获取方法与 Shadowrocket（小火箭）/ Loon 节点订阅教程。</p>
          </div>
        </a>
        <a href="guides/macos.html" class="topic-card">
          <div class="topic-icon">🖥️</div>
          <div class="topic-info">
            <h3>macOS 苹果电脑配置</h3>
            <p>支持 M 系列芯片的 Clash Verge Rev 安装配置与 TUN 虚拟网卡开启教程。</p>
          </div>
        </a>
        <a href="guides/clash-tutorial.html" class="topic-card">
          <div class="topic-icon">⚙️</div>
          <div class="topic-info">
            <h3>Clash 常见报错排查</h3>
            <p>订阅更新失败、Timeout 超时、DNS 污染与全局模式无法上网排错大全。</p>
          </div>
        </a>
        <a href="guides/index.html" class="topic-card">
          <div class="topic-icon">📚</div>
          <div class="topic-info">
            <h3>教程中心总索引</h3>
            <p>浏览全部客户端分流规则、内核特性与网络代理高阶技巧。</p>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- Section 10: 知识百科 -->
  <section style="padding: 40px 0;">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Technical Glossary</span>
        <h2 class="section-title">网络代理与梯子核心技术知识百科</h2>
        <p class="section-desc">掌握网络术语，看穿不良商家虚假宣传，明明白白选节点。</p>
      </div>
      <div class="topic-grid">
        <a href="glossary/iplc-iepl.html" class="topic-card">
          <div class="topic-icon">🌐</div>
          <div class="topic-info">
            <h3>什么是 IPLC 与 IEPL 专线？</h3>
            <p>揭秘点对点内网光纤专线原理，为什么专线不受敏感期和 GFW 封锁影响？</p>
          </div>
        </a>
        <a href="glossary/clash-sing-box.html" class="topic-card">
          <div class="topic-icon">⚡</div>
          <div class="topic-info">
            <h3>Clash Meta 与 Sing-box 区别</h3>
            <p>两大主流代理内核架构对比，内存占用、性能吞吐与规则配置差异。</p>
          </div>
        </a>
        <a href="glossary/shadowsocks-vless.html" class="topic-card">
          <div class="topic-icon">🔒</div>
          <div class="topic-info">
            <h3>Shadowsocks、VMess 与 VLESS 演进</h3>
            <p>抗封锁协议进化历程：从简单混淆到 Reality 伪装与 Hysteria 2 UDP 加速。</p>
          </div>
        </a>
        <a href="glossary/node-rate.html" class="topic-card">
          <div class="topic-icon">📊</div>
          <div class="topic-info">
            <h3>节点倍率机制全解密</h3>
            <p>0.5x、1.0x、3.0x 节点倍率是什么意思？如何计算实际扣除的流量金额？</p>
          </div>
        </a>
        <a href="glossary/gfw-overview.html" class="topic-card">
          <div class="topic-icon">🛡️</div>
          <div class="topic-info">
            <h3>防火长城 (GFW) 工作机制</h3>
            <p>DNS 污染、TCP 阻断、SNI 审查与主动探测阻断的底层网络工作机制。</p>
          </div>
        </a>
        <a href="glossary/index.html" class="topic-card">
          <div class="topic-icon">📖</div>
          <div class="topic-info">
            <h3>浏览全部技术词典</h3>
            <p>从 BGP 到 TUN 虚拟网卡，快速查阅所有网络代理与翻墙相关专有名词。</p>
          </div>
        </a>
      </div>
    </div>
  </section>

  <!-- Section 11: 深度博客与行业观察 -->
  <section style="padding: 40px 0; background-color: #ffffff; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Articles & Insights</span>
        <h2 class="section-title">最新深度文章与选型决策指南</h2>
        <p class="section-desc">专业技术作者原创撰写，提供具有实操价值的科普分析。</p>
      </div>
      <div class="cards-grid">
        <div class="airport-card">
          <h3 class="airport-brand-name"><a href="blog/how-to-choose-vpn-airport.html">如何科学选择适合自己的优质机场？</a></h3>
          <div class="card-tagline">选购方法论：从预算、线路、协议到售后五维评估</div>
          <p class="card-desc">不要只看网上的“神仙机场”推荐。教你根据自己是看视频、写代码、打游戏还是纯查资料，制定最优采购策略。</p>
          <div style="margin-top:auto; font-size:0.85rem; color:#64748b;">
            <a href="blog/how-to-choose-vpn-airport.html">阅读指南全文 &rarr;</a>
          </div>
        </div>
        <div class="airport-card">
          <h3 class="airport-brand-name"><a href="blog/airport-vs-vpn-difference.html">机场与传统 VPN 究竟有什么区别？</a></h3>
          <div class="card-tagline">底层协议、分流机制与匿名隐私安全性深度对比</div>
          <p class="card-desc">为什么传统 ExpressVPN/NordVPN 在国内频频失效？机场采用的 Shadowsocks/VLESS 与 VPN 的 IPsec/OpenVPN 有何根本差异？</p>
          <div style="margin-top:auto; font-size:0.85rem; color:#64748b;">
            <a href="blog/airport-vs-vpn-difference.html">阅读指南全文 &rarr;</a>
          </div>
        </div>
        <div class="airport-card">
          <h3 class="airport-brand-name"><a href="blog/airport-running-risk-prevention.html">机场频繁跑路？5个避坑原则降低翻车风险</a></h3>
          <div class="card-tagline">资深玩家总结的资金安全与备用防失联铁律</div>
          <p class="card-desc">盘点近年来机场突然关停跑路的典型征兆。教你如何识破“假专线真直连”与“大促销割韭菜”套路。</p>
          <div style="margin-top:auto; font-size:0.85rem; color:#64748b;">
            <a href="blog/airport-running-risk-prevention.html">阅读指南全文 &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 12: 核心关键词 FAQ -->
  <section style="padding: 40px 0;">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Frequently Asked Questions</span>
        <h2 class="section-title">常见问题解答 (FAQ)</h2>
        <p class="section-desc">围绕机场推荐、性价比梯子选购与 VPN 节点常见疑问的真实回答。</p>
      </div>
      <div class="faq-section" style="max-width: 860px; margin: 0 auto;">
        <div class="faq-item">
          <button class="faq-question">
            什么是“机场”？它和我们常说的“梯子”或“VPN”是一回事吗？
            <span>+</span>
          </button>
          <div class="faq-answer">
            <p>广义上，普通网民口中的“梯子”、“科学上网工具”和“翻墙 VPN”往往指代同一类用来访问海外网站的网络工具。但在技术架构上，“机场”特指基于特定网络代理协议（如 Shadowsocks、VLESS、Trojan、Hysteria 2）并聚合多地服务器节点的集群分发服务。相较于传统商用 VPN（如 OpenVPN、WireGuard 容易被防火长城特征识别拦截），机场节点具备轻量伪装、智能分流（国内直连不耗流量、海外走代理）以及低延迟等特点。</p>
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-question">
            如何挑选一家真正具备高性价比的稳定机场？
            <span>+</span>
          </button>
          <div class="faq-answer">
            <p>衡量性价比不能只看绝对价格。核心指标是“实际可用每GB单价”与“晚高峰连通率”。推荐标准：1. 确认起步月付在 12-25 元区间；2. 拥有至少两条以上的主流线路出口（如多线 BGP 或内网 IPLC 专线）；3. 节点真实倍率在 1.0x 左右；4. 具备清晰的退款或月付机制，支持工单或社群售后支持。</p>
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-question">
            为什么有些便宜的机场晚高峰（20:00-23:00）会非常卡顿甚至断连？
            <span>+</span>
          </button>
          <div class="faq-answer">
            <p>超低价机场为了压缩成本，通常采用普通公网直连（CN2 GT 或 163 骨干网），未配置昂贵的商业专线。在夜间晚高峰时期，国际出口带宽极度拥堵，公网丢包率往往激增至 30% 以上。而采用内网 IPLC/IEPL 专线的机场直接租用运营商物理跨境光纤，不经过公网国际出口，因此能保障全天候 4K 视频秒开与低延迟。</p>
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-question">
            使用机场访问 ChatGPT 或 Claude 提示 Access Denied / 报错该怎么解决？
            <span>+</span>
          </button>
          <div class="faq-answer">
            <p>OpenAI 与 Anthropic 对数据中心机房 IP 实施了严格的风控封锁。如果大量用户共用同一个机房节点 IP，就会被系统判定为高风险脚本行为而拦截。解决方案：选择本站推荐的“支持 AI 原生专线”的机场（如 FlyingBird 或 SpeedCAT），切换至带有“AI/OpenAI 专线”标识的节点，此类节点采用轮换住宅 IP 或专属广播 IP 资源，解锁成功率接近 100%。</p>
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-question">
            手机和电脑能同时使用同一个机场订阅账号吗？
            <span>+</span>
          </button>
          <div class="faq-answer">
            <p>绝大多数机场都支持多设备同时使用，但具体取决于套餐规则。部分平价机场限制 3-5 台设备同时在线连接；而像极客云、FlyingBird、魔戒等服务商则不限制同时在线设备数量，可以在 Windows、Mac、iPhone 和 Android 上导入同一个订阅链接全家共享。</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 13: 页脚由 renderFooter 渲染 -->
${renderFooter(0)}`;

  fs.writeFileSync(path.join(ROOT_DIR, 'index.html'), html, 'utf8');
  console.log('✓ 成功生成 index.html');
}

buildHomePage();
