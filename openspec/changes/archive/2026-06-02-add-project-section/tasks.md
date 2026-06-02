## Phase 1: 目录结构与数据配置

- [x] 1.1 创建 `src/components/projects/` 目录
- [x] 1.2 创建 `projectData.ts`：定义 `Project` 接口和 4 个项目数据数组

## Phase 2: ProjectCard 组件

- [x] 2.1 创建 `ProjectCard.tsx`：卡片布局（16:9 图片区 + 名称 + 简介 + GitHub 链接），`React.memo` 包裹
- [x] 2.2 实现图片骨架屏占位符：加载前显示 `animate-pulse` 渐变，`onLoad` 后隐藏
- [x] 2.3 实现悬浮微交互：`hover:scale-[1.02]` + `hover:shadow-xl` + `hover:border-sky-500/50`，`transition-all duration-300`
- [x] 2.4 图片使用 `loading="lazy"` + `aspect-[16/9]` 固定宽高比
- [x] 2.5 GitHub 链接使用 `target="_blank" rel="noopener noreferrer"`

## Phase 3: ProjectSection 组件

- [x] 3.1 创建 `ProjectSection.tsx`：`id="projects"` + `scroll-mt-16` + section 标题 + 响应式 Grid 容器
- [x] 3.2 实现暗色模式适配：卡片、文字、边框、骨架屏全部含 `dark:` 变体
- [x] 3.3 渲染 ProjectCard 列表（从 projectData 映射）

## Phase 4: 集成与验证

- [x] 4.1 在 `App.tsx` 中插入 `ProjectSection`，置于 `HeroSection` 下方
- [x] 4.2 验证锚点导航：Navbar"项目"链接和 Hero CTA 点击后均滚动至 Project Section
- [x] 4.3 验证响应式布局：375px（1列）/ 768px（2列）/ 1440px（3列）
- [x] 4.4 验证悬浮微交互：桌面端 hover 正常，移动端无粘滞
- [x] 4.5 TypeScript 编译 + 生产构建通过
