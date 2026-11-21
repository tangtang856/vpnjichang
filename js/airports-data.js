/**
 * vpnjichang.wiki - 统一机场数据源
 * 确保在本地 file:// 协议和任何 Web 服务器上均可零依赖秒级执行
 */
window.AIRPORTS_DATA = [
  {
    "id": "flyingbird",
    "name": "FlyingBird 飞鸟云",
    "slug": "flyingbird",
    "tagline": "老牌全专线架构，晚高峰4K秒开与全天候低延迟",
    "description": "FlyingBird（飞鸟云）是一家运营多年的高品质内网专线机场，全节点采用 IPLC/IEPL 国际专线传输，不经过公共公网 GFW 审查，抗封锁能力强。主打企业级办公、海外 AI 工具（ChatGPT/Claude）流畅调用以及 4K/8K 超高清流媒体快速解锁。",
    "officialUrl": "https://flyingbird.wiki",
    "affiliateUrl": "https://flyingbird.wiki",
    "startingPrice": 15.0,
    "currency": "CNY",
    "plans": [
      {
        "name": "入门版（月付）",
        "price": 15.0,
        "period": "月付",
        "trafficGB": 100,
        "pricePerGB": 0.15,
        "speed": "最高 500Mbps",
        "devices": "不限制设备数",
        "billingNote": "标准月付周期，到期自动重置流量"
      },
      {
        "name": "进阶版（月付）",
        "price": 30.0,
        "period": "月付",
        "trafficGB": 260,
        "pricePerGB": 0.115,
        "speed": "最高 1000Mbps",
        "devices": "不限制设备数",
        "billingNote": "高性价比畅享套餐，适合频繁观看视频"
      },
      {
        "name": "旗舰版（季付/年付）",
        "price": 85.0,
        "period": "季付",
        "trafficGB": 900,
        "pricePerGB": 0.094,
        "speed": "最高 2500Mbps",
        "devices": "不限制设备数",
        "billingNote": "长周期优惠折算，支持企业大流量并发"
      }
    ],
    "protocols": ["Shadowsocks", "VLESS", "Trojan"],
    "regions": ["香港", "台湾", "日本", "新加坡", "美国", "英国", "德国", "韩国"],
    "deviceLimit": "合理使用不限设备数",
    "aiSupport": ["ChatGPT Web/App", "Claude 3.5 Sonnet", "Gemini Advanced", "Copilot", "Midjourney"],
    "streamingSupport": ["Netflix", "Disney+", "YouTube 4K/8K", "TikTok", "Hulu", "HBO Max", "Bilibili港澳台"],
    "advantages": [
      "全节点纯内网 IPLC 专线，敏感时期与重大节假日依然坚挺稳定",
      "全天晚高峰（20:00-23:00）测速无拥堵丢包，延迟低至 35-50ms",
      "针对 OpenAI、Anthropic 官方 IP 库专门优化，杜绝 Access Denied 报错",
      "提供 Windows、Mac、Android、iOS 一键订阅与通用 Clash/Sing-box 配置"
    ],
    "disadvantages": [
      "起步价格相比普通直连机场略高，无免费试用套餐",
      "未提供按量不限时付费套餐，适合持续月度订阅用户"
    ],
    "suitableFor": [
      "外贸跨境电商与出海企业办公用户",
      "重度依赖 ChatGPT、Claude 等 AI 工具的开发者与创作者",
      "追求极致 4K 画质、对视频卡顿零容忍的流媒体用户"
    ],
    "sources": ["官方套餐公开页面", "2026年实测多地Ping与iperf3测速数据", "Telegram官方公告群"],
    "lastVerified": "2026-03-15",
    "testStatus": "tested",
    "rankings": {
      "overall": 1,
      "value": 3,
      "budget": 4,
      "stable": 1
    },
    "tags": ["premium", "stable", "ai", "streaming"]
  },
  {
    "id": "totoro",
    "name": "Totoro 龙猫云",
    "slug": "totoro",
    "tagline": "平价专线与入门首选，学生党与轻度用户的性价比标杆",
    "description": "Totoro（龙猫云）主打高性价比专线服务，采用 BGP 多线入口 + IEPL 内网专线组合，提供极具竞争力的月付定价。非常适合初次接触网络代理工具的小白用户、留学生及日常查阅学术资料的轻度用户。",
    "officialUrl": "https://totoro.wiki",
    "affiliateUrl": "https://totoro.wiki",
    "startingPrice": 15.0,
    "currency": "CNY",
    "plans": [
      {
        "name": "轻量微风（月付）",
        "price": 15.0,
        "period": "月付",
        "trafficGB": 100,
        "pricePerGB": 0.15,
        "speed": "最高 300Mbps",
        "devices": "最多 3 台设备同时在线",
        "billingNote": "入门尝鲜首选，轻度办公足额使用"
      },
      {
        "name": "标准畅享（月付）",
        "price": 28.0,
        "period": "月付",
        "trafficGB": 220,
        "pricePerGB": 0.127,
        "speed": "最高 500Mbps",
        "devices": "最多 5 台设备同时在线",
        "billingNote": "主流热销套餐，包含热门流媒体原生解锁"
      },
      {
        "name": "年付尊享版",
        "price": 140.0,
        "period": "年付",
        "trafficGB": 1440,
        "pricePerGB": 0.097,
        "speed": "最高 1000Mbps",
        "devices": "最多 8 台设备同时在线",
        "billingNote": "年付折合约 11.6 元/月，性价比出众"
      }
    ],
    "protocols": ["Shadowsocks", "Trojan"],
    "regions": ["香港", "台湾", "日本", "新加坡", "美国"],
    "deviceLimit": "根据套餐限制 3-8 台设备",
    "aiSupport": ["ChatGPT Web", "Copilot", "Google Gemini"],
    "streamingSupport": ["Netflix (非原生需换节点)", "Disney+", "YouTube 4K", "TikTok"],
    "advantages": [
      "单月仅需 15 元起步，试错成本低，适合预算有限人群",
      "后台界面清爽友好，自带图文并茂的小白客户端使用教程",
      "亚洲近场节点（港台日新）日常连通率维持在 98.5% 以上",
      "客服工单响应及时，支持支付宝与微信等常规便捷支付"
    ],
    "disadvantages": [
      "欧美等冷门远距离节点较少，主要集中在亚太地区",
      "低价套餐限制设备并发连接数，不适合多终端共享"
    ],
    "suitableFor": [
      "高校学生、学术科研文献查阅者",
      "刚接触翻墙软件、需要简单稳定节点的新手小白",
      "对每月支出敏感、追求绝对性价比的实用主义者"
    ],
    "sources": ["官网公开计费说明", "华东/华南电信联通宽带测试", "售后支持文档"],
    "lastVerified": "2026-03-12",
    "testStatus": "tested",
    "rankings": {
      "overall": 3,
      "value": 1,
      "budget": 2,
      "stable": 3
    },
    "tags": ["budget", "beginner", "value"]
  },
  {
    "id": "speedcat",
    "name": "SpeedCAT 闪电猫",
    "slug": "speedcat",
    "tagline": "极速全智能路由架构，流媒体4K原生全解锁旗舰",
    "description": "SpeedCAT（闪电猫）定位于高端网络加速服务，以卓越的线路带宽储备和全自动负载均衡著称。节点全部配备高成本原生住宅/机房 IP，海外流媒体与主流 AI 工具解锁率极高，是资深玩家与影音爱好者的常驻选择。",
    "officialUrl": "https://speedcat.wiki",
    "affiliateUrl": "https://speedcat.wiki",
    "startingPrice": 20.0,
    "currency": "CNY",
    "plans": [
      {
        "name": "Mini 体验套餐",
        "price": 20.0,
        "period": "月付",
        "trafficGB": 100,
        "pricePerGB": 0.20,
        "speed": "最高 1000Mbps",
        "devices": "最多 4 台",
        "billingNote": "高规格入门，享受顶级全专线体验"
      },
      {
        "name": "Pro 专业套餐",
        "price": 38.0,
        "period": "月付",
        "trafficGB": 260,
        "pricePerGB": 0.146,
        "speed": "最高 2500Mbps",
        "devices": "最多 8 台",
        "billingNote": "支持多地原生住宅IP流媒体换区与海外直播"
      },
      {
        "name": "Ultimate 旗舰",
        "price": 68.0,
        "period": "月付",
        "trafficGB": 600,
        "pricePerGB": 0.113,
        "speed": "最高 5000Mbps",
        "devices": "不限制设备数",
        "billingNote": "多出口冗余切换，企业团队首选"
      }
    ],
    "protocols": ["Shadowsocks", "VLESS", "Hysteria 2"],
    "regions": ["香港", "台湾", "日本", "新加坡", "美国", "英国", "澳大利亚", "加拿大", "阿根廷", "土耳其"],
    "deviceLimit": "4 - 8 台设备，旗舰套餐不限",
    "aiSupport": ["ChatGPT Plus/Team", "Claude 3.5 Sonnet", "Gemini Ultra", "Midjourney", "Sora"],
    "streamingSupport": ["Netflix (支持全区)", "Disney+", "YouTube Premium", "Hulu", "HBO Max", "DMM", "AbemaTV", "BBC iPlayer"],
    "advantages": [
      "独家配备原生家宽及广播 IP 资源，流媒体解锁能力处于行业顶尖水平",
      "支持最新 Hysteria 2 / VLESS 协议，弱网与高丢包环境下抗抖动表现极佳",
      "冗余入口多达十余个，单点故障时系统 3 秒内自动切换至健康入口",
      "节点覆盖国家丰富，包含土耳其、阿根廷等小众流媒体订阅低价区"
    ],
    "disadvantages": [
      "入门价格 20 元起步，整体定价略高于市场平均水平",
      "晚高峰极少数冷门小众节点偶尔有维护调度"
    ],
    "suitableFor": [
      "Netflix、Disney+、HBO 重度追剧党及海外影视原盘收藏爱好者",
      "需要稳定使用 ChatGPT Plus 与 Claude Pro 的付费订阅用户",
      "对外服游戏低延迟加速、海外社交媒体运营有严苛要求的专业人士"
    ],
    "sources": ["SpeedCAT 用户控制台", "Netflix原生检测脚本自动化运行记录", "多节点路由跟踪测试"],
    "lastVerified": "2026-03-14",
    "testStatus": "tested",
    "rankings": {
      "overall": 2,
      "value": 4,
      "budget": 5,
      "stable": 2
    },
    "tags": ["premium", "streaming", "ai", "stable"]
  },
  {
    "id": "feiniao",
    "name": "极客云 / 微林",
    "slug": "feiniao",
    "tagline": "老牌资深技术团队运营，大流量高带宽BGP隧道中转",
    "description": "极客云（微林互联）是行业内运营时间超过 5 年的老牌代理服务商，技术底蕴深厚。主打多入口 BGP 智能中转线路，带宽储备极其充裕，大流量套餐单价折算非常低，是重度下载与大文件跨国传输的坚实后盾。",
    "officialUrl": "https://feiniao.wiki",
    "affiliateUrl": "https://feiniao.wiki",
    "startingPrice": 16.9,
    "currency": "CNY",
    "plans": [
      {
        "name": "基础版（月付）",
        "price": 16.9,
        "period": "月付",
        "trafficGB": 120,
        "pricePerGB": 0.14,
        "speed": "最高 500Mbps",
        "devices": "不限制设备数",
        "billingNote": "经典热销套餐，性价比高"
      },
      {
        "name": "大流量畅享（月付）",
        "price": 29.9,
        "period": "月付",
        "trafficGB": 300,
        "pricePerGB": 0.099,
        "speed": "最高 1000Mbps",
        "devices": "不限制设备数",
        "billingNote": "每GB不到1毛钱，重度视频党首选"
      },
      {
        "name": "团队大带宽（年付）",
        "price": 180.0,
        "period": "年付",
        "trafficGB": 2400,
        "pricePerGB": 0.075,
        "speed": "最高 2000Mbps",
        "devices": "不限制设备数",
        "billingNote": "超大年付容量池，单价极低"
      }
    ],
    "protocols": ["Shadowsocks", "VMess", "Trojan"],
    "regions": ["香港", "台湾", "日本", "新加坡", "美国", "英国", "法国", "德国"],
    "deviceLimit": "不限制同时在线设备数量",
    "aiSupport": ["ChatGPT Web", "Claude (部分节点)", "Google Gemini"],
    "streamingSupport": ["Netflix", "Disney+", "YouTube 4K", "TikTok", "Bilibili港澳台"],
    "advantages": [
      "连续运营多年无重大宕机事故，老牌服务商品牌口碑信誉有保障",
      "套餐流量给得极其大方，每 GB 折算价格在主流专线梯子中极具优势",
      "全节点不限制登录设备数量，一人购买全家手机电脑及软路由共享",
      "提供专用一键客户端，省去复杂第三方软件配置步骤"
    ],
    "disadvantages": [
      "高峰期极少数公网出口中转节点延迟偶有波动",
      "部分欧美节点对 Claude 等极端风控 AI 的支持需手动挑选专用节点"
    ],
    "suitableFor": [
      "日常有大文件下载、GitHub 源码拉取、Docker 镜像同步的开发者",
      "家庭多台手机、平板、智能电视盒子共同科学上网的家庭用户",
      "重视服务商运营历史与安全信誉、拒绝小作坊短命机场的保守型用户"
    ],
    "sources": ["官方服务状态看板", "华北联通/华东移动双线压测日志", "历史运行数据归档"],
    "lastVerified": "2026-03-10",
    "testStatus": "tested",
    "rankings": {
      "overall": 4,
      "value": 2,
      "budget": 3,
      "stable": 4
    },
    "tags": ["value", "beginner", "streaming"]
  },
  {
    "id": "kuidao",
    "name": "快刀云 KuaiDao",
    "slug": "kuidao",
    "tagline": "新一代全能型平价中转机场，超低起步价与极速流媒体",
    "description": "快刀云（KuaiDao）是近期在各大科技论坛与社群口碑跃升的新锐加速服务商。采用全新负载调度架构与优质中港隧道，以 12 元/月的超低尝鲜门槛提供媲美高端专线的流畅体验，支持各大流媒体解锁。",
    "officialUrl": "https://kuidao.wiki",
    "affiliateUrl": "https://kuidao.wiki",
    "startingPrice": 12.0,
    "currency": "CNY",
    "plans": [
      {
        "name": "青铜尝鲜（月付）",
        "price": 12.0,
        "period": "月付",
        "trafficGB": 100,
        "pricePerGB": 0.12,
        "speed": "最高 300Mbps",
        "devices": "最多 3 台",
        "billingNote": "全场最低月付门槛，无压力上车"
      },
      {
        "name": "黄金尊享（月付）",
        "price": 24.0,
        "period": "月付",
        "trafficGB": 240,
        "pricePerGB": 0.10,
        "speed": "最高 800Mbps",
        "devices": "最多 6 台",
        "billingNote": "高性价比主力套餐，赠送专属流媒体解锁节点"
      },
      {
        "name": "钻石大包（季付）",
        "price": 60.0,
        "period": "季付",
        "trafficGB": 750,
        "pricePerGB": 0.08,
        "speed": "最高 1500Mbps",
        "devices": "最多 10 台",
        "billingNote": "大流量季付优惠，多终端并发不限速"
      }
    ],
    "protocols": ["Shadowsocks", "VLESS", "Trojan"],
    "regions": ["香港", "台湾", "日本", "新加坡", "美国", "马来西亚"],
    "deviceLimit": "3 - 10 台设备",
    "aiSupport": ["ChatGPT Web/App", "Claude 3.5 Sonnet", "Google Gemini"],
    "streamingSupport": ["Netflix", "Disney+", "YouTube 4K", "TikTok", "Spotify", "Viu"],
    "advantages": [
      "月费仅 12 元起，价格极具攻击力，性价比直接拉满",
      "香港与日本节点直连延迟表现优秀，网页秒开与打游戏丢包率低",
      "支持完整的流媒体智能分流与住宅 IP 动态池，看 Netflix 不串区",
      "节点更新频率高，遇到波动能及时替换受损出口"
    ],
    "disadvantages": [
      "品牌成立年限较短，抗极端网络风浪经验仍在积累中",
      "工单回复支持主要在白天工作时段，夜间回复略有延迟"
    ],
    "suitableFor": [
      "预算卡得很紧、想花最少钱买到优质网络节点的年轻人",
      "寻找备用第二条梯子线路、防止主力梯子抽风的用户",
      "平时以浏览 YouTube、推特（X）、Reddit 为主的轻中度网民"
    ],
    "sources": ["官网价格策略公开表单", "第三方节点可用性监控平台数据", "全国多地节点延迟测速"],
    "lastVerified": "2026-03-08",
    "testStatus": "tested",
    "rankings": {
      "overall": 5,
      "value": 1,
      "budget": 1,
      "stable": 5
    },
    "tags": ["budget", "value", "streaming"]
  },
  {
    "id": "mojie",
    "name": "魔戒 Moju",
    "slug": "mojie",
    "tagline": "老牌不限时按量计费机场，永不过期流量的终极备用神器",
    "description": "魔戒（Moju）是中文网络圈极具名气的不限时按量计费机场。打破传统的月付包月订阅制，用户购买一次流量包后永久有效，直至用完为止。非常适合常年驻扎国内、仅偶有查资料或作为紧急备用梯子的用户。",
    "officialUrl": "https://mojie.wiki",
    "affiliateUrl": "https://mojie.wiki",
    "startingPrice": 14.9,
    "currency": "CNY",
    "plans": [
      {
        "name": "体验按量包（不限时）",
        "price": 14.9,
        "period": "不限时",
        "trafficGB": 130,
        "pricePerGB": 0.114,
        "speed": "最高 500Mbps",
        "devices": "不限制设备数",
        "billingNote": "流量永不过期，用完即止，不自动续费"
      },
      {
        "name": "畅饮按量包（不限时）",
        "price": 49.9,
        "period": "不限时",
        "trafficGB": 500,
        "pricePerGB": 0.099,
        "speed": "最高 1000Mbps",
        "devices": "不限制设备数",
        "billingNote": "超大按量流量池，永不浪费多余月租"
      },
      {
        "name": "巨无霸按量包（不限时）",
        "price": 99.0,
        "period": "不限时",
        "trafficGB": 1200,
        "pricePerGB": 0.0825,
        "speed": "最高 1500Mbps",
        "devices": "不限制设备数",
        "billingNote": "备用防失联终极方案，适合多设备常年待命"
      }
    ],
    "protocols": ["Shadowsocks", "VLESS"],
    "regions": ["香港", "台湾", "日本", "新加坡", "美国", "英国", "韩国", "印度"],
    "deviceLimit": "不限制设备数",
    "aiSupport": ["ChatGPT Web", "Claude (部分节点)", "Google Gemini"],
    "streamingSupport": ["Netflix", "Disney+", "YouTube 4K", "TikTok"],
    "advantages": [
      "独创不限时按量计费，没有月底流量清零焦虑，用多少扣多少",
      "充当主力梯子的第二备份线路无与伦比，哪怕放半年不用也不会浪费",
      "全节点不限制客户端数量，支持家庭所有终端和朋友共用一个订阅",
      "线路为优质公网中转与优化直连结合，综合连通率保持稳定"
    ],
    "disadvantages": [
      "不限时套餐因无法预估集中峰值，在极端特殊敏感期波动略高于高阶专线",
      "若全天高强度观看 4K 视频，按量计费消耗速度会相对较快"
    ],
    "suitableFor": [
      "需要常备一条防失联备份梯子的所有网民（强烈推荐备一条）",
      "平时翻墙频率低、只是偶尔查阅 Google/维基百科/发邮件的轻度用户",
      "不想被按月扣费绑架、喜欢用多少付多少的理智型消费者"
    ],
    "sources": ["魔戒官网公开计费系统", "华东电信/移动双机房长周期监控", "网络社群长期反馈整理"],
    "lastVerified": "2026-03-05",
    "testStatus": "tested",
    "rankings": {
      "overall": 6,
      "value": 1,
      "budget": 1,
      "stable": 6
    },
    "tags": ["budget", "beginner", "value"]
  }
];
