'use client'

import React, { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppItem } from '@/components/AppItem'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface App {
  id: string
  name: string
  description: string
  status: 'installed' | 'purchased' | 'available'
  icon: string
}

export default function Apps() {
  const [apps, setApps] = useState<App[]>([
    { id: '1', name: 'AR Studio', description: 'Create and manage AR scenes', status: 'installed', icon: '🎨' },
    { id: '2', name: 'Hybrid Notes', description: 'Digital and physical note-taking', status: 'purchased', icon: '📝' },
    { id: '3', name: 'Mood Lighting', description: 'Adaptive lighting based on your mood', status: 'available', icon: '💡' },
    { id: '4', name: 'Sleep Tracker', description: 'Monitor and improve your sleep patterns', status: 'available', icon: '😴' },
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const installedApps = filteredApps.filter(app => app.status === 'installed')
  const purchasedApps = filteredApps.filter(app => app.status === 'purchased')
  const availableApps = filteredApps.filter(app => app.status === 'available')

  return (
    <div className="w-full container mx-auto px-4 py-8">
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search apps..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="installed">
        <TabsList className="mb-4">
          <TabsTrigger value="installed">Installed</TabsTrigger>
          <TabsTrigger value="purchased">Purchased</TabsTrigger>
          <TabsTrigger value="browse">Browse</TabsTrigger>
        </TabsList>
        
        <TabsContent value="installed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {installedApps.map(app => (
              <AppItem key={app.id} app={app} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="purchased">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchasedApps.map(app => (
              <AppItem key={app.id} app={app} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="browse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableApps.map(app => (
              <AppItem key={app.id} app={app} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

