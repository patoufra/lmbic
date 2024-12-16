'use client'

import React from 'react'
import { Bell, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/contexts/SidebarContext'
import { usePathname } from 'next/navigation'
import { theme } from '@/styles/theme'

export const TopNavBar: React.FC = () => {
  const { isOpen, sidebarWidth } = useSidebar()
  const pathname = usePathname()

  // Function to get the title based on the current path
  const getTitle = () => {
    const path = pathname.split('/')[1]
    return path ? path.charAt(0).toUpperCase() + path.slice(1) : 'Dashboard'
  }

  return (
    <nav 
      className="bg-background border-b border-gray-700 py-4 px-6 sticky top-0 z-30 transition-all duration-300 flex items-center justify-between"
      style={{ 
        position: 'absolute',
        left: isOpen ? `${sidebarWidth}px` : '0',
        right: '0',
        backgroundColor: theme.colors.background
      }}
    >
      <h1 className="text-2xl font-bold" style={{ color: theme.colors.primary }}>{getTitle()}</h1>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  )
}

