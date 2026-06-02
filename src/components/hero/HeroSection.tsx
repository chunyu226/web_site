import ParticleCanvas from './ParticleCanvas'

function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen min-h-dvh items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-100 dark:from-gray-950 dark:via-slate-900 dark:to-sky-950 scroll-mt-16">
      <ParticleCanvas />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
          张三
        </h1>
        <p className="mt-4 text-lg text-sky-600 dark:text-sky-400 sm:text-xl md:text-2xl">
          全栈工程师
        </p>
        <p className="mx-auto mt-6 max-w-xl text-base text-slate-500 dark:text-slate-400 sm:text-lg">
          专注于构建高性能 Web 应用，热爱开源与技术创新。用代码让世界更美好。
        </p>
        <a
          href="#projects"
          className="mt-10 inline-block rounded-full bg-sky-600 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:bg-sky-500 dark:hover:bg-sky-600 dark:focus-visible:ring-offset-gray-950 sm:text-lg"
        >
          查看我的项目
        </a>
      </div>
    </section>
  )
}

export default HeroSection
