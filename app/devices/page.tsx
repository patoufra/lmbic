'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Settings } from 'lucide-react'
import Link from 'next/link'
import { DevicePairingModal } from '@/components/DevicePairingModal'

export default function Devices() {
  const [devices, setDevices] = useState([
    { id: 1, name: 'Living Room Lamp', status: 'online' },
    { id: 2, name: 'Bedroom Lamp', status: 'offline' },
  ])
  const [isPairingModalOpen, setIsPairingModalOpen] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ fontFamily: 'Montserrat' }}>Your Devices</h1>
        <Button onClick={() => setIsPairingModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Device
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => (
          <Card key={device.id} className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{device.name}</h2>
              <span className={`px-2 py-1 rounded-full text-xs ${
                device.status === 'online' ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {device.status}
              </span>
            </div>
            <Link href={`/devices/${device.id}/settings`} passHref>
              <Button variant="outline" className="w-full">
                <Settings className="mr-2 h-4 w-4" /> Manage Device
              </Button>
            </Link>
          </Card>
        ))}
      </div>

      <DevicePairingModal 
        isOpen={isPairingModalOpen} 
        onClose={() => setIsPairingModalOpen(false)}
      />
    </div>
  )
}

