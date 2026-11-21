---
slug: "ps5-switch-xbox-proxy"
title: "PS5与Nintendo Switch游戏主机通过局域网共享代理联机加速教程 - vpnjichang.wiki"
h1: "PS5 / Switch / Xbox 游戏主机局域网共享加速教程"
desc: "主机玩家必备：无需购买昂贵的游戏加速盒，利用局域网内的 Windows 或 Mac 电脑，一键为 PS5、Switch 和 Xbox 开启低延迟联机与满速下载。"
platform: "Gaming Console"
summary: "主机下载数字版游戏动辄几十 GB 速度极慢？联机 NAT 总是 Strict/Type C？教您利用电脑客户端的局域网共享代理功能轻松化解。"
faq:
  - q: "主机使用代理后电脑必须一直开着吗？"
    a: "是的，因为数据包是通过电脑上的客户端转发出去的。如果不希望电脑常开，推荐使用软路由或电视盒做网关。"
---

## 一、电脑端客户端开启“允许局域网连接”

打开电脑上的 Clash Verge Rev 或 v2rayN，进入“设置”，找到 <strong>Allow LAN（允许局域网连接）</strong> 开关并开启。记住显示的 HTTP 代理端口号（默认为 <code>7890</code> 或 <code>10809</code>）。

## 二、查询电脑在家庭局域网内的内网 IP 地址

在 Windows 电脑上按 Win+R 输入 <code>cmd</code>，执行 <code>ipconfig</code>，找到“IPv4 地址”（通常类似 <code>192.168.1.105</code>）；Mac 电脑在“系统设置 -> 网络 -> 详细信息”中查看 IP 地址。

## 三、主机端网络手动配置代理服务器

在 PS5 或 Switch 上进入“设置 -> 网络 -> 设置互联网连接”，选中当前 WiFi，选择“高级设置”：将“代理服务器”设为<strong>使用</strong>，服务器地址填入电脑的内网 IP，端口填入 <code>7890</code>。保存并测试互联网连接，下载速度即可跑满宽带，NAT 类型升至 Open/Type A。

