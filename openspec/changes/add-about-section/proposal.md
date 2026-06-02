## Why

个人品牌站缺少"关于我"区域——访问者看完项目和 Hero 后无法了解开发者的背景、经历和理念。个人品牌的核心是"人"，关于我区域是建立信任和展示个性的关键板块。

## What Changes

- 新增"关于我"Section，锚点 `id="about"`，位于项目展示区下方
- 桌面端左右分栏：左侧展示个人照片，右侧展示 3 段个人简介文字
- 移动端上下堆叠：照片在上，文字在下
- Section 底部展示品牌标签"创课智联"
- 照片使用 `loading="lazy"` 懒加载

## Capabilities

### New Capabilities

- `about-section`: 关于我区域，左右分栏布局（照片 + 个人简介 3 段 + 品牌标签），响应式堆叠，暗色模式适配

### Modified Capabilities

（无——现有 spec 不涉及关于我区域）

## Impact

- 新增依赖：无
- 新增文件：`src/components/about/AboutSection.tsx`、`src/components/about/aboutData.ts`
- 修改文件：`src/App.tsx`（在 ProjectSection 下方插入 AboutSection）
- 导航栏：新增的 `#about` 锚点供未来导航项使用（当前导航栏无"关于我"链接，需要时可新增配置项）

## Out of Scope

- 不做联系我的表单
