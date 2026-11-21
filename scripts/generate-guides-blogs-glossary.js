/**
 * scripts/generate-guides-blogs-glossary.js
 * 教程中心 (guides/)、技术博客 (blog/) 与知识百科 (glossary/) 页面生成模块
 * 完整支持 30 篇深度客户端教程与 100 篇高质量技术博文
 */

const fs = require('fs');
const path = require('path');
const {
  DOMAIN,
  ROOT_DIR,
  renderHead,
  renderHeader,
  renderFooter,
  renderBreadcrumbs
} = require('./build-site.js');
const { renderSidebar } = require('./generate-pages.js');
const { guides30 } = require('./data-guides-30.js');
const { blogs100 } = require('./data-blogs-100.js');

// =========================================================================
// 1. 生成 guides/ 教程中心 (30篇教程 + guides/index.html)
// =========================================================================
function buildGuidesPages() {
  const depth = 1;

  console.log(`开始生成 guides/ 教程中心页面 (共 ${guides30.length} 篇教程)...`);

  // 1.1 生成 guides/index.html
  const guidesIndexCanonical = `${DOMAIN}/guides/index.html`;

  // 提取平台分类
  const platforms = ['全部', 'Windows', 'Android', 'iOS', 'macOS', 'Linux / 软路由', '协议进阶', '网络调优'];

  const guideCards = guides30.map((g, idx) => {
    // 规范化平台标签
    let filterCategory = '全平台';
    if (['Windows'].includes(g.platform)) filterCategory = 'Windows';
    else if (['Android'].includes(g.platform)) filterCategory = 'Android';
    else if (['iOS'].includes(g.platform)) filterCategory = 'iOS';
    else if (['macOS'].includes(g.platform)) filterCategory = 'macOS';
    else if (['Linux', '路由器'].includes(g.platform)) filterCategory = 'Linux / 软路由';
    else if (['协议配置', '安全测试'].includes(g.platform)) filterCategory = '协议进阶';
    else filterCategory = '网络调优';

    return `
    <div class="airport-card guide-card-item" data-category="${filterCategory}">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
        <span class="badge" style="background:#e0e7ff; color:#3730a3; font-weight:600; font-size:0.75rem; padding: 2px 8px; border-radius: 4px;">${g.platform}</span>
        <span style="font-size: 0.75rem; color: var(--text-muted);">指南 #${idx + 1}</span>
      </div>
      <h3 class="airport-brand-name" style="font-size: 1.15rem; margin-bottom: 8px;">
        <a href="${g.slug}.html">${g.h1}</a>
      </h3>
      <p class="card-desc" style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">
        ${g.summary}
      </p>
      <div style="margin-top:auto; font-size:0.88rem;">
        <a href="${g.slug}.html" class="btn-card-review">阅读完整配置指南 &rarr;</a>
      </div>
    </div>`;
  }).join('');

  const guidesIndexHtml = `${renderHead({
    title: '科学上网客户端使用教程中心 · Windows/Android/iOS/Mac配置指南 - vpnjichang.wiki',
    description: '涵盖全平台科学上网客户端保姆级图文教程。收录 Clash Verge、v2rayN、Clash Meta for Android、Shadowrocket 小火箭、Quantumult X、Sing-box 及软路由配置全景。',
    canonical: guidesIndexCanonical,
    depth: depth,
    schemaJson: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "vpnjichang.wiki 客户端配置教程中心",
      "description": "全平台科学上网客户端使用与配置教程",
      "url": guidesIndexCanonical,
      "itemListElement": guides30.map((g, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": g.h1,
        "url": `${DOMAIN}/guides/${g.slug}.html`
      }))
    }
  })}
${renderHeader(depth, 'guides')}
${renderBreadcrumbs(depth, [
  { name: '首页', url: '../index.html' },
  { name: '使用教程', url: 'index.html' }
])}

  <main class="container" style="padding-bottom: 60px;">
    <div class="section-header" style="margin-top: 20px;">
      <span class="section-tag">Setup & Guides</span>
      <h1 class="section-title">全平台科学上网客户端使用与配置教程中心</h1>
      <p class="section-desc">
        无论您使用的是 Windows PC、安卓手机、苹果 iPhone、Mac 电脑还是家庭软路由，这里都提供详尽的保姆级图文实操指南，手把手带您完成订阅导入与规则分流。
      </p>
    </div>

    <!-- 平台快速分类筛选 -->
    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; padding: 12px; background: var(--bg-alt); border-radius: 8px; border: 1px solid var(--border-color);">
      <span style="font-size: 0.88rem; font-weight: 600; align-self: center; margin-right: 8px; color: var(--text-color);">平台筛选:</span>
      ${platforms.map(p => `
        <button class="filter-btn ${p === '全部' ? 'active' : ''}" onclick="filterGuides('${p}')" style="padding: 4px 12px; font-size: 0.82rem; border-radius: 20px; border: 1px solid var(--border-color); background: ${p === '全部' ? 'var(--primary-color)' : '#fff'}; color: ${p === '全部' ? '#fff' : 'var(--text-color)'}; cursor: pointer; transition: all 0.2s;">${p}</button>
      `).join('')}
    </div>

    <div class="cards-grid" id="guides-grid">
      ${guideCards}
    </div>

    <script>
      function filterGuides(category) {
        // 更新按钮高亮
        const btns = document.querySelectorAll('.filter-btn');
        btns.forEach(b => {
          if (b.innerText === category) {
            b.style.background = 'var(--primary-color)';
            b.style.color = '#fff';
          } else {
            b.style.background = '#fff';
            b.style.color = 'var(--text-color)';
          }
        });

        // 筛选卡片
        const cards = document.querySelectorAll('.guide-card-item');
        cards.forEach(c => {
          if (category === '全部' || c.getAttribute('data-category') === category) {
            c.style.display = 'flex';
          } else {
            c.style.display = 'none';
          }
        });
      }
    </script>
  </main>
${renderFooter(depth)}`;

  fs.writeFileSync(path.join(ROOT_DIR, 'guides', 'index.html'), guidesIndexHtml, 'utf8');
  console.log('✓ 成功生成 guides/index.html');

  // 1.2 生成具体教程页 guides/[slug].html (共30篇)
  guides30.forEach((g, idx) => {
    const filename = `${g.slug}.html`;
    const canonical = `${DOMAIN}/guides/${filename}`;

    // 格式化正文 sections
    const sectionsHtml = g.sections.map(s => `
      <section style="margin-bottom: 32px;">
        <h2 style="font-size: 1.4rem; color: var(--text-color); margin-top: 24px; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 1px solid var(--border-color);">${s.title}</h2>
        <div style="line-height: 1.8; color: #334155; font-size: 1rem;">
          ${s.content}
        </div>
      </section>
    `).join('');

    // 格式化 FAQ
    const faqHtml = g.faq && g.faq.length > 0 ? `
      <div style="margin-top: 40px; padding: 24px; background: var(--bg-alt); border-radius: 8px; border: 1px solid var(--border-color);">
        <h3 style="margin-top: 0; color: var(--text-color); font-size: 1.25rem;">💡 常见问题与排错答疑 (FAQ)</h3>
        ${g.faq.map(f => `
          <div style="margin-bottom: 16px;">
            <strong style="color: #0f172a; font-size: 0.98rem;">问：${f.q}</strong>
            <p style="margin: 6px 0 0 0; color: #475569; font-size: 0.92rem; line-height: 1.6;">答：${f.a}</p>
          </div>
        `).join('')}
      </div>
    ` : '';

    // 结构化数据 TechArticle
    const schema = {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": g.h1,
      "description": g.desc,
      "inLanguage": "zh-CN",
      "mainEntityOfPage": canonical,
      "datePublished": "2026-03-01",
      "dateModified": "2026-03-15",
      "author": {
        "@type": "Organization",
        "name": "vpnjichang.wiki 技术评测团队",
        "url": DOMAIN
      },
      "publisher": {
        "@type": "Organization",
        "name": "vpnjichang.wiki",
        "logo": {
          "@type": "ImageObject",
          "url": `${DOMAIN}/images/logo.png`
        }
      }
    };

    const html = `${renderHead({
      title: g.title,
      description: g.desc,
      canonical: canonical,
      depth: depth,
      schemaJson: schema
    })}
${renderHeader(depth, 'guides')}
${renderBreadcrumbs(depth, [
  { name: '首页', url: '../index.html' },
  { name: '使用教程', url: 'index.html' },
  { name: g.h1.split(' · ')[0].split('：')[0], url: filename }
])}

  <main class="container">
    <div class="article-container">
      <article class="article-main">
        <header class="article-header">
          <div style="display:flex; gap: 8px; align-items:center; margin-bottom: 8px;">
            <span class="badge" style="background:#e0e7ff; color:#3730a3; font-weight:600; font-size:0.8rem; padding: 3px 10px; border-radius: 4px;">${g.platform}</span>
            <span style="font-size: 0.85rem; color: var(--text-muted);">更新日期: 2026-03-15</span>
          </div>
          <h1 class="section-title" style="font-size: 2.1rem; margin: 8px 0; line-height: 1.3;">${g.h1}</h1>
          <div class="article-meta">
            <span>作者: vpnjichang.wiki 客户端技术组</span>
            <span>审核状态: 已验证通过</span>
          </div>
        </header>

        <div class="article-conclusion-box">
          <div class="conclusion-title">本篇核心要点</div>
          <p style="margin: 0; color: #166534; font-size: 0.95rem; line-height: 1.6;">${g.summary}</p>
        </div>

        <div class="article-content">
          ${sectionsHtml}
          ${faqHtml}

          <!-- 延伸实操推荐导航 -->
          <div style="margin-top: 40px; padding: 24px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
            <h3 style="margin-top: 0; font-size: 1.15rem; color: #1e293b;">🚀 延伸阅读与选购推荐</h3>
            <p style="font-size: 0.92rem; color: #64748b; margin-bottom: 16px;">
              配置好客户端后，您可以参考我们的选购排行榜或专题推荐，挑选稳定抗封锁的高质量机场节点：
            </p>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <a href="../recommend/budget.html" class="btn-primary" style="font-size: 0.85rem;">性价比机场推荐</a>
              <a href="../recommend/premium.html" class="btn-secondary" style="font-size: 0.85rem;">IPLC 高端专线</a>
              <a href="../ranking/overall.html" class="btn-secondary" style="font-size: 0.85rem;">机场综合排行榜</a>
              <a href="../compare.html" class="btn-secondary" style="font-size: 0.85rem;">机场横向对比工具</a>
            </div>
          </div>
        </div>
      </article>
      ${renderSidebar(depth)}
    </div>
  </main>
${renderFooter(depth)}`;

    fs.writeFileSync(path.join(ROOT_DIR, 'guides', filename), html, 'utf8');
  });

  console.log(`✓ 成功生成 guides/ 下所有 ${guides30.length} 篇具体教程页面！`);
}

