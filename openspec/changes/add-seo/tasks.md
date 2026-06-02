## Phase 1: Meta 标签配置

- [x] 1.1 更新 `index.html`：修正 `lang="zh-CN"`，更新 `<title>` 为 SEO 标题，添加 `<meta name="description">`，添加 Open Graph 标签
- [x] 1.2 创建 `public/robots.txt`：允许所有爬虫索引

## Phase 2: 语义化审查

- [x] 2.1 审查全部组件 HTML 标签：确认 `<nav>`、`<main>`、`<section>`、`<article>`、`<h1>`-`<h3>` 使用正确
- [x] 2.2 修正发现的语义问题（如有）

## Phase 3: 验证

- [x] 3.1 验证生产构建包含 robots.txt 和正确的 meta 标签
- [x] 3.2 使用 WebFetch 验证构建产出的 HTML 内容
