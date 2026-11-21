---
slug: "clash-fakeip-dns"
title: "Clash DNS深度配置指南：Fake-IP模式原理与防DNS泄漏设置 - vpnjichang.wiki"
h1: "Clash DNS 深度解析与 Fake-IP 最佳实践指南"
desc: "搞懂代理软件中的 Fake-IP 与 Redir-Host 模式。消除本地 DNS 污染，提升首次打开海外网页的响应速度。"
platform: "Cross-platform"
summary: "DNS 解析延迟直接决定了打开网页的第一反应速度。Fake-IP 机制通过巧妙的虚假 IP 映射，实现了毫秒级秒开海外网站。"
faq:
  - q: "Fake-IP 模式下在命令提示符 ping 域名返回 198.18.x.x 是正常的吗？"
    a: "完全正常！这正是 Fake-IP 的标准行为，数据包发送给 198.18 网段后会被客户端内核自动拦截并转发至远程落地节点。"
---

## 一、什么是 Fake-IP？它是如何工作的？

传统 Redir-Host 模式下，浏览器访问 google.com 时，电脑必须先等待本地代理内核向远程 DNS 查询并返回真实 IP；而在 <strong>Fake-IP</strong> 模式下，内核在收到查询请求的 0.1 毫秒内，立即返回一个保留的虚假 IP（如 <code>198.18.0.23</code>），并建立域名映射表。浏览器无需等待直接建立连接，由代理服务器在远端执行真实解析，极大缩短了首包等待时间。

## 二、Fake-IP 模式的最佳防污染配置范例

在配置文件的 <code>dns</code> 块中，设置 <code>enhanced-mode: fake-ip</code>，配置国内优质 DNS（如 <code>223.5.5.5</code>、<code>119.29.29.29</code>）处理境内域名，配置海外纯净 DoH（如 <code>https://cloudflare-dns.com/dns-query</code>）作为后备 fallback，彻底告别电信联通的运营商 DNS 劫持。

