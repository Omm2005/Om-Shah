'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from './ModeToggle'
import navigation from "@/content/navigation.json"

const Navbar = () => {
    const pathname = usePathname()
    
    return (
        <main className="fixed bottom-0 left-0 right-0 flex items-center justify-center py-6 backdrop-blur-sm">
            <div className="flex items-center gap-5">
                {navigation.navbar.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-xs transition-all duration-200 ${
                                isActive 
                                    ? 'text-foreground font-medium' 
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {item.label}
                        </Link>
                    )
                })}
                <ModeToggle />
            </div>
        </main>
    )
}

export default Navbar
