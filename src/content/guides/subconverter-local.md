---
slug: "subconverter-local"
title: "隐私保护：本地搭建Subconverter订阅转换工具避免泄露教程 - vpnjichang.wiki"
h1: "本地自建 Subconverter 订阅转换安全防泄漏教程"
desc: "网上公开的订阅转换网站存在劫持节点与盗取流量的巨大风险。教您在本地 3 分钟运行 Subconverter 彻底守护订阅安全。"
platform: "Security"
summary: "将机场订阅发给不知名的公共转换平台，相当于把账号密码双手奉送。本地搭建是资深用户的隐私标配。"
faq:
  - q: "自建转换后的订阅链接可以在手机上使用吗？"
    a: "如果手机和电脑在同一局域网 WiFi 下，手机填写电脑的内网 IP 地址即可直接拉取。"
---

## 一、为什么严禁使用公共免登录订阅转换网站？

公共订阅转换站的服务端可以无条件截获你提交的完整订阅链接。不良站长可以偷偷提取你的专线节点卖给他人共享，甚至在你的分流规则中植入恶意跳转劫持流量。

## 二、在本地通过命令行或 Docker 一键启动

在电脑端下载 <code>subconverter</code> 官方预编译包解压后双击运行，或运行官方 Docker 镜像：<br><code>docker run -d -p 25500:25500 tindy2013/subconverter:latest</code><br>在浏览器打开 <code>http://127.0.0.1:25500</code>，所有转换过程均在你的本地内存中完成，无任何外部数据泄露。

