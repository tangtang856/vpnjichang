---
slug: "ios"
title: "iOS苹果手机小火箭Shadowrocket与Loon配置教程 · 节点导入指南 - vpnjichang.wiki"
h1: "iOS 苹果手机客户端配置与节点导入全流程教程"
desc: "专为 iPhone 和 iPad 用户准备的科学上网指南。详解美区 Apple ID 获取、Shadowrocket（小火箭）安装、扫码添加节点及大陆白名单规则配置。"
platform: "iOS"
summary: "由于国区 App Store 政策限制，iOS 用户需使用海外 Apple ID 下载代理软件。本文手把手教您如何获取小火箭并快速导入节点。"
faq:
  - q: "小火箭如何更新节点列表？"
    a: "在主界面找到您的订阅配置名称，向右滑动点击“更新”，或者按住屏幕下拉，软件会自动从服务器拉取最新的健康节点。"
---

## 一、前置准备：获取海外 Apple ID 并下载软件

iOS 平台最受欢迎的代理工具是 <strong>Shadowrocket（俗称小火箭）</strong>，售价为 $2.99；进阶用户还可选择 Loon 或 Surge。由于中国大陆区 App Store 下架了所有代理软件，您需要准备一个<strong>非国区（通常为美区）Apple ID</strong>。打开 App Store 退出当前账号，登录美区账号搜索“Shadowrocket”，认准开发者为 <code>Shadow Launch Technology</code> 的正版应用。

## 二、一键导入订阅与扫码添加节点

打开手机 Safari 浏览器登录机场后台，点击“一键导入 Shadowrocket”，网页将自动跳转打开小火箭并完成节点解析。如果机场提供订阅二维码，打开小火箭点击左上角<strong>扫描图标</strong>直接扫码即可秒速添加。也可以在首页点击右上角 <strong>+</strong> 号，类型选择 <strong>Subscribe</strong>，在 URL 栏粘贴机场提供的通用订阅链接。

## 三、全局路由与规则分流设置

在小火箭主界面中间找到<strong>“全局路由”</strong>，务必将其设为 <strong>配置 (Config)</strong>。配置模式内置了智能分流规则：访问国内网站自动直连不走节点，不浪费流量且延迟极低；访问被阻断的海外网站才走代理加速。初次点击主开关时，系统会弹出“添加 VPN 配置”授权提示，使用 Face ID / Touch ID 验证确认即可。

