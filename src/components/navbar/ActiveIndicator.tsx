import React from 'react'
import { motion } from 'framer-motion'

interface ActiveIndicatorProps {
  activeHref: string
  items: Array<{ href: string }>
}

const ActiveIndicator = React.memo(function ActiveIndicator({
  activeHref,
  items,
}: ActiveIndicatorProps) {
  return (
    <div className="absolute bottom-0 left-0 flex h-[2px] w-full">
      {items.map((item) => (
        <div key={item.href} className="relative flex-1 px-3">
          {item.href.slice(1) === activeHref && (
            <motion.div
              layoutId="active-indicator"
              className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-sky-500 dark:bg-sky-400"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </div>
      ))}
    </div>
  )
})

export default ActiveIndicator
