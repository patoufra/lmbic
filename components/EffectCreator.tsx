import React, { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from 'lucide-react'

interface EffectCreatorProps {
  scene: {
    effects: string[]
  }
  onUpdate: (updatedEffects: string[]) => void
}

export const EffectCreator: React.FC<EffectCreatorProps> = ({ scene, onUpdate }) => {
  const [newEffect, setNewEffect] = useState('')

  const handleAddEffect = () => {
    if (newEffect && !scene.effects.includes(newEffect)) {
      onUpdate([...scene.effects, newEffect])
      setNewEffect('')
    }
  }

  const handleRemoveEffect = (effect: string) => {
    onUpdate(scene.effects.filter(e => e !== effect))
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-2">Effects</h3>
      <div className="space-y-2">
        {scene.effects.map((effect) => (
          <div key={effect} className="flex items-center justify-between p-2 bg-surface rounded">
            <span>{effect}</span>
            <Button variant="ghost" size="sm" onClick={() => handleRemoveEffect(effect)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex space-x-2">
        <Input 
          placeholder="New Effect Name" 
          value={newEffect}
          onChange={(e) => setNewEffect(e.target.value)}
        />
        <Button onClick={handleAddEffect}>
          <Plus className="h-4 w-4 mr-2" /> Add
        </Button>
      </div>
    </Card>
  )
}

