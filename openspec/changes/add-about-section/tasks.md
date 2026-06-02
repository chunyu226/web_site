## Phase 1: 目录与数据

- [ ] 1.1 创建 `src/components/about/` 目录
- [ ] 1.2 创建 `aboutData.ts`：定义简介段落数组和品牌标签字符串

## Phase 2: AboutSection 组件

- [ ] 2.1 创建 `AboutSection.tsx`：`id="about"` + `scroll-mt-16` + Grid 两栏布局
- [ ] 2.2 实现左侧照片区：`rounded-full` + `border-sky-500/30` + `loading="lazy"` + `onError` 占位
- [ ] 2.3 实现右侧简介区：3 段文字从配置渲染
- [ ] 2.4 实现底部品牌标签：毛玻璃胶囊 `backdrop-blur-sm`
- [ ] 2.5 暗色模式适配：所有元素含 `dark:` 变体

## Phase 3: 集成与验证

- [ ] 3.1 在 `App.tsx` 中插入 `AboutSection`，置于 `ProjectSection` 下方
- [ ] 3.2 验证响应式：768px 以上左右分栏，以下上下堆叠
- [ ] 3.3 TypeScript 编译 + 生产构建通过
