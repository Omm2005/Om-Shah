'use client'

import React from 'react'
import Link from 'next/link'
import vaultItems from '@/content/vault.json'

type VaultItem = {
  title: string
  description: string
  href: string
  format: string
}

const vaultEntries: VaultItem[] = vaultItems as VaultItem[]

export default function VaultList() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-2">
      {vaultEntries.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-start sm:items-center gap-3 w-full rounded-xl border border-border/70 px-4 py-3 hover:border-foreground/50 transition-colors"
        >
          <div className="flex-1 min-w-0" suppressHydrationWarning>
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <span className="truncate">{item.title}</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {item.description}
            </p>
          </div>

          <span className="text-[11px] px-3 py-1 rounded-full border border-border text-foreground/80">
            {item.format}
          </span>

          <span
            aria-hidden
            className="text-base text-foreground/70 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            ↗
          </span>
        </Link>
      ))}
    </div>
  )
}
