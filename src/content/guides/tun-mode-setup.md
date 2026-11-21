---
slug: "tun-mode-setup"
title: "Clash与Sing-box开启TUN虚拟网卡模式解决非代理软件网络教程 - vpnjichang.wiki"
h1: "TUN 虚拟网卡模式全系统流量接管深度教程"
desc: "深度解析 TUN 模式的底层原理与配置方法。解决游戏、UWP 应用、命令行工具不遵循系统代理设置的顽疾。"
platform: "Cross-platform"
summary: "普通系统代理仅对遵循 HTTP 代理协议的浏览器有效。开启 TUN 虚拟网卡才能实现真正意义上的 100% 全局流量接管。"
faq:
  - q: "开启 TUN 模式后开热点给其他设备也能翻墙吗？"
    a: "可以！TUN 模式接管了系统 IP 层网络，在 Windows 开启移动热点后，连上热点的手机和 Switch 均可直接免客户端享受加速。"
---

## 一、系统代理 (System Proxy) 与 TUN 模式的本质区别

标准系统代理通过修改 Windows 注册表或 macOS 系统偏好设置中的 HTTP/Socks5 端口起效，很多底层软件、外服网络游戏客户端、Docker 以及部分编程语言网络库会直接忽略该设置而直连公网；TUN 模式则是利用操作系统底层的虚拟网卡（TAP/TUN Device），在网络第三层（IP 层）将所有外发数据包捕获并路由至代理内核，实现零死角接管。

## 二、Windows 下 TUN 模式配置关键步骤

在 Clash Verge Rev 中进入“设置”，点击“服务模式”旁的安装按钮。安装成功后重启客户端，勾选 <strong>TUN Mode</strong> 开关。此时打开 Windows 设备管理器，在“网络适配器”中能看到名为 <code>Mihomo TUN</code> 的虚拟网卡即表示配置成功。

## 三、DNS 泄漏与防回环死锁防护

开启 TUN 模式后，内核会自动接管系统的 DNS 请求。务必在配置文件中开启 <code>auto-route: true</code> 与 <code>auto-detect-interface: true</code>，防止物理网卡与虚拟网卡之间产生路由回环死锁导致断网。