// =========================================================================
// 2. 生成 blog/ 技术博客 (100篇深度博文 + blog/index.html)
// =========================================================================
function buildBlogPages() {
  const depth = 1;

  console.log(`开始生成 blog/ 技术博客页面 (共 ${blogs100.length} 篇文章)...`);

  // 2.1 生成 blog/index.html
  const blogIndexCanonical = `${DOMAIN}/blog/index.html`;

  // 提取分类列表
  const categories = ['全部', '选型指南', 'AI大模型', '流媒体', '协议科普', '线路专线', '安全合规', '游戏竞技', '网络工程', '开发提效', '出海办公', '故障排查', '行业前瞻'];

  const blogCards = blogs100.map((b, idx) => `
    <div class="airport-card blog-card-item" data-category="${b.category}">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
        <span class="badge" style="background:#f1f5f9; color:#475569; font-weight:600; font-size:0.75rem; padding: 2px 8px; border-radius: 4px;">${b.category}</span>
        <span style="font-size: 0.75rem; color: var(--text-muted);">${b.date}</span>
      </div>
      <h3 class="airport-brand-name" style="font-size: 1.15rem; margin-bottom: 8px;">
        <a href="${b.slug}.html">${b.h1}</a>
      </h3>
      <p class="card-desc" style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">
        ${b.desc || b.summary}
      </p>
      <div style="margin-top:auto; font-size:0.88rem;">
        <a href="${b.slug}.html" class="btn-card-review">阅读全文 &rarr;</a>
      </div>
    </div>`).join('');

  const blogIndexHtml = `${renderHead({
    title: '行业观察与技术科普博客 · 科学上网选型分析与避坑指南 - vpnjichang.wiki',
    description: 'vpnjichang.wiki 深度博客。涵盖大模型 AI 加速、4K 流媒体解锁、IPLC 专线实测、协议演进、跨境办公、外服网游低延迟及安全防封全景剖析。',
    canonical: blogIndexCanonical,
    depth: depth,
    schemaJson: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "vpnjichang.wiki 技术博客",
      "description": "网络代理选型、技术科普、协议分析与行业观察",
      "url": blogIndexCanonical,
      "blogPost": blogs100.map((b, idx) => ({
        "@type": "BlogPosting",
        "headline": b.h1,
        "datePublished": b.date,
        "url": `${DOMAIN}/blog/${b.slug}.html`
      }))
    }
  })}
${renderHeader(depth, 'blog')}
${renderBreadcrumbs(depth, [
  { name: '首页', url: '../index.html' },
  { name: '博客文章', url: 'index.html' }
])}

  <main class="container" style="padding-bottom: 60px;">
    <div class="section-header" style="margin-top: 20px;">
      <span class="section-tag">Insights & Blog</span>
      <h1 class="section-title">网络代理深度观察与技术实战博客</h1>
      <p class="section-desc">
        用严谨的数据与客观的技术工程视角，为您拆解翻墙代理、跨境网络与数字出海领域的底层逻辑与最新动态。
      </p>
    </div>

    <!-- 博客分类筛选按钮组 -->
    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; padding: 12px; background: var(--bg-alt); border-radius: 8px; border: 1px solid var(--border-color);">
      <span style="font-size: 0.88rem; font-weight: 600; align-self: center; margin-right: 8px; color: var(--text-color);">主题分类:</span>
      ${categories.map(c => `
        <button class="blog-filter-btn ${c === '全部' ? 'active' : ''}" onclick="filterBlogs('${c}')" style="padding: 4px 12px; font-size: 0.82rem; border-radius: 20px; border: 1px solid var(--border-color); background: ${c === '全部' ? 'var(--primary-color)' : '#fff'}; color: ${c === '全部' ? '#fff' : 'var(--text-color)'}; cursor: pointer; transition: all 0.2s;">${c}</button>
      `).join('')}
    </div>

    <div class="cards-grid" id="blogs-grid">
      ${blogCards}
    </div>

    <script>
      function filterBlogs(category) {
        // 更新按钮高亮
        const btns = document.querySelectorAll('.blog-filter-btn');
        btns.forEach(b => {
          if (b.innerText === category) {
            b.style.background = 'var(--primary-color)';
            b.style.color = '#fff';
          } else {
            b.style.background = '#fff';
            b.style.color = 'var(--text-color)';
          }
        });

        // 筛选卡片
        const cards = document.querySelectorAll('.blog-card-item');
        cards.forEach(c => {
          if (category === '全部' || c.getAttribute('data-category') === category) {
            c.style.display = 'flex';
          } else {
            c.style.display = 'none';
          }
        });
      }
    </script>
  </main>
${renderFooter(depth)}`;

  fs.writeFileSync(path.join(ROOT_DIR, 'blog', 'index.html'), blogIndexHtml, 'utf8');
  console.log('✓ 成功生成 blog/index.html');

  // 2.2 生成具体文章页 blog/[slug].html (共100篇)
  blogs100.forEach(b => {
    const filename = `${b.slug}.html`;
    const canonical = `${DOMAIN}/blog/${filename}`;

    // 格式化正文 sections
    const sectionsHtml = b.sections.map(s => `
      <section style="margin-bottom: 32px;">
        <h2 style="font-size: 1.4rem; color: var(--text-color); margin-top: 24px; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 1px solid var(--border-color);">${s.title}</h2>
        <div style="line-height: 1.8; color: #334155; font-size: 1rem;">
          ${s.content}
        </div>
      </section>
    `).join('');

    // 格式化 FAQ
    const faqHtml = b.faq && b.faq.length > 0 ? `
      <div style="margin-top: 40px; padding: 24px; background: var(--bg-alt); border-radius: 8px; border: 1px solid var(--border-color);">
        <h3 style="margin-top: 0; color: var(--text-color); font-size: 1.25rem;">💡 核心问题释疑 (FAQ)</h3>
        ${b.faq.map(f => `
          <div style="margin-bottom: 16px;">
            <strong style="color: #0f172a; font-size: 0.98rem;">问：${f.q}</strong>
            <p style="margin: 6px 0 0 0; color: #475569; font-size: 0.92rem; line-height: 1.6;">答：${f.a}</p>
          </div>
        `).join('')}
      </div>
    ` : '';

    // 结构化数据 BlogPosting
    const schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": b.h1,
      "description": b.desc,
      "datePublished": b.date,
      "dateModified": b.date,
      "mainEntityOfPage": canonical,
      "inLanguage": "zh-CN",
      "articleSection": b.category,
      "author": {
        "@type": "Organization",
        "name": "vpnjichang.wiki 编辑部",
        "url": DOMAIN
      },
      "publisher": {
        "@type": "Organization",
        "name": "vpnjichang.wiki",
        "logo": {
          "@type": "ImageObject",
          "url": `${DOMAIN}/images/logo.png`
        }
      }
    };

    const html = `${renderHead({
      title: b.title,
      description: b.desc,
      canonical: canonical,
      depth: depth,
      schemaJson: schema
    })}
${renderHeader(depth, 'blog')}
${renderBreadcrumbs(depth, [
  { name: '首页', url: '../index.html' },
  { name: '博客文章', url: 'index.html' },
  { name: b.h1.split(' · ')[0].split('：')[0], url: filename }
])}

  <main class="container">
    <div class="article-container">
      <article class="article-main">
        <header class="article-header">
          <div style="display:flex; gap: 8px; align-items:center; margin-bottom: 8px;">
            <span class="badge" style="background:#e2e8f0; color:#334155; font-weight:600; font-size:0.8rem; padding: 3px 10px; border-radius: 4px;">${b.category}</span>
            <span style="font-size: 0.85rem; color: var(--text-muted);">发布于: ${b.date}</span>
          </div>
          <h1 class="section-title" style="font-size: 2.1rem; margin: 8px 0; line-height: 1.3;">${b.h1}</h1>
          <div class="article-meta">
            <span>作者: vpnjichang.wiki 专题策划组</span>
            <span>核验状态: 数据与技术规范已核准</span>
          </div>
        </header>

        <div class="article-conclusion-box">
          <div class="conclusion-title">核心速读</div>
          <p style="margin: 0; color: #166534; font-size: 0.95rem; line-height: 1.6;">${b.summary}</p>
        </div>

        <div class="article-content">
          ${sectionsHtml}
          ${faqHtml}

          <!-- 相关专题推荐与交叉内链 -->
          <div style="margin-top: 40px; padding: 24px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
            <h3 style="margin-top: 0; font-size: 1.15rem; color: #1e293b;">📌 相关专题与选型参考</h3>
            <p style="font-size: 0.92rem; color: #64748b; margin-bottom: 16px;">
              深入了解技术原理后，建议结合实际应用场景查看我们的机场实测榜单与专题推荐：
            </p>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <a href="../recommend/ai.html" class="btn-primary" style="font-size: 0.85rem;">AI 大模型专用专线</a>
              <a href="../recommend/streaming.html" class="btn-secondary" style="font-size: 0.85rem;">4K 流媒体解锁推荐</a>
              <a href="../recommend/budget.html" class="btn-secondary" style="font-size: 0.85rem;">高性价比平价机场</a>
              <a href="../ranking/overall.html" class="btn-secondary" style="font-size: 0.85rem;">2026 综合排行榜</a>
            </div>
          </div>
        </div>
      </article>
      ${renderSidebar(depth)}
    </div>
  </main>
${renderFooter(depth)}`;

    fs.writeFileSync(path.join(ROOT_DIR, 'blog', filename), html, 'utf8');
  });

  console.log(`✓ 成功生成 blog/ 下所有 ${blogs100.length} 篇具体博文页面！`);
}

