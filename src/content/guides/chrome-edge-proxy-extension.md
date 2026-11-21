---
slug: "chrome-edge-proxy-extension"
title: "浏览器专属轻量代理：SwitchyOmega扩展配置指南 - vpnjichang.wiki"
h1: "ZeroOmega / SwitchyOmega 浏览器扩展分流配置教程"
desc: "不想开启全局客户端？教您在 Chrome 和 Edge 中使用轻量代理扩展，实现仅特定标签页走代理的高级精准分流。"
platform: "Browser"
summary: "适合轻度办公人群的纯浏览器级代理方案，零系统侵入，按需切换。"
faq:
  - q: "扩展提示“无法连接到代理服务器”是什么原因？"
    a: "说明本地的代理客户端（如 Clash）未在后台运行，请确保本地核心已正常启动。"
---

## 一、SwitchyOmega 的现代替代品：ZeroOmega

由于 Chrome 强制推行 Manifest V3 扩展规范，老牌 SwitchyOmega 已逐渐停更。推荐在应用商店安装由社区积极维护的完全兼容版本 <strong>ZeroOmega</strong>。

## 二、配置本地 Socks5 / HTTP 情景模式

在扩展选项中新建一个“代理服务器”情景模式，协议选择 SOCKS5，服务器填入 <code>127.0.0.1</code>，端口填入 <code>7890</code>（与本地运行的客户端端口一致）。保存后在浏览器右上角点击图标，即可随时在“直接连接”与“代理加速”之间无缝切换。

