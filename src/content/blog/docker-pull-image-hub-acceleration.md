---
slug: "docker-pull-image-hub-acceleration"
title: "Docker镜像国内无法拉取？配置Docker Daemon代理彻底解决超时 - vpnjichang.wiki"
h1: "Docker 镜像拉取超时终极解法：配置 Daemon 代理通道"
desc: "随着各大公共 Docker 镜像加速源相继关闭，开发者如何为本地 Docker 守护进程配置专属代理稳定拉取海外镜像。"
category: "开发提效"
date: "2026-02-21"
summary: "国内镜像源频繁失效的大背景下，直接为 Docker Daemon 配置代理通道才是唯一长久稳定的治本之策。"
faq:
  - q: "Windows Desktop Docker 怎么配置代理？"
    a: "在 Docker Desktop 设置的 Resources -> Proxies 中直接勾选并输入本地代理端口即可。"
---

## 一、为什么终端配置代理后 Docker pull 依然超时？

因为 <code>docker pull</code> 命令是由后台运行的 <code>dockerd</code> 系统守护进程执行的，终端的局部 export 变量无法渗透进系统级服务内部。

## 二、为 systemd dockerd 服务注入代理配置

在 <code>/etc/systemd/system/docker.service.d/http-proxy.conf</code> 中填入：<br><code>[Service]</code><br><code>Environment="HTTP_PROXY=http://127.0.0.1:7890" "HTTPS_PROXY=http://127.0.0.1:7890"</code><br>重载服务 <code>systemctl restart docker</code>，所有官方镜像秒级拉取完毕。

