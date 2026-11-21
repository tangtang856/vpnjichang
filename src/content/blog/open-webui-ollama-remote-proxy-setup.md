---
slug: "open-webui-ollama-remote-proxy-setup"
title: "本地部署Open WebUI与Ollama连接境外大模型API的代理中继实战 - vpnjichang.wiki"
h1: "本地 Open WebUI 与 Ollama 连接境外 API 代理中继实战"
desc: "在局域网内搭建私有化大模型前端 Open WebUI 时，如何让 Docker 容器与 Ollama 进程无缝借道宿主机代理，安全高速调用境外大模型？"
category: "AI大模型"
date: "2026-03-09"
summary: "针对企业与个人私有化部署场景，彻底打通 Docker 容器网络与宿主机代理客户端，消除跨网络通信壁垒。"
faq:
  - q: "宿主机开了代理，为什么 host.docker.internal 依然无法连通？"
    a: "请检查 Clash 或 v2rayN 设置中的“Allow LAN”是否勾选，以及 Windows 防火墙是否放行了 7890/10808 等入站端口。"
---

## 一、私有化部署中的典型网络拓扑断层

许多技术团队在本地服务器使用 Docker 部署 Open WebUI，当需要集成 Claude 或 GPT-4o 外部 API 时，容器内程序往往报 `Failed to establish a new connection: [Errno 111] Connection refused`。这是因为 Docker 默认创建的 bridge 网络是独立命名空间，宿主机的系统全局代理无法直接渗透进容器内部。

## 二、Docker 容器优雅接入本地代理的正确姿势

在启动 Open WebUI 容器时，推荐传入环境变量：<br><code>docker run -d -p 3000:8080 -e HTTP_PROXY="http://host.docker.internal:7890" -e HTTPS_PROXY="http://host.docker.internal:7890" ...</code><br>在 Linux 环境下，可使用宿主机在 docker0 网桥上的 IP（通常为 172.17.0.1）作为代理网关，并确保宿主机代理客户端（如 Clash Verge）开启了“允许局域网连接”（Allow LAN）。

## 三、节点稳定性对团队级内部中转平台的影响

当 Open WebUI 作为团队公共服务时，数十位研发人员的高并发并发请求会迅速压垮廉价公网中转节点。推荐采用支持大并发不限速的 <a href="../review/quanqiuyun.html">全球云</a> 或 <a href="../review/breezenet.html">微风网络</a>，配合固定专线节点，保障企业级私有化 AI 平台 7x24 小时高可用。

