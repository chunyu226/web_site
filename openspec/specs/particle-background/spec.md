# particle-background Specification

## Purpose
TBD - created by archiving change add-hero-section. Update Purpose after archive.
## Requirements
### Requirement: Canvas 粒子静态渲染

ParticleCanvas 组件 SHALL 在挂载时使用 Canvas 2D API 绘制静态粒子节点-连线网络，每个粒子为圆形节点，相邻粒子之间距离小于阈值时绘制半透明连线。

#### Scenario: Canvas 挂载时绘制粒子
- **GIVEN** Hero section 已挂载且 Canvas 元素就绪
- **WHEN** ParticleCanvas 组件完成首次渲染
- **THEN** Canvas 上显示指定数量的粒子节点及满足距离条件的连线，粒子背景不遮挡 Hero 文字内容

#### Scenario: 粒子绘制无动画循环
- **GIVEN** ParticleCanvas 已完成首次绘制
- **WHEN** 检查页面中运行的 requestAnimationFrame 或 setInterval
- **THEN** 不存在由粒子系统启动的持续动画循环，绘制仅发生在挂载和 resize 时

### Requirement: 粒子颜色响应主题

粒子节点的颜色和连线颜色 SHALL 通过 CSS 自定义属性定义，在亮色和暗色主题下使用不同的色值，ParticleCanvas 在绘制时读取当前计算样式。

#### Scenario: 亮色模式粒子颜色
- **GIVEN** 页面处于亮色模式
- **WHEN** ParticleCanvas 执行绘制
- **THEN** 粒子节点使用亮色主题定义的颜色（较深的蓝色系），连线使用亮色主题的连线颜色（半透明蓝色）

#### Scenario: 暗色模式粒子颜色
- **GIVEN** 页面处于暗色模式
- **WHEN** ParticleCanvas 执行绘制
- **THEN** 粒子节点使用暗色主题定义的颜色（较亮的青色系），连线使用暗色主题的连线颜色

#### Scenario: 主题切换后粒子重绘
- **GIVEN** 页面主题从亮色切换到暗色（或反之）
- **WHEN** 主题切换完成（document 上 class 变更）
- **THEN** Canvas 重新绘制，所有粒子和连线使用新主题对应的颜色

### Requirement: 尊重用户的 reduced-motion 偏好

当用户操作系统开启了 `prefers-reduced-motion: reduce` 时，ParticleCanvas SHALL 仍然渲染静态粒子（无动画），以确保不违反用户的无障碍偏好。

#### Scenario: reduced-motion 偏好下的行为
- **GIVEN** 用户操作系统设置 `prefers-reduced-motion: reduce`
- **WHEN** 页面加载且 ParticleCanvas 挂载
- **THEN** 粒子仍然渲染为静态画面，与默认行为一致（因为本项目不做动画）

### Requirement: Canvas 响应尺寸变化

ParticleCanvas SHALL 在窗口 resize 或设备方向变化时重新计算 Canvas 尺寸并重绘粒子布局，保持粒子覆盖整个 Hero 背景区域。

#### Scenario: 窗口 resize 触发重绘
- **GIVEN** Hero section 已渲染且粒子已绘制
- **WHEN** 用户调整浏览器窗口大小（缩放或拖动边缘）
- **THEN** Canvas 尺寸匹配新的 Hero 区域尺寸，粒子按新尺寸重新分布，重绘在 resize 结束后至多 150ms 内完成（debounce）

#### Scenario: 设备旋转触发重绘
- **GIVEN** 用户在支持屏幕旋转的移动设备上
- **WHEN** 设备从竖屏旋转为横屏（或反之）
- **THEN** Canvas 尺寸匹配新的视口尺寸，粒子重新分布覆盖整个 Hero 背景

#### Scenario: 高 DPI 屏幕绘制清晰
- **GIVEN** 用户设备 `devicePixelRatio >= 2`
- **WHEN** Canvas 执行绘制
- **THEN** Canvas 内部分辨率按 `devicePixelRatio` 缩放，粒子节点和连线边缘清晰无锯齿

### Requirement: 粒子不影响页面可访问性

Canvas 元素 SHALL 对辅助技术不可见，不干扰屏幕阅读器用户对 Hero 内容的理解。

#### Scenario: 屏幕阅读器忽略粒子背景
- **GIVEN** 用户使用屏幕阅读器访问页面
- **WHEN** 阅读器遍历 Hero 区域
- **THEN** Canvas 元素带有 `aria-hidden="true"` 和 `role="presentation"` 属性，阅读器跳过该元素，直接朗读 Hero 文字内容（姓名、职业、介绍、CTA 按钮）

