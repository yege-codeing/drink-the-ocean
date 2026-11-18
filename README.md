# Drink the Ocean

英文静态游戏站，目标 Cloudflare Pages。使用官方详情页公开的 Playgama iframe 地址，不包含其他站点的 CLID，不声称已签约或产生分成。

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

- `origin`：实际 HTTPS 域名，例如 `https://your-domain.tld`，无子路径。
- `indexable`：预览保持 false；正式上线且域名核对后设 true。
- `embedUrl`：当前使用官方公开 export 地址。取得专属 iframe 代码后，将其 src 原样配置，保留自己的 CLID 查询参数。

也支持环境变量 `SITE_URL`、`INDEXABLE=true`、`PLAYGAMA_EMBED_URL`。构建产物写入 `dist/`。未配置域名不输出虚假 canonical；默认页面和响应头均为 noindex。开启索引但缺少域名时构建失败。

## Cloudflare Pages

1. 使用 Git integration 导入仓库，Framework preset 选 None。
2. Build command：`npm run build && npm run check`；Build output directory：`dist`。
3. 配置生产环境 SITE_URL 为完整正式域名，INDEXABLE=true；预览环境保持 INDEXABLE=false，且配置文件 indexable=false。
4. 在 Custom domains 绑定域名。验证 HTTPS、404、canonical、robots、sitemap 和 iframe。
5. 将 pages.dev 和 www 等重复入口按实际主域名配置重定向，预览保持 noindex。
6. Search Console 验证域名后提交 `/sitemap.xml`。

官方文档：https://developers.cloudflare.com/pages/framework-guides/deploy-anything/

此项目尚未建立 Cloudflare 远程项目或完成线上部署。需要站长提供目标域名及项目访问方式；不要把 API token 提交到代码仓库。

## 游戏与验收边界

点击 Play 才创建 iframe。提供全屏、影院模式、重载前确认和官方链接。跨域 iframe load 不代表游戏引擎已就绪，25 秒提示只提供帮助，不将延迟误判为确定失败。运行环境需要允许 Playgama 及其游戏资源。

注册合作伙伴：https://widgets.playgama.com/?gameSlug=drink-the-ocean

嵌入文档：https://wiki.playgama.com/playgama/for-partners/getting-started

上线前补充站点运营主体/联系信息，核对实际使用的第三方政策与广告配置。当前不部署分析或自有广告脚本。攻略基于官方文本，不宣称经过完整游戏通关验证。

竞品研究见 `docs/research/competitors.md`。
