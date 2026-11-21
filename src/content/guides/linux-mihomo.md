---
slug: "linux-mihomo"
title: "Linux终端与云服务器安装配置Mihomo命令行代理教程 - vpnjichang.wiki"
h1: "Linux 终端与 VPS 服务器科学上网配置全指南"
desc: "专为开发者和运维人员编写的 Linux 代理指南。在 Ubuntu / Debian / CentOS 上通过 Systemd 托管 Mihomo 内核实现服务级稳定代理。"
platform: "Linux"
summary: "在 Linux 服务器上执行 git clone、拉取 Docker 镜像或调用 OpenAI API 经常遭遇超时。本文详解轻量高效的 Linux 代理配置。"
faq:
  - q: "如何验证 Linux 终端代理是否已生效？"
    a: "在终端执行 `curl -i https://ipinfo.io`，查看返回的 IP 是否已经变为机场节点的海外落地 IP。"
---

## 一、下载预编译二进制文件

访问 Mihomo (Clash Meta) 官方开源仓库，根据服务器架构下载对应的 tar.gz 压缩包（如 <code>mihomo-linux-amd64.tar.gz</code>）。解压后将二进制文件重命名为 <code>mihomo</code> 并移动至 <code>/usr/local/bin/</code>，赋予可执行权限：<code>chmod +x /usr/local/bin/mihomo</code>。

## 二、下载订阅配置并配置 Systemd 守护进程

在 <code>/etc/mihomo/</code> 目录下创建 <code>config.yaml</code>，使用 curl 直接拉取机场的订阅配置文件：<br><code>curl -L -o /etc/mihomo/config.yaml "您的机场订阅链接"</code><br>编写 systemd 服务文件 <code>/etc/systemd/system/mihomo.service</code> 实现开机自启与崩溃自动拉起。

## 三、配置环境变量与终端一键代理脚本

在 <code>~/.bashrc</code> 中添加快捷别名函数：<br><code>alias setproxy="export http_proxy=http://127.0.0.1:7890 https_proxy=http://127.0.0.1:7890"</code><br><code>alias unsetproxy="unset http_proxy https_proxy"</code><br>在需要代理的终端窗口输入 <code>setproxy</code>，即可让 curl 和 git 畅通无阻。

