'use client'

import React from 'react'
import navigation from "@/content/navigation.json"

interface NavItem {
  label: string
  href: string
}

interface SideNavProps {
  items?: NavItem[]
  activeIndex?: number
}

const SideNav = ({ 
  items = navigation.sidebar,
  activeIndex
}: SideNavProps) => {
  const [observedIndex, setObservedIndex] = React.useState<number>(activeIndex ?? 0)

  React.useEffect(() => {
    // If a controlled activeIndex is provided, use it and skip observing
    if (activeIndex !== undefined) {
      setObservedIndex(activeIndex)
      return
    }

    const sectionIds = items.map(({ href }) =>
      href.startsWith("#") ? href.slice(1) : href
    )
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio ||
              a.boundingClientRect.top - b.boundingClientRect.top
          )

        const target = visible[0] ?? null

        if (target) {
          const idx = sectionIds.indexOf(target.target.id)
          if (idx !== -1) setObservedIndex(idx)
          return
        }

        // Fallback to the section closest to the viewport
        const closest = entries
          .slice()
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
          )[0]

        if (closest) {
          const idx = sectionIds.indexOf(closest.target.id)
          if (idx !== -1) setObservedIndex(idx)
        }
      },
      {
        rootMargin: "-35% 0px -35% 0px",
        threshold: [0.2, 0.4, 0.6, 0.8, 1],
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [items, activeIndex])

  const currentActive = activeIndex !== undefined ? activeIndex : observedIndex

  return (
    <nav className="group fixed right-6 top-10 hidden md:flex flex-col items-end gap-2">
      {items.map((item, index) => {
        const isActive = index === currentActive
        return (
          <a
            key={item.href}
            href={item.href}
            className="flex items-center gap-1 group-hover:hover:opacity-100 group-hover:hover:scale-105 transition-all duration-200"
          >
            {/* Label - appears on hover */}
            <span 
              className={`text-[10px] opacity-0 translate-x-1 group-hover:opacity-70 group-hover:hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out ${
                isActive ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              {item.label}
            </span>
            
            {/* Line indicator */}
            <span 
              className={`block h-px rounded-full transition-all duration-300 ease-out ${
                isActive 
                  ? 'w-6 bg-foreground group-hover:w-8' 
                  : 'w-3 bg-foreground/40 group-hover:w-6 group-hover:bg-foreground/60'
              }`}
            />
          </a>
        )
      })}
    </nav>
  )
}

export default SideNav
