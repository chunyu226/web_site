## Context

项目当前为空（无任何源代码），即将从零搭建个人品牌站。Hero section 是首个实现的页面区域，需要在初始化的 Vite + React + TypeScript + Tailwind CSS v4 项目骨架之上构建。

约束回顾：
- 技术栈：React 19 + Vite 7 + TypeScript + Tailwind CSS v4
- 部署：GitHub Pages，base path `/my-website/`
- 性能目标：首屏 < 2s
- 设计风格：科技感，粒子风，亮/暗切换

## Goals / Non-Goals

**Goals:**
- 提供 HeroSection 和 ParticleCanvas 两个组件，组合成全屏 Hero 区域
- 粒子系统逻辑与 React 渲染解耦（纯 TypeScript 函数 + hook 封装）
- Hero 内容区和粒子背景独立响应主题变化（亮/暗）
- 粒子背景尊重 `prefers-reduced-motion` 用户偏好
- Canvas 尺寸自适应窗口 resize 和 devicePixelRatio 变化

**Non-Goals:**
- 不做粒子动画（粒子为静态渲染，无位移、无鼠标交互）
- 不做导航栏
- 不做后端 API
- 不初始化整个 Vite 项目（项目脚手架已有或另行创建）
- 不做 Hero 以外的其他 section

## Decisions

### D1: 双层背景结构 — CSS 渐变底 + Canvas 粒子叠加

**选择**：底层用 Tailwind 渐变背景（`bg-gradient-to-br`），上层用绝对定位的 `<canvas>` 渲染静态粒子节点-连线网络。

**理由**：CSS 渐变提供大面积的色彩氛围（主题色从一角到另一角的过渡），Canvas 在其上叠加科技感粒子细节（节点 + 连线）。两者职责分离：渐变只管颜色，粒子只管图形。CSS 渐变不需要 JS，零性能开销；Canvas 只渲染静态粒子（无 rAF 循环，挂载时绘制一次）。

**备选方案**：纯 Canvas 方案（渐变也在 Canvas 中绘制）虽然统一，但复杂度更高且失去 CSS 主题切换的便利性（Tailwind dark: 前缀可直接切换渐变）。

### D2: 粒子逻辑抽离为 `useParticles` hook

**选择**：粒子系统的生成、连线计算、颜色映射等纯逻辑放在 `src/hooks/useParticles.ts`，组件只负责挂载 canvas 和传入配置。

```typescript
// hook 签名示意
function useParticles(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  options: {
    particleCount: number
    connectionDistance: number
  },
): void
```

颜色通过 CSS 自定义属性（`--particle-node-color`、`--particle-line-color`）在 `draw()` 中通过 `getComputedStyle` 读取，无需作为参数传入。主题变化由 MutationObserver 监听 `<html>` class 变化自动触发重绘。

**理由**：纯函数层可独立测试（给定粒子坐标 → 断言连线判定、颜色映射），React 组件只做生命周期绑定。未来如果在其他区域复用粒子背景，hook 可直接引用。

### D3: 粒子为静态渲染（单次绘制）

**选择**：组件挂载和窗口 resize 时绘制粒子到 Canvas，不使用 `requestAnimationFrame` 循环。

**理由**：out-of-scope 已明确不做动画。静态粒子仍能呈现"科技感节点网络"的视觉效果，同时零 CPU 持续开销。与 `prefers-reduced-motion` 的兼容也变得 trivial（无论如何都是静态的）。

### D4: 主题通过 Tailwind `dark:` + CSS 自定义属性传递粒子颜色

**选择**：Tailwind 用 `dark:` 前缀控制渐变背景切换；Canvas 粒子颜色通过 CSS 自定义属性（`--particle-node-color`、`--particle-line-color`）传递，在 `:root` 和 `.dark` 下分别定义，ParticleCanvas 读取 `getComputedStyle` 取值。

**理由**：避免在 JS 中硬编码颜色值。主题切换时（通常是 document 上 toggle class），Canvas 通过 `MutationObserver` 或重新挂载触发重绘，颜色自然过渡。

### D5: CTA 按钮使用锚点平滑滚动

**选择**：CTA 渲染为 `<a href="#projects">`，依赖 CSS `scroll-behavior: smooth` 实现平滑滚动。

**理由**：纯 HTML/CSS 方案，零 JS，无依赖。如果 `#projects` 锚点不存在，浏览器行为是静默不滚动（无报错）。不需要 SPA 路由参与。

## Risks / Trade-offs

- **[低] Canvas 在高 DPI 屏幕模糊** → 在 `useParticles` 中读取 `window.devicePixelRatio` 并乘以 canvas 宽高，同时设置 `canvas.style.width/height` 保持 CSS 尺寸不变
- **[低] 静态粒子视觉效果不够丰富** → 在粒子密度和连线逻辑上补偿（适当增加节点数、使用不同大小的节点、部分节点使用高透明度营造层次感）
- **[低] Tailwind CSS v4 的 dark 模式配置与 v3 不同** → v4 使用 CSS-first 配置，`dark:` 变体行为可能不同，需在实现时确认项目实际配置
- **[低] resize 重绘频率** → 使用 `ResizeObserver` + debounce 150ms，避免频繁重绘 Canvas
