## ADDED Requirements

### Requirement: Section 定位

About section SHALL 位于 Project section 下方，带有 `id="about"` 锚点，使用 `scroll-mt-16` 防止 sticky 导航栏遮挡。

#### Scenario: 锚点导航到达
- **GIVEN** 用户通过锚点导航至 `#about`
- **WHEN** 浏览器执行滚动
- **THEN** Section 顶部不被导航栏遮挡，内容完整可见

### Requirement: 左右分栏布局

About section SHALL 在桌面端（>= 768px）使用左右两栏布局：左侧展示个人照片，右侧展示个人简介文字。移动端（< 768px）上下堆叠。

#### Scenario: 桌面端左右分栏
- **GIVEN** 用户使用桌面浏览器（视口宽度 >= 768px）
- **WHEN** About section 渲染
- **THEN** 照片显示在左侧，简介文字显示在右侧，两者等宽垂直居中

#### Scenario: 移动端上下堆叠
- **GIVEN** 用户使用移动设备（视口宽度 < 768px）
- **WHEN** About section 渲染
- **THEN** 照片显示在上方居中，简介文字显示在下方

### Requirement: 个人照片展示

About section SHALL 展示一张个人照片，圆形裁剪，带科技感半透明边框，使用 `loading="lazy"` 懒加载。

#### Scenario: 照片渲染
- **GIVEN** About section 渲染
- **WHEN** 图片加载完成
- **THEN** 照片以圆形显示，带 sky 色系半透明边框

#### Scenario: 照片加载失败
- **GIVEN** 照片 URL 无效或网络错误
- **WHEN** 图片加载失败
- **THEN** 显示占位符（灰色圆形背景 + 用户图标），页面布局不受影响

### Requirement: 个人简介三段文字

About section SHALL 在右侧展示 3 段个人简介文字，每段为一个独立段落，通过配置数组驱动。

#### Scenario: 三段简介渲染
- **GIVEN** 配置数据包含 3 段简介文字
- **WHEN** About section 渲染
- **THEN** 3 段文字依次显示，间距合理，阅读舒适

### Requirement: 品牌标签

About section SHALL 在底部展示品牌标签"创课智联"，使用毛玻璃胶囊样式。

#### Scenario: 品牌标签展示
- **GIVEN** About section 渲染
- **WHEN** 页面加载完成
- **THEN** 底部显示"创课智联"毛玻璃胶囊标签

### Requirement: 暗色模式适配

About section SHALL 在亮色和暗色模式下提供合适的视觉样式。

#### Scenario: 亮色模式
- **GIVEN** 页面处于亮色模式
- **WHEN** About section 渲染
- **THEN** 文字为深色，背景为浅色

#### Scenario: 暗色模式
- **GIVEN** 页面处于暗色模式
- **WHEN** About section 渲染
- **THEN** 文字为浅色，背景为深色，照片边框颜色适配暗色主题
