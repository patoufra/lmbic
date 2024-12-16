import React from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const FloatingActionButton: React.FC = () => {
  return (
    <Button
      className="fixed bottom-8 right-8 rounded-full w-14 h-14 shadow-lg"
      size="icon"
    >
      <Plus className="h-6 w-6" />
    </Button>
  )
}

