---
slug: "openwrt-clash"
title: "OpenWrt软路由安装配置OpenClash与HomeProxy实现全家透明代理教程 - vpnjichang.wiki"
h1: "OpenWrt 软路由透明代理全流程实战教程"
desc: "手把手教您在 OpenWrt 软路由上安装配置 OpenClash 或 HomeProxy。实现全屋手机、电视盒子、游戏主机免客户端一键自动科学上网。"
platform: "Router"
summary: "软路由透明代理是家庭多设备出海的终极方案。无需在每台手机电脑上配置客户端，全屋所有设备连上 WiFi 自动享受无感加速。"
faq:
  - q: "软路由开启透明代理后电视 Netflix 提示代理怎么办？"
    a: "在 OpenClash 的规则策略中，为流媒体分组单独绑定具备原生家庭宽带 IP 的香港或新加坡专线节点。"
---

## 一、OpenClash 与 HomeProxy 的选择

OpenClash 是 OpenWrt 生态最成熟的插件，支持复杂的规则分流与图形化控制台；HomeProxy 则是基于 Sing-box 开发的新一代轻量插件，内存占用极小，性能吞吐强悍。对于日常家庭宽带，两者均可完美胜任。

## 二、安装内核与导入机场订阅

进入 OpenWrt 后台“服务 -> OpenClash”，在“版本更新”中下载对应架构（x86_64、aarch64）的 Meta 内核。进入“配置文件订阅”，粘贴机场的 Clash 订阅链接，勾选“自动更新”并保存应用配置。

## 三、运行模式与 DNS 转发防泄漏设置

运行模式推荐选择 <strong>Fake-IP (TUN)</strong> 混合模式。勾选“本地 DNS 劫持”，防止局域网设备发起未经代理的明文 DNS 查询造成隐私泄露。保存并启动 OpenClash，主界面显示“运行中”即表示全屋透明代理生效。

