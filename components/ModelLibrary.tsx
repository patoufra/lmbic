import React, { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from 'lucide-react'

interface ModelLibraryProps {
  scene: {
    models: string[]
  }
  onUpdate: (updatedModels: string[]) => void
}

export const ModelLibrary: React.FC<ModelLibraryProps> = ({ scene, onUpdate }) => {
  const [newModel, setNewModel] = useState('')

  const handleAddModel = () => {
    if (newModel && !scene.models.includes(newModel)) {
      onUpdate([...scene.models, newModel])
      setNewModel('')
    }
  }

  const handleRemoveModel = (model: string) => {
    onUpdate(scene.models.filter(m => m !== model))
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-2">3D Models</h3>
      <div className="space-y-2">
        {scene.models.map((model) => (
          <div key={model} className="flex items-center justify-between p-2 bg-surface rounded">
            <span>{model}</span>
            <Button variant="ghost" size="sm" onClick={() => handleRemoveModel(model)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-4 flex space-x-2">
        <Input 
          placeholder="New Model Name" 
          value={newModel}
          onChange={(e) => setNewModel(e.target.value)}
        />
        <Button onClick={handleAddModel}>
          <Plus className="h-4 w-4 mr-2" /> Add
        </Button>
      </div>
    </Card>
  )
}