// =========================================================================
// 3. 生成 glossary/ 知识百科 (6大核心词条 + glossary/index.html)
// =========================================================================
function buildGlossaryPages() {
  const depth = 1;

  const glossaryList = [
    {
      slug: 'iplc-iepl',
      title: '名词解释：什么是 IPLC 与 IEPL 国际专线？内网传输原理 - vpnjichang.wiki',
      h1: '名词解释：什么是 IPLC 与 IEPL 国际专线？',
      desc: '深度解析跨境专线网络核心概念：IPLC 点对点租用线路与 IEPL 以太网专线的物理架构、传输原理、免审查机制及核心差异。',
      summary: 'IPLC 与 IEPL 代表着跨境网络通信的最高标准。本文用通俗易懂的语言，拆解物理内网专线如何做到极低延迟、0 丢包与无惧敏感期。',
      content: `
        <h2>一、IPLC（国际私有租用线路）定义与物理架构</h2>
        <p><strong>IPLC</strong> 是 <em>International Private Leased Circuit</em> 的缩写，意为“国际点对点私有租用光纤信道”。</p>
        <p>传统公网数据包需要从国内经过多次跨网路由跳转，最终通过国家级国际互联出口局发往海外；而 IPLC 则是跨国电信运营商在海底光缆中专门划拨出来的<strong>物理隔离信道</strong>。例如从中国深圳机房直接拉一条物理光纤连通香港机房。</p>

        <h2>二、为什么 IPLC 专线“无视审查、永不掉线”？</h2>
        <p>因为 IPLC 专线在本质上是<strong>企业内部局域网传输</strong>。数据从入口进入光缆后，直接在物理层或数据链路层完成跨境，<strong>全程不接入公共互联网（Public Internet），自然完全不经过公共国际出口处的防火长城（GFW）检测设备</strong>。因此，无论敏感时期公网如何剧烈波动封锁，IPLC 专线都能保持纹丝不动的高可用性。</p>

        <h2>三、IEPL 与 IPLC 有何细微差异？</h2>
        <p><strong>IEPL（International Ethernet Private Line）</strong>是基于现代以太网架构构建的国际以太网专线，是 IPLC 技术的升级演进。相比传统基于 SDH 架构的 IPLC，IEPL 支持更平滑的带宽按需扩容（从 10Mbps 到 10Gbps 动态无缝升级），并且在抖动控制和故障自愈保护方面更为智能化。对于最终用户而言，两者在使用体验上的稳定性基本一致。</p>`
    },
    {
      slug: 'clash-meta',
      title: '核心组件：什么是 Clash Meta (Mihomo) 内核？与原版区别 - vpnjichang.wiki',
      h1: '核心组件：什么是 Clash Meta (Mihomo) 内核？',
      desc: '全面介绍开源代理内核 Clash Meta（现更名为 Mihomo）的技术演进、支持的新一代协议（VLESS Reality、Hysteria 2、TUIC）及优势。',
      summary: 'Clash 原版停更后，Meta/Mihomo 内核已成为全平台科学上网事实上的技术基石。了解其底层改进有助于更好地选择客户端。',
      content: `
        <h2>一、Clash Meta 内核的诞生背景</h2>
        <p>原版 Clash 内核由开发者 Dreamacro 主导开发，曾长期统治中文科学上网生态。但随着原版作者因不可抗力停止维护，社区活跃的极客团队接过了接力棒，在原版代码基础上建立了分支——<strong>Clash Meta</strong>（现正式更名为 <strong>Mihomo</strong>）。</p>

        <h2>二、Meta 内核相比原版的核心进化</h2>
        <ol>
          <li><strong>现代先进协议全面原生支持：</strong>原版 Clash 仅支持 Shadowsocks、VMess 与基础 Trojan；而 Meta 内核原生全面支持 <strong>VLESS、Reality、Hysteria 2、TUIC v5、Shadowsocks-2022、WireGuard</strong> 等所有现代抗封锁前沿协议。</li>
          <li><strong>强悍的 TUN 虚拟网卡接管能力：</strong>内置高性能 Wintun 驱动，真正做到操作系统级全流量智能接管，彻底解决各类游戏和桌面软件不走系统代理的问题。</li>
          <li><strong>更先进的 DNS 与防污染引擎：</strong>支持 Fake-IP、DoH、DoT、DoQ 以及智能分流匹配，彻底杜绝 DNS 泄漏。</li>
        </ol>`
    },
    {
      slug: 'sing-box',
      title: '新一代通用代理平台：什么是 Sing-box？架构优势与未来前景 - vpnjichang.wiki',
      h1: '新一代通用代理平台：什么是 Sing-box？架构优势解析',
      desc: '解析由 SagerNet 团队倾力打造的通用代理平台 Sing-box：模块化设计、极低内存占用、全协议原生支持与跨平台生态全景。',
      summary: 'Sing-box 被公认为下一代代理核心的代表作。其精悍的性能和全方位的现代化协议支持，正逐步引领整个行业走向标准化。',
      content: `
        <h2>一、Sing-box 的定位与设计哲学</h2>
        <p><strong>Sing-box</strong> 是由知名开源团队 SagerNet 自研的通用网络代理工具。与以往在旧架构上缝缝补补的软件不同，Sing-box 从第一行代码开始就采用了现代化 Go 语言设计，追求<strong>极致的内存精简、高吞吐并发与低功耗</strong>。</p>

        <h2>二、Sing-box 的四大突出优势</h2>
        <ul>
          <li><strong>极低资源消耗：</strong>在嵌入式软路由或低配 VPS 上运行时，其空闲内存占用通常仅有十几兆，远低于传统代理核心。</li>
          <li><strong>天然支持所有现代协议：</strong>从设计之初就完整实现了 Shadowsocks-2022、VLESS Reality、Hysteria 2、TUIC、SSH 以及自定义分流规则集。</li>
          <li><strong>官方维护全平台 GUI 客户端：</strong>在 iOS、macOS、Android、Windows 和 Linux 上均有官方团队直接维护的图形客户端，配置规则格式高度统一，免去了在不同客户端之间转换格式的繁琐折腾。</li>
        </ul>`
    },
    {
      slug: 'protocol-evolution',
      title: '协议解析：Shadowsocks、VMess、VLESS与Trojan协议演进史 - vpnjichang.wiki',
      h1: '协议解析：Shadowsocks、VMess、VLESS 与 Trojan 演进史',
      desc: '回顾翻墙代理协议十余年演进史：从最初的经典 Shadowsocks 对称加密，到 VMess 复杂封装，再到现代 VLESS Reality 与 Trojan 伪装技术。',
      summary: '网络代理协议的演化本质上是一场与深度包检测（DPI）系统的猫鼠博弈。了解协议演变有助于您在客户端选择最优节点。',
      content: `
        <h2>一、第一代：Shadowsocks 经典对称加密</h2>
        <p>由知名开发者 clowwindy 于 2012 年开创。采用轻量级对称加密算法（如 AES-256-CFB、ChaCha20-Poly1305）。早期抗审查效果卓越，但随着机器学习与重放攻击探测技术的发展，纯对称加密流量已容易被统计学特征识别并阻断。</p>

        <h2>二、第二代：VMess 与 V2Ray 时代</h2>
        <p>针对 Shadowsocks 的弱点，V2Ray 团队设计了具备时间戳与动态身份验证的 VMess 协议。安全性极高，但复杂的头校验带来了较高的 CPU 与内存开销。</p>

        <h2>三、第三代：Trojan 与 VLESS Reality 伪装时代</h2>
        <p>现代协议放弃了“自创加密特征”，转而遵循<strong>“大隐隐于市”</strong>的哲学：</p>
        <ul>
          <li><strong>Trojan：</strong>完全模拟标准的 HTTPS 协议流量，将代理流量藏在合法的 TLS 握手之中。</li>
          <li><strong>VLESS + Reality：</strong>最新的抗封锁黑科技。借用真实合法的大型海外网站（如 Yahoo、苹果服务器）的 TLS 证书进行中间伪装，免去了用户自行搭建网站和申请域名的麻烦，是当前公网直连抗封锁能力的巅峰之作。</li>
        </ul>`
    },
    {
      slug: 'node-rate',
      title: '倍率规则：什么是0.5x、1.0x、3.0x节点倍率？流量如何扣除？ - vpnjichang.wiki',
      h1: '倍率规则：什么是 0.5x、1.0x、3.0x 节点倍率？',
      desc: '彻底搞懂机场的“节点倍率”扣费黑幕。教您如何精确计算套餐实际可用流量，识破低价高倍率套路，明明白白消费。',
      summary: '倍率是衡量机场诚信度的关键参数。很多商家用 500G 大流量吸引用户，但节点倍率高达 3x。本文为您彻底讲透计算原理。',
      content: `
        <h2>一、节点倍率的计算公式</h2>
        <p>节点倍率是机场计费面板中用于调整流量扣除权重的参数。其计算公式非常直观：</p>
        <p style="background: var(--bg-alt); padding: 12px 16px; border-radius: 6px; font-family: var(--font-mono);"><strong>实际扣除流量 = 本次实际消耗流量 × 节点对应倍率</strong></p>
        <ul>
          <li><strong>1.0x 节点（标准倍率）：</strong>你下载了 1GB 的文件，后台精准扣除 1GB 流量。</li>
          <li><strong>0.5x 节点（省流倍率）：</strong>你下载了 1GB 的文件，后台仅扣除 0.5GB 流量！相当于享受了 2 倍的可用流量，通常见于冷门节点或大流量下载专线。</li>
          <li><strong>3.0x 节点（高倍率节点）：</strong>你下载了 1GB 的视频，后台直接扣除 3GB 流量！你的 100G 月度套餐实际只能看 33G 视频就会被耗尽。</li>
        </ul>

        <h2>二、为什么会有不同倍率的节点存在？</h2>
        <p>因为不同线路的物理采购成本差异巨大。香港或日本的优质 IPLC 内网专线成本可能是普通美国机房直连线路的数倍，服务商为了平衡成本，通常会将普通节点设为 1.0x，专线节点设为 1.5x-2.0x。只要<strong>商家在节点列表中明确标明、不搞暗扣</strong>，合理的倍率机制是正常的商业运营行为。</p>`
    },
    {
      slug: 'gfw-overview',
      title: '基础概念：防火长城 (GFW) 的工作机制与流量阻断原理 - vpnjichang.wiki',
      h1: '基础概念：防火长城 (GFW) 的工作机制与流量阻断原理',
      desc: '客观科普防火长城的技术组成：DNS 污染、IP 黑名单丢弃、TCP RST 异常重置、SNI 域名探测阻断与主动探测系统的底层逻辑。',
      summary: '从计算机网络工程角度客观解析防火长城的工作机制，了解审查系统如何识别与处理跨境网络数据包。',
      content: `
        <h2>一、防火长城的核心拦截手段</h2>
        <p>防火长城（Great Firewall，简称 GFW）经过二十余年的技术迭代，构筑了多层联动的过滤体系：</p>
        <ol>
          <li><strong>DNS 污染（域名投毒）：</strong>当境内客户端向本地 DNS 服务器查询受限网站（如 google.com）时，GFW 的旁路审查设备会抢先伪造一个错误的虚假 IP 地址并返回给客户端，导致访问失败。</li>
          <li><strong>IP 黑名单丢弃：</strong>直接将已知的违规海外服务器 IP 注入核心路由器的黑名单路由表中，向这些 IP 发送的所有数据包都会在骨干网被直接丢弃（Null Route）。</li>
          <li><strong>TCP RST 异常重置：</strong>当监控到明文 HTTP 通信或未加密流量中包含敏感关键词时，防火墙会伪造两端的 TCP RST（Reset）包强行切断连接。</li>
          <li><strong>SNI 明文探测与阻断：</strong>在 TLS 握手时，传统的 Client Hello 会携带明文的目标域名（Server Name Indication）。审查系统通过读取 SNI 即可精确阻断特定网站的 HTTPS 握手。</li>
          <li><strong>机器学习主动探测：</strong>当发现某个未知境外 IP 在运行 Shadowsocks 代理时，GFW 会主动从境内发起特定特征的嗅探连接，若境外服务器正常回应验证，该端口会被立即封锁。</li>
        </ol>`
    }
  ];

  // 3.1 生成 glossary/index.html
  const glossaryIndexCanonical = `${DOMAIN}/glossary/index.html`;
  const glossaryIndexCards = glossaryList.map(g => `
    <div class="airport-card">
      <h3 class="airport-brand-name"><a href="${g.slug}.html">${g.h1}</a></h3>
      <p class="card-desc">${g.summary}</p>
      <div style="margin-top:auto; font-size:0.88rem;">
        <a href="${g.slug}.html" class="btn-card-review">查阅术语解析 &rarr;</a>
      </div>
    </div>`).join('');

  const glossaryIndexHtml = `${renderHead({
    title: '网络代理与翻墙技术专业术语词典 · 知识百科中心 - vpnjichang.wiki',
    description: 'vpnjichang.wiki 网络代理技术词典。收录 IPLC/IEPL、Clash Meta、Sing-box、Shadowsocks、VLESS 及节点倍率等专有名词权威解析。',
    canonical: glossaryIndexCanonical,
    depth: depth,
    schemaJson: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "网络代理与翻墙技术词典",
      "itemListElement": glossaryList.map((g, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": g.h1,
        "url": `${DOMAIN}/glossary/${g.slug}.html`
      }))
    }
  })}
${renderHeader(depth, 'glossary')}
${renderBreadcrumbs(depth, [
  { name: '首页', url: '../index.html' },
  { name: '知识百科中心', url: 'index.html' }
])}

  <main class="container" style="padding-bottom: 60px;">
    <div class="section-header" style="margin-top: 20px;">
      <span class="section-tag">Technical Glossary</span>
      <h1 class="section-title">网络代理与翻墙技术专业术语词典</h1>
      <p class="section-desc">
        用通俗易懂的专业语言，拆解网络代理与出海加速领域的复杂专有名词。
      </p>
    </div>
    <div class="cards-grid">
      ${glossaryIndexCards}
    </div>
  </main>
${renderFooter(depth)}`;

  fs.writeFileSync(path.join(ROOT_DIR, 'glossary', 'index.html'), glossaryIndexHtml, 'utf8');
  console.log('✓ 成功生成 glossary/index.html');

  // 3.2 生成具体词条页 glossary/[slug].html
  glossaryList.forEach(g => {
    const filename = `${g.slug}.html`;
    const canonical = `${DOMAIN}/glossary/${filename}`;
    const schema = {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "name": g.h1,
      "description": g.desc,
      "inDefinedTermSet": `${DOMAIN}/glossary/index.html`
    };

    const html = `${renderHead({
      title: g.title,
      description: g.desc,
      canonical: canonical,
      depth: depth,
      schemaJson: schema
    })}
${renderHeader(depth, 'glossary')}
${renderBreadcrumbs(depth, [
  { name: '首页', url: '../index.html' },
  { name: '知识百科', url: 'index.html' },
  { name: g.h1.split(' · ')[0], url: filename }
])}

  <main class="container">
    <div class="article-container">
      <article class="article-main">
        <header class="article-header">
          <span class="section-tag">Glossary Entry</span>
          <h1 class="section-title" style="font-size: 2.1rem; margin: 8px 0;">${g.h1}</h1>
          <div class="article-meta">
            <span>分类: 核心网络术语</span>
            <span>审核: vpnjichang.wiki 词条小组</span>
          </div>
        </header>

        <div class="article-conclusion-box">
          <div class="conclusion-title">概念定义速查</div>
          <p style="margin: 0; color: #166534; font-size: 0.95rem;">${g.summary}</p>
        </div>

        <div class="article-content">
          ${g.content}

          <div style="margin-top: 40px; padding: 24px; background: var(--bg-alt); border-radius: 8px; border: 1px solid var(--border-color);">
            <h3 style="margin-top: 0;">延伸学习与实操导航</h3>
            <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 16px;">
              掌握了底层概念后，您可以进一步查阅客户端教程或在推荐列表中挑选具备该技术特性的机场：
            </p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <a href="../recommend/premium.html" class="btn-primary">高端专线机场推荐</a>
              <a href="../guides/windows.html" class="btn-secondary">Windows 配置教程</a>
              <a href="../ranking/overall.html" class="btn-secondary">综合排行榜</a>
            </div>
          </div>
        </div>
      </article>
      ${renderSidebar(depth)}
    </div>
  </main>
${renderFooter(depth)}`;

    fs.writeFileSync(path.join(ROOT_DIR, 'glossary', filename), html, 'utf8');
  });

  console.log(`✓ 成功生成 glossary/ 下所有 ${glossaryList.length} 个词条页面！`);
}

// 导出模块
module.exports = {
  buildGuidesPages,
  buildBlogPages,
  buildGlossaryPages
};
