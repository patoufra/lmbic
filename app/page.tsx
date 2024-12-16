'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Plus, Activity } from 'lucide-react'

export default function Dashboard() {
  const [devices, setDevices] = useState([
    { id: 1, name: 'Living Room Lamp', status: 'online' },
    { id: 2, name: 'Bedroom Lamp', status: 'offline' },
    { id: 3, name: 'Office Lamp', status: 'online' },
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Montserrat' }}>Dashboard</h1>
      
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

        <Card>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <Zap className="mr-2 h-4 w-4" /> Turn All On
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Zap className="mr-2 h-4 w-4" /> Turn All Off
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Activity className="mr-2 h-4 w-4" /> Sync Devices
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-2">
            <li>Device 'Living Room Lamp' turned on</li>
            <li>New firmware available for 'Bedroom Lamp'</li>
            <li>AR scene 'Starry Night' applied to 'Office Lamp'</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}

