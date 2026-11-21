export interface TopicItem {
  slug: string;
  title: string;
  h1: string;
  tag: string;
  desc: string;
  keywords: string;
  summary: string;
  filterTag: string;
  intro: string;
  features: string[];
}

export const recommendTopics: TopicItem[] = [
  {
    slug: 'budget',
    title: '2026高性价比便宜机场推荐 · 低预算平价节点梯子精选 - vpnjichang.wiki',
    h1: '2026 高性价比低预算机场推荐与流量套餐测评',
    tag: 'Budget Friendly',
    desc: '精选月付 10 元左右的平价优质机场。严选稳定不跑路、流量充足、支持月付的便宜梯子服务商，拒绝低价劣质陷阱。',
    keywords: '性价比机场, 便宜机场推荐, 平价机场, 低预算梯子, 机场推荐, vpn机场',
    summary: '针对学生党与轻度科学上网人群，精选实测稳定、月付门槛低至 5-10 元且流量充足的高性价比平价机场，守护您的钱包与网络体验。',
    filterTag: 'budget',
    intro: '平价不等于劣质。在当前网络技术日渐成熟的背景下，多家优秀服务商通过优化国内 BGP 入口与大容量带宽采购，推出了单价低至 0.04元/GB 的高性价比套餐。',
    features: ['月付门槛低，均价在 5-10 元/月区间', '基础流量 100G-200G 起步，完全满足日常查资料与高清视频', '全部支持灵活月付，严格杜绝长期合约陷阱']
  },
  {
    slug: 'premium',
    title: '2026高端稳定IEPL/IPLC专线机场推荐 · 晚高峰无拥堵不卡顿 - vpnjichang.wiki',
    h1: '2026 高端稳定 IEPL/IPLC 专线机场推荐',
    tag: 'Enterprise IPLC',
    desc: '专注企业级与极客级出海需求。盘点采用全内网 IPLC/IEPL 点对点专线的高端机场，特殊时期与晚高峰稳定不掉线，4K极速秒开。',
    keywords: '高端机场推荐, IPLC专线机场, IEPL专线, 稳定机场推荐, 梯子推荐, vpn推荐',
    summary: '面向对网络稳定性有苛刻要求的专业用户与跨国团队，精选采用全物理光纤内网专线的顶级机场，彻底告别晚高峰丢包与敏感期断流。',
    filterTag: 'premium',
    intro: 'IPLC（国际私有租用光纤）传输不经由公共公网国际出口，天生不受防火长城（GFW）敏感期封锁与公网丢包干扰，是跨境通信的黄金标准。',
    features: ['纯物理内网专线，敏感期与晚高峰稳定性高达 99.9%', '往返时延极低，香港低至 12ms，日本低至 32ms', '配备原生纯净出口 IP 池，完美支持各类高风控海外业务']
  },
  {
    slug: 'beginner',
    title: '2026新手入门机场推荐 · 一键导入与小白友好型梯子节点 - vpnjichang.wiki',
    h1: '2026 新手入门机场与小白友好型梯子推荐',
    tag: 'Beginner Choice',
    desc: '新手零基础科学上网指南。精选支持一键导入客户端、后台界面直观、客服响应迅速且免去复杂配置的小白友好型机场。',
    keywords: '新手机场推荐, 小白梯子推荐, 一键导入翻墙, 机场推荐, 梯子推荐, vpn',
    summary: '无需深奥网络知识，登录后台一键将节点导入 Windows、手机与 Mac 客户端，开箱即用，配备详尽教程与在线客服支持。',
    filterTag: 'beginner',
    intro: '初次接触科学上网的用户往往被复杂的配置参数劝退。我们精选的这批服务商拥有完善的用户引导文档与一键配置工具，让您在 3 分钟内顺利连通全球。',
    features: ['支持主流客户端（Clash / 小火箭 / Sing-box）一键订阅同步', '提供保姆级图文教程与在线客服工单答疑', '支付便捷，开通后即时到账激活']
  },
  {
    slug: 'stable',
    title: '2026长期稳定防失联机场推荐 · 敏感期晚高峰稳定不掉线 - vpnjichang.wiki',
    h1: '2026 长期稳定防失联机场与专线梯子推荐',
    tag: 'Rock Solid',
    desc: '拒绝频繁掉线。汇总运营 2 年以上、具备多入口动态容灾调度与全天候运维团队的长期稳定机场，保障业务永续在线。',
    keywords: '稳定机场推荐, 防失联机场, 长期稳定梯子, 机场推荐, vpn机场, vpn节点',
    summary: '稳定性是网络工具的生命线。本专题严选经过长期在线率监测、具备多线冗余与自动化故障转移的高可用服务商。',
    filterTag: 'stable',
    intro: '优秀的稳定性来自多维冗余保障：双线或三线 BGP 入口智能探针，一旦检测到某条线路拥塞，系统可在毫秒级将流量切换至备用隧道。',
    features: ['多入口跨网容灾，三网运营商智能就近调度', '专业全天候运维团队，线路故障自愈迅速', '长期运营历史背书，信誉卓著拒接跑路']
  },
  {
    slug: 'ai',
    title: '2026支持ChatGPT与Claude原生AI专线机场推荐 · 解锁无限制 - vpnjichang.wiki',
    h1: '2026 支持 ChatGPT / Claude 原生 AI 专线机场推荐',
    tag: 'AI Dedicated',
    desc: '解决 ChatGPT 提示 Access Denied 与 Claude 封号痛点。精选配备美国原生住宅 IP、低风控欺诈值与 OpenAI 专线优化的机场。',
    keywords: 'ChatGPT机场推荐, Claude机场推荐, AI专线梯子, 住宅IP节点, 机场推荐, vpn节点',
    summary: '专为大模型重度研发者、提示词工程师与内容创作者打造，提供低欺诈分（Fraud Score）的纯净原生节点，顺利完成 Stripe 绑卡与长期稳定会话。',
    filterTag: 'ai',
    intro: 'OpenAI 与 Anthropic 部署了极其激进的反机房 IP 策略。普通机房共享节点由于数百人共用，极易触发 1020 阻断或封号。AI 专线采用独立清洗的原生住宅出口，确保登录如丝般顺滑。',
    features: ['提供美国、新加坡、英国等原生纯净住宅/双ISP出口', '支持 OpenAI API 高频请求与长连接流式推理', '通过 Stripe 支付网关严格风控，轻松升级 Plus / Pro']
  },
  {
    slug: 'streaming',
    title: '2026流媒体解锁机场推荐 · Netflix/Disney+/YouTube 4K极速节点 - vpnjichang.wiki',
    h1: '2026 流媒体解锁机场推荐与 4K 高清节点测评',
    tag: '4K Streaming',
    desc: '追剧党福音。精选全面解锁 Netflix 原生非自制剧、Disney+ IMAX Enhanced、HBO Max、YouTube 4K 60fps 极速秒开的影音专线机场。',
    keywords: '流媒体解锁机场, Netflix机场推荐, Disney+节点, YouTube4K梯子, 机场推荐, vpn推荐',
    summary: '大带宽、低丢包是极致视听体验的基石。本专题精选拥有大冗余带宽与全区流媒体解锁池的高速服务商，告别转圈卡顿与降画质。',
    filterTag: 'streaming',
    intro: '观看 4K HDR 视频需要稳定持续在 35Mbps 以上的带宽，且突发抖动极易引发降画质。流媒体专线储备了充裕的国际海缆带宽，并配备自动化流媒体解锁修复系统。',
    features: ['全量解锁 Netflix 各国版权非自制剧与 Disney+', 'YouTube 4K 60FPS 统计速度高达 80,000+ Kbps，拖拽即播', '支持 Apple TV、Google TV 及主机大屏端无感播放']
  }
];

