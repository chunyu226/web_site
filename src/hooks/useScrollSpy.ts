import { useState, useEffect, useRef } from 'react'

export function useScrollSpy(sectionIds: string[]): string {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '')
  const ratiosRef = useRef<Map<string, number>>(new Map())

  useEffect(() => {
    if (sectionIds.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratiosRef.current.set(entry.target.id, entry.intersectionRatio)
        }

        let maxId = sectionIds[0]
        let maxRatio = 0
        for (const id of sectionIds) {
          const ratio = ratiosRef.current.get(id) ?? 0
          if (ratio > maxRatio) {
            maxRatio = ratio
            maxId = id
          }
        }

        if (maxRatio > 0) {
          setActiveSection(maxId)
        }
      },
      {
        rootMargin: '-80px 0px 0px 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      },
    )

    const elements: Element[] = []
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) {
        observer.observe(el)
        elements.push(el)
      }
    }

    return () => {
      for (const el of elements) {
        observer.unobserve(el)
      }
    }
  }, [sectionIds])

  return activeSection
}
