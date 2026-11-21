/**
 * scripts/generate-guides-blogs-glossary.js
 * 教程中心 (guides/)、技术博客 (blog/) 与知识百科 (glossary/) 页面生成模块
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

// =========================================================================
// 1. 生成 guides/ 教程中心
// =========================================================================
function buildGuidesPages() {
  const depth = 1;

  const guidesList = [
    {
      slug: 'windows',
      title: 'Windows电脑Clash Verge与v2rayN客户端配置教程 · 翻墙软件安装指南 - vpnjichang.wiki',
      h1: 'Windows 电脑客户端配置与节点导入全流程教程',
      desc: '专为 Windows 10/11 用户编写的科学上网客户端配置指南。图文详解 Clash Verge Rev 与 v2rayN 下载、安装、订阅导入、TUN虚拟网卡及规则分流设置。',
      summary: 'Windows 是最主流的桌面办公操作系统。本教程详解最新开源稳定的 Clash Verge Rev 与经典 v2rayN 客户端配置，解决开机自启、TUN 模式及系统代理异常问题。',
      content: `
        <h2>一、Windows 客户端选型推荐</h2>
        <p>在 Windows 环境下，目前最主流且受活跃维护的科学翻墙客户端包括：</p>
        <ul>
          <li><strong>Clash Verge Rev（强烈推荐）：</strong>基于现代 Tauri 框架开发，内存占用极低，界面美观流畅，内置 Mihomo (Clash Meta) 内核，全面支持 VLESS、Hysteria 2 等现代协议，自带强悍的 TUN 虚拟网卡模式。</li>
          <li><strong>v2rayN：</strong>老牌经典客户端，更新频繁，支持 Xray 与 Sing-box 双核心，适合喜欢深入微调底层参数的高级玩家。</li>
        </ul>

        <h2>二、Clash Verge Rev 下载与安装步骤</h2>
        <ol>
          <li>前往官方 GitHub 开源仓库发布页（或机场后台提供的一键安装包）下载以 <code>.msi</code> 或 <code>_x64-setup.exe</code> 结尾的最新版本安装包。</li>
          <li>运行安装程序，按提示完成安装。首次启动建议右键点击桌面图标，勾选<strong>“以管理员身份运行”</strong>，以便顺利安装并启用系统 TUN 虚拟网卡服务。</li>
        </ol>

        <h2>三、一键导入机场订阅链接</h2>
        <ol>
          <li>登录您所购买的机场后台（如 <a href="../review/breezenet.html">微风网络 Breezenet</a> 或 <a href="../review/yinxingren.html">隐形人</a>），找到<strong>“订阅中心”</strong>，点击<strong>“复制 Clash 订阅链接”</strong>。</li>
          <li>打开 Clash Verge Rev，在左侧导航栏点击 <strong>Profiles（订阅配置）</strong>。</li>
          <li>在顶部的输入框中粘贴刚才复制的订阅链接，点击右侧的 <strong>Download（下载）</strong> 按钮。</li>
          <li>等待下载完成，看到配置列表出现新卡片并亮起绿灯即表示订阅解析成功。右键点击该配置，选择 <strong>Select（选中激活）</strong>。</li>
        </ol>

        <h2>四、开启系统代理与分流模式选择</h2>
        <p>进入客户端 <strong>Settings（设置）</strong> 界面：</p>
        <ul>
          <li><strong>System Proxy（系统代理）：</strong>开启此开关后，Windows 系统（浏览器、Edge、Chrome）将自动通过代理节点访问海外网络。</li>
          <li><strong>TUN Mode（虚拟网卡模式）：</strong>针对不遵循系统代理的海外游戏客户端、Telegram 桌面版、命令行终端或第三方软件，强烈建议开启 TUN 模式，实现全系统流量接管。</li>
          <li><strong>分流规则选择：</strong>在代理组（Groups）中，将全局规则设为 <strong>Rule（规则分流）</strong>。此时国内网站（百度、微信、淘宝）走本地直连不消耗流量，海外受阻网站（Google、YouTube）自动走代理加速。</li>
        </ul>

        <h2>五、常见问题与排错方案</h2>
        <div class="faq-item">
          <button class="faq-question">开启代理后为什么国内网页打不开？<span>+</span></button>
          <div class="faq-answer">
            <p>这通常是 DNS 污染或分流规则冲突导致。在 Clash Verge 设置中检查 DNS 模块，将 <code>Fallback-Filter</code> 开启，并确保分流模式处于 Rule（规则）而非 Global（全局）。</p>
          </div>
        </div>
        <div class="faq-item">
          <button class="faq-question">软件关闭后整个电脑突然无法上网怎么恢复？<span>+</span></button>
          <div class="faq-answer">
            <p>这是因为软件异常退出时未恢复系统代理端口。在 Windows 设置中搜索“代理服务器设置”，关闭“使用代理服务器”开关，或者重新启动 Clash Verge 并正常点击退出即可恢复。</p>
          </div>
        </div>`
    },
    {
      slug: 'android',
      title: 'Android安卓手机Clash Meta与Surfboard节点配置教程 · 翻墙教程 - vpnjichang.wiki',
      h1: 'Android 安卓手机客户端配置与节点导入全流程教程',
      desc: '专为小米、华为、OPPO、vivo 及三星等安卓手机用户撰写的翻墙教程。详述 Clash Meta for Android (CMFA) 与 Surfboard 客户端下载、后台保活设置。',
      summary: '安卓手机因厂商系统后台省电策略各异，常出现后台掉线问题。本教程指导您完成客户端配置，并彻底搞定后台保活与耗电优化。',
      content: `
        <h2>一、安卓主流客户端对比与选择</h2>
        <ul>
          <li><strong>Clash Meta for Android (CMFA)：</strong>目前功能最完备的安卓代理客户端。原生支持 Mihomo 内核，全面兼容各种新协议与智能分流分应用代理。</li>
          <li><strong>Surfboard：</strong>界面精致类 Surge 风格，支持标准 Surge 格式配置与极低功耗待机，非常适合追求流畅界面的用户。</li>
        </ul>

        <h2>二、配置导入全流程</h2>
        <ol>
          <li>在安卓手机浏览器中打开您的机场后台，点击<strong>“一键导入 Clash for Android”</strong>，手机系统通常会自动唤醒客户端并加载配置。</li>
          <li>如果无法一键唤醒，可复制后台的<strong>“通用订阅链接”</strong>；打开 Clash Meta 软件，点击 <strong>配置 -> 新配置 -> URL 导入</strong>，粘贴链接并保存。</li>
          <li>点击主界面巨大的 <strong>启动</strong> 按钮。首次启动系统会弹出“网络连接请求 / VPN 权限申请”，点击<strong>“确定 / 允许”</strong>。</li>
          <li>进入 <strong>代理</strong> 列表，点击右上角闪电图标进行批量测速，选择延迟较低的绿色节点（如香港或日本）即可畅享海外网络。</li>
        </ol>

        <h2>三、安卓核心关键设置：后台保活与分应用代理</h2>
        <p>很多安卓用户反馈息屏一段时间后梯子就断开了，这是手机系统的杀后台机制所致。请务必完成以下调整：</p>
        <ul>
          <li><strong>应用锁锁定：</strong>进入安卓多任务后台管理界面，长按 Clash Meta 卡片，点击“小锁”图标锁定后台。</li>
          <li><strong>电池优化白名单：</strong>进入系统设置 -> 应用管理 -> Clash Meta -> 省电策略，修改为<strong>“无限制 / 允许后台高耗电运行”</strong>。</li>
          <li><strong>分应用代理 (Split Tunneling)：</strong>如果不想让国内银行 App 或微信走代理，在客户端设置中开启<strong>“分应用代理”</strong>，勾选仅需要翻墙的软件（如 Chrome、YouTube、Telegram、Twitter）。</li>
        </ul>`
    },
    {
      slug: 'ios',
      title: 'iOS苹果手机小火箭Shadowrocket与Loon配置教程 · 节点导入指南 - vpnjichang.wiki',
      h1: 'iOS 苹果手机客户端配置与节点导入全流程教程',
      desc: '专为 iPhone 和 iPad 用户准备的科学上网指南。详解美区 Apple ID 获取、Shadowrocket（小火箭）安装、扫码添加节点及大陆白名单规则配置。',
      summary: '由于苹果 App Store 中国区下架了所有代理工具，iOS 用户需使用海外 Apple ID。本文手把手教您如何获取软件并快速导入节点。',
      content: `
        <h2>一、前置准备：获取海外（美区）Apple ID</h2>
        <p>由于政策原因，中国大陆区 App Store 无法搜索到科学上网客户端。您需要先准备一个非国区 Apple ID（通常推荐美区）：</p>
        <ul>
          <li><strong>自行注册美区账号：</strong>准备一个未注册过 Apple 的新邮箱，在苹果官网直接注册，地区选择美国，付款方式选择“None（无）”。</li>
          <li><strong>购买礼品卡兑换：</strong>Shadowrocket 在美区售价为 $2.99。可在支付宝将定位切换至旧金山购买 App Store 美区礼品卡充值兑换，切勿使用来源不明的黑卡账号。</li>
        </ul>

        <h2>二、Shadowrocket（小火箭）安装与订阅导入</h2>
        <ol>
          <li>打开 iPhone 自带的 App Store，点击右上角头像<strong>退出当前国区账号</strong>，登录您的美区 Apple ID。</li>
          <li>搜索 <strong>Shadowrocket</strong>（注意认准开发者为 Shadow Launch Technology 的正版应用，图标为黄色底色白色小火箭）。</li>
          <li>下载安装完成后，打开机场后台，点击<strong>“一键导入 Shadowrocket”</strong>，网页将自动跳转并添加所有节点。</li>
          <li>若需手动添加：在软件右上角点击 <strong>+</strong> 号，类型选择 <strong>Subscribe</strong>，URL 栏粘贴订阅链接，点击右上角完成。</li>
        </ol>

        <h2>三、路由模式与全局路由建议</h2>
        <p>在 Shadowrocket 主界面底部：</p>
        <ul>
          <li><strong>全局路由必须选择“配置 (Config)”：</strong>这样软件会根据内置分流规则，让国内网站直连，国外受限网站自动走代理，节省宝贵流量并提升访问速度。</li>
          <li>点击最上方的连接开关，首次使用系统会弹出 <strong>“添加 VPN 配置”</strong> 弹窗，使用 Face ID / Touch ID 验证确认即可连接成功。</li>
        </ul>`
    },
    {
      slug: 'macos',
      title: 'macOS苹果电脑Clash Verge Rev与Surge配置教程 · 翻墙安装教程 - vpnjichang.wiki',
      h1: 'macOS 苹果电脑客户端配置与节点导入全流程教程',
      desc: '适配 M1/M2/M3/M4 系列 Apple Silicon 及 Intel 芯片的 Mac 科学上网教程。详细介绍 Clash Verge Rev 与 Surge for Mac 配置及终端代理技巧。',
      summary: '针对 macOS 系统的精致 UI 与开发环境需求，详解如何通过 Clash Verge Rev 开启系统级网络代理与配置 zsh 终端代理环境。',
      content: `
        <h2>一、macOS 优质客户端推荐</h2>
        <ul>
          <li><strong>Clash Verge Rev for Mac（主力推荐）：</strong>完美原生适配 Apple Silicon (ARM64) 架构，开销极小，全面接管网络，配合暗色模式体验卓越。</li>
          <li><strong>Surge for Mac：</strong>Mac 平台顶级的专业网络调试与分流利器，功能强大但售价较高，适合对网络有极致追求的专业开发者。</li>
        </ul>

        <h2>二、Clash Verge Rev 安装与权限授予</h2>
        <ol>
          <li>下载 <code>.dmg</code> 镜像文件（注意 M 系列芯片选择 <code>aarch64.dmg</code>，旧款 Intel 选择 <code>x64.dmg</code>）。</li>
          <li>打开 dmg 文件，将 Clash Verge 图标拖拽到 <strong>Applications（应用程序）</strong> 文件夹中。</li>
          <li>首次在“系统设置 -> 隐私与安全性”中允许该软件运行。如果提示已损坏，打开终端执行：<br><code>sudo xattr -rd com.apple.quarantine /Applications/Clash\\ Verge.app</code></li>
        </ol>

        <h2>三、订阅导入与 TUN 模式开启</h2>
        <p>与 Windows 类似，在 Profiles 粘贴机场订阅链接下载即可。但在 macOS 下有一项极重要的功能：</p>
        <p><strong>开启 TUN 虚拟网卡接管：</strong>在设置中点击安装 Service Mode（服务模式），看到旁边显示小绿点后，开启 TUN 模式。此时包括 Mac 终端 <code>curl</code>、<code>git clone</code>、Docker 镜像拉取以及海外游戏均可全自动享受高速加速，彻底告别在终端手动配置 <code>export http_proxy</code> 的烦恼。</p>`
    },
    {
      slug: 'clash-tutorial',
      title: 'Clash核心与订阅链接常见报错排查全指南 · 超时与更新失败解决 - vpnjichang.wiki',
      h1: 'Clash 核心与订阅链接常见报错排查全指南',
      desc: '系统梳理 Clash 客户端常见的“订阅更新失败”、“Timeout全部超时”、“DNS污染”及“网页打不开但软件显示连接”等疑难杂症的根治解决方案。',
      summary: '网络代理出现故障往往让人抓狂。本指南归纳了 95% 以上用户日常遇到的报错类型，并提供一针见血的排错步骤。',
      content: `
        <h2>常见报错 1：订阅链接下载或更新失败 (Network Error / Fetch Failed)</h2>
        <p><strong>原因排查：</strong></p>
        <ul>
          <li>机场的订阅下发域名遭到了当前本地网络的 DNS 污染或拦截；</li>
          <li>客户端当前开启了错误的系统代理，导致发起的更新请求被发送到了无效的本地端口。</li>
        </ul>
        <p><strong>根治方案：</strong>先关闭客户端的“系统代理”开关；若仍失败，在机场后台复制“备用订阅链接”或使用第三方订阅转换工具；或尝试开启手机热点后再点击更新订阅。</p>

        <h2>常见报错 2：节点测速全部显示 Timeout（超时或红点）</h2>
        <p><strong>原因排查：</strong></p>
        <ol>
          <li><strong>系统时间未同步（最常见盲区）：</strong>网络加密协议（如 Shadowsocks、VLESS、VMess）对时间戳要求极其严苛。如果电脑或手机系统时间与标准北京时间相差超过 60 秒，服务端会无条件拒绝握手！请进入系统时间设置，关闭并重新开启“自动设置时间”同步。</li>
          <li><strong>套餐流量已耗尽：</strong>登录机场后台检查套餐是否已经超标或欠费。</li>
          <li><strong>当地网络运营商 QoS 限制：</strong>部分偏远地区小宽带封锁了非标准端口，尝试在客户端切换其他协议节点。</li>
        </ol>

        <h2>常见报错 3：微信能发消息，但浏览器网页全部无法打开</h2>
        <p><strong>原因排查：</strong>典型的 DNS 解析故障或代理分流规则失效。微信等国内应用走的是本地直连或硬编码 IP，而浏览器访问需要先向 DNS 查询解析域名。</p>
        <p><strong>根治方案：</strong>在 Clash 设置中将 DNS 模式由 <code>redir-host</code> 切换为 <code>fake-ip</code> 模式；清空浏览器缓存，并在命令提示符中执行 <code>ipconfig /flushdns</code> 刷新本机 DNS 解析缓存。</p>`
    }
  ];

  // 1.1 生成 guides/index.html
  const guidesIndexCanonical = `${DOMAIN}/guides/index.html`;
  const guidesIndexCards = guidesList.map(g => `
    <div class="airport-card">
      <h3 class="airport-brand-name"><a href="${g.slug}.html">${g.h1}</a></h3>
      <p class="card-desc">${g.summary}</p>
      <div style="margin-top:auto; font-size:0.88rem;">
        <a href="${g.slug}.html" class="btn-card-review">阅读详细教程全文 &rarr;</a>
      </div>
    </div>`).join('');

  const guidesIndexHtml = `${renderHead({
    title: '客户端配置与翻墙教程中心 · 2026全平台客户端使用指南 - vpnjichang.wiki',
    description: '涵盖 Windows、Android、iOS、macOS 全平台主流翻墙代理软件从零开始的配置教程。包含 Clash、v2rayN、小火箭等客户端节点导入与故障排查。',
    canonical: guidesIndexCanonical,
    depth: depth,
    schemaJson: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "全平台翻墙客户端教程中心",
      "itemListElement": guidesList.map((g, idx) => ({
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
  { name: '使用教程中心', url: 'index.html' }
])}

  <main class="container" style="padding-bottom: 60px;">
    <div class="section-header" style="margin-top: 20px;">
      <span class="section-tag">Client Setup Guides</span>
      <h1 class="section-title">全平台客户端配置与使用教程中心</h1>
      <p class="section-desc">
        无论您使用的是 PC 电脑、安卓手机、苹果 iPhone 还是 Mac，本教程中心均提供最详尽的操作指引，助您轻松上手。
      </p>
    </div>
    <div class="cards-grid">
      ${guidesIndexCards}
    </div>
  </main>
${renderFooter(depth)}`;

  fs.writeFileSync(path.join(ROOT_DIR, 'guides', 'index.html'), guidesIndexHtml, 'utf8');
  console.log('✓ 成功生成 guides/index.html');

  // 1.2 生成具体教程页 guides/[slug].html
  guidesList.forEach(g => {
    const filename = `${g.slug}.html`;
    const canonical = `${DOMAIN}/guides/${filename}`;
    const schema = {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": g.h1,
      "description": g.desc,
      "inLanguage": "zh-CN",
      "datePublished": "2026-03-01",
      "dateModified": "2026-03-15",
      "author": {
        "@type": "Organization",
        "name": "vpnjichang.wiki 技术编辑部"
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
  { name: '教程中心', url: 'index.html' },
  { name: g.h1.split(' · ')[0], url: filename }
])}

  <main class="container">
    <div class="article-container">
      <article class="article-main">
        <header class="article-header">
          <span class="section-tag">Client Tutorial</span>
          <h1 class="section-title" style="font-size: 2.1rem; margin: 8px 0;">${g.h1}</h1>
          <div class="article-meta">
            <span>最后更新: 2026-03-15</span>
            <span>阅读时长: 约 8 分钟</span>
            <span>适用系统: ${g.slug.toUpperCase()}</span>
          </div>
        </header>

        <div class="article-conclusion-box">
          <div class="conclusion-title">核心指导摘要</div>
          <p style="margin: 0; color: #166534; font-size: 0.95rem;">${g.summary}</p>
        </div>

        <div class="article-content">
          ${g.content}

          <div style="margin-top: 40px; padding: 24px; background: var(--bg-alt); border-radius: 8px; border: 1px solid var(--border-color);">
            <h3 style="margin-top: 0;">下一步：寻找稳定高速的优质机场节点？</h3>
            <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 16px;">
              教程配置完成后，您需要将可用的节点订阅导入软件中。浏览我们的严选推荐列表，按预算与需求挑选适合您的服务商。
            </p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <a href="../recommend/index.html" class="btn-primary">查看精选机场推荐</a>
              <a href="../ranking/overall.html" class="btn-secondary">查看 2026 综合排行榜</a>
            </div>
          </div>
        </div>
      </article>
      ${renderSidebar(depth)}
    </div>
  </main>
${renderFooter(depth)}`;

    fs.writeFileSync(path.join(ROOT_DIR, 'guides', filename), html, 'utf8');
    console.log(`✓ 成功生成 guides/${filename}`);
  });
}

// =========================================================================
// 2. 生成 blog/ 深度文章与选型决策指南
// =========================================================================
function buildBlogPages() {
  const depth = 1;

  const blogList = [
    {
      slug: 'how-to-choose-vpn-airport',
      title: '2026如何科学选择适合自己的优质VPN机场与梯子节点？ - vpnjichang.wiki',
      h1: '2026 如何科学选择适合自己的优质 VPN 机场？',
      desc: '不要盲信所谓的“最强机场”虚假安利。本文从使用场景、线路类型、计费周期、客服渠道与跑路风险五个维度，系统拆解科学选购方法论。',
      summary: '选择网络代理不能只图便宜或盲信营销。本文为您建立一套标准化的五维决策模型，帮助您在 5 分钟内锁定最适合自己的服务商。',
      content: `
        <h2>一、明确核心使用场景：拒绝为过剩性能买单</h2>
        <p>很多初学者一上来就跟风购买昂贵的顶级专线，但实际上平时只是查阅英文学术论文、收发海外邮件，性能浪费严重。在做决策前，先对自己做以下场景定位：</p>
        <ul>
          <li><strong>轻度查资料与学生党：</strong>以 Google Scholar、维基百科、GitHub 查资料为主。推荐选择 7-10 元/月的 <a href="../recommend/budget.html">性价比低预算平价机场</a>，或者选购支持不限时按量计费的 <a href="../review/feiv.html">飞V 备用梯子</a>。</li>
          <li><strong>重度影视追剧党：</strong>天天高强度观看 Netflix、Disney+ 与 YouTube 4K/8K 视频。核心看重<strong>“大带宽储备”</strong>与<strong>“流媒体原生解锁稳定性”</strong>。推荐选择 <a href="../recommend/streaming.html">流媒体专线机场</a>。</li>
          <li><strong>外贸办公、远程工作与跨境电商：</strong>依赖 Slack、Zoom 视频会议，跨境支付及 Google 广告后台。核心看重<strong>“丢包率”</strong>与<strong>“IP 纯净度”</strong>，必须认准全内网 <a href="../recommend/premium.html">IPLC/IEPL 国际专线</a>。</li>
          <li><strong>海外 AI 研发与内容创作者：</strong>深度使用 ChatGPT Plus、Claude 3.5 Sonnet 及 Midjourney。核心在于<strong>杜绝 1020 拦截与 Access Denied 报错</strong>，必须选择具备住宅原生 IP 轮换的 <a href="../recommend/ai.html">AI 专用节点</a>。</li>
        </ul>

        <h2>二、线路架构辨析：看透商家宣传话术</h2>
        <p>很多小商家将普通公网直连包装成“顶级专线”高价兜售。真正懂行的买家只需看两点：</p>
        <ol>
          <li><strong>公网 BGP 中转：</strong>国内服务器入口接收流量后，通过普通公网加密隧道发往境外出口。成本适中，带宽大，但晚高峰可能受骨干网波动影响。</li>
          <li><strong>IPLC/IEPL 国际内网专线：</strong>跨国物理专线光纤，流量在海缆两端直接点对点传输，<strong>完全不经过公网 GFW 审查</strong>。敏感时期具有压倒性的稳定性优势，唯一的缺点是每 GB 物理成本较高。</li>
        </ol>

        <h2>三、资金安全第一原则：严守“月付”底线</h2>
        <p>无论任何机场的客服群看起来多么热闹、运营者承诺如何信誓旦旦，都要明白代理行业的商业特殊性。<strong>永远不要一次性购买两年或三年套餐！</strong>坚守“先月付、后季付”的原则，是保护个人财产安全的最有效护城河。</p>`
    },
    {
      slug: 'airport-vs-vpn-difference',
      title: '机场与传统VPN究竟有什么区别？架构与安全性全面对比 - vpnjichang.wiki',
      h1: '机场与传统 VPN 究竟有什么区别？架构与安全性全面对比',
      desc: '为什么 ExpressVPN、NordVPN 等传统大牌在大陆频频失效？机场采用的 Shadowsocks/VLESS 协议与传统 VPN 有何本质差异？一文讲透底层技术真相。',
      summary: '很多人把网络代理混称为“VPN”，但二者在底层网络模型、抗封锁特征、数据加密强度和分流机制上存在根本性技术差异。',
      content: `
        <h2>一、底层协议架构与设计目标的根本不同</h2>
        <p>传统商业 VPN（如 ExpressVPN、NordVPN、Surfshark）最初是为<strong>企业跨地域安全互联与数据隐私加密</strong>而设计的。它们普遍采用标准的 <strong>OpenVPN、IPsec、IKEv2 或 WireGuard</strong> 协议：</p>
        <ul>
          <li>这些协议在设计之初并没有考虑“规避审查”的需求，其数据包握手特征极其明显、规范。</li>
          <li>对于防火长城（GFW）的深度包检测（DPI）系统而言，OpenVPN 的数据特征就像黑夜中的聚光灯，瞬间就会被识别并直接下发 TCP RST 阻断。这就是为什么国外声名显赫的大牌 VPN 在国内几乎全军覆没、常年连接失败的原因。</li>
        </ul>
        <p>而中文圈常说的“机场”，其技术基石是<strong>抗审查代理协议</strong>（如 Shadowsocks、VMess、VLESS、Trojan、Hysteria 2）：</p>
        <ul>
          <li>它们的核心设计目标就是<strong>“消除网络特征与流量伪装”</strong>。</li>
          <li>例如 Trojan 协议直接将代理流量伪装成标准互联网最普遍的 HTTPS 网站流量（TLS 443 端口），审查系统无法在不破坏全球 HTTPS 安全体系的前提下对其进行无差别拦截。</li>
        </ul>

        <h2>二、全局代理 vs 智能规则分流</h2>
        <p>传统 VPN 绝大多数是<strong>全局系统接管</strong>。一旦开启，你打开百度、微信、网易云音乐甚至王者荣耀都会绕道海外服务器，导致国内服务奇慢无比，甚至被银行 App 警告异地登录封号。</p>
        <p>而现代机场配合客户端（如 Clash、Sing-box），拥有极其强大的<strong>智能分流规则引擎</strong>：自动判断访问目标，国内网站毫秒直连、走本地宽带；国外受阻网站才走代理，真正做到了“无感科学上网”。</p>`
    },
    {
      slug: 'iepl-iplc-line-analysis',
      title: '一文看懂 BGP、IPLC 与 IEPL 专线：为什么价格差异这么大？ - vpnjichang.wiki',
      h1: '一文看懂 BGP 与 IPLC/IEPL 内网专线：价格差异真相',
      desc: '深入解析跨境代理网络底层线路：什么是普通公网直连？什么是多入口 BGP 中转？什么是纯物理内网专线 IPLC/IEPL？揭开机场定价背后的成本之谜。',
      summary: '为什么有的机场卖 5 元/月，有的卖 30 元/月？核心差距全在背后的物理线路成本。本文用通俗语言为您解开跨境光纤与带宽架构之谜。',
      content: `
        <h2>一、从公网直连到物理专线的层级金字塔</h2>
        <p>在网络代理的世界里，线路品质直接决定了使用体验。我们可以将线路划分为三个层级：</p>
        <ol>
          <li><strong>底层：公网直连（CN2 / 163 骨干网）：</strong>你的电脑发出请求，通过中国电信/联通的国际公网出口直接访问海外 VPS。晚高峰极度拥堵，丢包率经常高达 40% 以上，且服务器 IP 极易被 GFW 封锁。</li>
          <li><strong>中层：优质 BGP 智能中转隧道：</strong>服务商在境内租用具备 BGP 多线接入的服务器作为入口，在入口处与境外落地服务器建立加密隧道传输。大幅降低了三网跨网延迟，但隧道本身依然依赖公网承载。</li>
          <li><strong>顶层：IPLC / IEPL 国际内网专线：</strong>服务商直接向中国电信、中国移动等电信运营商租用跨境物理光纤专线。</li>
        </ol>

        <h2>二、为什么 IPLC 专线能做到“敏感期永不掉线”？</h2>
        <p>因为 <strong>IPLC（International Private Leased Circuit）是纯内网点对点通信</strong>。数据从深圳机房进入专线内网，直接穿过海缆从香港机房出来，<strong>全程物理隔离，根本不进入公共国际公网，自然就不经过 GFW 审查系统的监控拦截</strong>。这也是为什么每逢特殊敏感时期，低价机场死伤大半，而优质专线依然能稳如磐石播放 4K 视频的根本原因。</p>`
    },
    {
      slug: 'airport-running-risk-prevention',
      title: '机场频繁跑路？教你5个避坑原则降低翻车与资金损失风险 - vpnjichang.wiki',
      h1: '机场频繁跑路？教你 5 个避坑原则降低翻车风险',
      desc: '揭秘劣质机场关停跑路的典型征兆。总结出 5 条行之有效的实战避坑铁律，助您守护资金安全，从此告别翻车断网烦恼。',
      summary: '机场突然关停跑路是每个网民最深恶痛绝的经历。掌握跑路前兆与避坑原则，即使遇到服务商波动也能做到从容不迫。',
      content: `
        <h2>一、机场跑路前的四大危险征兆</h2>
        <p>根据我们对过去数十家暴雷服务商的追踪分析，跑路前通常会出现以下异象：</p>
        <ul>
          <li><strong>突然发起反常的大额促销：</strong>平时从不打折，突然推出“买一年送一年”、“永久终身会员 99 元”等极其离谱的促销，这往往是运营团队资金链断裂前最后的“收割跑路”信号。</li>
          <li><strong>官方群组大面积开启全员禁言：</strong>TG 公告群或交流群突然关闭发言权限，客服工单多日无人应答，只发虚无缥缈的“正在机房迁移升级”通告。</li>
          <li><strong>核心节点大面积红线超 72 小时：</strong>偶发故障通常数小时内修复，若大面积瘫痪持续数日且无任何实质性进展，大概率已被查封或放弃维护。</li>
        </ul>

        <h2>二、资深玩家总结的 5 条防坑铁律</h2>
        <ol>
          <li><strong>坚持月付，绝不为虚幻的长周期优惠买单；</strong></li>
          <li><strong>优先选择运营时间超过 2 年以上的老牌服务商；</strong></li>
          <li><strong>手头常备一条按量不限时备用线路（如魔戒）；</strong></li>
          <li><strong>不要将所有核心业务绑定在单一服务商上；</strong></li>
          <li><strong>避免向小作坊一次性充值过高金额。</strong></li>
        </ol>`
    },
    {
      slug: 'chatgpt-ai-unlock-nodes',
      title: '2026 ChatGPT/Claude节点被封提示Access Denied解决方案 - vpnjichang.wiki',
      h1: '2026 ChatGPT / Claude 节点被封提示 Access Denied 解决方案',
      desc: '详解 OpenAI 与 Anthropic 官方 IP 风控机制，一步步排除 1020 报错、Access Denied 阻断以及账号封控风险。',
      summary: '海外 AI 工具风控越来越严苛，很多机场节点频频报错。本文分析大模型风控原理，并给出最稳妥的节点选型与客户端配置方案。',
      content: `
        <h2>一、为什么你的梯子能看 YouTube，但 ChatGPT 却打不开？</h2>
        <p>这是因为两者的风控维度完全不同：</p>
        <p>YouTube 等视频网站只验证你是否来自海外 IP；而 <strong>OpenAI 和 Anthropic (Claude)</strong> 接入了 Cloudflare 最顶级的风控引擎，会实时核查出口 IP 的<strong> ASN 类型（机房 IP vs 原生家庭住宅 IP）</strong>以及该 IP 上发起的历史并发请求频率。如果一个机房 IP 被上百人同时高频调用，就会被立即打上高风险标签并阻断访问。</p>

        <h2>二、完美解决 Access Denied 的操作四部曲</h2>
        <ol>
          <li><strong>选择具备 AI 专用住宅/原生专线节点的机场：</strong>在客户端切换带有 <code>AI / OpenAI / 专线</code> 标签的节点，这类节点配备低密度纯净 IP，风控等级最低。</li>
          <li><strong>开启浏览器的无痕/隐身模式：</strong>清除 <code>openai.com</code> 和 <code>anthropic.com</code> 的所有 Cookie 与 LocalStorage，避免之前的风控标记被带入新会话。</li>
          <li><strong>检查 WebRTC 是否泄露真实 IP：</strong>在浏览器中安装 Disable WebRTC 插件，防止浏览器通过 WebRTC 接口泄露国内真实局域网 IP。</li>
          <li><strong>优先选用美区或日新等原生冷门节点：</strong>避免过度拥挤的热门机房节点。</li>
        </ol>`
    }
  ];

  // 2.1 生成 blog/index.html
  const blogIndexCanonical = `${DOMAIN}/blog/index.html`;
  const blogIndexCards = blogList.map(b => `
    <div class="airport-card">
      <h3 class="airport-brand-name"><a href="${b.slug}.html">${b.h1}</a></h3>
      <p class="card-desc">${b.summary}</p>
      <div style="margin-top:auto; font-size:0.88rem;">
        <a href="${b.slug}.html" class="btn-card-review">阅读全文 &rarr;</a>
      </div>
    </div>`).join('');

  const blogIndexHtml = `${renderHead({
    title: '行业观察与技术科普博客 · 科学上网选型分析 - vpnjichang.wiki',
    description: 'vpnjichang.wiki 深度博客。分享网络代理选型方法论、IPLC/IEPL 专线技术解析、机场与传统 VPN 区别及避坑防跑路指南。',
    canonical: blogIndexCanonical,
    depth: depth,
    schemaJson: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "vpnjichang.wiki 技术博客",
      "blogPost": blogList.map(b => ({
        "@type": "BlogPosting",
        "headline": b.h1,
        "url": `${DOMAIN}/blog/${b.slug}.html`
      }))
    }
  })}
${renderHeader(depth, 'blog')}
${renderBreadcrumbs(depth, [
  { name: '首页', url: '../index.html' },
  { name: '博客文章中心', url: 'index.html' }
])}

  <main class="container" style="padding-bottom: 60px;">
    <div class="section-header" style="margin-top: 20px;">
      <span class="section-tag">Blog & Analysis</span>
      <h1 class="section-title">行业观察与技术科普博客</h1>
      <p class="section-desc">
        深入探讨网络代理与出海加速的技术演进，提供真实客观的行业洞察与决策建议。
      </p>
    </div>
    <div class="cards-grid">
      ${blogIndexCards}
    </div>
  </main>
${renderFooter(depth)}`;

  fs.writeFileSync(path.join(ROOT_DIR, 'blog', 'index.html'), blogIndexHtml, 'utf8');
  console.log('✓ 成功生成 blog/index.html');

  // 2.2 生成具体文章页 blog/[slug].html
  blogList.forEach(b => {
    const filename = `${b.slug}.html`;
    const canonical = `${DOMAIN}/blog/${filename}`;
    const schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": b.h1,
      "description": b.desc,
      "inLanguage": "zh-CN",
      "datePublished": "2026-03-01",
      "dateModified": "2026-03-15",
      "author": {
        "@type": "Organization",
        "name": "vpnjichang.wiki 特约作者团队"
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
  { name: '博客中心', url: 'index.html' },
  { name: b.h1.split(' · ')[0], url: filename }
])}

  <main class="container">
    <div class="article-container">
      <article class="article-main">
        <header class="article-header">
          <span class="section-tag">Analysis Article</span>
          <h1 class="section-title" style="font-size: 2.1rem; margin: 8px 0;">${b.h1}</h1>
          <div class="article-meta">
            <span>发布日期: 2026-03-01</span>
            <span>更新日期: 2026-03-15</span>
            <span>作者: vpnjichang.wiki 研究团队</span>
          </div>
        </header>

        <div class="article-conclusion-box">
          <div class="conclusion-title">核心观点摘要</div>
          <p style="margin: 0; color: #166534; font-size: 0.95rem;">${b.summary}</p>
        </div>

        <div class="article-content">
          ${b.content}

          <div style="margin-top: 40px; padding: 24px; background: var(--bg-alt); border-radius: 8px; border: 1px solid var(--border-color);">
            <h3 style="margin-top: 0;">相关推荐与阅读拓展</h3>
            <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 16px;">
              希望进一步了解各机场的实测表现或进行横向对比？探索我们的核心工具与榜单：
            </p>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <a href="../ranking/overall.html" class="btn-primary">综合实力排行榜</a>
              <a href="../compare.html" class="btn-secondary">机场横向对比工具</a>
              <a href="../recommend/index.html" class="btn-secondary">精选推荐专题</a>
            </div>
          </div>
        </div>
      </article>
      ${renderSidebar(depth)}
    </div>
  </main>
${renderFooter(depth)}`;

    fs.writeFileSync(path.join(ROOT_DIR, 'blog', filename), html, 'utf8');
    console.log(`✓ 成功生成 blog/${filename}`);
  });
}

// =========================================================================
// 3. 生成 glossary/ 知识百科词典
// =========================================================================
function buildGlossaryPages() {
  const depth = 1;

  const glossaryList = [
    {
      slug: 'iplc-iepl',
      title: '术语解析：什么是IPLC与IEPL专线？内网传输原理科普 - vpnjichang.wiki',
      h1: '术语解析：什么是 IPLC 与 IEPL 专线？',
      desc: '权威科普网络代理领域的“物理专线”概念。通俗解释 IPLC、IEPL 的定义、海缆物理路径、为什么不过 GFW 审查以及成本居高不下的原因。',
      summary: 'IPLC 与 IEPL 代表着跨境网络的最高物理稳定性标准。本文用最直白的基础图解语言向您介绍专线的工作机制。',
      content: `
        <h2>一、IPLC 与 IEPL 的定义与区别</h2>
        <p><strong>IPLC (International Private Leased Circuit，国际私有租用线路)：</strong>通常指基于传统通信网络（如 SDH/SONET）的点对点跨境内网连接。两端分别连接服务商在中国大陆机房和境外（如香港、日本）机房。</p>
        <p><strong>IEPL (International Ethernet Private Line，国际以太网专线)：</strong>与 IPLC 类似，但采用现代以太网标准进行封装传输。具备更灵活的带宽调度、更高的协议透传效率与稍低的配置开销。在普通用户实际使用中，二者的抗封锁和低延迟体验几乎完全一致。</p>

        <h2>二、为什么物理专线“不经过 GFW 防火长城”？</h2>
        <p>我们平时使用的公共互联网，所有跨境数据包必须经过国家骨干网国际出入口局的 DPI 审查设备。而物理专线是电信运营商向合规跨国企业（如跨国银行、出海企业）出租的<strong>独立物理隔离光缆或时分复用通道</strong>。数据在深圳机房打包后，走海底光缆直通境外，<strong>从物理层面绕过了公网国际出口</strong>，因此根本不存在被 GFW 拦截或下发重置包的可能。</p>`
    },
    {
      slug: 'clash-sing-box',
      title: '内核解析：Clash Meta (Mihomo) 与 Sing-box 核心差异 - vpnjichang.wiki',
      h1: '内核解析：Clash Meta (Mihomo) 与 Sing-box 核心差异',
      desc: '全面对比当前最主流的两大通用代理内核：Clash Meta (Mihomo) 与 Sing-box。分析其在协议支持、内存吞吐、规则解析及客户端生态上的异同。',
      summary: 'Clash Meta 与 Sing-box 各自代表了现代代理内核的最高水平。本文分析两者的底层架构取舍与选型建议。',
      content: `
        <h2>一、Clash Meta (Mihomo) 的特点与优势</h2>
        <p>由社区在原 Clash 停更后持续维护的 Meta 核心（现更名为 Mihomo），是目前兼容性最广、生态最成熟的内核：</p>
        <ul>
          <li><strong>协议全面：</strong>支持 VLESS、Shadowsocks 2022、Hysteria 2、TUIC、WireGuard 等几乎所有主流协议。</li>
          <li><strong>客户端生态繁荣：</strong>Windows 上的 Clash Verge Rev、Android 上的 Clash Meta、macOS 客户端均直接以此为核心，开箱即用体验最好。</li>
        </ul>

        <h2>二、Sing-box 的特点与优势</h2>
        <p>由原 SagerNet 核心开发者全新编写的新一代通用代理平台：</p>
        <ul>
          <li><strong>极致性能与内存优化：</strong>采用全新模块化设计，在路由器、嵌入式设备或低配置软路由上运行时，内存占用显著低于 Clash。</li>
          <li><strong>规则系统极速解析：</strong>采用独特的二进制规则集（.srs），在成千上万条分流规则下依然具备极低的路由延迟。</li>
        </ul>`
    },
    {
      slug: 'shadowsocks-vless',
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
          <li><strong>DNS 污染（域名投毒）：</strong>当境内客户端向本地 DNS 服务器查询受限网站（如 google.com）时，GFW 的旁路监控设备会先于境外真实服务器抢先返回一个虚假的、不存在的 IP 地址，导致用户无法建立连接。</li>
          <li><strong>IP 黑名单丢弃：</strong>对于已确认提供代理服务或政治敏感的海外服务器 IP，直接在国际出口路由器的路由表（BGP）中下发黑洞路由，发往该 IP 的所有数据包直接静默丢弃。</li>
          <li><strong>TCP RST 异常重置：</strong>监控到明文 HTTP 通信中包含敏感关键字时，向通信双方伪造发送带有 RST 标志的 TCP 数据包，强制中断当前的连接会话。</li>
          <li><strong>SNI 审查与阻断：</strong>在 TLS 加密握手的 Client Hello 阶段，客户端发送的服务器域名（SNI）通常是明文的。GFW 会据此域名决定是否在握手瞬间掐断连接。</li>
          <li><strong>主动探测 (Active Probing)：</strong>当系统怀疑某台境外 IP 在运行 Shadowsocks 代理时，GFW 会主动从境内发起特定特征的嗅探连接，若境外服务器正常回应验证，该端口会被立即封锁。</li>
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
    console.log(`✓ 成功生成 glossary/${filename}`);
  });
}

// 导出模块
module.exports = {
  buildGuidesPages,
  buildBlogPages,
  buildGlossaryPages
};
