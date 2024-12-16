'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, CreditCard, User, Moon } from 'lucide-react'

export default function Account() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="w-full container mx-auto px-4 py-8">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <div className="space-y-2">
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> john.doe@example.com</p>
            <p><strong>Member Since:</strong> January 1, 2023</p>
          </div>
          <Button className="mt-4" variant="outline">
            <User className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Email Notifications
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Push Notifications
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Product Updates
            </label>
          </div>
          <Button className="mt-4" variant="outline">
            <Bell className="mr-2 h-4 w-4" /> Update Preferences
          </Button>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Billing</h2>
          <p className="mb-4">Current Plan: Pro</p>
          <Button variant="outline">
            <CreditCard className="mr-2 h-4 w-4" /> Manage Subscription
          </Button>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">App Settings</h2>
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <Button className="mt-4" variant="outline">
            <Moon className="mr-2 h-4 w-4" /> More Settings
          </Button>
        </Card>
      </div>
    </div>
  )
}

