import { projects } from './projectData'
import ProjectCard from './ProjectCard'

function ProjectSection() {
  return (
    <section
      id="projects"
      className="scroll-mt-16 bg-slate-50 px-6 py-20 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
          我的项目
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-500 dark:text-slate-400">
          每一个项目都是一次探索，从架构设计到代码实现，持续追求简洁与高效。
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectSection
