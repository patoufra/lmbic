'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Settings, Code, Users, Layers, Zap, Grid, ChevronLeft, ChevronRight } from 'lucide-react'
import { useSidebar } from '@/contexts/SidebarContext'
import { theme } from '@/styles/theme'
import { Button } from '@/components/ui/button'

const navItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Devices', href: '/devices', icon: Zap },
  { name: 'Apps', href: '/apps', icon: Grid },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Developer', href: '/developer', icon: Code },
  { name: 'Account', href: '/account', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isOpen, toggleSidebar, sidebarWidth } = useSidebar()

  return (
    <>
      <div 
        className={`h-full shadow-lg flex-shrink-0 overflow-y-auto transition-all duration-300 ease-in-out bg-background ${isOpen ? 'w-64' : 'w-0'}`}
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8" style={{ color: theme.colors.primary }}>Lmbic</h1>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} passHref>
                  <span className={`flex items-center p-2 rounded-md transition-colors ${
                    pathname === item.href 
                      ? `bg-primary bg-opacity-20 text-white` 
                      : `text-sidebar-text hover:bg-sidebar-hoverBackground hover:text-primary`
                  }`}>
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Button
        onClick={toggleSidebar}
        className={`fixed top-4 z-50 p-2 bg-primary text-background rounded-full transition-all duration-300 ${
          isOpen ? 'left-[232px]' : 'left-4'
        }`}
        size="icon"
      >
        {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>
    </>
  )
}

