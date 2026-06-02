## Context

Vite 项目中 `index.html` 是入口 HTML 文件，位于项目根目录。`public/` 目录下的文件会被直接复制到构建输出（`dist/`）。本次变更仅操作这两个静态文件，不涉及 React 组件。

## Goals / Non-Goals

**Goals:**
- 正确的中文 lang 属性
- SEO title + meta description
- Open Graph 标签（标题、描述、URL）
- robots.txt 允许爬虫索引
- 确认语义化 HTML 标签层级正确

**Non-Goals:**
- 不做 JSON-LD 结构化数据
- 不做 sitemap.xml
- 不做 Twitter Card（OG 标签已覆盖主流平台）

## Decisions

### D1: meta 标签写在 index.html 而非 JS 注入

**选择**：静态写入 `index.html`，不使用 `react-helmet` 等 JS 方案。

**理由**：Google 爬虫能执行 JS，但百度、搜狗等中文搜索引擎对 JS 渲染支持不稳定。静态 `<meta>` 标签确保所有爬虫都能读取。个人品牌站内容相对静态，不需要运行时动态修改 title。

### D2: Open Graph 使用最小必要标签集

**选择**：`og:title`、`og:description`、`og:url`、`og:type` 四个标签。

**理由**：覆盖微信、QQ、微博、Facebook、LinkedIn、Discord 等主流平台的链接预览。未包含 `og:image` 因为当前无合适的社交分享图（可后续添加）。

## Risks / Trade-offs

- **[低] 后续内容更新需同步更新 meta** → 当个人简介或项目内容变化时，需手动更新 `index.html` 的 title/description。当前内容稳定，风险低。
