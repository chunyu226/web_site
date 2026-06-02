## ADDED Requirements

### Requirement: HTML lang 属性

`index.html` SHALL 使用 `lang="zh-CN"` 声明页面主要语言为简体中文。

#### Scenario: 浏览器识别语言
- **GIVEN** 用户通过浏览器访问页面
- **WHEN** 浏览器解析 HTML
- **THEN** 页面语言标记为 `zh-CN`，翻译提示和字体选择正确

### Requirement: SEO Title 和 Meta Description

`index.html` SHALL 包含描述性 `<title>` 和 `<meta name="description">` 标签，内容反映个人品牌站的核心信息。

#### Scenario: 搜索引擎展示摘要
- **GIVEN** Google 或其他搜索引擎爬取页面
- **WHEN** 爬虫读取 `<title>` 和 `<meta name="description">`
- **THEN** 搜索结果展示正确的标题和描述摘要

### Requirement: Open Graph 社交标签

`index.html` SHALL 包含 `og:title`、`og:description`、`og:url`、`og:type` 四个 Open Graph 标签，确保社交平台分享时生成预览卡片。

#### Scenario: 微信/QQ 分享预览
- **GIVEN** 用户在微信或 QQ 中分享网站链接
- **WHEN** 平台爬虫抓取页面
- **THEN** 聊天窗口中展示包含标题和描述的链接卡片

### Requirement: robots.txt

站点 SHALL 在根路径部署 `robots.txt`，允许 Googlebot 和所有通用爬虫索引整个站点。

#### Scenario: 搜索引擎正常索引
- **GIVEN** Googlebot 访问站点
- **WHEN** 爬虫读取 `/robots.txt`
- **THEN** 爬虫被允许索引站点所有路径，无 Disallow 规则

### Requirement: 语义化 HTML 标签

站点所有 Section SHALL 使用正确的语义化 HTML 标签：`<nav>` 用于导航，`<main>` 用于主内容，`<section>` 用于各区域，`<article>` 用于独立内容块，`<h1>`-`<h3>` 形成合理标题层级。

#### Scenario: 语义标签审查
- **GIVEN** 站点所有组件已实现
- **WHEN** 审查各组件源码
- **THEN** Navbar 使用 `<nav>`，Hero 使用 `<section>` + `<h1>`，Project cards 使用 `<article>` + `<h3>`，App 使用 `<main>`，标题层级 h1→h2→h3 不跳级
