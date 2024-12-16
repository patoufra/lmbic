'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Star, MessageSquare } from 'lucide-react'

export default function Community() {
  const [apps, setApps] = useState([
    { id: 1, name: 'Mood Lighting', author: 'LimbicLight', downloads: 1200, rating: 4.5 },
    { id: 2, name: 'Party Mode', author: 'NeonDreams', downloads: 850, rating: 4.2 },
    { id: 3, name: 'Focus Timer', author: 'ProductivityPlus', downloads: 650, rating: 4.7 },
  ])

  return (
    <div className="w-full container mx-auto px-4 py-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <Card key={app.id}>
            <h2 className="text-xl font-semibold mb-2">{app.name}</h2>
            <p className="text-sm text-gray-400 mb-4">by {app.author}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="flex items-center">
                <Download className="h-4 w-4 mr-1" />
                {app.downloads}
              </span>
              <span className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-400" />
                {app.rating}
              </span>
            </div>
            <div className="flex justify-between">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Install
              </Button>
              <Button variant="ghost">
                <MessageSquare className="mr-2 h-4 w-4" /> Reviews
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Discussions</h2>
        <Card>
          <ul className="space-y-4">
            <li>
              <h3 className="font-semibold">Best settings for movie nights?</h3>
              <p className="text-sm text-gray-400">Started by MovieBuff, 23 replies</p>
            </li>
            <li>
              <h3 className="font-semibold">Share your favorite AR scenes!</h3>
              <p className="text-sm text-gray-400">Started by ARtist, 45 replies</p>
            </li>
            <li>
              <h3 className="font-semibold">Troubleshooting: Sync issues</h3>
              <p className="text-sm text-gray-400">Started by TechSupport, 12 replies</p>
            </li>
          </ul>
          <Button className="mt-4" variant="outline">View All Discussions</Button>
        </Card>
      </div>
    </div>
  )
}

