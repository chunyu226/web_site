## Why

当前网站缺少 SEO 基础配置：页面 title 为泛化的 "Personal Website"，无 meta description，无 Open Graph 社交分享标签，无 robots.txt。搜索引擎无法正确索引页面内容，社交平台分享时也无法生成预览卡片。这是部署前必须补齐的基础设施。

## What Changes

- 更新 `index.html`：设置中文 lang、SEO title、meta description、Open Graph 标签
- 新增 `public/robots.txt`：允许 Googlebot 和通用爬虫索引整个站点
- 审查并修正语义化 HTML 问题：修正 `lang` 属性，确认所有 Section 使用正确的语义标签

## Capabilities

### New Capabilities

- `seo`: 搜索引擎优化基础配置，包含 meta 标签、Open Graph 社交标签、robots.txt、语义化 HTML 规范

### Modified Capabilities

（无）

## Impact

- 修改文件：`index.html`（meta 标签完善）
- 新增文件：`public/robots.txt`
- 语义审查：现有组件已使用 `<main>`、`<nav>`、`<section>`、`<article>`、`<h1>`-`<h3>` 正确层级，无需修改组件代码
- 对用户体验无感知变化，仅影响搜索引擎和社交平台爬虫

## Out of Scope

（本次变更为基础设施，无明确排除项）
