# navigation-bar Specification

## Purpose
TBD - created by archiving change add-navigation. Update Purpose after archive.
## Requirements
### Requirement: 导航栏固定布局

导航栏 SHALL 使用 `sticky top-0` 固定在视口顶部，左侧展示 Logo/名称，右侧水平排列导航链接。导航栏高度为 64px（`h-16`）。

#### Scenario: 桌面端布局
- **GIVEN** 用户使用桌面浏览器（视口宽度 >= 768px）
- **WHEN** 页面加载完成
- **THEN** 导航栏固定在视口顶部，Logo 在左侧，导航项在右侧水平排列

#### Scenario: 导航栏不遮挡 Hero 内容
- **GIVEN** 页面滚动位置为 0（页面顶部）
- **WHEN** 导航栏渲染在 Hero 上方
- **THEN** 导航栏背景透明，Hero 粒子背景和内容完整可见不受遮挡

### Requirement: 毛玻璃滚动效果

导航栏 SHALL 根据页面滚动位置切换背景样式：`scrollY === 0` 时背景透明，`scrollY > 0` 时显示 `backdrop-blur-md` 毛玻璃效果及半透明背景，切换过程使用 `transition-all` 平滑过渡。

#### Scenario: 页面顶部时透明背景
- **GIVEN** 页面滚动位置为 0
- **WHEN** 导航栏渲染
- **THEN** 导航栏背景透明，无 backdrop-blur 效果

#### Scenario: 向下滚动后触发毛玻璃
- **GIVEN** 页面滚动位置为 0
- **WHEN** 用户向下滚动超过阈值（scrollY > 0）
- **THEN** 导航栏背景切换为半透明毛玻璃（backdrop-blur-md），过渡动画平滑（transition-all）

#### Scenario: 回到顶部后恢复透明
- **GIVEN** 页面已向下滚动且导航栏处于毛玻璃状态
- **WHEN** 用户滚动回页面顶部（scrollY === 0）
- **THEN** 导航栏恢复透明背景，毛玻璃效果移除

### Requirement: 导航项点击平滑滚动

导航栏中的每个导航链接 SHALL 渲染为 `<a href="#section-id">`，点击后浏览器平滑滚动至对应 section。

#### Scenario: 点击导航项跳转
- **GIVEN** 页面中存在对应 `id` 的 section 元素
- **WHEN** 用户点击导航项（如"项目"）
- **THEN** 页面平滑滚动至该 section，URL hash 更新

#### Scenario: 目标 section 不存在时静默处理
- **GIVEN** 页面中不存在对应 `id` 的 section 元素
- **WHEN** 用户点击导航项
- **THEN** 页面不发生滚动，不抛出错误

### Requirement: 入场动画

导航栏 SHALL 在首次挂载时播放淡入 + 微偏移浮现动画（Framer Motion），持续时长不超过 0.5 秒。

#### Scenario: 首次加载入场动画
- **GIVEN** 用户首次打开页面
- **WHEN** 导航栏组件挂载
- **THEN** 导航栏从上方（translateY: -10px, opacity: 0）淡入浮现至最终位置

### Requirement: Active Indicator 动态滑动指示器

当前活跃的导航项底部 SHALL 显示一个滑动指示器，当活跃项变化时指示器平滑滑动至新位置。

#### Scenario: 指示器跟随活跃项
- **GIVEN** 当前活跃导航项为"首页"
- **WHEN** 用户滚动导致活跃项切换为"项目"
- **THEN** 底部指示器从"首页"平滑滑动至"项目"位置

#### Scenario: 首次加载指示器默认位置
- **GIVEN** 页面首次加载
- **WHEN** 导航栏渲染完成
- **THEN** 底部指示器位于第一个导航项（"首页"）下方

### Requirement: 移动端 Overlay 菜单

在视口宽度 < 768px 时，导航栏 SHALL 隐藏水平导航链接，显示汉堡按钮。点击汉堡按钮后展开全屏 Overlay 菜单，导航项垂直排列。点击导航项或半透明遮罩后关闭菜单。

#### Scenario: 移动端汉堡按钮显示
- **GIVEN** 用户使用移动设备（视口宽度 < 768px）
- **WHEN** 页面加载完成
- **THEN** 导航链接隐藏，显示汉堡菜单按钮，Logo 保留在左侧

#### Scenario: 点击汉堡按钮展开菜单
- **GIVEN** 移动端视口，菜单处于关闭状态
- **WHEN** 用户点击汉堡按钮
- **THEN** 全屏 Overlay 菜单展开，导航项垂直排列，附带动画过渡

#### Scenario: 点击导航项后关闭菜单
- **GIVEN** Overlay 菜单已展开
- **WHEN** 用户点击任意导航项
- **THEN** 菜单关闭，页面平滑滚动至对应 section

#### Scenario: 点击遮罩层关闭菜单
- **GIVEN** Overlay 菜单已展开
- **WHEN** 用户点击半透明遮罩背景
- **THEN** 菜单关闭

### Requirement: 导航项配置化

导航栏的导航项 SHALL 通过外部配置数组定义，不在组件内部硬编码。配置数组每项包含 `label`（显示文本）和 `href`（锚点 ID）。

#### Scenario: 配置驱动的导航项渲染
- **GIVEN** 传入 `[{ label: '首页', href: '#home' }, { label: '项目', href: '#projects' }]`
- **WHEN** 导航栏渲染
- **THEN** 导航栏显示"首页"和"项目"两个链接，href 分别为 `#home` 和 `#projects`

### Requirement: 暗色模式适配

导航栏 SHALL 在亮色和暗色模式下提供合适的视觉样式：亮色模式下毛玻璃为白色半透明，暗色模式下为深色半透明。

#### Scenario: 亮色模式样式
- **GIVEN** 页面处于亮色模式
- **WHEN** 导航栏处于毛玻璃状态（scrollY > 0）
- **THEN** 导航栏背景为白色半透明（`bg-white/70`），文字为深色

#### Scenario: 暗色模式样式
- **GIVEN** 页面处于暗色模式（`.dark` class 存在）
- **WHEN** 导航栏处于毛玻璃状态
- **THEN** 导航栏背景为深色半透明（`dark:bg-gray-950/70`），文字为浅色

