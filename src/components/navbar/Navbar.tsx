import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useScrollState } from '../../hooks/useScrollState'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { navItems } from './navConfig'
import NavLink from './NavLink'
import MobileMenu from './MobileMenu'
import ActiveIndicator from './ActiveIndicator'

const Navbar = React.memo(function Navbar() {
  const isScrolled = useScrollState()
  const sectionIds = useMemo(
    () => navItems.map((item) => item.href.slice(1)),
    [],
  )
  const activeSection = useScrollSpy(sectionIds)

  return (
    <motion.nav
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`sticky top-0 z-50 h-16 transition-all ${
        isScrolled
          ? 'backdrop-blur-md bg-white/70 dark:bg-gray-950/70 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <a
          href="#home"
          className="text-lg font-bold text-slate-900 dark:text-white"
        >
          张三
        </a>

        <div className="relative hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              isActive={activeSection === item.href.slice(1)}
            />
          ))}
          <ActiveIndicator activeHref={activeSection} items={navItems} />
        </div>

        <MobileMenu items={navItems} activeSection={activeSection} />
      </div>
    </motion.nav>
  )
})

export default Navbar
