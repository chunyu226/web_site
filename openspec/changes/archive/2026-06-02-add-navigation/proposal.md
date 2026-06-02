## Why

当前网站仅有 Hero Section，缺乏全局导航系统。访问者无法快速跳转页面内不同区域（首页、项目、联系我），也无法感知当前所处的页面位置。导航栏是页面可用性的基础设施，需要在 Hero 之后就位，为后续 Section 开发提供锚点骨架。

## What Changes

- 新增顶部固定导航栏组件（sticky top-0），左侧 Logo，右侧水平导航链接
- 新增 Scroll-triggered 毛玻璃效果：页面在顶部时背景透明，滚动后切换为 `backdrop-blur-md` 半透明毛玻璃，过渡动画平滑
- 新增平滑滚动导航：点击导航项触发 `scroll-behavior: smooth` 定位至对应 section
- 新增滚动监听（scroll-spy）：基于 IntersectionObserver 检测当前可见 section，同步高亮对应导航项
- 新增 Framer Motion 入场动画：导航栏 mount 时淡入 + 微偏移浮现
- 新增 Active Indicator：当前活跃导航项底部滑动指示器
- 新增移动端响应式：视口 < 768px 时自动收纳为 hamburger + Overlay 菜单
- 新增依赖：`framer-motion`

## Capabilities

### New Capabilities

- `navigation-bar`: 毛玻璃顶部导航栏，sticky 定位，含 Logo、导航链接、scroll-triggered backdrop-blur、入场动画、Active Indicator、移动端 Overlay 菜单
- `scroll-spy`: 基于 IntersectionObserver 的当前活跃 Section 检测，导航栏读取活跃状态以高亮对应导航项

### Modified Capabilities

（无——现有 spec 不涉及导航系统）

## Impact

- 新增依赖：`framer-motion`（~140KB 安装体积，~35KB gzipped，tree-shake 后实际增量 < 10KB）
- 新增文件：`src/components/navbar/Navbar.tsx`、`src/components/navbar/MobileMenu.tsx`、`src/components/navbar/NavLink.tsx`、`src/components/navbar/ActiveIndicator.tsx`、`src/hooks/useScrollSpy.ts`、`src/hooks/useScrollState.ts`
- 修改文件：`src/App.tsx`（在 HeroSection 上方插入 Navbar）
- 导航栏默认假设页面存在 `#home`、`#projects`、`#contact` 三个锚点 section，若锚点不存在则点击静默无滚动（原生 `<a>` 行为）
- 对现有 Hero Section 影响：CTA 按钮的 `#projects` 锚点与导航栏的"项目"链接指向同一目标，两者协同工作无冲突

## Out of Scope

- 不做搜索功能
- 不做多级/嵌套下拉菜单
- 不做用户登录、注册或鉴权逻辑
