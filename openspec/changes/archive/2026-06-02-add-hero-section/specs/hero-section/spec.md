## ADDED Requirements

### Requirement: Hero 区域全屏展示

Hero section SHALL 占据视口 100% 高度，使用 `min-h-screen` 和 `100dvh` 动态视口单位，确保在移动端和桌面端均填满屏幕。

#### Scenario: 桌面端全屏渲染
- **GIVEN** 用户使用桌面浏览器（视口宽度 >= 1024px）
- **WHEN** 页面加载完成
- **THEN** Hero 区域高度等于视口高度，内容在区域中垂直水平居中

#### Scenario: 移动端全屏渲染
- **GIVEN** 用户使用移动端浏览器（视口宽度 < 768px）
- **WHEN** 页面加载完成
- **THEN** Hero 区域高度等于动态视口高度（`100dvh`），内容不被浏览器地址栏遮挡

#### Scenario: Safari iOS 地址栏展开/收起
- **GIVEN** 用户在 Safari iOS 上浏览页面
- **WHEN** 用户向下滚动导致地址栏收起、或向上滚动导致地址栏展开
- **THEN** Hero 高度自动适配当前可视区域，内容保持居中且不被裁切

### Requirement: 居中展示姓名、职业与一句话介绍

Hero 内容区 SHALL 在垂直和水平方向上居中展示三行信息：姓名（作为 `h1`）、职业标签、一句话个人介绍。

#### Scenario: 基本信息展示
- **GIVEN** Hero section 已渲染
- **WHEN** 页面加载完成
- **THEN** 姓名以 `h1` 标签显示在首行，职业标签紧随其后，一句介绍文字显示在第三行，三行文字均水平居中

#### Scenario: 姓名过长时不溢出
- **GIVEN** 用户姓名长度超过 20 个字符
- **WHEN** 页面在桌面端（视口宽度 1024px）渲染
- **THEN** 姓名字号自适应缩小（`clamp()` 或响应式断点），不触发水平滚动条或文字截断

#### Scenario: 移动端文字排版
- **GIVEN** 用户使用移动设备（视口宽度 375px）
- **WHEN** 页面加载完成
- **THEN** 三行文字字号按移动端断点缩小，保持在视口宽度内不换行或合理换行

### Requirement: CTA 按钮跳转项目展示区域

Hero 区域 SHALL 包含一个 CTA 按钮，点击后平滑滚动至页内 `#projects` 锚点。

#### Scenario: 点击 CTA 平滑滚动
- **GIVEN** 页面中存在 `id="projects"` 的目标元素
- **WHEN** 用户点击 CTA 按钮
- **THEN** 页面平滑滚动至该目标元素，目标元素不被固定 header 遮挡

#### Scenario: 目标锚点不存在时静默处理
- **GIVEN** 页面中不存在 `id="projects"` 的目标元素
- **WHEN** 用户点击 CTA 按钮
- **THEN** 页面不发生滚动，不抛出错误，不影响其他功能

#### Scenario: 键盘用户聚焦 CTA 按钮
- **GIVEN** 用户使用键盘 Tab 导航
- **WHEN** CTA 按钮获得焦点
- **THEN** 按钮显示可见的焦点环（`focus-visible:ring-2`），样式与按钮设计语言一致

### Requirement: 响应亮/暗模式切换

Hero 区域的背景渐变 SHALL 在亮色模式和暗色模式之间切换，视觉效果与 Tailwind `dark:` 变体行为一致。

#### Scenario: 系统偏好为暗色模式
- **GIVEN** 用户操作系统设置为暗色模式（`prefers-color-scheme: dark`）
- **WHEN** 页面首次加载
- **THEN** Hero 区域显示暗色主题渐变背景，内容文字使用暗色模式下可读的颜色

#### Scenario: 用户手动切换主题
- **GIVEN** 页面当前为亮色模式，用户触发主题切换
- **WHEN** 用户点击主题切换按钮（由全局主题机制提供，非 Hero 内部）
- **THEN** Hero 区域背景渐变为暗色主题颜色，过渡平滑无明显闪烁

#### Scenario: 暗色模式下 CTA 按钮可见性
- **GIVEN** 页面处于暗色模式
- **WHEN** Hero 区域渲染
- **THEN** CTA 按钮在暗色背景上具有足够的对比度（WCAG AA 标准，对比度 >= 4.5:1），按钮文字清晰可读
