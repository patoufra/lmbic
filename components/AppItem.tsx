'use client'

import React from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { useSidebar } from '@/contexts/SidebarContext'

interface AppProps {
  app: {
    id: string
    name: string
    description: string
    status: 'installed' | 'purchased' | 'available'
    icon: string
  }
}

export const AppItem: React.FC<AppProps> = ({ app }) => {
  const router = useRouter()
  const { closeSidebar } = useSidebar()

  const handleOpen = () => {
    closeSidebar()
    router.push(`/apps/${app.id}`)
  }

  return (
    <Card className="p-4">
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-2">{app.icon}</span>
        <h3 className="text-lg font-semibold">{app.name}</h3>
      </div>
      <p className="text-sm text-gray-500 mb-4">{app.description}</p>
      {app.status === 'installed' && (
        <Button className="w-full" onClick={handleOpen}>Open</Button>
      )}
      {app.status === 'purchased' && (
        <Button className="w-full">Install</Button>
      )}
      {app.status === 'available' && (
        <Button className="w-full">Purchase</Button>
      )}
    </Card>
  )
}

