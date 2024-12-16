import React from 'react'
import Link from 'next/link'
import { Bell, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const TopNavBar: React.FC = () => {
  return (
    <nav className="bg-surface border-b border-gray-700 py-2 px-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          LimbicLight
        </Link>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}

