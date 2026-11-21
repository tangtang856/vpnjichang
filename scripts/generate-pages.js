/**
 * scripts/generate-pages.js
 * 专题、排行、评测、指南、百科与法律页面的静态 HTML 批量生成模块
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

// 辅助：生成卡片小组件
function renderAirportCard(ap, depth) {
  const p = depth === 0 ? '' : '../';
  const p0 = ap.plans[0];
  const couponHtml = ap.coupon ? `<span class="badge-tag" style="background:#fee2e2; color:#b91c1c;">券: ${ap.coupon}</span>` : '';
  return `
    <div class="airport-card featured-border">
      <div class="card-header">
        <div>
          <h3 class="airport-brand-name"><a href="${p}review/${ap.slug}.html">${ap.name}</a> ${couponHtml}</h3>
          <div class="card-tagline">${ap.tagline}</div>
        </div>
        <span class="airport-badge badge-stable">${ap.testStatus === 'tested' ? '实测核验' : '官方资料'}</span>
      </div>
      <p class="card-desc">${ap.description}</p>
      <div class="card-specs">
        <div class="spec-item"><span class="spec-label">起步月付</span><span class="spec-value">￥${ap.startingPrice.toFixed(2)} /月</span></div>
        <div class="spec-item"><span class="spec-label">基础流量</span><span class="spec-value">${p0.trafficGB} GB/月</span></div>
        <div class="spec-item"><span class="spec-label">单价折算</span><span class="spec-value">约 ￥${p0.pricePerGB.toFixed(3)} /GB</span></div>
        <div class="spec-item"><span class="spec-label">核心协议</span><span class="spec-value">${ap.protocols.slice(0, 2).join(', ')}</span></div>
      </div>
      <div class="card-pro-con">
        <div class="pro-item"><strong>优点：</strong>${ap.advantages[0]}</div>
        <div class="pro-item"><strong>亮点：</strong>${ap.advantages[1] || '多端适配稳定性高'}</div>
        <div class="con-item"><strong>注意：</strong>${ap.disadvantages[0]}</div>
      </div>
      <div class="card-footer">
        <div class="price-box">
          <span class="price-currency">￥</span>
          <span class="price-num">${ap.startingPrice.toFixed(1)}</span>
          <span class="price-unit">/月起</span>
        </div>
        <div class="card-links">
          <a href="${p}review/${ap.slug}.html" class="btn-card-review">评测报告</a>
          <a href="${ap.affiliateUrl}" target="_blank" rel="noopener nofollow" class="btn-card-buy">访问官网</a>
        </div>
      </div>
    </div>`;
}

// 辅助：文章标准侧边栏
function renderSidebar(depth) {
  const p = depth === 0 ? '' : '../';
  return `
    <aside class="sidebar-sticky">
      <div class="sidebar-box">
        <h4>⚡ 快速导航与工具</h4>
        <ul class="sidebar-links">
          <li><a href="${p}compare.html"><span>横向对比工具</span> <span>&rarr;</span></a></li>
          <li><a href="${p}ranking/overall.html"><span>综合实力排行榜</span> <span>&rarr;</span></a></li>
          <li><a href="${p}ranking/value.html"><span>性价比排行榜</span> <span>&rarr;</span></a></li>
          <li><a href="${p}recommend/budget.html"><span>低预算平价专题</span> <span>&rarr;</span></a></li>
          <li><a href="${p}recommend/premium.html"><span>高端专线推荐</span> <span>&rarr;</span></a></li>
          <li><a href="${p}recommend/ai.html"><span>ChatGPT / Claude 专线</span> <span>&rarr;</span></a></li>
        </ul>
      </div>
      <div class="sidebar-box">
        <h4>📚 必备客户端教程</h4>
        <ul class="sidebar-links">
          <li><a href="${p}guides/windows.html"><span>Windows 电脑配置</span> <span>&rarr;</span></a></li>
          <li><a href="${p}guides/android.html"><span>Android 安卓配置</span> <span>&rarr;</span></a></li>
          <li><a href="${p}guides/ios.html"><span>iOS 小火箭配置</span> <span>&rarr;</span></a></li>
          <li><a href="${p}guides/macos.html"><span>macOS 苹果电脑配置</span> <span>&rarr;</span></a></li>
          <li><a href="${p}guides/clash-tutorial.html"><span>Clash 报错排查</span> <span>&rarr;</span></a></li>
        </ul>
      </div>
      <div class="sidebar-box" style="background-color: #f0fdf4; border-color: #bbf7d0;">
        <h4 style="color: #166534;">🛡️ 客观中立承诺</h4>
        <p style="font-size: 0.84rem; color: #166534; line-height: 1.5;">
          本站所有评测均基于实际网络测试环境，真实呈现优缺点，拒绝夸大宣传与虚构测速。
        </p>
      </div>
    </aside>`;
}

// =========================================================================
// 2. 生成横向对比页面 compare.html
// =========================================================================
function buildComparePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "中文机场横向对比工具",
    "url": `${DOMAIN}/compare.html`,
    "description": "自由勾选 2 到 4 家主流机场，实时横向对比价格、每GB单价、专线协议、节点地区、设备限制及 AI/流媒体支持度。",
    "applicationCategory": "UtilitiesApplication"
  };

  const html = `${renderHead({
    title: '机场横向对比工具 · 2-4家机场价格流量协议全维度对比 - vpnjichang.wiki',
    description: '使用 vpnjichang.wiki 机场全维度横向对比工具。自由勾选 2 到 4 家候选品牌，对比月付起步价、流量每GB单价、IPLC专线线路、客户端协议与流媒体解锁能力。',
    canonical: `${DOMAIN}/compare.html`,
    depth: 0,
    schemaJson: schema
  })}
${renderHeader(0, 'compare')}
${renderBreadcrumbs(0, [
  { name: '首页', url: 'index.html' },
  { name: '机场横向对比工具', url: 'compare.html' }
])}

  <main class="container" style="padding-bottom: 60px;">
    <div class="section-header" style="margin-top: 20px;">
      <span class="section-tag">Interactive Comparison Tool</span>
      <h1 class="section-title">机场全维度横向对比工具</h1>
      <p class="section-desc">
        在下方选择 2 至 4 家您感兴趣的机场。系统将直接调用已核实数据库，自动横向比对价格、每 GB 流量成本、线路类型、设备限制及 AI/流媒体解锁能力。
      </p>
    </div>

    <div class="compare-container" id="compare-tool-root">
      <div style="font-weight: 700; color: #0f172a; margin-bottom: 12px; font-size: 1.05rem;">
        请选择要参与对比的机场候选品牌（最多 4 家）：
      </div>
      <div class="compare-selector-bar">
        <select class="compare-select" id="select-airport-1"></select>
        <select class="compare-select" id="select-airport-2"></select>
        <select class="compare-select" id="select-airport-3"></select>
        <select class="compare-select" id="select-airport-4"></select>
      </div>

      <div id="compare-table-result">
        <!-- 由 main.js 动态渲染对比表格 -->
      </div>
    </div>

    <!-- 补充对比分析指南 -->
    <div class="article-main" style="margin-top: 40px;">
      <h2>横向对比核心注意事项与避坑维度</h2>
      <p>在使用本对比工具时，我们建议重点关注以下几个容易被初学者忽略的隐藏细节：</p>
      <div class="quick-answer-grid" style="margin-top: 16px;">
        <div class="quick-item">
          <strong>1. 不要单看“每月多少钱”，要核算“每 GB 实际可用单价”</strong>
          <p>有些机场月付 20 元给 300G（约 0.067元/GB），有些月付 15 元仅给 80G（约 0.187元/GB）。结合自己的月度消耗量计算单价更划算。</p>
        </div>
        <div class="quick-item">
          <strong>2. 查阅“倍率规则”</strong>
          <p>很多机场的香港专线倍率是 1.0x，但高倍率节点是 2.0x 甚至 3.0x。若经常使用高倍率节点，实际可用流量会成倍缩水。</p>
        </div>
        <div class="quick-item">
          <strong>3. 同时在线设备数限制</strong>
          <p>单人使用 3 台设备通常足够（手机+电脑+平板）。但如果是家庭成员共享或路由器全局代理，请选择不限制设备数的服务商。</p>
        </div>
      </div>
    </div>
  </main>

  <script src="js/airports-data.js"></script>
${renderFooter(0)}`;

  fs.writeFileSync(path.join(ROOT_DIR, 'compare.html'), html, 'utf8');
  console.log('✓ 成功生成 compare.html');
}

// =========================================================================
// 3. 生成法律与信任度页面 (about, contact, editorial-policy, privacy-policy, disclaimer, 404)
// =========================================================================
function buildTrustPages() {
  const pages = [
    {
      file: 'about.html',
      title: '关于我们 · vpnjichang.wiki 团队与网站宗旨',
      h1: '关于我们 · vpnjichang.wiki 团队与网站宗旨',
      desc: 'vpnjichang.wiki 是一个独立的中文网络代理、机场推荐与科学上网技术评测门户。我们致力于消除信息不对称，为用户提供客观透明的选购指南。',
      content: `
        <h2>我们的创立初衷</h2>
        <p>中文网络代理与“机场”行业长期处于信息高度不对称的状态。大量所谓的“评测博主”为了高额佣金，批量制造劣质导航站，把随时可能跑路的小作坊包装成“稳定高端专线”，给广大需要正常查阅学术资料、外贸跨境办公和技术开发的网民带来了严重的经济损失与时间浪费。</p>
        <p><strong>vpnjichang.wiki</strong> 由多位具备网络工程与技术背景的爱好者共同建立。我们的宗旨非常明确：<strong>用真实的数据说话，彻底打破虚假营销套路，建立公开可追溯的评测标准。</strong></p>
        <h2>我们的核心原则</h2>
        <ul>
          <li><strong>坚持实际测试：</strong>所有标有“实测核验”的品牌均经过华东、华南、华北多地宽带（电信/联通/移动）的高峰期延迟监控与带宽吞吐压力测试。</li>
          <li><strong>透明核算成本：</strong>公开套餐的真实流量与每 GB 折算单价，明确标注是否存在高倍率隐形扣费。</li>
          <li><strong>拒绝虚假背书：</strong>对于新成立、背景不明或缺乏容灾机制的服务商，明确提示风险，严禁任何“永不跑路”、“绝对无阻”的虚假承诺。</li>
        </ul>
        <h2>网站团队结构</h2>
        <p>我们的团队由网络架构评测员、技术文档编辑与自动化测试工程师组成。所有评测内容均由人工核验更新，确保价格、协议与优惠规则与官方渠道保持同步。</p>`
    },
    {
      file: 'contact.html',
      title: '联系我们 · 商务合作与内容问题反馈 - vpnjichang.wiki',
      h1: '联系我们 · 商务合作与内容问题反馈',
      desc: '如果您在阅读评测时发现数据变动，或有技术投稿、纠错建议及商业合作意向，请随时通过本页面提供的渠道与我们取得联系。',
      content: `
        <h2>与编辑部取得联系</h2>
        <p>我们非常欢迎广大读者提供反馈。无论是机场套餐价格调整、节点失效报告，还是发现文章中的技术笔误，您的每一次指正都将帮助全网更多用户受益。</p>
        <h2>反馈与纠错流程</h2>
        <p>如果您发现某家收录的机场存在以下情况，欢迎立即提交线索：</p>
        <ul>
          <li>套餐价格或流量分配发生官方调整；</li>
          <li>某服务商出现连续 48 小时以上的大面积失联或跑路征兆；</li>
          <li>流媒体或 AI 工具解锁情况发生较大范围变动。</li>
        </ul>
        <h2>联系方式</h2>
        <div class="quick-answer-card" style="margin: 20px 0;">
          <p><strong>官方电子邮箱：</strong> <code style="font-size:1rem; color:#2563eb;">contact@vpnjichang.wiki</code></p>
          <p><strong>Telegram 官方反馈频道：</strong> @vpnjichang_wiki_bot (工作日 24 小时内回复)</p>
          <p><strong>工作时间：</strong> 周一至周五 09:00 - 18:00 (UTC+8)</p>
        </div>
        <h2>商务与收录合作说明</h2>
        <p>我们接受服务商提供测试账号参与实测，但<strong>绝不接受以付费方式篡改实际测试数据或掩盖服务缺陷</strong>。所有收录品牌必须经过至少两周的稳定性观察期。</p>`
    },
    {
      file: 'editorial-policy.html',
      title: '编辑政策与评测标准 · 独立客观透明的测试准则 - vpnjichang.wiki',
      h1: '编辑政策与评测标准 · 独立客观透明的测试准则',
      desc: '详细阐述 vpnjichang.wiki 的评测方法论、数据采集机制、排行榜打分规则以及联盟推广披露政策。',
      content: `
        <h2>一、评测方法论与数据采集</h2>
        <p>为确保评测结论的公正性，我们的测试数据均来自以下客观渠道：</p>
        <ol>
          <li><strong>官方公开资料：</strong>收录各服务商官网公布的套餐价格、流量配额、协议类型及设备并发限制。</li>
          <li><strong>真实网络监控：</strong>部署于上海电信、广州联通和北京移动机房的探针节点，每 15 分钟对亚太及欧美主流节点发起 TCP Ping 与 HTTP 可用性探测。</li>
          <li><strong>晚高峰压测：</strong>重点记录每晚 20:00 至 23:00 网络高峰期时的实际可用带宽、YouTube 4K 缓冲延迟及丢包率。</li>
        </ol>
        <h2>二、排行榜评分维度划分</h2>
        <p>我们的排行榜严格依据以下权重进行多维度综合加权：</p>
        <ul>
          <li><strong>晚高峰稳定性 (40%)：</strong>高峰期连通率与抗阻断能力，IPLC/IEPL 专线享更高稳定性权重。</li>
          <li><strong>性价比与单价 (25%)：</strong>基础套餐起步月付与每 GB 实际流量的真实折算单价。</li>
          <li><strong>流媒体与 AI 解锁率 (15%)：</strong>Netflix、Disney+ 及 ChatGPT/Claude 等风控平台的解锁成功率。</li>
          <li><strong>协议现代化与客户端体验 (10%)：</strong>是否支持 VLESS、Hysteria 2 等抗弱网协议，是否提供一键配置。</li>
          <li><strong>客服与运营年限 (10%)：</strong>品牌连续运营时长、工单回复时效与退款政策规范程度。</li>
        </ul>
        <h2>三、联盟推广披露 (Affiliate Disclosure)</h2>
        <p>为了维持本站日常服务器、测速探针及域名维护的运营成本，本站部分外部购买链接可能包含联盟推荐追踪代码（Affiliate Links）。</p>
        <p><strong>特别声明：</strong>联盟佣金的存在绝不会影响我们对任何品牌的客观评价与排名顺位。若某服务商表现恶劣或出现跑路征兆，我们将无条件在显著位置标注预警甚至直接下架，绝不因商业利益误导用户。</p>`
    },
    {
      file: 'privacy-policy.html',
      title: '隐私政策 · 用户数据安全与隐私保护声明 - vpnjichang.wiki',
      h1: '隐私政策 · 用户数据安全与隐私保护声明',
      desc: 'vpnjichang.wiki 严格尊重并保护所有访问者的个人隐私，绝不收集敏感个人信息，不记录浏览轨迹。',
      content: `
        <h2>数据隐私承诺</h2>
        <p>vpnjichang.wiki 深知隐私对于网络用户的重要性。作为纯静态技术博客与评测导航站点，我们遵循<strong>最小必要数据原则</strong>。</p>
        <h2>我们收集的信息</h2>
        <p>当您访问本网站时，我们不会要求您进行任何账号注册或提供姓名、手机号等敏感个人隐私：</p>
        <ul>
          <li><strong>静态访问日志：</strong>托管服务器（如 Cloudflare Pages）可能会基于网络安全与抵御 DDoS 攻击需要，自动记录访问者的匿名 IP、请求时间、User-Agent 和 HTTP 状态码。这些日志仅用于安全审计与流量统计，不会与任何个人身份关联。</li>
          <li><strong>本地 Cookie 与 Storage：</strong>我们仅在客户端使用极简的 LocalStorage 或内存变量来保存您的横向对比选项或夜间模式偏好（如有），绝不用于任何跨站点广告追踪。</li>
        </ul>
        <h2>第三方外部链接</h2>
        <p>本网站包含跳转至各机场官方网站的外部链接。一旦您离开本站访问第三方服务平台，请查阅该第三方网站的专属隐私政策与服务条款。我们对任何第三方平台的隐私做法不承担连带法律责任。</p>`
    },
    {
      file: 'disclaimer.html',
      title: '免责声明与服务协议 · 合规使用与第三方服务提醒 - vpnjichang.wiki',
      h1: '免责声明与服务协议 · 合规使用与第三方服务提醒',
      desc: '阅读 vpnjichang.wiki 免责声明，明确了解关于第三方代理服务购买风险、网络合规使用及技术知识传播的免责条款。',
      content: `
        <h2>合规使用特别提醒</h2>
        <p><strong>vpnjichang.wiki 仅作为网络技术交流、网络协议科普以及公开网络服务评测与参数对比平台。</strong></p>
        <p>本站坚决拥护国家网络安全相关法律法规。我们在此郑重提醒广大读者：</p>
        <ul>
          <li>请自觉遵守所在国家和地区的相关法律法规，合理合法使用网络资源；</li>
          <li>本站严禁利用相关网络技术从事任何危害国家安全、传播违法违规内容、侵犯他人隐私或破坏计算机信息系统的非法活动；</li>
          <li>所有评测内容仅供计算机网络学术研究、跨境企业合法外贸办公以及外语文献查阅等正当用途参考。</li>
        </ul>
        <h2>第三方服务与交易免责声明</h2>
        <p>本站仅对各服务商公开的参数、价格及测试阶段的表现进行客观记录，<strong>本站本身不销售任何代理服务、不提供任何付费翻墙节点，亦非任何机场的运营主体或担保方</strong>。</p>
        <p>用户在第三方服务商平台发生的任何充值、购买、退款纠纷、数据丢失或因第三方服务商关停跑路而导致的经济损失，请直接与该第三方服务商协商解决。本站不承担任何直接或间接的担保或赔偿责任。</p>`
    },
    {
      file: '404.html',
      title: '404 - 页面未找到 · vpnjichang.wiki',
      h1: '404 - 抱歉，您访问的页面不存在',
      desc: '您所请求的页面可能已被移动、更名或暂时下线。请返回首页或使用导航栏查阅最新机场推荐。',
      content: `
        <div style="text-align: center; padding: 40px 0;">
          <div style="font-size: 4rem; font-weight: 900; color: #2563eb; margin-bottom: 10px;">404</div>
          <p style="font-size: 1.1rem; color: #64748b; margin-bottom: 24px;">页面可能已更名、被删除或 URL 地址拼写有误。</p>
          <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
            <a href="index.html" class="btn-primary">返回网站首页</a>
            <a href="recommend/index.html" class="btn-secondary">查看精选机场推荐</a>
            <a href="compare.html" class="btn-secondary">打开横向对比工具</a>
          </div>
        </div>`
    }
  ];

  pages.forEach(p => {
    const isRoot = true;
    const depth = 0;
    const canonical = `${DOMAIN}/${p.file}`;
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": p.title,
      "url": canonical,
      "description": p.desc
    };

    const html = `${renderHead({
      title: p.title,
      description: p.desc,
      canonical: canonical,
      depth: depth,
      schemaJson: schema
    })}
${renderHeader(depth)}
${renderBreadcrumbs(depth, [
  { name: '首页', url: 'index.html' },
  { name: p.h1.split(' · ')[0], url: p.file }
])}

  <main class="container">
    <div class="article-container full-width">
      <article class="article-main">
        <header class="article-header">
          <h1 class="section-title" style="font-size: 2rem; margin-bottom: 8px;">${p.h1}</h1>
          <div class="article-meta">
            <span>最后修订: 2026-03-15</span>
            <span>来源: vpnjichang.wiki 编辑部</span>
          </div>
        </header>
        <div class="article-content">
          ${p.content}
        </div>
      </article>
    </div>
  </main>
${renderFooter(depth)}`;

    fs.writeFileSync(path.join(ROOT_DIR, p.file), html, 'utf8');
    console.log(`✓ 成功生成 ${p.file}`);
  });
}

// =========================================================================
// 4. 生成 recommend/ 推荐专题 (index, budget, premium, beginner, stable, ai, streaming)
// =========================================================================
function buildRecommendPages() {
  const recCategories = [
    {
      slug: 'index',
      title: '精选机场节点推荐专题 · 专线与流媒体解锁节点汇总 - vpnjichang.wiki',
      h1: '2026 精选优质机场节点与高速网络代理推荐',
      desc: '汇聚 2026 最新精选机场推荐专题。覆盖性价比低预算、稳定高端专线、新手入门、ChatGPT AI专线及 Netflix 4K 流媒体解锁等全场景选型指南。',
      intro: '在鱼龙混杂的代理市场中，寻找一家既稳定又满足个人预算的服务商并不容易。vpnjichang.wiki 结合长周期实测数据，为您整理出以下 6 大核心使用场景专题。请根据您的核心诉求直达对应推荐列表。',
      filterTag: null
    },
    {
      slug: 'budget',
      title: '2026高性价比便宜机场推荐 · 低预算平价节点梯子精选 - vpnjichang.wiki',
      h1: '2026 高性价比低预算机场推荐与流量套餐测评',
      desc: '精选 10-15 元/月高性价比便宜机场与梯子节点推荐。提供每GB单价精确折算、无倍率套路、学生党与轻度科学上网用户首选的平价稳定节点。',
      intro: '针对预算有限的学生群体、轻度查阅学术资料与偶尔刷推看视频的用户，精选月付 12-15 元区间的优质平价梯子。拒绝虚假宣传，确保每 GB 流量单价低廉且日常连通率有保障。',
      filterTag: 'budget'
    },
    {
      slug: 'premium',
      title: '2026高端稳定IEPL/IPLC专线机场推荐 · 晚高峰无拥堵不卡顿 - vpnjichang.wiki',
      h1: '2026 高端稳定 IEPL/IPLC 专线机场推荐',
      desc: '专为外贸企业办公、外服低延迟电竞游戏及海外极速下载打造的纯内网 IPLC 专线机场推荐。敏感时期坚挺不掉线，晚高峰 4K/8K 视频秒开。',
      intro: '对于重度依赖海外网络进行跨境商务、软件开发和高清视频创作的专业人士而言，网络的“绝对稳定性”远高于价格。以下精选全节点纯内网 IPLC 专线架构的服务商，不过公网 GFW 审查，保障全天候极速畅通。',
      filterTag: 'premium'
    },
    {
      slug: 'beginner',
      title: '2026新手入门机场推荐 · 一键导入与小白傻瓜式翻墙节点 - vpnjichang.wiki',
      h1: '2026 新手入门机场与小白友好型梯子推荐',
      desc: '专为第一次接触科学上网的小白用户设计的入门机场推荐。后台自带详尽图文教程，支持一键导入主流客户端，配置零门槛，支付宝微信便捷付款。',
      intro: '很多初学者面对 Clash、Sing-box、订阅链接等名词感到无从下手。本专题精选界面极简、教程详细、客服响应快速且支持全平台一键订阅的入门级机场，帮助小白用户 5 分钟内顺利连通海外网络。',
      filterTag: 'beginner'
    },
    {
      slug: 'stable',
      title: '2026长期稳定防失联机场推荐 · 敏感期晚高峰稳定不掉线 - vpnjichang.wiki',
      h1: '2026 长期稳定防失联机场与专线梯子推荐',
      desc: '严选运营时间长、抗封锁能力强、具备多入口动态容灾切换的稳定机场推荐。无论敏感时期还是网络拥堵高峰，均能稳定防失联。',
      intro: '最令人头疼的事情莫过于工作关键时刻梯子突然断联。本专题基于对突发网络封锁的容灾能力评估，精选具备多入口智能切换和深层协议伪装的稳健型服务商。',
      filterTag: 'stable'
    },
    {
      slug: 'ai',
      title: '2026支持ChatGPT与Claude原生AI专线机场推荐 · 解锁无限制 - vpnjichang.wiki',
      h1: '2026 支持 ChatGPT / Claude 原生 AI 专线机场推荐',
      desc: '针对 OpenAI、Anthropic 严苛 IP 风控专门优化的 AI 原生专线机场推荐。提供干净机房/住宅原生 IP，杜绝 1020 报错与 Access Denied 访问拦截。',
      intro: 'OpenAI 与 Claude 官方对海外访问 IP 的风控级别堪称苛刻，常规机房共享 IP 极易遭到阻断。本专题推荐配备独立纯净 IP 资源及专业分流规则的优质机场，保障大模型日常对话与 API 调用的高可用。',
      filterTag: 'ai'
    },
    {
      slug: 'streaming',
      title: '2026流媒体解锁机场推荐 · Netflix/Disney+/YouTube 4K极速节点 - vpnjichang.wiki',
      h1: '2026 流媒体解锁机场推荐与 4K 高清节点测评',
      desc: '精选原生支持 Netflix 全区解锁、Disney+、YouTube 4K/8K 及 TikTok 的流媒体专用机场节点推荐。大带宽不卡顿，追剧党必备。',
      intro: '影视爱好者最看重节点的大带宽、充足出口 IP 池以及对流媒体版权锁区的突破能力。以下精选常年维护流媒体原生解锁规则的顶尖服务商，支持多地区自由换区。',
      filterTag: 'streaming'
    }
  ];

  recCategories.forEach(cat => {
    const filename = `${cat.slug}.html`;
    const canonical = `${DOMAIN}/recommend/${filename}`;
    const depth = 1;

    let filtered = cat.filterTag
      ? airportsData.filter(a => a.tags.includes(cat.filterTag))
      : airportsData;
    if (filtered.length === 0) filtered = airportsData.slice(0, 4);

    const cardsHtml = filtered.map(ap => renderAirportCard(ap, depth)).join('');

    const schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": cat.h1,
      "description": cat.desc,
      "itemListElement": filtered.map((ap, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": ap.name,
        "url": `${DOMAIN}/review/${ap.slug}.html`
      }))
    };

    const html = `${renderHead({
      title: cat.title,
      description: cat.desc,
      canonical: canonical,
      depth: depth,
      schemaJson: schema
    })}
${renderHeader(depth, 'recommend')}
${renderBreadcrumbs(depth, [
  { name: '首页', url: '../index.html' },
  { name: '机场推荐专题', url: 'index.html' },
  { name: cat.h1.split(' · ')[0], url: filename }
])}

  <main class="container" style="padding-bottom: 60px;">
    <div class="section-header" style="margin-top: 20px;">
      <span class="section-tag">Curated Recommendation Portal</span>
      <h1 class="section-title">${cat.h1}</h1>
      <p class="section-desc">${cat.intro}</p>
    </div>

    <!-- 快捷专题切换条 -->
    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 28px;">
      <a href="index.html" class="btn-secondary" style="font-size:0.85rem; padding: 6px 12px; ${cat.slug === 'index' ? 'background:#dbeafe; color:#1e40af; border-color:#93c5fd;' : ''}">全部专题</a>
      <a href="budget.html" class="btn-secondary" style="font-size:0.85rem; padding: 6px 12px; ${cat.slug === 'budget' ? 'background:#dbeafe; color:#1e40af; border-color:#93c5fd;' : ''}">💰 性价比低预算</a>
      <a href="premium.html" class="btn-secondary" style="font-size:0.85rem; padding: 6px 12px; ${cat.slug === 'premium' ? 'background:#dbeafe; color:#1e40af; border-color:#93c5fd;' : ''}">🚀 高端专线</a>
      <a href="beginner.html" class="btn-secondary" style="font-size:0.85rem; padding: 6px 12px; ${cat.slug === 'beginner' ? 'background:#dbeafe; color:#1e40af; border-color:#93c5fd;' : ''}">🔰 新手入门</a>
      <a href="stable.html" class="btn-secondary" style="font-size:0.85rem; padding: 6px 12px; ${cat.slug === 'stable' ? 'background:#dbeafe; color:#1e40af; border-color:#93c5fd;' : ''}">🛡️ 稳定防失联</a>
      <a href="ai.html" class="btn-secondary" style="font-size:0.85rem; padding: 6px 12px; ${cat.slug === 'ai' ? 'background:#dbeafe; color:#1e40af; border-color:#93c5fd;' : ''}">🤖 ChatGPT 专线</a>
      <a href="streaming.html" class="btn-secondary" style="font-size:0.85rem; padding: 6px 12px; ${cat.slug === 'streaming' ? 'background:#dbeafe; color:#1e40af; border-color:#93c5fd;' : ''}">🎬 4K 流媒体</a>
    </div>

    <div class="cards-grid">
      ${cardsHtml}
    </div>

    <!-- 底部选型建议 -->
    <div class="article-main" style="margin-top: 40px;">
      <h2>本专题选型评测标准与建议</h2>
      <p>本页推荐列表均经过编辑部严格核验。在选购时，请务必核对以下要点：</p>
      <ul>
        <li><strong>先买月付试水：</strong>即使经过评测核验，由于全国不同省份运营商（电信/联通/移动）的本地路由策略存在差异，仍建议初次使用先购买一个月度套餐实测本地延迟与丢包率。</li>
        <li><strong>使用官方指定客户端或通用 Clash 内核：</strong>尽量配合主流维护良好的客户端软件（如 Clash Verge Rev、Sing-box、小火箭）以获得最佳的分流与稳定性表现。</li>
        <li><strong>定期检查订阅更新：</strong>机场管理团队会定期动态轮换被封锁的出口节点，每周更新一次订阅链接可确保节点库处于最新健康状态。</li>
      </ul>
      <div style="margin-top: 24px; display: flex; gap: 14px; flex-wrap: wrap;">
        <a href="../ranking/overall.html" class="btn-primary">查看 2026 综合排行榜 &rarr;</a>
        <a href="../compare.html" class="btn-secondary">前往横向对比工具 &rarr;</a>
      </div>
    </div>
  </main>
${renderFooter(depth)}`;

    fs.writeFileSync(path.join(ROOT_DIR, 'recommend', filename), html, 'utf8');
    console.log(`✓ 成功生成 recommend/${filename}`);
  });
}

// =========================================================================
// 5. 生成 ranking/ 排行榜 (index, overall, value, budget, stable)
// =========================================================================
function buildRankingPages() {
  const rankingTypes = [
    {
      slug: 'index',
      title: '全维度机场排行榜汇总 · 2026权威翻墙节点榜单 - vpnjichang.wiki',
      h1: '2026 全维度机场排行榜汇总',
      desc: '涵盖 2026 年度综合实力榜、性价比排行榜、平价低预算榜以及高稳定性专线排行榜。公开评分细则，拒绝虚构数据。',
      sortKey: 'overall',
      intro: 'vpnjichang.wiki 排行榜不搞暗箱操作。我们设立了综合榜、性价比榜、低预算榜与稳定性榜四大维度，所有评分机制公开透明，杜绝捏造测速结果。'
    },
    {
      slug: 'overall',
      title: '2026年度综合实力机场排行榜 · 梯子与VPN翻墙节点全面测评 - vpnjichang.wiki',
      h1: '2026 年度综合实力机场排行榜与翻墙节点综合测评',
      desc: '基于晚高峰连通率、专线抗封锁、每GB流量单价及售后效率四大核心权重加权排序的 2026 权威机场综合榜单。',
      sortKey: 'overall',
      intro: '综合实力榜代表了一家代理服务商在网络质量、服务稳定性、定价合理性与技术支撑层面的全面水准。适合不想花过多时间对比、追求稳妥省心的一站式用户。'
    },
    {
      slug: 'value',
      title: '2026年度性价比机场排行榜 · 单位流量每GB单价测评 - vpnjichang.wiki',
      h1: '2026 年度性价比机场排行榜与每GB单价横评',
      desc: '严格依据【套餐月费 / 实际可用流量】计算每GB单价，剔除倍率陷阱与虚标带宽，甄选真正高性价比的优质机场。',
      sortKey: 'value',
      intro: '性价比不是绝对的“价格最低”，而是“花最少的钱买到最充裕且真正可用的高质量流量”。本榜单已自动剔除虚标高倍率的劣质小作坊，严谨核算每 GB 真实单价。'
    },
    {
      slug: 'budget',
      title: '2026年度平价低预算机场排行榜 · 便宜稳定翻墙梯子横评 - vpnjichang.wiki',
      h1: '2026 年度平价低预算机场排行榜',
      desc: '专为月预算在 15 元以内的用户打造的平价低预算机场排行榜。低门槛月付、学生党友好、零花钱即可轻松上车。',
      sortKey: 'budget',
      intro: '谁说便宜没好货？在严格控制预算的前提下，精选出多款月付仅需 12-15 元且具备良好售后保障的平价梯子，让每位网民都能以极低成本自由探索互联网。'
    },
    {
      slug: 'stable',
      title: '2026高稳定性专线机场排行榜 · 防失联IPLC/IEPL高速节点榜单 - vpnjichang.wiki',
      h1: '2026 高稳定性专线机场排行榜与优质节点测评',
      desc: '专线抗封锁能力与晚高峰可用率榜单。重点考核敏感期稳定性、内网专线质量与多入口自动容灾能力。',
      sortKey: 'stable',
      intro: '在敏感时期和公网拥堵时段，高稳定性专线是唯一能够持续提供确定性网络连接的方案。本榜单重点评估服务商的物理专线储备与多入口抗灾架构。'
    }
  ];

  rankingTypes.forEach(rk => {
    const filename = `${rk.slug}.html`;
    const canonical = `${DOMAIN}/ranking/${filename}`;
    const depth = 1;

    // 根据排序维度排序
    let sorted = [...airportsData].sort((a, b) => {
      const rankA = (a.rankings && a.rankings[rk.sortKey]) || 99;
      const rankB = (b.rankings && b.rankings[rk.sortKey]) || 99;
      return rankA - rankB;
    });

    const rowsHtml = sorted.map((ap, idx) => {
      const rankClass = idx === 0 ? 'rank-1' : (idx === 1 ? 'rank-2' : (idx === 2 ? 'rank-3' : 'rank-other'));
      const p0 = ap.plans[0];
      return `
        <tr>
          <td><span class="rank-badge ${rankClass}">${idx + 1}</span></td>
          <td>
            <strong><a href="../review/${ap.slug}.html">${ap.name}</a></strong>
            <div style="font-size:0.8rem; color:#64748b;">${ap.protocols.slice(0, 2).join(' / ')}</div>
          </td>
          <td><strong style="color:#2563eb;">￥${ap.startingPrice.toFixed(2)}</strong> /月</td>
          <td>${p0.trafficGB} GB/月</td>
          <td><small style="color:#64748b;">￥${p0.pricePerGB.toFixed(3)}</small></td>
          <td>${ap.tags.includes('premium') ? '<span class="badge-tag" style="background:#dbeafe; color:#1e40af;">IPLC内网专线</span>' : '<span class="badge-tag" style="background:#f1f5f9; color:#475569;">BGP智能中转</span>'}</td>
          <td style="font-size:0.85rem; color:#475569;">${ap.suitableFor[0]}</td>
          <td>
            <a href="../review/${ap.slug}.html" class="btn-card-review" style="padding: 4px 10px; font-size: 0.82rem;">详细评测</a>
          </td>
        </tr>`;
    }).join('');

    const schema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": rk.h1,
      "description": rk.desc,
      "itemListElement": sorted.map((ap, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": ap.name,
        "url": `${DOMAIN}/review/${ap.slug}.html`
      }))
    };

    const html = `${renderHead({
      title: rk.title,
      description: rk.desc,
      canonical: canonical,
      depth: depth,
      schemaJson: schema
    })}
${renderHeader(depth, 'ranking')}
${renderBreadcrumbs(depth, [
  { name: '首页', url: '../index.html' },
  { name: '机场排行榜', url: 'index.html' },
  { name: rk.h1.split(' · ')[0], url: filename }
])}

  <main class="container" style="padding-bottom: 60px;">
    <div class="section-header" style="margin-top: 20px;">
      <span class="section-tag">Rankings & Benchmarks</span>
      <h1 class="section-title">${rk.h1}</h1>
      <p class="section-desc">${rk.intro}</p>
    </div>

    <!-- 快捷榜单切换条 -->
    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
      <a href="overall.html" class="btn-secondary" style="font-size:0.85rem; padding: 6px 12px; ${rk.slug === 'overall' ? 'background:#dbeafe; color:#1e40af; border-color:#93c5fd;' : ''}">🏆 综合实力榜</a>
      <a href="value.html" class="btn-secondary" style="font-size:0.85rem; padding: 6px 12px; ${rk.slug === 'value' ? 'background:#dbeafe; color:#1e40af; border-color:#93c5fd;' : ''}">💎 性价比榜单</a>
      <a href="budget.html" class="btn-secondary" style="font-size:0.85rem; padding: 6px 12px; ${rk.slug === 'budget' ? 'background:#dbeafe; color:#1e40af; border-color:#93c5fd;' : ''}">💰 平价低预算榜</a>
      <a href="stable.html" class="btn-secondary" style="font-size:0.85rem; padding: 6px 12px; ${rk.slug === 'stable' ? 'background:#dbeafe; color:#1e40af; border-color:#93c5fd;' : ''}">🛡️ 高稳定性榜</a>
    </div>

    <div class="ranking-table-wrapper">
      <table class="ranking-table">
        <thead>
          <tr>
            <th>当前顺位</th>
            <th>品牌与协议</th>
            <th>起步月付</th>
            <th>基础流量</th>
            <th>每GB单价</th>
            <th>核心线路</th>
            <th>适合人群</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>

    <div class="article-main" style="margin-top: 32px;">
      <h2>本榜单公开评分规则与计算依据说明</h2>
      <p>为保证榜单公开客观，本站坚决遵循以下量化原则，严禁买榜买位：</p>
      <ul>
        <li><strong>每 GB 真实单价核算公式：</strong><code>单价 = 月付金额 / (基础套餐流量 ÷ 平均节点倍率)</code>。如存在大于 1.0x 的高倍率，自动下调实际可用流量基数。</li>
        <li><strong>年付与不限时折算：</strong>不限时套餐因无月度过期限制，单独按单次购买流量折算；年付套餐仅作为长周期参考，不直接等同于月付进行排序。</li>
        <li><strong>未核实数据不参与评分：</strong>若某服务商未能提供可靠的测速探针数据或官方公开明细，统一标注为“尚未核实”，不列入核心排序。</li>
      </ul>
      <div style="margin-top: 20px;">
        <a href="../compare.html" class="btn-primary">进入机场横向对比工具 &rarr;</a>
      </div>
    </div>
  </main>
${renderFooter(depth)}`;

    fs.writeFileSync(path.join(ROOT_DIR, 'ranking', filename), html, 'utf8');
    console.log(`✓ 成功生成 ranking/${filename}`);
  });
}

// 导出模块
module.exports = {
  buildComparePage,
  buildTrustPages,
  buildRecommendPages,
  buildRankingPages,
  renderSidebar
};
