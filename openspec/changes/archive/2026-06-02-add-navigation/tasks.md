## Phase 1: 依赖安装与目录结构

- [x] 1.1 安装 `framer-motion` 依赖
- [x] 1.2 创建目录结构：`src/components/navbar/`、`src/hooks/`（如已存在则跳过）

## Phase 2: 基础导航栏（布局 + 毛玻璃 + 暗色模式）

- [x] 2.1 定义 `NavItem` 类型接口和导航配置数组（`src/components/navbar/navConfig.ts`）
- [x] 2.2 创建 `src/hooks/useScrollState.ts`：监听 `scroll` 事件（passive），返回 `isScrolled: boolean`
- [x] 2.3 创建 `Navbar.tsx`：sticky top-0 布局，左侧 Logo，右侧渲染 NavLink 列表，`React.memo` 包裹
- [x] 2.4 实现毛玻璃切换：`isScrolled ? 'backdrop-blur-md bg-white/70 dark:bg-gray-950/70' : 'bg-transparent'`，`transition-all`
- [x] 2.5 创建 `NavLink.tsx`：渲染 `<a>` 标签，`React.memo` 包裹，支持 `isActive` prop 切换样式
- [x] 2.6 验证暗色模式：亮/暗两种状态下毛玻璃背景和文字颜色正确

## Phase 3: Scroll-Spy 活跃检测 + Active Indicator

- [x] 3.1 创建 `src/hooks/useScrollSpy.ts`：IntersectionObserver 监听 section 可见性，返回 `activeSection: string`
- [x] 3.2 将 `useScrollSpy` 集成到 `Navbar`，activeSection 传递给各 NavLink
- [x] 3.3 创建 `ActiveIndicator.tsx`：使用 framer-motion `layoutId` 实现滑动指示器，置于当前活跃导航项底部
- [x] 3.4 验证：滚动页面时 Active Indicator 平滑跟随活跃项切换

## Phase 4: 入场动画

- [x] 4.1 为 `Navbar` 添加 framer-motion 入场动画：`initial={{ y: -10, opacity: 0 }}` → `animate={{ y: 0, opacity: 1 }}`，duration 0.5s

## Phase 5: 移动端 Overlay 菜单

- [x] 5.1 创建 `MobileMenu.tsx`：hamburger 按钮 + `AnimatePresence` + `motion.div` 全屏 Overlay
- [x] 5.2 实现 Overlay 交互：点击导航项关闭菜单、点击遮罩层关闭菜单
- [x] 5.3 在 `Navbar` 中根据 `md` 断点条件渲染 MobileMenu 或桌面端导航链接
- [x] 5.4 验证：375px 视口下 hamburger 显示、菜单展开/关闭动画正确

## Phase 6: 集成与验证

- [x] 6.1 在 `App.tsx` 中集成 `Navbar`，置于 `HeroSection` 上方
- [x] 6.2 验证 60fps 滚动性能：Chrome DevTools Performance 面板录制滚动，确认无 layout thrashing
- [x] 6.3 验证暗色模式：切换亮/暗后导航栏毛玻璃和文字颜色正确
- [x] 6.4 验证移动端：375px 视口下导航栏汉堡菜单正常工作，Overlay 导航流畅
- [x] 6.5 验证 Anchor 协同：导航栏"项目"链接与 Hero CTA 均指向 `#projects`，无冲突
