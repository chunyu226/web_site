## Context

项目当前有 Navbar（sticky 导航栏）、HeroSection（全屏粒子背景 Hero）。导航栏的"项目"链接和 Hero CTA 按钮均指向 `#projects` 锚点，但该锚点目标尚未创建。本变更为此锚点创建实际落点。

约束回顾：
- 技术栈：React 19 + TypeScript + Tailwind CSS v4 + framer-motion
- 现有组件模式：配置驱动（navConfig.ts）、React.memo、hook 逻辑分离
- 性能目标：首屏 < 2s，图片 lazy loading
- 设计风格：科技感，粒子风，亮/暗切换

## Goals / Non-Goals

**Goals:**
- 项目展示区响应式卡片网格（1 列 / 2 列 / 3 列自适应）
- 每张卡片：项目截图 + 项目名称 + 项目简介 + GitHub 外链
- 最少 4 个项目，数据由配置数组驱动
- 悬浮微交互：上浮 + 阴影 + 边框高亮（纯 CSS transition，不引入额外 JS）
- 所有项目图片 `loading="lazy"` + 加载前占位符
- Section 带 `id="projects"` 和 `scroll-margin-top`（避免被 sticky 导航栏遮挡）

**Non-Goals:**
- 不做项目详情页
- 不做搜索/筛选功能
- 不做分页或无限滚动

## Decisions

### D1: CSS transition 实现悬浮微交互（不引入 framer-motion 额外复杂度）

**选择**：卡片悬浮效果使用 Tailwind `transition-all duration-300` + `hover:scale-[1.02]` + `hover:shadow-xl` + `hover:border-sky-500/50`。

**理由**：悬浮效果是简单的属性过渡（transform、shadow、border-color），CSS transition 完全胜任。无需 framer-motion 的 `whileHover`（虽然项目已安装 fm，但这些简单效果用 CSS 更轻量，不触发 React 重渲染）。此决策与 Navbar 使用 fm 不矛盾——Navbar 需要 `layoutId` 实现 Active Indicator 滑动，那个 CSS 无法做到。卡片悬浮 CSS 可以做到，所以用 CSS。

**备选方案**：framer-motion `whileHover`。效果一致但每次 hover 触发组件重渲染（fm 内部 `requestAnimationFrame`），对网格中 4-8 张卡片不必要。

### D2: 图片加载占位符使用纯 CSS 渐变骨架屏

**选择**：每张卡片的图片区域在 `<img>` 加载完成前显示灰色渐变骨架屏（`bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 animate-pulse`），图片 `onLoad` 后隐藏骨架屏。

**理由**：骨架屏消除 CLS（Cumulative Layout Shift）——图片区域在加载前后保持相同尺寸。不使用额外依赖（如 react-lazy-load-image-component）。`animate-pulse` 是 Tailwind 内置动画，零 JS。

### D3: 项目数据配置化

**选择**：项目数据定义为 `Project[]` 数组，每项包含：`name`、`description`、`image`、`githubUrl`。图片路径使用 Vite 的 `import.meta.env.BASE_URL` 拼接，适配 GitHub Pages base path。

```typescript
interface Project {
  name: string
  description: string
  image: string
  githubUrl: string
}
```

**理由**：遵循项目约定——Navbar 已有 `navConfig.ts` 配置化先例。组件只负责渲染，数据与 UI 分离。

### D4: 响应式网格使用 CSS Grid

**选择**：`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`。

**理由**：CSS Grid 在此场景优于 Flexbox——等宽列 + 固定间距 + 自动换行，无需计算每行项目数。Tailwind 内置 grid 类直接覆盖三个断点。

## Risks / Trade-offs

- **[低] 项目截图文件体积** → 建议使用 WebP 格式 + 缩略图尺寸（< 100KB/张）。图片 `loading="lazy"` 确保不阻塞首屏渲染。
- **[低] GitHub 外链安全** → 所有 GitHub 链接使用 `target="_blank" rel="noopener noreferrer"` 防止 tab-napping 攻击。
- **[低] CLS（布局偏移）** → 图片区域固定宽高比（`aspect-ratio: 16/9`），即使图片未加载也占据正确空间。