export const rankingTopics: TopicItem[] = [
  {
    slug: 'overall',
    title: '2026年度综合实力机场排行榜 · 梯子与VPN翻墙节点全面测评 - vpnjichang.wiki',
    h1: '2026 年度综合实力机场排行榜与翻墙节点综合测评',
    tag: 'Overall Ranking',
    desc: '基于真实测速、线路架构、套餐价格、流媒体解锁与售后服务五维量化评分，权威呈现 2026 年度综合表现最强的主流机场排行。',
    keywords: '综合机场排行榜, 机场推荐2026, 翻墙机场排名, 梯子排行榜, vpn推荐, vpn机场',
    summary: '拒绝商业充值软文。vpnjichang.wiki 结合长期在线率探针、晚高峰网络压测与用户口碑，客观排出综合实力领先的优质品牌榜单。',
    filterTag: 'overall',
    intro: '综合评分模型涵盖网络质量（40%）、性价比（25%）、功能解锁（20%）与服务保障（15%），全方位立体评测，助您做出科学决策。',
    features: ['全公开透明的量化评分规则，拒绝虚构测速', '覆盖低预算平价、高端专线及企业全场景需求', '持续保持月度复检，动态更新排名位次']
  },
  {
    slug: 'value',
    title: '2026年度性价比机场排行榜 · 单位流量每GB单价测评 - vpnjichang.wiki',
    h1: '2026 年度性价比机场排行榜与每GB单价横评',
    tag: 'Value Ranking',
    desc: '科学计算每 GB 实际可用成本。对各大机场套餐的月付门槛、流量配额与倍率规则进行精确折算，找出真正划算的大碗实用机场。',
    keywords: '性价比机场排行榜, 便宜好用机场, 每GB单价最低梯子, 机场推荐, vpn节点',
    summary: '通过“套餐价格 / 实际可用流量”标准公式，折算出每 GB 真实使用成本，剔除高倍率暗扣陷阱，为您锁定最具性价比的优质选择。',
    filterTag: 'value',
    intro: '很多不良商家用“500G超大流量”作为噱头，却在后台设置了 3.0x 的高倍率暗扣流量。我们的性价比榜单全部以 1.0x 标准流量为基准折算，明明白白看清真实单价。',
    features: ['按每 GB 真实单价从低到高量化排序', '折算单价低至 0.036 元/GB，用多少买多少绝不浪费', '明确标注设备限制与速率上限，防范虚假宣传']
  },
  {
    slug: 'budget',
    title: '2026年度平价低预算机场排行榜 · 便宜稳定翻墙梯子横评 - vpnjichang.wiki',
    h1: '2026 年度平价低预算机场排行榜',
    tag: 'Budget Ranking',
    desc: '学生党与轻度用户最爱。盘点月付仅需几元到十几元的平价机场，在严守月付原则的前提下提供最坚实的基本出海保障。',
    keywords: '便宜机场排行榜, 10元以内机场, 低预算翻墙, 机场推荐, 梯子推荐',
    summary: '预算有限不代表要忍受频繁断网。本排行榜严选月付价格在 10 元以内的平价优质服务商，让您以极低的门槛享受顺畅网络。',
    filterTag: 'budget',
    intro: '平价机场核心考量的是商家在有限成本下的网络调度智慧与良心运营底线。我们筛选出的服务商在低价格下依然提供了稳定的 BGP 入口中转。',
    features: ['精选月付 10 元以内的极高性价比套餐', '坚守先月付后季付原则，资金安全风险降至最低', '可作为主力出海工具或高可用备用副梯子']
  },
  {
    slug: 'stable',
    title: '2026高稳定性专线机场排行榜 · 防失联IPLC/IEPL高速节点榜单 - vpnjichang.wiki',
    h1: '2026 高稳定性专线机场排行榜与优质节点测评',
    tag: 'Stability Ranking',
    desc: '以稳定性为第一考核指标。排选晚高峰丢包率低于 0.1%、平均可用率超 99.9% 的顶级专线机场，重大敏感期依然稳健如初。',
    keywords: '稳定机场排行榜, IPLC专线榜单, 晚高峰不卡顿梯子, 机场推荐, vpn机场',
    summary: '针对远程办公、跨境贸易与金融交易等对断网零容忍的高要求业务，权威发布基于全内网专线的高稳定性排行榜。',
    filterTag: 'stable',
    intro: '本榜单的唯一核心指标是“抗干扰与抗抖动能力”。所有入选服务商均拥有电信或移动正规国际专线物理光纤背书，晚高峰实测丢包率趋近于零。',
    features: ['全节点纯内网 IPLC 物理专线架构', '晚高峰 20:00-23:00 丢包率 < 0.1%，RTT 延迟抖动平稳如直线', '多入口智能热备切换，提供企业级 SLA 可用性承诺']
  }
];

