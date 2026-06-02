## Why

个人品牌站目前仅有一个 Hero Section，访问者无法看到实际的项目产出。项目展示区是个人品牌站的核心内容 —— 它直观呈现开发者的技术能力和项目经验，也是 Hero CTA 和导航栏"项目"链接的目标锚点。Hero 和导航栏的 `#projects` 锚点早已就位，这个 Section 让它们首次有了实际落点。

## What Changes

- 新增项目展示区 Section（`id="projects"`），位于 Hero Section 正下方
- 采用响应式卡片网格布局，每张卡片包含：项目截图、项目名称、项目简介、GitHub 链接
- 最少展示 4 个项目，项目数据通过配置数组驱动
- 卡片悬浮微交互：轻微上浮（translateY） + 阴影增强 + 边框高亮
- 所有项目截图使用 `loading="lazy"` 懒加载
- 项目图片使用占位占位符（灰色背景 + 项目首字母），在图片加载前展示

## Capabilities

### New Capabilities

- `project-section`: 项目展示区，卡片网格布局，展示最少 4 个项目（截图、名称、简介、GitHub 链接），悬浮微交互，响应式暗色模式，图片懒加载

### Modified Capabilities

（无——Hero CTA 和导航栏的 `#projects` 锚点在现有 spec 中已定义，本变更仅创建锚点目标，不修改任何 spec 级行为）

## Impact

- 新增依赖：无
- 新增文件：`src/components/projects/ProjectSection.tsx`、`src/components/projects/ProjectCard.tsx`、`src/components/projects/projectData.ts`
- 修改文件：`src/App.tsx`（在 HeroSection 下方插入 ProjectSection）
- Hero Section CTA：已有的 `#projects` 锚点现在能实际滚动到目标位置（此前锚点不存在，静默无滚动）
- 导航栏"项目"链接：同样受益，scroll-spy 可检测到新的 `#projects` section
