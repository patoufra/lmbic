'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Settings, Code, Users, Layers, Zap, Grid } from 'lucide-react'
import { useSidebar } from '@/contexts/SidebarContext'
import { motion } from 'framer-motion'

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
  const { isOpen } = useSidebar()

  return (
    <motion.nav 
      className="bg-surface overflow-hidden"
      initial={{ width: 256 }}
      animate={{ width: isOpen ? 256 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-64 p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary" style={{ fontFamily: 'Montserrat' }}>LimbicLight</h1>
        </div>
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link href={item.href} passHref>
                <span className={`flex items-center p-2 rounded-md transition-colors ${
                  pathname === item.href ? 'bg-primary bg-opacity-20 text-primary' : 'text-text-secondary hover:bg-primary hover:bg-opacity-10 hover:text-primary'
                }`}>
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  )
}

