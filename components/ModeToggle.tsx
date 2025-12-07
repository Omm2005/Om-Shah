"use client"

import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"

const emptySubscribe = () => () => {}

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  const cycleTheme = () => {
    if (theme === "system") setTheme("light")
    else if (theme === "light") setTheme("dark")
    else setTheme("system")
  }

  if (!mounted) return null

  return (
    <button
      onClick={cycleTheme}
      className="text-sm text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
    >
      {theme}
    </button>
  )
}

