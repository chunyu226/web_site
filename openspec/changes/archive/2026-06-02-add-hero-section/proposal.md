## Why

个人品牌站目前没有任何页面内容，访问者无法在首屏了解我是谁、我做什么。Hero section 是网站的门面，需要在 3 秒内传达身份（姓名、职业、一句话介绍）并提供行动入口（CTA 按钮跳转项目展示）。

## What Changes

- 新增全屏高度 Hero Section 组件，居中展示姓名、职业、一句话介绍
- 新增 CSS 渐变背景（底层）+ Canvas 粒子背景（叠加层）
- 新增 CTA 按钮，点击后平滑滚动至项目展示区域
- Hero 区域响应亮/暗模式切换，粒子颜色和渐变背景同步过渡
- 新增粒子系统纯逻辑模块（`useParticles` hook），与 React 组件解耦

## Capabilities

### New Capabilities

- `hero-section`: 全屏 Hero 区域，居中展示个人信息与 CTA 按钮，响应亮/暗主题切换
- `particle-background`: Canvas 粒子系统，在 Hero 背景层渲染科技感节点连线效果，响应主题和 reduced-motion 偏好

### Modified Capabilities

（无——项目当前没有已存在的 spec）

## Impact

- 新增依赖：无（Canvas 2D 为浏览器原生 API，CSS 渐变使用 Tailwind 内置工具类）
- 新增文件：`src/components/hero/HeroSection.tsx`、`src/components/hero/ParticleCanvas.tsx`、`src/hooks/useParticles.ts`
- 影响范围：仅新增代码，不影响任何现有功能（项目当前为空）

## Out of Scope

- 不做粒子动画效果（粒子为静态渲染，无位移、无交互）
- 不做导航栏
- 不做后端 API
- 不做页面其他 section（如项目展示区、关于页等）
