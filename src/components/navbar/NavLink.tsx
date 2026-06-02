import React from 'react'
import type { NavItem } from './navConfig'

interface NavLinkProps {
  item: NavItem
  isActive: boolean
}

const NavLink = React.memo(function NavLink({ item, isActive }: NavLinkProps) {
  return (
    <a
      href={item.href}
      className={`relative px-3 py-2 text-sm font-medium transition-colors sm:text-base ${
        isActive
          ? 'text-sky-600 dark:text-sky-400'
          : 'text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400'
      }`}
    >
      {item.label}
    </a>
  )
})

export default NavLink