export const glossaryTopics = [
  {
    slug: 'iplc-iepl',
    title: '名词解释：什么是 IPLC 与 IEPL 国际专线？内网传输原理 - vpnjichang.wiki',
    h1: '名词解释：什么是 IPLC 与 IEPL 国际专线？',
    desc: '深度解析跨境专线网络核心概念：IPLC 点对点租用线路与 IEPL 以太网专线的物理架构、传输原理、免审查机制及核心差异。',
    summary: 'IPLC 与 IEPL 代表着跨境网络通信的最高标准。本文用通俗易懂的语言，拆解物理内网专线如何做到极低延迟、0 丢包与无惧敏感期。'
  },
  {
    slug: 'clash-meta',
    title: '核心组件：什么是 Clash Meta (Mihomo) 内核？与原版区别 - vpnjichang.wiki',
    h1: '核心组件：什么是 Clash Meta (Mihomo) 内核？',
    desc: '全面介绍开源代理内核 Clash Meta（现更名为 Mihomo）的技术演进、支持的新一代协议（VLESS Reality、Hysteria 2、TUIC）及优势。',
    summary: 'Clash 原版停更后，Meta/Mihomo 内核已成为全平台科学上网事实上的技术基石。了解其底层改进有助于更好地选择客户端。'
  },
  {
    slug: 'sing-box',
    title: '新一代通用代理平台：什么是 Sing-box？架构优势与未来前景 - vpnjichang.wiki',
    h1: '新一代通用代理平台：什么是 Sing-box？架构优势解析',
    desc: '解析由 SagerNet 团队倾力打造的通用代理平台 Sing-box：模块化设计、极低内存占用、全协议原生支持与跨平台生态全景。',
    summary: 'Sing-box 被公认为下一代代理核心的代表作。其精悍的性能和全方位的现代化协议支持，正逐步引领整个行业走向标准化。'
  },
  {
    slug: 'protocol-evolution',
    title: '协议解析：Shadowsocks、VMess、VLESS与Trojan协议演进史 - vpnjichang.wiki',
    h1: '协议解析：Shadowsocks、VMess、VLESS 与 Trojan 演进史',
    desc: '回顾翻墙代理协议十余年演进史：从最初的经典 Shadowsocks 对称加密，到 VMess 复杂封装，再到现代 VLESS Reality 与 Trojan 伪装技术。',
    summary: '网络代理协议的演化本质上是一场与深度包检测（DPI）系统的猫鼠博弈。了解协议演变有助于您在客户端选择最优节点。'
  },
  {
    slug: 'node-rate',
    title: '倍率规则：什么是0.5x、1.0x、3.0x节点倍率？流量如何扣除？ - vpnjichang.wiki',
    h1: '倍率规则：什么是 0.5x、1.0x、3.0x 节点倍率？',
    desc: '彻底搞懂机场的“节点倍率”扣费黑幕。教您如何精确计算套餐实际可用流量，识破低价高倍率套路，明明白白消费。',
    summary: '倍率是衡量机场诚信度的关键参数。很多商家用 500G 大流量吸引用户，但节点倍率高达 3x。本文为您彻底讲透计算原理。'
  },
  {
    slug: 'gfw-overview',
    title: '基础概念：防火长城 (GFW) 的工作机制与流量阻断原理 - vpnjichang.wiki',
    h1: '基础概念：防火长城 (GFW) 的工作机制与流量阻断原理',
    desc: '客观科普防火长城的技术组成：DNS 污染、IP 黑名单丢弃、TCP RST 异常重置、SNI 域名探测阻断与主动探测系统的底层逻辑。',
    summary: '从计算机网络工程角度客观解析防火长城的工作机制，了解审查系统如何识别与处理跨境网络数据包。'
  }
];
