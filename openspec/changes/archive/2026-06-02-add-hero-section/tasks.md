## Phase 1: 项目初始化

- [x] 1.1 使用 Vite 7 初始化 React + TypeScript 项目（`npm create vite@latest`）
- [x] 1.2 安装并配置 Tailwind CSS v4（按 v4 CSS-first 方式配置 `@tailwindcss/vite` 插件）
- [x] 1.3 配置 `vite.config.ts`：设置 `base: '/my-website/'`
- [x] 1.4 配置暗色模式：在全局 CSS 中定义 `:root` 和 `.dark` 下的主题变量与渐变
- [x] 1.5 创建目录结构：`src/components/hero/`、`src/hooks/`

## Phase 2: HeroSection 布局与内容

- [x] 2.1 创建 `HeroSection.tsx`：全屏高度容器（`min-h-screen` + `100dvh`），垂直水平居中布局
- [x] 2.2 实现内容区：姓名（`h1`）、职业标签（`p`）、一句话介绍（`p`），使用 Tailwind 响应式字号
- [x] 2.3 实现 CTA 按钮：`<a href="#projects">`，`scroll-behavior: smooth`，`focus-visible:ring-2` 焦点样式
- [x] 2.4 添加 CSS 渐变背景：亮色和暗色两套渐变，使用 Tailwind `dark:` 变体或 CSS 自定义属性
- [x] 2.5 验证内容在 375px / 768px / 1440px 视口下居中且不溢出

## Phase 3: Canvas 粒子背景

- [x] 3.1 创建 `src/hooks/useParticles.ts`：实现粒子位置生成、距离计算连线判定、颜色读取函数
- [x] 3.2 在全局 CSS 中定义粒子颜色 CSS 自定义属性（`--particle-node-color`、`--particle-line-color`），亮暗两套值
- [x] 3.3 创建 `ParticleCanvas.tsx`：挂载 Canvas，调用 `useParticles` 执行单次绘制
- [x] 3.4 实现高 DPI 支持：读取 `devicePixelRatio` 缩放 Canvas 内部分辨率
- [x] 3.5 实现 ResizeObserver + 150ms debounce：窗口 resize 或设备旋转时重绘
- [x] 3.6 实现主题切换检测：监听 `document.documentElement` class 变化（MutationObserver 或主题切换回调），触发 Canvas 重绘
- [x] 3.7 添加 `aria-hidden="true"` 和 `role="presentation"` 到 Canvas 元素

## Phase 4: 集成与收尾

- [x] 4.1 在 `App.tsx` 中引入 HeroSection，确保 Hero 是页面第一个渲染的区域
- [x] 4.2 验证暗色模式：切换亮/暗后渐变背景和粒子颜色均正确更新
- [x] 4.3 验证 `prefers-reduced-motion`：确保无动画循环运行
- [x] 4.4 在移动端视口（375px）验证 Safari iOS `dvh` 行为（或用 Chrome DevTools 模拟）
- [x] 4.5 用 Lighthouse 验证首屏性能（目标 < 2s），检查 Canvas 绘制是否影响 LCP
