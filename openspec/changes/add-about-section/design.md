## Context

项目已有 Hero、Navbar、ProjectSection 三个主要 Section。关于我区域是第四个 Section，延续配置驱动 + React.memo + 暗色模式的项目模式。

## Goals / Non-Goals

**Goals:**
- 左右分栏布局（桌面端），上下堆叠（移动端 < 768px）
- 照片 + 3 段简介 + 品牌标签，数据配置化
- 照片懒加载 + 暗色模式适配

**Non-Goals:**
- 不做联系表单

## Decisions

### D1: CSS Grid 实现左右分栏

**选择**：`grid grid-cols-1 md:grid-cols-2 gap-10 items-center`。

**理由**：Grid 在分栏场景比 Flexbox 更简洁——一个容器直接定义列数和间距，子元素自动分配。移动端 `grid-cols-1` 自动切换为上下堆叠。

### D2: 照片使用圆形裁剪 + 科技感边框

**选择**：`rounded-full` 圆形裁剪 + `border-4 border-sky-500/30` 半透明科技感边框，`w-64 h-64` 固定尺寸，`object-cover` 裁剪。

**理由**：圆形照片是个人品牌站的标准模式，比方形更亲和。半透明 sky 边框与项目整体科技感配色一致。

### D3: 品牌标签使用毛玻璃胶囊

**选择**：品牌标签"创课智联"渲染为 `<span>` 带 `backdrop-blur-sm bg-sky-500/10 border border-sky-500/30 rounded-full px-6 py-2` 样式。

**理由**：毛玻璃胶囊标签与导航栏毛玻璃形成视觉呼应，强化品牌识别。

## Risks / Trade-offs

- **[低] 照片文件体积** → `loading="lazy"` 确保不阻塞 LCP，建议 WebP < 80KB
