'use client'

import { useEffect } from 'react'
import { ARStudio } from '@/components/ARStudio'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSidebar } from '@/contexts/SidebarContext'

export default function AppPage({ params }: { params: { id: string } }) {
  const { closeSidebar } = useSidebar()

  useEffect(() => {
    closeSidebar()
  }, [closeSidebar])

  // In a real app, you'd fetch the app details based on the ID
  const appName = params.id === '1' ? 'AR Studio' : 'App'

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{appName}</h1>
        <Link href="/apps" passHref>
          <Button variant="outline">Back to Apps</Button>
        </Link>
      </div>
      {params.id === '1' && <ARStudio />}
      {/* Add conditions for other apps here */}
    </div>
  )
}

