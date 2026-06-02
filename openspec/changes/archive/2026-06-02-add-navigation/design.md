## Context

项目当前有 Hero Section（`src/components/hero/`）和粒子背景（`src/hooks/useParticles.ts`）。导航栏是第二个主要 UI 组件，需要与现有 Hero 协同：导航栏置于 Hero 上方（sticky），初始透明以不遮挡 Hero 粒子背景，滚动后触发毛玻璃效果。

约束回顾：
- 技术栈：React 19 + TypeScript + Tailwind CSS v4 + Vite
- 现有依赖：无动画库（当前使用纯 CSS transition）
- 性能目标：首屏 < 2s，滚动保持 60fps
- 设计风格：科技感，粒子风，亮/暗切换

## Goals / Non-Goals

**Goals:**
- 顶部固定导航栏（sticky），毛玻璃效果（backdrop-blur），滚动触发切换
- 平滑滚动导航 + 当前 section 高亮（scroll-spy）
- Framer Motion 入场动画 + Active Indicator 滑动指示器
- 移动端 hamburger + Overlay 菜单
- 导航项通过配置数组驱动，无硬编码
- React.memo 优化，滚动零重绘

**Non-Goals:**
- 不做搜索功能
- 不做多级下拉菜单
- 不做用户认证
- 不做路由切换（SPA router）——当前是单页锚点导航

## Decisions

### D1: Framer Motion 入场动画 + Active Indicator

**选择**：引入 `framer-motion` 处理导航栏入场淡入动画和活跃指示器的滑动过渡。

**理由**：CSS transition/animation 无法实现 Active Indicator 从一个导航项平滑滑动到另一个导航项（需要动态计算 `left` 和 `width` 差值）。`framer-motion` 的 `layoutId` 可以在导航项之间自动执行 FLIP 动画，无需手动测量 DOM。入场动画用 `motion.div` 的 `initial/animate` 声明式完成。

**备选方案**：纯 CSS transform + 手动 `getBoundingClientRect` 计算。可行但需要 `useRef` 数组、resize 重算、requestAnimationFrame 协调——代码量更大且易出错。`layoutId` 对此问题有一行代码解决的优势。

### D2: IntersectionObserver 实现 Scroll-Spy

**选择**：使用 `IntersectionObserver`（`threshold: 0.3`）监听各 section 的可见性，用 `rootMargin: '-80px 0px 0px 0px'` 偏移导航栏高度，当 section 进入视口时标记为活跃。

**理由**：相比 `scroll` 事件 + `getBoundingClientRect` 的方案，IntersectionObserver 是浏览器原生异步 API，不在主线程执行回调，天然 60fps 无节流需求。多个 section 可注册到同一个 observer 实例，内存高效。

**备选方案**：`scroll` 事件 + throttle。每次滚动都触发 JS 计算，即使 throttle 到 16ms 仍有主线程开销。IntersectionObserver 在此场景完全替代。

### D3: Scroll 事件实现玻璃效果（轻量节流）

**选择**：使用 `scroll` 事件监听器（`passive: true`），`scrollY > 0` 时添加 `backdrop-blur-md` 和半透明背景，`scrollY === 0` 时移除。

**理由**：玻璃效果只有二元状态（透明 vs 毛玻璃），不需要测量任何 DOM 元素。`scroll` 事件直接读 `window.scrollY` 零开销。`passive: true` 确保不阻塞滚动。这比 IntersectionObserver 更直接——observer 需要一个哨兵元素（`<div style="height:1px">`），增加 DOM 开销且语义不干净。

### D4: 导航项配置化

**选择**：导航项定义为对象数组，通过 props 传入 Navbar：

```typescript
interface NavItem {
  label: string
  href: string
}
```

Navbar 接收 `items: NavItem[]`，渲染为导航链接列表。Active Indicator、scroll-spy section IDs、mobile menu items 全部由此配置派生。

**理由**：满足用户"严禁硬编码"的要求。未来新增或修改导航项只需改一处配置，不触及组件代码。

### D5: React.memo 策略

**选择**：`Navbar` 包裹 `React.memo`，子组件（`NavLink`、`ActiveIndicator`）也包裹 `React.memo`。scroll-spy 的活跃状态通过 `useScrollSpy` hook 返回，仅在值变化时触发 memo 组件的重渲染。

**理由**：滚动过程中 scroll 事件触发频繁，若每次 scrollY 变化都引起 Navbar 重渲染，会连锁触发粒子 Canvas 的所有兄弟组件重渲染。memo 隔离了状态变化范围：只有 `activeSection` 变化时才重渲染导航链接高亮和指示器位置，滚动无关的组件（Logo、MobileMenu toggle）不受影响。

### D6: 移动端 Overlay 菜单

**选择**：视口 < 768px 时，导航链接隐藏，显示 hamburger 按钮。点击 hamburger 后，使用 `AnimatePresence` + `motion.div` 渲染全屏 Overlay 菜单，背景半透明毛玻璃，导航项垂直排列。点击导航项或遮罩层关闭菜单。

**理由**：Overlay 模式在移动端是标准 UX 模式。`AnimatePresence` 处理 mount/unmount 动画，`motion.div` 提供 slide-in 效果。比 CSS-only 的 `max-height` 过渡更流畅（后者需要硬编码高度）。

## Risks / Trade-offs

- **[中] framer-motion 增加包体积** → tree-shaking 后 `motion` + `AnimatePresence` + `layoutId` 约 30KB gzipped。在首次导航栏渲染时才加载（动态 import 可选，但当前非必须）。首屏 < 2s 目标不变。
- **[低] IntersectionObserver 兼容性** → 覆盖所有现代浏览器（Chrome 51+, Firefox 55+, Safari 12.1+）。无需 polyfill。
- **[低] backdrop-blur 在旧浏览器回退** → 不支持 `backdrop-filter` 的浏览器自动退化为不透明半透明背景。Tailwind 的 `fallback:` 或 CSS `@supports` 可确保基本可用性。
- **[低] 滚动性能** → `passive: true` scroll 事件 + memo + IntersectionObserver 的组合确保滚动路径上无 layout 触发（no forced reflow）。
