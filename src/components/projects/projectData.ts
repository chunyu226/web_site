export interface Project {
  name: string
  description: string
  image: string
  githubUrl: string
}

export const projects: Project[] = [
  {
    name: '智能任务调度系统',
    description: '基于优先级队列和依赖图的分布式任务调度引擎，支持 DAG 工作流编排与实时监控。',
    image: `${import.meta.env.BASE_URL}images/project-scheduler.webp`,
    githubUrl: 'https://github.com/chunyu226/web_site',
  },
  {
    name: '实时数据可视化面板',
    description: 'WebSocket 驱动的实时数据大屏，支持多数据源聚合、自定义图表组件和导出功能。',
    image: `${import.meta.env.BASE_URL}images/project-dashboard.webp`,
    githubUrl: 'https://github.com/chunyu226',
  },
  {
    name: '微服务网关中间件',
    description: 'Go 编写的高性能 API 网关，支持限流、熔断、JWT 鉴权与动态路由配置。',
    image: `${import.meta.env.BASE_URL}images/project-gateway.webp`,
    githubUrl: 'https://github.com/chunyu226',
  },
  {
    name: 'AI 代码审查助手',
    description: '基于 LLM 的自动化 Code Review 工具，支持 GitHub PR 集成与多语言差异分析。',
    image: `${import.meta.env.BASE_URL}images/project-codereview.webp`,
    githubUrl: 'https://github.com/chunyu226',
  },
]
