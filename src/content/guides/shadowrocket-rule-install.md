---
slug: "shadowrocket-rule-install"
title: "Shadowrocket小火箭添加第三方分流规则集ACL4SSR教程 - vpnjichang.wiki"
h1: "Shadowrocket 小火箭第三方分流规则集配置教程"
desc: "教您在 iPhone 小火箭中一键导入业界著名的 ACL4SSR 规则集。实现全网主流去广告、流媒体精确分流与国内无感直连。"
platform: "iOS"
summary: "小火箭自带的基础规则较为简略。通过引入社区持续维护的 ACL4SSR 规则库，可以极大提升日常使用的智能化分流体验。"
faq:
  - q: "规则文件越多手机会越卡吗？"
    a: "小火箭底层采用高效的 Trie 字典树算法进行域名匹配，即使加载数万条规则，匹配耗时也在微秒级别，对手机流畅度毫无影响。"
---

## 一、为什么需要第三方分流规则？

随着海外互联网服务复杂化，许多平台（如 Spotify、Disney+、TikTok）采用了成百上千个不同域名的 CDN 分发。普通规则容易漏判导致走国内直连打不开。ACL4SSR 维护了十余万条高精度域名规则列表，自动保持月度同步更新。

## 二、在小火箭中导入 ACL4SSR 规则步骤

打开 Shadowrocket，点击底部“配置”选项卡。点击右上角 <strong>+</strong> 号，粘贴公开的 ACL4SSR 规则文件 URL（推荐选择 <code>ACL4SSR_Online_Full_Mini.conf</code> 极简去广告版）。下载完成后，点击该配置并选择“使用配置”。

