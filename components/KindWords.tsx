'use client'

import kindWords from '@/content/kind-words.json'

type KindWord = {
  quote: string
  name: string
  role: string
}

const entries: KindWord[] = kindWords as KindWord[]

export default function KindWords() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <ul className="grid gap-6">
        {entries.map((item, index) => (
          <li
            key={`${item.name}-${index}`}
            className="leading-snug grid lg:grid-cols-[minmax(80px,1fr)_auto_minmax(80px,1fr)] gap-5 lg:gap-6 items-center px-4"
          >
            <div className="hidden lg:flex border-x border-border/70 h-3 lg:h-6">
              <div className="border-b border-border/70 grow h-1/2" />
            </div>

            <div className="grid gap-2 md:gap-1 justify-items-center text-center">
              <p className="relative text-[13px] md:text-sm text-foreground leading-relaxed">
                <span className="relative">{item.quote}</span>
              </p>
              <footer className="flex gap-2 items-center shrink-0 text-xs md:text-sm text-muted-foreground">
                <div className="grid md:flex md:items-center md:gap-1.5 shrink-0">
                  <p className="text-foreground font-medium text-xs md:text-sm">{item.name}</p>
                  <span className="hidden md:inline text-foreground/40">•</span>
                  <p className="text-muted-foreground text-xs md:text-sm">{item.role}</p>
                </div>
              </footer>
            </div>

            <div className="border-x border-border/70 h-3 lg:h-6 flex">
              <div className="border-b border-border/70 grow h-1/2" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
