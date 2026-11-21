/**
 * scripts/data-guides-30.js
 * 30 篇高质量实战客户端与系统翻墙教程结构化数据
 */

const guides30 = [
  {
    slug: 'windows',
    title: 'Windows电脑Clash Verge与v2rayN客户端配置教程 · 翻墙软件安装指南 - vpnjichang.wiki',
    h1: 'Windows 电脑客户端配置与节点导入全流程教程',
    desc: '专为 Windows 10/11 用户编写的科学上网客户端配置指南。图文详解 Clash Verge Rev 与 v2rayN 下载、安装、订阅导入、TUN虚拟网卡及规则分流设置。',
    platform: 'Windows',
    summary: 'Windows 是最主流的桌面办公操作系统。本教程详解最新开源稳定的 Clash Verge Rev 与经典 v2rayN 客户端配置，解决开机自启、TUN 模式及系统代理异常问题。',
    sections: [
      {
        title: '一、Windows 客户端选型与特性对比',
        content: `在 Windows 环境下，目前最主流且受活跃维护的客户端为 <strong>Clash Verge Rev</strong> 与 <strong>v2rayN</strong>。前者基于现代 Tauri 框架开发，内存占用极低（通常不到 60MB），界面美观流畅，内置新版 Mihomo (Clash Meta) 内核，全面支持 VLESS、Hysteria 2 等现代协议；后者则是经典的 Windows 代理工具，支持 Xray 与 Sing-box 双核心，适合喜欢深入微调底层参数的高级玩家。`
      },
      {
        title: '二、Clash Verge Rev 下载与权限设置',
        content: `从官方 Release 发布页下载最新版 <code>_x64-setup.exe</code> 安装包。安装完成后，首次启动建议右键点击图标选择“以管理员身份运行”，这是为了让软件拥有安装并启用系统 <strong>TUN 虚拟网卡服务</strong> 的底层网络权限。进入软件后，建议在“设置”中勾选“开机自启”与“静默启动”。`
      },
      {
        title: '三、一键导入机场订阅链接',
        content: `登录您所购买的机场用户后台（如 <a href="../review/breezenet.html">微风网络 Breezenet</a> 或 <a href="../review/yinxingren.html">隐形人</a>），在仪表盘找到“订阅中心”，点击“复制 Clash 订阅链接”。回到 Clash Verge Rev，点击左侧导航栏的 <strong>Profiles（订阅配置）</strong>，在顶部输入框粘贴该链接，点击 <strong>Download</strong>。下载成功后，右键点击卡片并选择 <strong>Select</strong> 设为当前激活配置。`
      },
      {
        title: '四、开启系统代理与分流模式选择',
        content: `在“设置”页面开启 <strong>System Proxy（系统代理）</strong> 开关，此时浏览器访问海外网站将自动走节点加速。在“代理”页面顶部，将模式设为 <strong>Rule（规则分流）</strong>，此时访问百度、微信等国内流量自动直连，访问 Google、YouTube 等境外流量才走代理，既节省流量又保证低延迟。`
      },
      {
        title: '五、TUN 虚拟网卡全局模式开启技巧',
        content: `对于很多不遵循 Windows 系统代理设置的软件（例如某些外服游戏启动器、命令行终端 Git/Pip、以及部分海外会议软件），开启系统代理无法生效。此时在 Clash Verge 设置中安装 Service Mode（服务模式），待右侧出现绿灯后开启 <strong>TUN Mode</strong> 开关，客户端将创建虚拟网卡接管系统全部 TCP/UDP 流量，实现真正的全局科学加速。`
      }
    ],
    faq: [
      { q: '软件关闭后电脑突然打不开任何网页怎么恢复？', a: '这是因为软件异常关闭时未还原 Windows 系统的代理端口。在系统设置中搜索“代理服务器设置”，手动关闭“使用代理服务器”即可恢复；或者重新打开 Clash Verge 正常点击退出。' },
      { q: '为什么测速显示绿色延迟，但打开网页提示连接失败？', a: '请检查电脑右下角的系统时间是否与北京时间完全一致。时间误差超过 60 秒会导致加密协议握手失败。' }
    ]
  },
  {
    slug: 'android',
    title: 'Android安卓手机Clash Meta与Surfboard节点配置教程 · 翻墙教程 - vpnjichang.wiki',
    h1: 'Android 安卓手机客户端配置与节点导入全流程教程',
    desc: '专为小米、华为、OPPO、vivo 及三星等安卓手机用户撰写的翻墙教程。详述 Clash Meta for Android 与 Surfboard 客户端下载、后台保活设置。',
    platform: 'Android',
    summary: '安卓手机因系统后台省电策略各异，常出现熄屏掉线问题。本教程指导您完成客户端配置，并彻底搞定后台保活与分应用代理。',
    sections: [
      {
        title: '一、安卓主流客户端选择：CMFA 与 Surfboard',
        content: `安卓平台主力推荐 <strong>Clash Meta for Android (CMFA)</strong> 与 <strong>Surfboard</strong>。CMFA 内置完整的 Mihomo 内核，协议支持最全，适合绝大多数主流机场；Surfboard 界面极简、类似 iOS 上的 Surge，对系统资源和电量消耗极其克制。两款客户端均支持直接通过 URL 一键导入订阅。`
      },
      {
        title: '二、配置导入与建立 VPN 连接',
        content: `在手机浏览器中登录机场后台，点击“一键导入 Clash for Android”，系统会自动唤醒客户端并拉取配置；若无法一键唤醒，可复制后台的“通用订阅链接”，在客户端中点击 <strong>配置 -> 新配置 -> URL 导入</strong>，粘贴链接后保存。点击主界面的“启动”开关，在系统弹出的“网络连接请求 / 允许建立 VPN”对话框中点击<strong>确定</strong>即可连接。`
      },
      {
        title: '三、安卓核心关键设置：后台保活防断连',
        content: `国产安卓定制系统（如澎湃OS、OriginOS、ColorOS）默认会在息屏后冻结或杀死后台进程。请务必完成两项设置：1. 在多任务后台卡片界面，长按客户端卡片点击<strong>加锁图标</strong>锁定后台；2. 进入系统“设置 -> 应用管理 -> 权限/省电管理”，将该客户端的电池策略改为<strong>“无限制 / 允许自启动与后台高耗电运行”</strong>。`
      },
      {
        title: '四、分应用代理 (Split Tunneling) 设置',
        content: `如果您不希望国内银行 App、微信或网购软件走代理，在客户端“设置 -> 网络”中找到<strong>“分应用代理”</strong>，勾选“仅代理选中的应用”，然后勾选 Chrome、YouTube、Telegram、X (Twitter)、Instagram 等需要翻墙的软件，其他应用将直接使用本地蜂窝网络/WiFi。`
      }
    ],
    faq: [
      { q: '为什么打开 VPN 后手机通知栏显示“网络可能受到监控”？', a: '这是安卓系统的标准安全提示，任何在本地建立 VpnService 的软件都会触发该提示，属于正常现象，无需担心。' }
    ]
  },
  {
    slug: 'ios',
    title: 'iOS苹果手机小火箭Shadowrocket与Loon配置教程 · 节点导入指南 - vpnjichang.wiki',
    h1: 'iOS 苹果手机客户端配置与节点导入全流程教程',
    desc: '专为 iPhone 和 iPad 用户准备的科学上网指南。详解美区 Apple ID 获取、Shadowrocket（小火箭）安装、扫码添加节点及大陆白名单规则配置。',
    platform: 'iOS',
    summary: '由于国区 App Store 政策限制，iOS 用户需使用海外 Apple ID 下载代理软件。本文手把手教您如何获取小火箭并快速导入节点。',
    sections: [
      {
        title: '一、前置准备：获取海外 Apple ID 并下载软件',
        content: `iOS 平台最受欢迎的代理工具是 <strong>Shadowrocket（俗称小火箭）</strong>，售价为 $2.99；进阶用户还可选择 Loon 或 Surge。由于中国大陆区 App Store 下架了所有代理软件，您需要准备一个<strong>非国区（通常为美区）Apple ID</strong>。打开 App Store 退出当前账号，登录美区账号搜索“Shadowrocket”，认准开发者为 <code>Shadow Launch Technology</code> 的正版应用。`
      },
      {
        title: '二、一键导入订阅与扫码添加节点',
        content: `打开手机 Safari 浏览器登录机场后台，点击“一键导入 Shadowrocket”，网页将自动跳转打开小火箭并完成节点解析。如果机场提供订阅二维码，打开小火箭点击左上角<strong>扫描图标</strong>直接扫码即可秒速添加。也可以在首页点击右上角 <strong>+</strong> 号，类型选择 <strong>Subscribe</strong>，在 URL 栏粘贴机场提供的通用订阅链接。`
      },
      {
        title: '三、全局路由与规则分流设置',
        content: `在小火箭主界面中间找到<strong>“全局路由”</strong>，务必将其设为 <strong>配置 (Config)</strong>。配置模式内置了智能分流规则：访问国内网站自动直连不走节点，不浪费流量且延迟极低；访问被阻断的海外网站才走代理加速。初次点击主开关时，系统会弹出“添加 VPN 配置”授权提示，使用 Face ID / Touch ID 验证确认即可。`
      }
    ],
    faq: [
      { q: '小火箭如何更新节点列表？', a: '在主界面找到您的订阅配置名称，向右滑动点击“更新”，或者按住屏幕下拉，软件会自动从服务器拉取最新的健康节点。' }
    ]
  },
  {
    slug: 'macos',
    title: 'macOS苹果电脑Clash Verge Rev与Surge配置教程 · 翻墙安装教程 - vpnjichang.wiki',
    h1: 'macOS 苹果电脑客户端配置与节点导入全流程教程',
    desc: '适配 M1/M2/M3/M4 系列 Apple Silicon 及 Intel 芯片的 Mac 科学上网教程。详细介绍 Clash Verge Rev 与 Surge for Mac 配置及终端代理技巧。',
    platform: 'macOS',
    summary: '针对 macOS 系统的精致 UI 与专业开发环境需求，详解如何通过 Clash Verge Rev 开启系统级网络代理与配置 TUN 模式。',
    sections: [
      {
        title: '一、macOS 客户端版本选择与芯片适配',
        content: `macOS 用户主力推荐 <strong>Clash Verge Rev</strong>，不仅开源免费且完美原生适配 Apple Silicon (ARM64) 与 Intel (x64) 芯片。前往 Release 页面，M1/M2/M3/M4 系列芯片电脑请下载文件名带有 <code>_aarch64.dmg</code> 的版本，Intel 处理器下载 <code>_x64.dmg</code>。`
      },
      {
        title: '二、安装与解除“应用已损坏”安全提示',
        content: `打开 dmg 文件将图标拖入 Applications 文件夹。若首次打开提示“已损坏，无法打开”，是因为 macOS Gatekeeper 对未签名开源软件的安全机制。打开终端（Terminal）粘贴以下命令并回车输入密码即可解决：<br><code>sudo xattr -rd com.apple.quarantine /Applications/Clash\\ Verge.app</code>`
      },
      {
        title: '三、订阅导入与 TUN 模式深度配置',
        content: `在 Profiles 界面粘贴订阅链接下载并激活。在设置中开启“系统代理”。对于开发者而言，Terminal 终端命令行（如 <code>brew</code>、<code>git clone</code>、<code>npm install</code>）默认不走系统代理，此时在 Clash Verge 设置中安装 Service Mode 并开启 <strong>TUN 模式</strong>，即可实现整机所有终端进程全自动高速加速。`
      }
    ],
    faq: [
      { q: '如何在 Mac 菜单栏快速切换节点？', a: 'Clash Verge 会常驻在 macOS 右上角状态栏，点击图标即可在下拉菜单中快速切换节点或分流模式。' }
    ]
  },
  {
    slug: 'clash-tutorial',
    title: 'Clash核心与订阅链接常见报错排查全指南 · 超时与更新失败解决 - vpnjichang.wiki',
    h1: 'Clash 核心与订阅链接常见报错排查全指南',
    desc: '系统梳理 Clash 客户端常见的“订阅更新失败”、“Timeout全部超时”、“DNS污染”及“网页打不开但软件显示连接”等疑难杂症的根治解决方案。',
    platform: 'Cross-platform',
    summary: '网络代理出现故障往往让人抓狂。本指南归纳了 95% 以上用户日常遇到的报错类型，并提供一针见血的排错步骤。',
    sections: [
      {
        title: '一、报错 1：订阅链接更新失败 (Network Error / Fetch Failed)',
        content: `<strong>核心根源：</strong>机场的订阅下发域名遭到了本地网络的 DNS 污染，或客户端开启了错误的代理导致请求闭环死锁。<br><strong>排查与修复：</strong>1. 先关闭客户端的“系统代理”开关再点击更新；2. 使用手机热点连接电脑后重试更新；3. 在机场后台复制“备用订阅链接”或使用订阅转换工具替换下发节点。`
      },
      {
        title: '二、报错 2：节点测速全部显示红点或 Timeout',
        content: `<strong>核心根源：</strong>90% 的情况是因为本机系统时间与标准北京时间存在微小偏差。现代加密协议（VLESS、Shadowsocks 2022）包含严格的时间戳防重放机制，误差超 60 秒立即握手失败。<br><strong>排查与修复：</strong>打开系统“日期与时间”设置，关闭并重新开启“自动设置时间”进行网络对时校准。`
      },
      {
        title: '三、报错 3：微信/QQ 正常，但浏览器无法打开任何国外网页',
        content: `<strong>核心根源：</strong>DNS 模式配置错误或分流规则冲突。<br><strong>排查与修复：</strong>在客户端设置中将 DNS 模式由 <code>redir-host</code> 改为 <code>fake-ip</code>；检查代理模式是否误设为了“Direct（直接连接）”；并在 Windows 命令提示符运行 <code>ipconfig /flushdns</code> 刷新解析缓存。`
      }
    ],
    faq: [
      { q: '为什么部分节点显示几百毫秒延迟，但实际上无法加载视频？', a: '节点列表显示的延迟通常只是 TCP Ping 建立连接的时间，并不代表服务器的真实可用带宽。若节点带宽超载或出口受阻，会出现低延迟但零吞吐的假象。' }
    ]
  },
  {
    slug: 'openwrt-clash',
    title: 'OpenWrt软路由安装配置OpenClash与HomeProxy实现全家透明代理教程 - vpnjichang.wiki',
    h1: 'OpenWrt 软路由透明代理全流程实战教程',
    desc: '手把手教您在 OpenWrt 软路由上安装配置 OpenClash 或 HomeProxy。实现全屋手机、电视盒子、游戏主机免客户端一键自动科学上网。',
    platform: 'Router',
    summary: '软路由透明代理是家庭多设备出海的终极方案。无需在每台手机电脑上配置客户端，全屋所有设备连上 WiFi 自动享受无感加速。',
    sections: [
      {
        title: '一、OpenClash 与 HomeProxy 的选择',
        content: `OpenClash 是 OpenWrt 生态最成熟的插件，支持复杂的规则分流与图形化控制台；HomeProxy 则是基于 Sing-box 开发的新一代轻量插件，内存占用极小，性能吞吐强悍。对于日常家庭宽带，两者均可完美胜任。`
      },
      {
        title: '二、安装内核与导入机场订阅',
        content: `进入 OpenWrt 后台“服务 -> OpenClash”，在“版本更新”中下载对应架构（x86_64、aarch64）的 Meta 内核。进入“配置文件订阅”，粘贴机场的 Clash 订阅链接，勾选“自动更新”并保存应用配置。`
      },
      {
        title: '三、运行模式与 DNS 转发防泄漏设置',
        content: `运行模式推荐选择 <strong>Fake-IP (TUN)</strong> 混合模式。勾选“本地 DNS 劫持”，防止局域网设备发起未经代理的明文 DNS 查询造成隐私泄露。保存并启动 OpenClash，主界面显示“运行中”即表示全屋透明代理生效。`
      }
    ],
    faq: [
      { q: '软路由开启透明代理后电视 Netflix 提示代理怎么办？', a: '在 OpenClash 的规则策略中，为流媒体分组单独绑定具备原生家庭宽带 IP 的香港或新加坡专线节点。' }
    ]
  },
  {
    slug: 'apple-tv-proxy',
    title: 'Apple TV 4K安装使用Surge与Shadowrocket电视翻墙超高清播放教程 - vpnjichang.wiki',
    h1: 'Apple TV 4K 电视大屏科学上网与流媒体播放教程',
    desc: '详细讲解 tvOS 17 系统后 Apple TV 4K 安装使用 Surge、Loon、Shadowrocket 或设置局域网网关科学上网的完整方法。',
    platform: 'Apple TV',
    summary: 'tvOS 17 原生支持了 VPN 框架，Apple TV 终于告别了繁琐的软路由依赖，可以直接在电视上独立运行小火箭与 Surge 播放 4K 流媒体。',
    sections: [
      {
        title: '一、前置要求与客户端下载',
        content: `确保 Apple TV 系统已升级至 tvOS 17 或更高版本。在电视端 App Store 登录美区 Apple ID，下载 Shadowrocket、Loon 或 Surge。小火箭支持购买一次全家设备共享，无需二次付费。`
      },
      {
        title: '二、通过同局域网 iPhone 极速同步配置',
        content: `在电视端打开 Shadowrocket，无需用遥控器笨拙输入网址。确保 iPhone 与 Apple TV 连接在同一 WiFi 下，打开手机端小火箭，点击“设置 -> Apple TV 同步”，手机将自动把机场订阅和分流规则秒级推送到电视端。`
      },
      {
        title: '三、享受 YouTube 4K HDR 与 Netflix 全区影视',
        content: `开启电视端代理开关后，打开 YouTube 可直接流畅硬解 4K 60fps / HDR 影视原盘，彻底打通大屏家庭影院的高清出海体验。`
      }
    ],
    faq: [
      { q: '电视端运行代理会导致设备发热严重吗？', a: 'Apple TV 的 A15 仿生芯片性能极其充裕，代理加解密的 CPU 占用通常低于 3%，几乎没有发热影响。' }
    ]
  },
  {
    slug: 'android-tv-box',
    title: '安卓智能电视与外贸电视盒子安装Clash与Surfboard翻墙教程 - vpnjichang.wiki',
    h1: '安卓智能电视与 TV 盒子科学上网配置教程',
    desc: '适用于索尼、小米智能电视、Chromecast with Google TV、外贸电视盒子的科学上网教程。通过 U 盘侧载 APK 轻松连通海外。',
    platform: 'Android TV',
    summary: '给家里的智能电视安装代理软件看 4K YouTube 和 Netflix 并不难。本文教您如何通过 U 盘安装适配电视遥控器的专用客户端。',
    sections: [
      {
        title: '一、下载适配电视端的 APK 安装包',
        content: `在电脑端下载 <strong>Clash for Android TV 版</strong> 或 <strong>Surfboard</strong> 的 APK 安装包（TV 版专门优化了遥控器方向键导航）。将 APK 拷贝到 U 盘中。`
      },
      {
        title: '二、U 盘侧载安装与配置导入',
        content: `将 U 盘插入智能电视或外贸电视盒子的 USB 接口，使用电视自带的“文件管理器”找到 APK 并安装。打开软件后，选择“从剪贴板导入”或使用软件内置的局域网配置上传功能，用手机扫描屏幕二维码即可一键输入订阅。`
      },
      {
        title: '三、开启系统 VPN 授权与开机自启',
        content: `点击启动按钮，使用电视遥控器在弹出的系统对话框中点击“允许连接”。部分盒子支持在设置中开启“随电视开机自启”，实现开机即享高速网络。`
      }
    ],
    faq: [
      { q: '电视遥控器在客户端里无法光标移动怎么办？', a: '可以使用电视配套的手机遥控器 App 开启“鼠标/触控板模式”，或者临时插一个 USB 电脑鼠标进行点击操作。' }
    ]
  },
  {
    slug: 'ps5-switch-xbox-proxy',
    title: 'PS5与Nintendo Switch游戏主机通过局域网共享代理联机加速教程 - vpnjichang.wiki',
    h1: 'PS5 / Switch / Xbox 游戏主机局域网共享加速教程',
    desc: '主机玩家必备：无需购买昂贵的游戏加速盒，利用局域网内的 Windows 或 Mac 电脑，一键为 PS5、Switch 和 Xbox 开启低延迟联机与满速下载。',
    platform: 'Gaming Console',
    summary: '主机下载数字版游戏动辄几十 GB 速度极慢？联机 NAT 总是 Strict/Type C？教您利用电脑客户端的局域网共享代理功能轻松化解。',
    sections: [
      {
        title: '一、电脑端客户端开启“允许局域网连接”',
        content: `打开电脑上的 Clash Verge Rev 或 v2rayN，进入“设置”，找到 <strong>Allow LAN（允许局域网连接）</strong> 开关并开启。记住显示的 HTTP 代理端口号（默认为 <code>7890</code> 或 <code>10809</code>）。`
      },
      {
        title: '二、查询电脑在家庭局域网内的内网 IP 地址',
        content: `在 Windows 电脑上按 Win+R 输入 <code>cmd</code>，执行 <code>ipconfig</code>，找到“IPv4 地址”（通常类似 <code>192.168.1.105</code>）；Mac 电脑在“系统设置 -> 网络 -> 详细信息”中查看 IP 地址。`
      },
      {
        title: '三、主机端网络手动配置代理服务器',
        content: `在 PS5 或 Switch 上进入“设置 -> 网络 -> 设置互联网连接”，选中当前 WiFi，选择“高级设置”：将“代理服务器”设为<strong>使用</strong>，服务器地址填入电脑的内网 IP，端口填入 <code>7890</code>。保存并测试互联网连接，下载速度即可跑满宽带，NAT 类型升至 Open/Type A。`
      }
    ],
    faq: [
      { q: '主机使用代理后电脑必须一直开着吗？', a: '是的，因为数据包是通过电脑上的客户端转发出去的。如果不希望电脑常开，推荐使用软路由或电视盒做网关。' }
    ]
  },
  {
    slug: 'linux-mihomo',
    title: 'Linux终端与云服务器安装配置Mihomo命令行代理教程 - vpnjichang.wiki',
    h1: 'Linux 终端与 VPS 服务器科学上网配置全指南',
    desc: '专为开发者和运维人员编写的 Linux 代理指南。在 Ubuntu / Debian / CentOS 上通过 Systemd 托管 Mihomo 内核实现服务级稳定代理。',
    platform: 'Linux',
    summary: '在 Linux 服务器上执行 git clone、拉取 Docker 镜像或调用 OpenAI API 经常遭遇超时。本文详解轻量高效的 Linux 代理配置。',
    sections: [
      {
        title: '一、下载预编译二进制文件',
        content: `访问 Mihomo (Clash Meta) 官方开源仓库，根据服务器架构下载对应的 tar.gz 压缩包（如 <code>mihomo-linux-amd64.tar.gz</code>）。解压后将二进制文件重命名为 <code>mihomo</code> 并移动至 <code>/usr/local/bin/</code>，赋予可执行权限：<code>chmod +x /usr/local/bin/mihomo</code>。`
      },
      {
        title: '二、下载订阅配置并配置 Systemd 守护进程',
        content: `在 <code>/etc/mihomo/</code> 目录下创建 <code>config.yaml</code>，使用 curl 直接拉取机场的订阅配置文件：<br><code>curl -L -o /etc/mihomo/config.yaml "您的机场订阅链接"</code><br>编写 systemd 服务文件 <code>/etc/systemd/system/mihomo.service</code> 实现开机自启与崩溃自动拉起。`
      },
      {
        title: '三、配置环境变量与终端一键代理脚本',
        content: `在 <code>~/.bashrc</code> 中添加快捷别名函数：<br><code>alias setproxy="export http_proxy=http://127.0.0.1:7890 https_proxy=http://127.0.0.1:7890"</code><br><code>alias unsetproxy="unset http_proxy https_proxy"</code><br>在需要代理的终端窗口输入 <code>setproxy</code>，即可让 curl 和 git 畅通无阻。`
      }
    ],
    faq: [
      { q: '如何验证 Linux 终端代理是否已生效？', a: '在终端执行 `curl -i https://ipinfo.io`，查看返回的 IP 是否已经变为机场节点的海外落地 IP。' }
    ]
  },
  {
    slug: 'tun-mode-setup',
    title: 'Clash与Sing-box开启TUN虚拟网卡模式解决非代理软件网络教程 - vpnjichang.wiki',
    h1: 'TUN 虚拟网卡模式全系统流量接管深度教程',
    desc: '深度解析 TUN 模式的底层原理与配置方法。解决游戏、UWP 应用、命令行工具不遵循系统代理设置的顽疾。',
    platform: 'Cross-platform',
    summary: '普通系统代理仅对遵循 HTTP 代理协议的浏览器有效。开启 TUN 虚拟网卡才能实现真正意义上的 100% 全局流量接管。',
    sections: [
      {
        title: '一、系统代理 (System Proxy) 与 TUN 模式的本质区别',
        content: `标准系统代理通过修改 Windows 注册表或 macOS 系统偏好设置中的 HTTP/Socks5 端口起效，很多底层软件、外服网络游戏客户端、Docker 以及部分编程语言网络库会直接忽略该设置而直连公网；TUN 模式则是利用操作系统底层的虚拟网卡（TAP/TUN Device），在网络第三层（IP 层）将所有外发数据包捕获并路由至代理内核，实现零死角接管。`
      },
      {
        title: '二、Windows 下 TUN 模式配置关键步骤',
        content: `在 Clash Verge Rev 中进入“设置”，点击“服务模式”旁的安装按钮。安装成功后重启客户端，勾选 <strong>TUN Mode</strong> 开关。此时打开 Windows 设备管理器，在“网络适配器”中能看到名为 <code>Mihomo TUN</code> 的虚拟网卡即表示配置成功。`
      },
      {
        title: '三、DNS 泄漏与防回环死锁防护',
        content: `开启 TUN 模式后，内核会自动接管系统的 DNS 请求。务必在配置文件中开启 <code>auto-route: true</code> 与 <code>auto-detect-interface: true</code>，防止物理网卡与虚拟网卡之间产生路由回环死锁导致断网。`
      }
    ],
    faq: [
      { q: '开启 TUN 模式后开热点给其他设备也能翻墙吗？', a: '可以！TUN 模式接管了系统 IP 层网络，在 Windows 开启移动热点后，连上热点的手机和 Switch 均可直接免客户端享受加速。' }
    ]
  },
  {
    slug: 'split-tunneling-rules',
    title: '科学上网分流规则自定义教程：实现国内直连海外加速与特定分流 - vpnjichang.wiki',
    h1: '科学上网智能分流规则编写与策略组精通教程',
    desc: '学会看懂与自定义编写 Clash 和 Sing-box 分流规则。让 ChatGPT 走美国、Netflix 走新加坡、国内流量走本地直连。',
    platform: 'Cross-platform',
    summary: '智能分流是现代代理工具最核心的魅力所在。掌握规则语法，彻底摆脱频繁手动切换节点的繁琐操作。',
    sections: [
      {
        title: '一、Clash 规则匹配的三大核心类型',
        content: `1. <strong>DOMAIN-SUFFIX（域名后缀）：</strong>例如 <code>DOMAIN-SUFFIX,openai.com,AI专线</code>，所有以 openai.com 结尾的域名自动分流至 AI 专线分组；<br>2. <strong>GEOIP（地理位置 IP）：</strong>例如 <code>GEOIP,CN,DIRECT</code>，所有目标 IP 属于中国大陆的访问自动直连；<br>3. <strong>MATCH（最终兜底）：</strong>所有未能被上方规则命中的流量统一走该策略。`
      },
      {
        title: '二、打造专属定制策略组 (Proxy Groups)',
        content: `可以在配置文件中新建不同的业务策略组：例如创建一个“流媒体专用”策略组，仅包含香港、台湾、新加坡节点；创建一个“AI工具专用”策略组，仅包含美日原生节点。这样不同软件互不干扰，换节点只需单点调整。`
      }
    ],
    faq: [
      { q: '为什么自定义修改配置文件后客户端无法启动？', a: 'YAML 语法对缩进极其严格，只能使用空格缩进，严禁使用 Tab 制表符。推荐使用 VS Code 打开检查缩进对齐。' }
    ]
  },
  {
    slug: 'clash-fakeip-dns',
    title: 'Clash DNS深度配置指南：Fake-IP模式原理与防DNS泄漏设置 - vpnjichang.wiki',
    h1: 'Clash DNS 深度解析与 Fake-IP 最佳实践指南',
    desc: '搞懂代理软件中的 Fake-IP 与 Redir-Host 模式。消除本地 DNS 污染，提升首次打开海外网页的响应速度。',
    platform: 'Cross-platform',
    summary: 'DNS 解析延迟直接决定了打开网页的第一反应速度。Fake-IP 机制通过巧妙的虚假 IP 映射，实现了毫秒级秒开海外网站。',
    sections: [
      {
        title: '一、什么是 Fake-IP？它是如何工作的？',
        content: `传统 Redir-Host 模式下，浏览器访问 google.com 时，电脑必须先等待本地代理内核向远程 DNS 查询并返回真实 IP；而在 <strong>Fake-IP</strong> 模式下，内核在收到查询请求的 0.1 毫秒内，立即返回一个保留的虚假 IP（如 <code>198.18.0.23</code>），并建立域名映射表。浏览器无需等待直接建立连接，由代理服务器在远端执行真实解析，极大缩短了首包等待时间。`
      },
      {
        title: '二、Fake-IP 模式的最佳防污染配置范例',
        content: `在配置文件的 <code>dns</code> 块中，设置 <code>enhanced-mode: fake-ip</code>，配置国内优质 DNS（如 <code>223.5.5.5</code>、<code>119.29.29.29</code>）处理境内域名，配置海外纯净 DoH（如 <code>https://cloudflare-dns.com/dns-query</code>）作为后备 fallback，彻底告别电信联通的运营商 DNS 劫持。`
      }
    ],
    faq: [
      { q: 'Fake-IP 模式下在命令提示符 ping 域名返回 198.18.x.x 是正常的吗？', a: '完全正常！这正是 Fake-IP 的标准行为，数据包发送给 198.18 网段后会被客户端内核自动拦截并转发至远程落地节点。' }
    ]
  },
  {
    slug: 'shadowrocket-rule-install',
    title: 'Shadowrocket小火箭添加第三方分流规则集ACL4SSR教程 - vpnjichang.wiki',
    h1: 'Shadowrocket 小火箭第三方分流规则集配置教程',
    desc: '教您在 iPhone 小火箭中一键导入业界著名的 ACL4SSR 规则集。实现全网主流去广告、流媒体精确分流与国内无感直连。',
    platform: 'iOS',
    summary: '小火箭自带的基础规则较为简略。通过引入社区持续维护的 ACL4SSR 规则库，可以极大提升日常使用的智能化分流体验。',
    sections: [
      {
        title: '一、为什么需要第三方分流规则？',
        content: `随着海外互联网服务复杂化，许多平台（如 Spotify、Disney+、TikTok）采用了成百上千个不同域名的 CDN 分发。普通规则容易漏判导致走国内直连打不开。ACL4SSR 维护了十余万条高精度域名规则列表，自动保持月度同步更新。`
      },
      {
        title: '二、在小火箭中导入 ACL4SSR 规则步骤',
        content: `打开 Shadowrocket，点击底部“配置”选项卡。点击右上角 <strong>+</strong> 号，粘贴公开的 ACL4SSR 规则文件 URL（推荐选择 <code>ACL4SSR_Online_Full_Mini.conf</code> 极简去广告版）。下载完成后，点击该配置并选择“使用配置”。`
      }
    ],
    faq: [
      { q: '规则文件越多手机会越卡吗？', a: '小火箭底层采用高效的 Trie 字典树算法进行域名匹配，即使加载数万条规则，匹配耗时也在微秒级别，对手机流畅度毫无影响。' }
    ]
  },
  {
    slug: 'surge-ios-mac-setup',
    title: '顶级网络工具Surge for iOS与Mac从入门到精通配置指南 - vpnjichang.wiki',
    h1: 'Surge 顶级网络调试与分流利器全指南',
    desc: '专为高阶玩家打造的 Surge 权威教程。涵盖规则语法、MITM 抓包解密、脚本自动化处理与设备间联动。',
    platform: 'Apple',
    summary: 'Surge 被公认为苹果生态最强悍的专业网络工具。虽然价格偏高，但其稳定性和功能深度至今无出其右。',
    sections: [
      {
        title: '一、Surge 的核心架构与定位',
        content: `Surge 不仅仅是一个代理客户端，更是一套工业级的网络捕获、重定向与性能诊断套件。其核心引擎拥有极致的代码执行效率，支持跨设备同步策略、实时网络仪表盘以及精确到毫秒级的网络握手时延监控。`
      },
      {
        title: '二、导入外部节点与模块化配置 (Modules)',
        content: `Surge 采用现代化的模块（Module）系统。用户只需导入基础机场节点，去广告、特定流媒体解锁或重写规则均可以通过单独启用模块的方式热插拔生效，免去了每次全量修改配置文件的痛点。`
      }
    ],
    faq: [
      { q: 'Surge 适合刚入门的小白用户吗？', a: '对于只需简单科学上网的新手，Shadowrocket 或 Loon 更加友好亲民；Surge 更适合对网络调试、脚本开发有极高要求的专业用户。' }
    ]
  },
  {
    slug: 'loon-client-guide',
    title: 'iOS优质轻量客户端Loon节点导入与插件配置全面上手教程 - vpnjichang.wiki',
    h1: 'Loon 客户端从入门到进阶实战使用指南',
    desc: 'Loon 以现代美观的 UI 和对 JavaScript 插件脚本的优秀支持备受青睐。本教程手把手带您体验 Loon 的优雅出海体验。',
    platform: 'iOS',
    summary: '如果觉得小火箭界面陈旧，Surge 又过于昂贵，那么美观、强劲且价格亲民的 Loon 就是 iOS 平台的最优折中之选。',
    sections: [
      {
        title: '一、Loon 的优势与界面特色',
        content: `Loon 完美遵循 iOS 现代设计语言，拥有精致的节点延迟仪表盘、直观的可视化策略组管理面板，以及对社区海量插件（Plugin）生态的无缝兼容。`
      },
      {
        title: '二、订阅导入与策略组调整',
        content: `在 Loon 底部选择“配置 -> 订阅”，点击右上角添加您的机场订阅 URL。进入“策略组”界面，您可以直观地用手指长按拖拽节点优先级，或设置自动优选延迟最低节点的测速策略。`
      }
    ],
    faq: [
      { q: 'Loon 支持一键导入 Clash 订阅吗？', a: '支持！Loon 内置了强大的订阅解析器，可以直接输入标准 Clash、V2Ray 或 Shadowsocks 订阅并自动转换为原生节点。' }
    ]
  },
  {
    slug: 'sing-box-client-guide',
    title: '新一代通用代理内核Sing-box全平台客户端安装配置教程 - vpnjichang.wiki',
    h1: 'Sing-box 通用代理平台全平台配置教程',
    desc: '全面介绍由 SagerNet 团队打造的下一代网络核心 Sing-box。在 Windows、Android、macOS 及 iOS 上的安装与使用教学。',
    platform: 'Cross-platform',
    summary: 'Sing-box 以极致的性能、模块化内核设计以及对未来新协议的原生支持，正在成为代理技术圈的新标杆。',
    sections: [
      {
        title: '一、Sing-box 的划时代技术特征',
        content: `Sing-box 彻底摒弃了历史包袱，采用纯 Go 语言从零实现。内存占用比原版 Clash 降低 40% 以上，原生支持 VLESS Reality、Hysteria 2、TUIC v5、ShadowTLS 等全部最新抗封锁协议，并拥有独创的二进制编译规则集。`
      },
      {
        title: '二、图形化客户端 (GUI) 的安装与配置',
        content: `针对普通用户，官方提供了多平台的图形客户端。在 Android 和 iOS 上搜索 Sing-box 即可直接安装；下载后打开“Profiles”，粘贴机场提供的通用订阅链接，点击更新后在首页一键开启连接。`
      }
    ],
    faq: [
      { q: 'Sing-box 与 Clash Meta 可以共存吗？', a: '完全可以！它们是两个独立的软件，在不同端口运行，您可以同时安装按需切换使用。' }
    ]
  },
  {
    slug: 'nekobox-windows-android',
    title: 'NekoBox for Windows与Android基于Sing-box的高效客户端教程 - vpnjichang.wiki',
    h1: 'NekoBox 高效客户端安装与配置实用教程',
    desc: 'NekoBox (猫盒) 是备受推崇的第三方开源客户端，完美兼顾 Sing-box 与 Xray 核心。本文详解其强大功能。',
    platform: 'Windows/Android',
    summary: '兼具极速内核与高自由度界面，支持全协议自由测试与丰富自定义路由。',
    sections: [
      {
        title: '一、NekoBox 的核心优势',
        content: `NekoBox 将 Sing-box 的强悍底层封装成了极其直观易用的原生桌面与移动端界面。支持单节点独立参数调优、批量延迟测速、路由链式转发以及极简的一键系统代理。`
      },
      {
        title: '二、从订阅导入到日常使用',
        content: `在“配置”菜单中选择“从剪贴板添加配置/分组”，粘贴机场订阅。点击右上角闪电图标进行 TCP/URL 批量测速，双击延迟最低的节点即可激活连接。`
      }
    ],
    faq: [
      { q: 'NekoBox 支持一键测真实 YouTube 速率吗？', a: '支持！在节点列表右键选择“真实连接测速 (Speedtest)”，软件会建立真实 HTTP 链接测量下行峰值带宽。' }
    ]
  },
  {
    slug: 'subconverter-local',
    title: '隐私保护：本地搭建Subconverter订阅转换工具避免泄露教程 - vpnjichang.wiki',
    h1: '本地自建 Subconverter 订阅转换安全防泄漏教程',
    desc: '网上公开的订阅转换网站存在劫持节点与盗取流量的巨大风险。教您在本地 3 分钟运行 Subconverter 彻底守护订阅安全。',
    platform: 'Security',
    summary: '将机场订阅发给不知名的公共转换平台，相当于把账号密码双手奉送。本地搭建是资深用户的隐私标配。',
    sections: [
      {
        title: '一、为什么严禁使用公共免登录订阅转换网站？',
        content: `公共订阅转换站的服务端可以无条件截获你提交的完整订阅链接。不良站长可以偷偷提取你的专线节点卖给他人共享，甚至在你的分流规则中植入恶意跳转劫持流量。`
      },
      {
        title: '二、在本地通过命令行或 Docker 一键启动',
        content: `在电脑端下载 <code>subconverter</code> 官方预编译包解压后双击运行，或运行官方 Docker 镜像：<br><code>docker run -d -p 25500:25500 tindy2013/subconverter:latest</code><br>在浏览器打开 <code>http://127.0.0.1:25500</code>，所有转换过程均在你的本地内存中完成，无任何外部数据泄露。`
      }
    ],
    faq: [
      { q: '自建转换后的订阅链接可以在手机上使用吗？', a: '如果手机和电脑在同一局域网 WiFi 下，手机填写电脑的内网 IP 地址即可直接拉取。' }
    ]
  },
  {
    slug: 'us-apple-id-registration',
    title: '2026无需信用卡注册美区Apple ID苹果账号全流程保姆级教程 - vpnjichang.wiki',
    h1: '2026 最新免信用卡注册美区 Apple ID 保姆级教程',
    desc: '手把手教您如何用国内邮箱直接注册正规美区苹果账号，无需绑定国外信用卡，畅快下载小火箭与各类海外 App。',
    platform: 'Account',
    summary: '购买共享美区账号极易遇到锁机勒索风险。自己动手注册一个终身独享的美区账号才是唯一安全之选。',
    sections: [
      {
        title: '一、注册前准备工作',
        content: `准备一个从未注册过 Apple 账号的全新邮箱（推荐 Outlook 或 Gmail）；电脑打开 Chrome 隐身窗口访问苹果官方账号注册入口 <code>appleid.apple.com</code>。`
      },
      {
        title: '二、国家地区选择与地址生成',
        content: `国家和地区选择<strong>美国</strong>。付款方式选择 <strong>None（无）</strong>。账单地址在网上的“美国免税州地址生成器”中生成一个特拉华州 (Delaware) 或俄勒冈州 (Oregon) 的真实街道与邮编。`
      },
      {
        title: '三、首次在 iPhone 登录与 App Store 激活',
        content: `在手机 App Store 登录新账号，搜索任意免费应用（如 YouTube），点击“获取”。系统会弹出“检查”提示，勾选同意条款并确认免税州地址，即可成功激活账号。`
      }
    ],
    faq: [
      { q: '注册必须使用海外手机号吗？', a: '不需要！目前注册阶段完全可以使用中国大陆 +86 手机号接收短信验证码。' }
    ]
  },
  {
    slug: 'apple-gift-card-purchase',
    title: '如何在支付宝安全购买美区App Store礼品卡充值下载小火箭教程 - vpnjichang.wiki',
    h1: '支付宝购买美区 App Store 礼品卡充值全指南',
    desc: '告别淘宝黑卡封号风险。直接在支付宝内置官方渠道购买正规美区 Apple 礼品卡，安全秒充下载小火箭。',
    platform: 'Payment',
    summary: '第三方电商平台的超低价礼品卡多为黑灰产盗刷，充值会导致 Apple ID 永久封禁。支付宝官方渠道安全合法有保障。',
    sections: [
      {
        title: '一、在支付宝中切换境外城市定位',
        content: `打开支付宝 App，将左上角的城市定位手动修改为<strong>旧金山 (San Francisco)</strong>。`
      },
      {
        title: '二、进入 App Store 礼品卡官方专区',
        content: `在支付宝首页搜索 <strong>出境服务 -> 折扣礼卡</strong>，或点击“大牌礼卡”找到 App Store 官方礼品卡。选择购买金额（如 $3 或 $5），使用人民币直接付款。`
      },
      {
        title: '三、获取兑换码并在 App Store 充值',
        content: `付款后订单详情页会立即生成一组 16 位的卡密代码。复制该代码，打开美区 App Store，点击右上角头像，点击 <strong>Redeem Gift Card or Code（兑换充值卡或代码）</strong>，粘贴代码即可充值成功并下载小火箭。`
      }
    ],
    faq: [
      { q: '充值剩余的零钱会过期吗？', a: '永久有效，可留着后续更新或购买其他优质海外付费应用。' }
    ]
  },
  {
    slug: 'chatgpt-register-guide',
    title: '2026 ChatGPT账号注册与海外手机接码防封全流程指南 - vpnjichang.wiki',
    h1: '2026 最新 ChatGPT 官方账号注册保姆级教程',
    desc: '详细讲解如何规避 OpenAI IP 风控，注册官方账号、安全海外接码以及 ChatGPT Plus 订阅避坑技巧。',
    platform: 'AI Service',
    summary: 'OpenAI 拥有严苛的风控体系。本教程指导您从节点选择、浏览器环境搭建到完成验证的完整合规流程。',
    sections: [
      {
        title: '一、纯净网络环境准备',
        content: `连接本站推荐的 <a href="../recommend/ai.html">AI 专线节点</a>（如微风网络或隐形人专属 AI 节点）。打开浏览器隐身模式，访问 <code>chatgpt.com</code>，确保没有出现 Access Denied 报错。`
      },
      {
        title: '二、邮箱填写与密码设置',
        content: `点击 Sign Up，强烈推荐使用 Gmail、Outlook 或 ProtonMail 等国际邮箱直接注册，尽量避免使用国内企业邮箱以防被拒。设置高强度独立密码并完成邮箱点击验证。`
      },
      {
        title: '三、海外接码平台使用技巧',
        content: `若系统要求手机号验证，可以使用专业接码平台（如 SMS-Activate）租用一个一次性美国或英国虚拟手机号接收 6 位验证码，即可瞬间完成账号开通。`
      }
    ],
    faq: [
      { q: '为什么刚注册的账号第二天就被封了？', a: '大概率是因为使用了被上万人共用的机房脏 IP，或者在短时间内频繁跨国切换节点触发了安全风控。' }
    ]
  },
  {
    slug: 'claude-ai-register-guide',
    title: '2026 Anthropic Claude 3.5 Sonnet注册与严苛IP风控避坑指南 - vpnjichang.wiki',
    h1: 'Claude 3.5 Sonnet 账号注册与防封指南',
    desc: 'Anthropic 旗下的 Claude 3.5 Sonnet 代码能力顶尖，但风控也是全网最严。本文为您梳理安全注册核心准则。',
    platform: 'AI Service',
    summary: '很多用户刚完成短信验证就被判定 Suspend。遵守本文的住宅 IP 与浏览器环境原则，大幅提升存活率。',
    sections: [
      {
        title: '一、Claude 的超级风控机制解析',
        content: `Anthropic 会对注册请求的 IP 属性、WebRTC 泄露、操作系统时区、浏览器语言以及打字间隔行为做多维指纹检测。只要检测到数据中心机房 IP，就会直接阻断。`
      },
      {
        title: '二、注册准备工作与指纹伪装',
        content: `1. 选用配备原生住宅 IP 的顶级专线节点；2. 将电脑时区修改为与节点所在城市一致（如美西修改为 Pacific Time）；3. 将浏览器首选语言临时调整为 English。`
      }
    ],
    faq: [
      { q: '可以使用国内信用卡绑定 Claude Pro 吗？', a: '不行。必须使用合规的海外虚拟信用卡或美区 Apple 礼品卡通过 iOS App 内购订阅。' }
    ]
  },
  {
    slug: 'google-account-verify',
    title: '注册Google谷歌账号提示此电话号码无法用于验证终极解决教程 - vpnjichang.wiki',
    h1: 'Google 账号注册“此电话号码无法用于验证”终极解决教程',
    desc: '国内手机号注册 Gmail 频频受阻？教您利用手机自带邮件客户端、切换浏览器语言等 4 种方法百分百破解验证死局。',
    platform: 'Account',
    summary: '“此电话号码无法用于验证”是困扰国内无数网民的经典难题。本文提供经过数十次验证的行之有效方案。',
    sections: [
      {
        title: '一、为什么国内手机号会被拒？',
        content: `Google 系统根据当前的浏览器语言和代理出口判断风险。如果在一个中文界面的浏览器上挂着美国 IP，又输入 +86 手机号，系统会直接将其标记为自动化垃圾注册。`
      },
      {
        title: '二、最有效的破解招数：手机网易邮箱大师 / 苹果系统邮件',
        content: `在手机上打开系统自带的“邮件”App，或下载“网易邮箱大师”，选择“添加邮箱 -> Google”。在弹出的 Web 登录框中点击“创建账号”。由于通过正规移动设备客户端发起的请求风控极低，此时输入 +86 手机号通常能一秒顺利收到验证码！`
      }
    ],
    faq: [
      { q: '注册成功后手机号可以解绑吗？', a: '可以，但建议绑定一个备用救援邮箱以防忘记密码无法找回。' }
    ]
  },
  {
    slug: 'netflix-change-region',
    title: 'Netflix奈飞跨区观看与锁区解决教程：如何通过机场节点自由切换影视库 - vpnjichang.wiki',
    h1: 'Netflix 跨区换区与 4K 流媒体锁区解决全指南',
    desc: '教您如何利用原生流媒体解锁节点在 Netflix 上自由切换美区、港区、日区与韩区，畅享全网独家版权影视大片。',
    platform: 'Streaming',
    summary: '不同国家地区的 Netflix 影片库差异巨大。通过合格的节点实现无感换区，让同一份会员订阅价值翻倍。',
    sections: [
      {
        title: '一、Netflix 的地区版权与 IP 判定机制',
        content: `Netflix 账号本身没有绝对的地区限制，你看到的影片库完全取决于你当前连接节点出口的地理位置与 IP 属性。如果节点是机房广播 IP，Netflix 会进入“软锁区”状态——只能看到自制剧（Netflix Originals），看不到版权剧。`
      },
      {
        title: '二、如何实现完美的 4K 原生解锁',
        content: `选用配备住宅/双 ISP 原生 IP 的专线节点。在客户端选中对应地区（如香港看中文字幕大片、日本看独家新番动漫），刷新网页即可看到全量影片。`
      }
    ],
    faq: [
      { q: '播放时提示“您似乎在使用解锁工具或代理”怎么办？', a: '说明当前节点的出口 IP 被 Netflix 官方列入了黑名单。在客户端切换同地区的备用节点即可立即恢复。' }
    ]
  },
  {
    slug: 'disney-plus-setup',
    title: 'Disney+迪士尼流媒体订阅与节点选择超高清画质播放教程 - vpnjichang.wiki',
    h1: 'Disney+ 订阅、节点匹配与 4K 播放排错指南',
    desc: '从账号注册、节点筛选到解决 Error 73 报错，教您在电视、手机和电脑上畅享漫威、星球大战与国家地理高清影视。',
    platform: 'Streaming',
    summary: 'Disney+ 对代理工具的审查极其严苛。本教程助您快速定位合规节点，杜绝黑屏与报错。',
    sections: [
      {
        title: '一、常见报错 Error 73 / 83 的根源',
        content: `Error 73 表示服务在您当前地区不可用，通常是因为当前节点的出口 IP 被判定为未开通 Disney+ 的国家或机房代理 IP；Error 83 则是设备兼容或网络握手超时。`
      },
      {
        title: '二、推荐选择与优化策略',
        content: `优先连接新加坡或美国专线节点。如果使用 Chrome 浏览器，建议在设置中开启“硬件加速”，以保证杜比视界 (Dolby Vision) 与 4K 超高清的流畅解码。`
      }
    ],
    faq: [
      { q: 'Disney+ 有中文字幕吗？', a: '新加坡、香港与台湾节点几乎全量包含官方繁简中文字幕与国粤语配音。' }
    ]
  },
  {
    slug: 'telegram-setup-login',
    title: 'Telegram下载安装汉化包与解除+86手机号私聊限制教程 - vpnjichang.wiki',
    h1: 'Telegram（电报）下载、汉化与解除 +86 限制全流程',
    desc: 'Telegram 官方客户端安全下载渠道、官方一键中文汉化包安装，以及解决中国大陆手机号无法主动私聊的官方机器人申诉方法。',
    platform: 'Social',
    summary: 'Telegram 是出海交流最重要的通讯工具。警惕李鬼山寨盗版软件，掌握官方安全使用规范。',
    sections: [
      {
        title: '一、坚决从官方渠道下载正版',
        content: `网上大量标榜“纸飞机中文版”的第三方网站暗藏后门木马，会盗取助记词和账号密码。必须前往官方网站 <code>telegram.org</code> 或正规 App Store / Google Play 下载。`
      },
      {
        title: '二、一键安装官方简体中文语言包',
        content: `在 Telegram 搜索框输入 <code>zh_CN</code>，找到官方中文频道，点击置顶链接中的 <code>tg://setlanguage?lang=classic-zh-cn</code>，点击 Change 即可秒级完成全界面汉化。`
      },
      {
        title: '三、使用 @SpamBot 解除 +86 账号无法主动私聊限制',
        content: `由于历史垃圾短信滥用，+86 手机号默认无法主动向陌生人发起私聊。在搜索栏搜索官方机器人 <code>@SpamBot</code>，点击 Start，按照提示依次点击“This is a mistake” -> “Yes” -> “No, I never do that”，通常 10 分钟至几小时内即可彻底解除私聊限制。`
      }
    ],
    faq: [
      { q: '国内手机号接收不到 Telegram 短信验证码怎么办？', a: '请在手机端安装正版 Telegram App 进行登录，或确保客户端开启了系统代理；部分运营商可能拦截短信，可选择接收语音电话验证。' }
    ]
  },
  {
    slug: 'webrtc-leak-prevent',
    title: '浏览器WebRTC与DNS泄漏检测与防御教程：彻底杜绝真实国内IP暴露 - vpnjichang.wiki',
    h1: '浏览器 WebRTC 与 DNS 隐私泄漏检测与防御教程',
    desc: '即使开启了全局代理，你的真实国内 IP 也可能正在通过 WebRTC 接口悄悄出卖你！本文教您如何彻底封堵网络隐私漏洞。',
    platform: 'Security',
    summary: '黑客与高阶风控系统经常利用 WebRTC 的 STUN 协议绕过系统代理直接探测你的真实物理 IP。彻底封堵漏洞只需两步。',
    sections: [
      {
        title: '一、什么是 WebRTC 泄漏？如何在线自测？',
        content: `WebRTC 是浏览器用于音视频实时通信的底层接口。但其特权协议可以直接向外部服务器发送 UDP 探测包，绕过常规代理直接返回你本地网卡的公网真实 IP。访问 <code>browserleaks.com/webrtc</code> 即可测试你的真实 IP 是否裸奔。`
      },
      {
        title: '二、Chrome 与 Edge 浏览器的彻底防御方案',
        content: `在 Chrome 应用商店搜索安装官方开源的 <strong>WebRTC Control</strong> 或 <strong>uBlock Origin</strong> 扩展。在设置中开启“Disable WebRTC”，此时浏览器将彻底禁止任何未经授权的后台 UDP 探测，确保对外展示的始终只有代理节点的安全 IP。`
      }
    ],
    faq: [
      { q: '关闭 WebRTC 会影响日常网页浏览吗？', a: '完全不会。只有在网页端直接进行浏览器视频会议（如 Google Meet）时才会使用，普通网页浏览和视频观看没有任何影响。' }
    ]
  },
  {
    slug: 'chrome-edge-proxy-extension',
    title: '浏览器专属轻量代理：SwitchyOmega扩展配置指南 - vpnjichang.wiki',
    h1: 'ZeroOmega / SwitchyOmega 浏览器扩展分流配置教程',
    desc: '不想开启全局客户端？教您在 Chrome 和 Edge 中使用轻量代理扩展，实现仅特定标签页走代理的高级精准分流。',
    platform: 'Browser',
    summary: '适合轻度办公人群的纯浏览器级代理方案，零系统侵入，按需切换。',
    sections: [
      {
        title: '一、SwitchyOmega 的现代替代品：ZeroOmega',
        content: `由于 Chrome 强制推行 Manifest V3 扩展规范，老牌 SwitchyOmega 已逐渐停更。推荐在应用商店安装由社区积极维护的完全兼容版本 <strong>ZeroOmega</strong>。`
      },
      {
        title: '二、配置本地 Socks5 / HTTP 情景模式',
        content: `在扩展选项中新建一个“代理服务器”情景模式，协议选择 SOCKS5，服务器填入 <code>127.0.0.1</code>，端口填入 <code>7890</code>（与本地运行的客户端端口一致）。保存后在浏览器右上角点击图标，即可随时在“直接连接”与“代理加速”之间无缝切换。`
      }
    ],
    faq: [
      { q: '扩展提示“无法连接到代理服务器”是什么原因？', a: '说明本地的代理客户端（如 Clash）未在后台运行，请确保本地核心已正常启动。' }
    ]
  },
  {
    slug: 'speedtest-nodes-benchmark',
    title: '科学测速指南：如何使用Speedtest与YouTube统计信息客观测试节点真速率 - vpnjichang.wiki',
    h1: '科学上网节点测速方法论与真实带宽压测教程',
    desc: '告别被截图忽悠。教您使用专业 Speedtest 跨国测速节点、iperf3 吞吐测试与 YouTube“详细统计信息”掌握节点真实质量。',
    platform: 'Benchmark',
    summary: '测速截图可以伪造，真实使用体验无法作假。掌握专业的测速方法，看清节点的真实带宽储备。',
    sections: [
      {
        title: '一、为什么客户端测速显示的延迟仅供参考？',
        content: `客户端列表里的绿色几十毫秒（Ping）仅仅代表握手延迟，即使服务器带宽只有 1Mbps，延迟也可能是绿色的。真正决定看视频卡不卡的是<strong>带宽吞吐量 (Throughput) 与晚高峰丢包率 (Packet Loss)</strong>。`
      },
      {
        title: '二、通过 YouTube“详细统计信息”查看真实缓冲速率',
        content: `在电脑端播放一段 4K 60fps 视频，右键点击画面选择<strong>“详细统计信息 (Stats for nerds)”</strong>。查看 <strong>Connection Speed</strong> 指标：如果数值稳定在 <code>60,000 Kbps - 120,000 Kbps</code> 以上，说明该节点带宽极为充裕，全天观看无任何卡顿风险。`
      }
    ],
    faq: [
      { q: '频繁进行大规模 Speedtest 测速会很消耗流量吗？', a: '是的！一次千兆跑满的 Speedtest 测速可能会瞬间消耗 1GB 至 3GB 套餐流量，建议适度测试，避免流量过快耗尽。' }
    ]
  }
];

module.exports = { guides30 };
