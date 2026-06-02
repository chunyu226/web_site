# scroll-spy Specification

## Purpose
TBD - created by archiving change add-navigation. Update Purpose after archive.
## Requirements
### Requirement: 基于 IntersectionObserver 的活跃 Section 检测

系统 SHALL 使用 IntersectionObserver 监听页面中各 section 的可见性，判定当前活跃 section 并暴露给导航栏以高亮对应导航项。

#### Scenario: 单个 section 进入视口
- **GIVEN** 页面包含多个 section（#home, #projects, #contact）
- **WHEN** 用户滚动使 #projects section 的 30% 以上进入视口
- **THEN** scroll-spy 将 #projects 标记为当前活跃 section

#### Scenario: 多个 section 同时在视口内
- **GIVEN** 页面滚动位置使 #home 和 #projects 同时可见
- **WHEN** IntersectionObserver 回调触发
- **THEN** scroll-spy 选择可见比例最高的 section 作为活跃 section

#### Scenario: 页面顶部无 section 进入视口
- **GIVEN** 页面刚加载，所有 section 尚未进入观察范围
- **WHEN** scroll-spy 初始化
- **THEN** 默认第一个导航项（#home）为活跃状态

### Requirement: 导航栏高度偏移补偿

IntersectionObserver SHALL 使用 `rootMargin` 偏移导航栏高度（-80px top），确保 section 在导航栏下方可见区域时才被判定为活跃。

#### Scenario: Section 顶部被导航栏遮挡
- **GIVEN** section 顶部刚好滚动到导航栏后方（被遮挡）
- **WHEN** IntersectionObserver 检测 section 可见性
- **THEN** 该 section 不被判定为活跃，直至其内容区域进入导航栏下方的可见区域

### Requirement: 边界处理——页面底部

当用户滚动到页面最底部，且最后一个 section 仍然在视口中时，scroll-spy SHALL 将最后一个导航项标记为活跃。

#### Scenario: 滚动到页面底部
- **GIVEN** 用户滚动到页面底部，最后一个 section（#contact）在视口中
- **WHEN** scroll-spy 更新活跃状态
- **THEN** 最后一个导航项高亮

#### Scenario: 页面内容不足以滚动
- **GIVEN** 页面总高度小于或等于视口高度（所有 section 同时可见）
- **WHEN** scroll-spy 初始化
- **THEN** 第一个导航项保持活跃状态

