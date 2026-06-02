## ADDED Requirements

### Requirement: Section 定位与锚点

Project section SHALL 位于 Hero Section 下方，带有 `id="projects"` 属性作为导航锚点目标，并使用 `scroll-mt-16` 确保锚点滚动后不被 sticky 导航栏遮挡。

#### Scenario: 锚点导航到达
- **GIVEN** 用户点击导航栏"项目"链接或 Hero CTA 按钮
- **WHEN** 浏览器执行平滑滚动
- **THEN** 页面滚动至 Project section 顶部，section 标题不被导航栏遮挡

#### Scenario: 导航栏遮挡补偿
- **GIVEN** 导航栏以 sticky 方式固定在视口顶部（高度 64px）
- **WHEN** 浏览器通过 `#projects` 锚点定位
- **THEN** section 顶部留有足够间距（scroll-margin-top），内容完整可见

### Requirement: 响应式卡片网格布局

Project section SHALL 以 CSS Grid 布局展示项目卡片：移动端（< 768px）1 列，平板（768-1024px）2 列，桌面（>= 1024px）3 列。

#### Scenario: 桌面端 3 列布局
- **GIVEN** 用户使用桌面浏览器（视口宽度 >= 1024px）
- **WHEN** Project section 渲染
- **THEN** 项目卡片以 3 列网格排列，等宽等间距

#### Scenario: 平板端 2 列布局
- **GIVEN** 用户使用平板设备（768px <= 视口宽度 < 1024px）
- **WHEN** Project section 渲染
- **THEN** 项目卡片以 2 列网格排列

#### Scenario: 移动端单列布局
- **GIVEN** 用户使用移动设备（视口宽度 < 768px）
- **WHEN** Project section 渲染
- **THEN** 项目卡片以单列排列，占满屏幕宽度（减去 padding）

### Requirement: 项目卡片内容

每张项目卡片 SHALL 展示项目截图（16:9 宽高比）、项目名称、项目简介（不超过 80 字）、GitHub 外部链接。

#### Scenario: 卡片完整信息展示
- **GIVEN** 项目数据包含 name、description、image、githubUrl
- **WHEN** Project section 渲染
- **THEN** 卡片显示项目截图、名称、简介和 GitHub 链接图标/文字

#### Scenario: GitHub 链接安全性
- **GIVEN** 项目卡片包含 GitHub 外链
- **WHEN** 用户点击 GitHub 链接
- **THEN** 链接在新标签页打开，带有 `rel="noopener noreferrer"` 属性

#### Scenario: 图片加载占位符
- **GIVEN** 项目截图尚未加载完成
- **WHEN** 卡片首次渲染
- **THEN** 图片区域显示骨架屏占位符（灰色渐变），图片加载完成后骨架屏隐藏

### Requirement: 最少 4 个项目

Project section SHALL 展示至少 4 个项目，项目数据通过配置数组定义，组件不硬编码具体项目内容。

#### Scenario: 项目数量满足最低要求
- **GIVEN** 项目配置数组包含 4 个或更多项目
- **WHEN** Project section 渲染
- **THEN** 所有项目以卡片形式展示在网格中

#### Scenario: 配置驱动的数据
- **GIVEN** 项目数据定义在独立配置文件中
- **WHEN** 需要新增或修改项目
- **THEN** 只需修改配置数组，无需改动组件代码

### Requirement: 卡片悬浮微交互

每张项目卡片 SHALL 在鼠标悬浮时触发微交互效果：轻微上浮（scale 1.02）、阴影增强、顶部边框高亮为 sky-500。过渡动画持续时间 300ms。

#### Scenario: 鼠标悬浮卡片
- **GIVEN** 用户在桌面端浏览 Project section
- **WHEN** 用户将鼠标悬浮在任意项目卡片上
- **THEN** 卡片在 300ms 内执行上浮 + 阴影增强 + 边框高亮效果

#### Scenario: 鼠标移出卡片
- **GIVEN** 卡片处于悬浮状态
- **WHEN** 用户将鼠标移出卡片
- **THEN** 卡片在 300ms 内恢复原始状态

#### Scenario: 移动端无悬浮效果
- **GIVEN** 用户使用触屏设备（无 hover 能力）
- **WHEN** 用户点击或触摸卡片
- **THEN** 卡片不触发悬浮动画（`:hover` 在触屏上不应有粘滞效果）

### Requirement: 图片懒加载

所有项目截图 SHALL 使用 `loading="lazy"` 属性进行懒加载，不阻塞首屏渲染。

#### Scenario: 首屏不加载屏幕外图片
- **GIVEN** Project section 位于 Hero 下方（首屏之外或首屏边缘）
- **WHEN** 页面首次加载
- **THEN** 视口外的项目图片延迟加载，首屏 LCP 不受影响

### Requirement: 暗色模式适配

Project section SHALL 在亮色和暗色模式下提供合适的视觉样式：卡片背景、文字颜色、边框颜色、骨架屏颜色均响应主题变化。

#### Scenario: 亮色模式卡片样式
- **GIVEN** 页面处于亮色模式
- **WHEN** Project section 渲染
- **THEN** 卡片背景为白色（`bg-white`），边框为浅灰色，文字为深色

#### Scenario: 暗色模式卡片样式
- **GIVEN** 页面处于暗色模式
- **WHEN** Project section 渲染
- **THEN** 卡片背景为深色（`dark:bg-gray-800`），边框为深灰色，文字为浅色
