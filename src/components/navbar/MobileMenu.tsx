import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { NavItem } from './navConfig'

interface MobileMenuProps {
  items: NavItem[]
  activeSection: string
}

const MobileMenu = React.memo(function MobileMenu({
  items,
  activeSection,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>) {
    setIsOpen(false)
    const href = e.currentTarget.getAttribute('href')
    if (!href) return
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 flex h-10 w-10 items-center justify-center text-slate-600 dark:text-slate-300"
        aria-label={isOpen ? '关闭菜单' : '打开菜单'}
      >
        <div className="flex flex-col gap-1.5">
          <span
            className={`block h-[2px] w-5 rounded bg-current transition-all ${
              isOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-5 rounded bg-current transition-all ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-5 rounded bg-current transition-all ${
              isOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-x-0 top-0 z-40 bg-white/90 pt-20 backdrop-blur-md dark:bg-gray-950/90"
            >
              <ul className="flex flex-col items-center gap-6 px-6 pb-8">
                {items.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={handleNavClick}
                      className={`text-lg font-medium transition-colors ${
                        activeSection === item.href.slice(1)
                          ? 'text-sky-600 dark:text-sky-400'
                          : 'text-slate-700 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  )
})

export default MobileMenu
