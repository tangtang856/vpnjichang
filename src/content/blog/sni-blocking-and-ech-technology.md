---
slug: "sni-blocking-and-ech-technology"
title: "SNI阻断与加密客户端问候ECH：下一代互联网隐私博弈 - vpnjichang.wiki"
h1: "SNI 阻断与 ECH 加密问候：下一代网络隐私博弈"
desc: "为什么访问 HTTPS 网站域名依然会被审查？什么是 Encrypted Client Hello (ECH)？详解未来翻墙技术的演进方向。"
category: "技术科普"
date: "2026-03-06"
summary: "TLS 握手中的明文 SNI 是最后一块隐私短板。ECH 技术的普及将给网络自由带来深远变革。"
faq:
  - q: "目前浏览器支持开启 ECH 吗？"
    a: "最新版 Chrome 和 Firefox 均已在实验性选项中支持 ECH，配合支持 DoH 的代理客户端可率先体验。"
---

## 一、明文 SNI 泄露的致命弱点

在传统的 TLS 1.3 握手时，客户端发送的 Client Hello 消息中包含的目标网站域名（SNI）是未经加密的明文，审查设备据此直接下发 TCP RST 阻断。

## 二、ECH (Encrypted Client Hello) 的前沿破局

ECH 将真实的 SNI 域名通过公钥加密包裹在内层，外层仅展示一个公共的共享域名。随着 Cloudflare 等 CDN 巨头的推广，SNI 审查技术将逐渐走向失效。

