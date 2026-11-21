---
slug: "split-tunneling-rules"
title: "科学上网分流规则自定义教程：实现国内直连海外加速与特定分流 - vpnjichang.wiki"
h1: "科学上网智能分流规则编写与策略组精通教程"
desc: "学会看懂与自定义编写 Clash 和 Sing-box 分流规则。让 ChatGPT 走美国、Netflix 走新加坡、国内流量走本地直连。"
platform: "Cross-platform"
summary: "智能分流是现代代理工具最核心的魅力所在。掌握规则语法，彻底摆脱频繁手动切换节点的繁琐操作。"
faq:
  - q: "为什么自定义修改配置文件后客户端无法启动？"
    a: "YAML 语法对缩进极其严格，只能使用空格缩进，严禁使用 Tab 制表符。推荐使用 VS Code 打开检查缩进对齐。"
---

## 一、Clash 规则匹配的三大核心类型

1. <strong>DOMAIN-SUFFIX（域名后缀）：</strong>例如 <code>DOMAIN-SUFFIX,openai.com,AI专线</code>，所有以 openai.com 结尾的域名自动分流至 AI 专线分组；<br>2. <strong>GEOIP（地理位置 IP）：</strong>例如 <code>GEOIP,CN,DIRECT</code>，所有目标 IP 属于中国大陆的访问自动直连；<br>3. <strong>MATCH（最终兜底）：</strong>所有未能被上方规则命中的流量统一走该策略。

## 二、打造专属定制策略组 (Proxy Groups)

可以在配置文件中新建不同的业务策略组：例如创建一个“流媒体专用”策略组，仅包含香港、台湾、新加坡节点；创建一个“AI工具专用”策略组，仅包含美日原生节点。这样不同软件互不干扰，换节点只需单点调整。

