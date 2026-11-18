# Drink the Ocean 竞品研究

调研日期：2026-11-18。研究范围为四站公开首页、可抓取文本和官方玩法/嵌入说明。未获得 Search Console、付费关键词数据或真实用户性能数据；不推断竞品流量、排名、收入或 CWV 分数。文本抓取不等于完整视觉/交互测试。

| 站点 | 观察到的优势 | 局限/注意点 | 本站采用 |
|---|---|---|---|
| https://drinktheoceangame.net/ | 首屏播放入口；操作、升级、FAQ 导航；来源和独立站身份明确 | 攻略和页面链接较多，需控制阅读负担 | 主游戏优先，简短说明串联独立攻略 |
| https://drinktheocean.games/ | 加载失败兜底、重启确认、横屏提醒；攻略入口与游戏目录 | 门户规模大，初期照搬会分散单关键词建设精力 | 失败帮助、重载确认、攻略集群 |
| https://drinktheocean.io/ | 影院/全屏功能；快速操作提示；长文攻略及相关游戏 | 页面出现“15 languages”后实际列出16种的表述不一致；外部评分不能当本站评分 | 影院模式、快捷键卡片；不复制未经核验的评分/人数 |
| https://drinktheocean.app/ | 清晰区分 Mana、Playgama 和 Roblox 的同名游戏；主题聚焦、分步引导 | 首页主推 Mana，玩法不能直接用于本次 Playgama 版本 | 版本说明；明确开发者及平台 |

## 官方核验与接入

- https://playgama.com/game/drink-the-ocean ：开发者 Pinidi Studio；PC/Android/iOS，横屏；喝水→PRESS 换盐→SHOP 升级。详情页公开 `https://playgama.com/export/game/drink-the-ocean` 并说明可用 iframe 嵌入。使用该公开入口；不声称已签订合作或取得收益资格。
- https://wiki.playgama.com/playgama/for-partners/getting-started ：注册并接受条款后生成 CLID；收益归因需要自己的合作伙伴代码。账号注册/条款确认由站长完成。
- https://wiki.playgama.com/playgama/for-partners/import-the-game-catalog ：支持复制 iframe 和获取素材。未复制竞品资源；首屏采用原创装饰 SVG，明确不是游戏截图。
- 官方按键：WASD 移动、鼠标视角、左键喝水、手机按住 DRINK、Space 跳跃、1/2/3 工具、T 回家、E 礼物、P 设置、Tab 释放鼠标。
- 不推断存档跨设备同步、精确升级价格、通关时间、Steam 状态及多人功能。

## 搜索需求与页面分工

关键词是基于意图的候选词，不是有搜索量证明的关键词报告。

| URL | 主意图 | 候选词 |
|---|---|---|
| / | 在线玩 | drink the ocean, drink the ocean game, play drink the ocean online |
| /how-to-play/ | 新手玩法 | how to play drink the ocean, drink the ocean upgrades |
| /controls/ | 操作查询 | drink the ocean controls, drink the ocean mobile |
| /troubleshooting/ | 加载与存档帮助 | drink the ocean not loading, drink the ocean save |
| /about/ | 可信来源和版本 | 品牌/站点信息 |
| /privacy/ | 数据处理透明度 | 隐私说明 |

不批量生产 Steam、APK、unblocked 等缺少独立证据的薄内容页。不复制竞品文章。FAQ 使用可见 HTML；不承诺 FAQ 富结果。结构化数据使用 WebPage/VideoGame 描述事实，不虚构 AggregateRating。

## 技术策略

静态多页 HTML + 原生 CSS/JS，无客户端框架依赖；点击才加载 iframe；固定播放器区域减少位移；资源本地化；唯一 title/description/H1；真实域名 canonical、sitemap；明确 404；移动断点与 reduced-motion。iframe load 仅表示 frame 载入，不能证明跨域游戏内部成功，因此始终提供官方兜底链接。

参考：https://developers.google.com/search/docs/fundamentals/seo-starter-guide

## 上线后的测量

绑定真实域名并启用索引；验证 Search Console 并提交 sitemap；用 URL Inspection 检查代表页；实际测量移动端和桌面 LCP/INP/CLS。记录自然搜索点击、展示、CTR 与 Play 点击；若接入分析，先完善隐私说明。按真实查询迭代内容，不承诺排名。
