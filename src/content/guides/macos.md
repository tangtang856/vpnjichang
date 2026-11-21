---
slug: "macos"
title: "macOS苹果电脑Clash Verge Rev与Surge配置教程 · 翻墙安装教程 - vpnjichang.wiki"
h1: "macOS 苹果电脑客户端配置与节点导入全流程教程"
desc: "适配 M1/M2/M3/M4 系列 Apple Silicon 及 Intel 芯片的 Mac 科学上网教程。详细介绍 Clash Verge Rev 与 Surge for Mac 配置及终端代理技巧。"
platform: "macOS"
summary: "针对 macOS 系统的精致 UI 与专业开发环境需求，详解如何通过 Clash Verge Rev 开启系统级网络代理与配置 TUN 模式。"
faq:
  - q: "如何在 Mac 菜单栏快速切换节点？"
    a: "Clash Verge 会常驻在 macOS 右上角状态栏，点击图标即可在下拉菜单中快速切换节点或分流模式。"
---

## 一、macOS 客户端版本选择与芯片适配

macOS 用户主力推荐 <strong>Clash Verge Rev</strong>，不仅开源免费且完美原生适配 Apple Silicon (ARM64) 与 Intel (x64) 芯片。前往 Release 页面，M1/M2/M3/M4 系列芯片电脑请下载文件名带有 <code>_aarch64.dmg</code> 的版本，Intel 处理器下载 <code>_x64.dmg</code>。

## 二、安装与解除“应用已损坏”安全提示

打开 dmg 文件将图标拖入 Applications 文件夹。若首次打开提示“已损坏，无法打开”，是因为 macOS Gatekeeper 对未签名开源软件的安全机制。打开终端（Terminal）粘贴以下命令并回车输入密码即可解决：<br><code>sudo xattr -rd com.apple.quarantine /Applications/Clash\ Verge.app</code>

## 三、订阅导入与 TUN 模式深度配置

在 Profiles 界面粘贴订阅链接下载并激活。在设置中开启“系统代理”。对于开发者而言，Terminal 终端命令行（如 <code>brew</code>、<code>git clone</code>、<code>npm install</code>）默认不走系统代理，此时在 Clash Verge 设置中安装 Service Mode 并开启 <strong>TUN 模式</strong>，即可实现整机所有终端进程全自动高速加速。

