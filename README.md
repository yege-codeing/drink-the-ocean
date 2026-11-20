# Drink the Ocean

英文静态游戏站，正式域名为 `https://drink-the-ocean.site`，通过 Cloudflare Workers Builds 部署。使用官方详情页公开的 Playgama iframe 地址，不包含其他站点的 CLID，不声称已签约或产生分成。

## 本地运行

要求 Node.js 20+，无第三方依赖。

```sh
npm run build
npm run check
npm run dev
```

预览：http://127.0.0.1:4173

## 配置

编辑 `site.config.json`：

- `origin`：站点的正式 HTTPS 域名，无子路径。
- `indexable`：本地与预览的索引默认值，保持 `false`。
- `embedUrl`：当前使用官方公开 export 地址。取得专属 iframe 代码后，将其 src 原样配置，保留自己的 CLID 查询参数。

也支持环境变量 `SITE_URL`、`INDEXABLE`、`PLAYGAMA_EMBED_URL`。显式设置的 `INDEXABLE=true` 或 `INDEXABLE=false` 会覆盖默认行为。构建产物写入 `dist/`；开启索引但缺少域名时构建失败。

## Cloudflare Workers Builds

1. 将 Worker 的生产分支设为 `main`，运行 `npm run build && npm run check`，并部署 `dist/` 中的静态文件。
2. Workers Builds 的 `main` 构建默认开启索引；其他分支和本地构建默认保持 `noindex`。如需覆盖，请在 **Build variables and secrets** 中配置，避免把生产索引变量用于预览。
3. 部署后访问 `https://drink-the-ocean.site/sitemap.xml` 和 `https://drink-the-ocean.site/robots.txt`。站点地图应返回 HTTP 200，且首页不应带 `noindex`。
4. Search Console 验证域名后提交 `/sitemap.xml`。

`sitemap.xml` 由正式构建自动生成，只收录与页面 canonical 一致的可索引 URL。`robots.txt` 会声明站点地图的完整地址。预览构建不输出站点地图，也会清理同一个 `dist/` 里的旧地图。新增可索引页面后重新构建即可更新清单。

官方文档：https://developers.cloudflare.com/workers/ci-cd/builds/configuration/

## 游戏与验收边界

点击 Play 才创建 iframe。提供全屏、影院模式、重载前确认和官方链接。跨域 iframe load 不代表游戏引擎已就绪，25 秒提示只提供帮助，不将延迟误判为确定失败。运行环境需要允许 Playgama 及其游戏资源。

注册合作伙伴：https://widgets.playgama.com/?gameSlug=drink-the-ocean

嵌入文档：https://wiki.playgama.com/playgama/for-partners/getting-started

上线前补充站点运营主体/联系信息，核对实际使用的第三方政策与广告配置。当前不部署分析或自有广告脚本。攻略基于官方文本，不宣称经过完整游戏通关验证。

竞品研究见 `docs/research/competitors.md`。
