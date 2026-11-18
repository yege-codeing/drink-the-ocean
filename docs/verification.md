# 验证记录 — 2026-11-18

- `npm run build`：通过，输出 7 个 HTML 页面（含 404）。
- `npm run check`：通过；检查唯一标题、每页一个 H1、description、lang、JSON-LD 可解析、内部路径和资源存在、初始 HTML 无 iframe、无 JS 的官方入口。
- `node --check public/app.js`、`node --check scripts/serve.mjs`：通过。
- 构建配置：未设置域名且打开索引时拒绝构建；使用测试域名验证 canonical/sitemap/生产索引输出，随后恢复默认 noindex 预览。测试域名未保留在构建结果中。
- 浏览器实际打开本地首页，点击 Play 后显示 Playgama 的 Let’s Play；启动、关闭官方开场广告后显示真实游戏画面和操作提示。未进行完整通关或存档验证。
- 影院模式进入和退出：通过。全屏进入和退出：通过。
- 390×844 视口：发现装饰标题裁切，调整后截图复查通过。此项是响应式页面检查，不等同于真机游戏性能测试。
- 截图：`research/home-preview.png`、`research/mobile-preview.png`、`research/game-preview.png`。
- 未测量真实用户 CWV、未验证 Search Console 索引、未部署至 Cloudflare，未配置 CLID 收益归因。

待补充：实际域名、Cloudflare 项目及部署访问方式、运营主体/联系信息。生产环境确认后再打开索引。
