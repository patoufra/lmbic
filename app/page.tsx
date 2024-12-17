'use client'

import { useState } from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Card } from "@/components/ui/card"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button } from "@/components/ui/button"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Zap, Plus, Activity } from 'lucide-react'

export default function Dashboard() {
  const [devices] = useState([
    { id: 1, name: 'Living Room Lamp', status: 'online' },
    { id: 2, name: 'Bedroom Lamp', status: 'offline' },
    { id: 3, name: 'Office Lamp', status: 'online' },
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <p>It&apos;s a great day!</p>
      <p>Don&apos;t worry, be happy!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Connected Devices</h2>
          <ul className="space-y-2">
            {devices.map((device) => (
              <li key={device.id} className="flex items-center justify-between">
                <span>{device.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  device.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {device.status}
                </span>
              </li>
            ))}
          </ul>
          <Button className="mt-4" variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Add Device
          </Button>
        </Card>
      </div>
    </div>
  )
}

